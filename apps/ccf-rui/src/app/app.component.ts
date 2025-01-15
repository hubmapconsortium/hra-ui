import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
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
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { GlobalConfig } from './core/services/config/config';
import { ThemingService } from './core/services/theming/theming.service';
import { ModelState, ViewSide, ViewType } from './core/store/model/model.state';
import { PageState } from './core/store/page/page.state';
import { RegistrationState } from './core/store/registration/registration.state';
import { MetadataService } from './modules/metadata/metadata.service';
import { openScreenSizeNotice } from './modules/screen-size-notice/screen-size-notice.component';
import { toSignal } from '@angular/core/rxjs-interop';

export interface User {
  firstName: string;
  lastName: string;
}

interface AppOptions extends GlobalConfig {
  theme?: string;
  homeUrl?: string;
  logoTooltip?: string;
  view?: ViewType;
  viewSide?: ViewSide;
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
  host: {
    '[class.embedded]': 'embedded()',
    '(document:mousedown)': 'handleClick($event.target)',
  },
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
  readonly themeMode$ = new BehaviorSubject<'light' | 'dark'>('light');

  readonly homeUrl$ = this.globalConfig.getOption('homeUrl');

  readonly view$ = this.globalConfig.getOption('view');
  readonly viewSide$ = this.globalConfig.getOption('viewSide');

  /** Input that allows changing the current side from outside the component */
  @Input() side: Side = 'anterior';

  /** Input that allows toggling of 3D view on / off from outside the component */
  @Input() view3D = false;

  private readonly metadata = inject(MetadataService);

  protected readonly embedded = toSignal(inject(PageState).useCancelRegistrationCallback$);

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

    combineLatest([this.theme$, this.themeMode$]).subscribe(([theme, mode]) => {
      this.theming.setTheme(`${theme}-theme-${mode}`);
      cdr.markForCheck();
    });

    combineLatest([this.view$, this.viewSide$]).subscribe(([view, viewSide]) => {
      this.model.setViewType(view ?? 'register');
      this.model.setViewSide(viewSide ?? 'anterior');
      cdr.markForCheck();
    });

    openScreenSizeNotice(dialog);
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

    const { editRegistration, user, organ } = this.globalConfig.snapshot;
    if (!editRegistration && (!user || !organ)) {
      this.metadata.openModal('create');
    }
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
   * Disables block position change if an input element is clicked
   *
   * @param target The element clicked
   */
  handleClick(target: HTMLElement): void {
    const disableWhenClicked = ['mat-mdc-input-element', 'mat-mdc-form-field', 'form-input-label'];
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
    this.resetMetadata();
    this.resetCamera();
  }

  resetCamera(): void {
    this.model.setViewSide('anterior');
    this.model.setViewType('register');
  }

  resetMetadata(): void {
    if (this.registration.snapshot.initialRegistration) {
      this.registration.setToInitialRegistration();
    } else {
      this.model.setOrganDefaults();
    }
  }

  resetBlock(): void {
    if (this.registration.snapshot.initialRegistration) {
      this.registration.resetPosition();
    } else {
      this.model.setDefaultPosition();
    }
  }
}
