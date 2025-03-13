import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalConfigState, TrackingPopupComponent } from 'ccf-shared';
import { ConsentService } from 'ccf-shared/analytics';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { combineLatest, Subscription } from 'rxjs';

import { GlobalConfig } from './core/services/config/config';
import { ModelState, ViewSide, ViewType } from './core/store/model/model.state';
import { PageState } from './core/store/page/page.state';
import { RegistrationState } from './core/store/registration/registration.state';
import { MetadataService } from './modules/metadata/metadata.service';
import { openScreenSizeNotice } from './modules/screen-size-notice/screen-size-notice.component';

/** Represents a user with a first and last name. */
export interface User {
  /** First name */
  firstName: string;
  /** Last name */
  lastName: string;
}

/** Configuration options for the application. */
interface AppOptions extends GlobalConfig {
  /** Home url */
  homeUrl?: string;
  /** Logo tooltip */
  logoTooltip?: string;
  /** View type */
  view?: ViewType;
  /** View side */
  viewSide?: ViewSide;
}

/** Valid values for side of the view. */
export type Side = 'left' | 'right' | 'anterior' | 'posterior' | '3D';

/**
 * The main application component.
 */
@Component({
  selector: 'ccf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'hra-app',
    '[class.embedded]': 'embedded()',
    '(document:mousedown)': 'handleClick($event.target)',
  },
  standalone: false,
})
export class AppComponent implements OnDestroy, OnInit {
  /** Model state */
  readonly model = inject(ModelState);
  /** Page state */
  readonly page = inject(PageState);
  /** Registration state */
  readonly registration = inject(RegistrationState);
  /** Consent service */
  readonly consentService = inject(ConsentService);
  /** Snackbar service */
  readonly snackbar = inject(MatSnackBar);
  /** Global config */
  private readonly globalConfig = inject<GlobalConfigState<AppOptions>>(GlobalConfigState);
  /** Analytics service */
  private readonly ga = inject(GoogleAnalyticsService);

  /** False until the initial registration modal is closed */
  registrationStarted = false;

  /** Disables changes in block position */
  disablePositionChange = false;

  /** Indicates whether the registration is expanded. */
  registrationExpanded = false;

  /** Preset homeurl */
  readonly homeUrl$ = this.globalConfig.getOption('homeUrl');

  /** Preset view setting */
  readonly view$ = this.globalConfig.getOption('view');

  /** Preset view side */
  readonly viewSide$ = this.globalConfig.getOption('viewSide');

  /** Input that allows changing the current side from outside the component */
  @Input() side: Side = 'anterior';

  /** Input that allows toggling of 3D view on / off from outside the component */
  @Input() view3D = false;

  /** Metadata service */
  private readonly metadata = inject(MetadataService);

  /** Whether to use the embedded app */
  protected readonly embedded = toSignal(this.page.useCancelRegistrationCallback$);

  /** All subscriptions managed by the container. */
  private readonly subscriptions = new Subscription();

  /**
   * Creates an instance of app component.
   */
  constructor() {
    const cdr = inject(ChangeDetectorRef);

    this.subscriptions.add(
      this.page.registrationStarted$.subscribe((registrationStarted) => {
        this.registrationStarted = registrationStarted;
      }),
    );

    combineLatest([this.view$, this.viewSide$]).subscribe(([view, viewSide]) => {
      this.model.setViewType(view ?? 'register');
      this.model.setViewSide(viewSide ?? 'anterior');
      cdr.markForCheck();
    });

    openScreenSizeNotice(inject(MatDialog));
  }

  /**
   * Initializes app: opens snackbar and sets premade options
   */
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
      setTimeout(() => this.metadata.openModal('create'), 20);
    }
  }

  /**
   * Toggles the registration expansion state.
   * @param event The new state of registration expansion.
   */
  registrationToggle(event: boolean): void {
    this.registrationExpanded = event;
    if (!this.registrationExpanded) {
      this.disablePositionChange = false;
    }
  }

  /**
   * Disables block position change if an input element is clicked
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

  /**
   * Updates the side view.
   * @param selection The selected side.
   */
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

  /**
   * Resets the stage to its initial state.
   */
  resetStage(): void {
    this.resetMetadata();
    this.resetCamera();
  }

  /**
   * Resets the camera to the default view.
   */
  resetCamera(): void {
    this.model.setViewSide('anterior');
    this.model.setViewType('register');
  }

  /**
   * Resets the metadata to the default state.
   */
  resetMetadata(): void {
    if (this.registration.snapshot.initialRegistration) {
      this.registration.setToInitialRegistration();
    } else {
      this.model.setOrganDefaults();
    }
  }

  /**
   * Resets the block position to the default state.
   */
  resetBlock(): void {
    if (this.registration.snapshot.initialRegistration) {
      this.registration.resetPosition();
    } else {
      this.model.setDefaultPosition();
    }
  }
}
