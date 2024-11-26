import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Injector,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalConfigState, TrackingPopupComponent } from 'ccf-shared';
import { ConsentService } from 'ccf-shared/analytics';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import {
  combineLatest,
  filter,
  fromEvent,
  map,
  ReplaySubject,
  startWith,
  Subscription,
  switchAll,
  take,
  throttleTime,
} from 'rxjs';
import { EMPTY_SUBSCRIPTION } from 'rxjs/internal/Subscription';

import { GlobalConfig } from './core/services/config/config';
import { ThemingService } from './core/services/theming/theming.service';
import { ModelState, ViewSide, ViewType } from './core/store/model/model.state';
import { PageState } from './core/store/page/page.state';
import { RegistrationState } from './core/store/registration/registration.state';
import {
  DEFAULT_SCREEN_SIZE_NOTICE_STORAGE_KEY,
  SCREEN_SIZE_NOTICE_MAX_HEIGHT,
  SCREEN_SIZE_NOTICE_MAX_WIDTH,
  ScreenSizeNoticeComponent,
} from './modules/screen-size-notice/screen-size-notice.component';

export interface User {
  firstName: string;
  lastName: string;
}

interface AppOptions extends GlobalConfig {
  theme?: string;
  header?: boolean;
  homeUrl?: string;
  logoTooltip?: string;
  view?: ViewType;
  viewSide?: ViewSide;
}

export function openScreenSizeNotice(dialog: MatDialog): Subscription {
  const initialStorageValue = booleanAttribute(localStorage.getItem(DEFAULT_SCREEN_SIZE_NOTICE_STORAGE_KEY));
  if (initialStorageValue) {
    return EMPTY_SUBSCRIPTION;
  }
  const testScreenSize = () =>
    window.innerWidth < SCREEN_SIZE_NOTICE_MAX_WIDTH || window.innerHeight < SCREEN_SIZE_NOTICE_MAX_HEIGHT;
  const afterClosed$ = fromEvent(window, 'resize').pipe(
    throttleTime(50),
    startWith({}),
    filter(testScreenSize),
    take(1),
    map(() => {
      return dialog.open(ScreenSizeNoticeComponent, {
        panelClass: 'screen-size-notice-panel',
        width: '456px',
        disableClose: true,
        closeOnNavigation: false,
      });
    }),
    map((ref) => ref.afterClosed()),
    switchAll(),
  );

  return afterClosed$.subscribe(() => {
    localStorage.setItem(DEFAULT_SCREEN_SIZE_NOTICE_STORAGE_KEY, 'true');
  });
}

/** Valid values for side. */
export type Side = 'left' | 'right' | 'anterior' | 'posterior' | '3D';

/**
 * App component
 */
@Component({
  selector: 'ccf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy, OnInit {
  /** False until the initial registration modal is closed */
  registrationStarted = false;

  /** Disables changes in block position */
  disablePositionChange = false;

  registrationExpanded = false;

  get isLightTheme(): boolean {
    return this.theming.getTheme().endsWith('light');
  }

  readonly theme$ = this.globalConfig.getOption('theme');
  readonly themeMode$ = new ReplaySubject<'light' | 'dark'>(1);

  readonly header$ = this.globalConfig.getOption('header');
  readonly homeUrl$ = this.globalConfig.getOption('homeUrl');
  readonly logoTooltip$ = this.globalConfig.getOption('logoTooltip');

  readonly view$ = this.globalConfig.getOption('view');
  readonly viewSide$ = this.globalConfig.getOption('viewSide');

  theme!: string;

  homeUrl!: string;

  logoTooltip!: string;

  /** Input that allows changing the current side from outside the component */
  @Input() side: Side = 'anterior';

  /** Input that allows toggling of 3D view on / off from outside the component */
  @Input() view3D = false;

  /** All subscriptions managed by the container. */
  private readonly subscriptions = new Subscription();

  constructor(
    readonly model: ModelState,
    readonly page: PageState,
    readonly consentService: ConsentService,
    readonly snackbar: MatSnackBar,
    readonly theming: ThemingService,
    public dialog: MatDialog,
    el: ElementRef<unknown>,
    injector: Injector,
    private readonly globalConfig: GlobalConfigState<AppOptions>,
    cdr: ChangeDetectorRef,
    private readonly ga: GoogleAnalyticsService,
    readonly registration: RegistrationState,
  ) {
    theming.initialize(el, injector);
    this.subscriptions.add(
      page.registrationStarted$.subscribe((registrationStarted) => {
        this.registrationStarted = registrationStarted;
      }),
    );
    this.theme$.subscribe((theme) => {
      this.theme = theme ?? 'light';
    });
    this.globalConfig.getOption('homeUrl').subscribe((url) => {
      this.homeUrl = url ?? '';
    });
    this.globalConfig.getOption('logoTooltip').subscribe((tooltip) => {
      this.logoTooltip = tooltip ?? '';
    });

    combineLatest([this.theme$, this.themeMode$]).subscribe(([theme, mode]) => {
      this.theming.setTheme(`${theme}-theme-${mode}`);
      cdr.markForCheck();
    });

    combineLatest([this.view$, this.viewSide$]).subscribe(([view, viewSide]) => {
      this.model.setViewType(view ?? 'register');
      this.model.setViewSide(viewSide ?? 'anterior');
      cdr.markForCheck();
    });
  }

  ngOnInit(): void {
    const snackBar = this.snackbar.openFromComponent(TrackingPopupComponent, {
      data: {
        preClose: () => {
          snackBar.dismiss();
        },
      },

      duration: this.consentService.consent === 'not-set' ? Infinity : 3000,
      panelClass: 'usage-snackbar',
    });

    const snackbarContainer = window.document.querySelector<HTMLElement>('.usage-snackbar');

    if (snackbarContainer && snackbarContainer.parentNode && snackbarContainer.parentNode.parentNode) {
      (snackbarContainer.parentNode.parentNode as unknown as HTMLElement).style.zIndex = '1001';
    }

    this.themeMode$.next('light');

    this.theming.setTheme(`${this.theme}-theme-light`);
  }

  /**
   * Toggles scheme between light and dark mode
   */
  toggleScheme(): void {
    this.themeMode$.next(this.isLightTheme ? 'dark' : 'light');
  }

  registrationToggle(event: boolean): void {
    this.registrationExpanded = event;
    if (!this.registrationExpanded) {
      this.disablePositionChange = false;
    }
  }

  /**
   * Shifts block position when certain keys are pressed
   *
   * @param target The keyboard event
   */
  @HostListener('document:keydown', ['$event'])
  handleKey(target: KeyboardEvent): void {
    const oldPosition = this.model.snapshot.position;
    if (this.disablePositionChange || !this.registrationStarted) {
      return;
    }
    target.preventDefault();
    const delta = target.repeat ? 1.0 : 0.5;
    let newPosition = oldPosition;
    switch (target.key) {
      case 'q':
        newPosition = { ...oldPosition, z: oldPosition.z + delta };
        break;
      case 'e':
        newPosition = { ...oldPosition, z: oldPosition.z - delta };
        break;
      case 'w':
        newPosition = { ...oldPosition, y: oldPosition.y + delta };
        break;
      case 's':
        newPosition = { ...oldPosition, y: oldPosition.y - delta };
        break;
      case 'a':
        newPosition = { ...oldPosition, x: oldPosition.x - delta };
        break;
      case 'd':
        newPosition = { ...oldPosition, x: oldPosition.x + delta };
        break;
      default:
        break;
    }
    this.model.setPosition(newPosition);
  }

  /**
   * Disables block position change if an input element is clicked
   *
   * @param target The element clicked
   */
  @HostListener('document:mousedown', ['$event.target'])
  handleClick(target: HTMLElement): void {
    const disableWhenClicked = ['mat-mdc-input-element', 'form-input-label'];
    for (const className of disableWhenClicked) {
      if (typeof target.className === 'string' && target.className.includes(className)) {
        this.disablePositionChange = true;
        return;
      }
    }
    this.disablePositionChange = false;
  }

  /**
   * Cleans up all subscriptions.
   */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  updateSide(selection: Side): void {
    this.ga.event('side_update', 'stage_nav', selection);

    if (selection === '3D') {
      this.updateView(true);
    } else {
      this.updateView(false);
      this.side = selection;
      this.model.setViewSide(selection);
    }
  }

  /**
   * Handles updating of the boolean that keeps track of current view
   * and calling the event emitter.
   *
   * @param selection 3D (true) or Register (false)
   */
  updateView(selection: boolean): void {
    this.view3D = selection;
    this.ga.event('view_update', 'stage_nav', selection ? '3D' : 'Register');
    this.model.setViewType(selection ? '3d' : 'register');
  }

  resetStage(): void {
    if (this.registration.snapshot.initialRegistration) {
      this.registration.setToInitialRegistration();
    } else {
      this.model.setOrganDefaults();
    }
    this.model.setViewSide('anterior');
    this.model.setViewType('register');
  }
}
