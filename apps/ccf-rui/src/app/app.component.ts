import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseApplicationComponent } from '@hra-ui/application';
import { GlobalConfigState } from 'ccf-shared';
import { combineLatest, Subscription } from 'rxjs';

import { GlobalConfig } from './core/services/config/config';
import { ModelState, ViewSide, ViewType } from './core/store/model/model.state';
import { PageState } from './core/store/page/page.state';
import { RegistrationState } from './core/store/registration/registration.state';
import { MetadataService } from './modules/metadata/metadata.service';

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
export type Side = 'left' | 'right' | 'anterior' | 'posterior';

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
export class AppComponent extends BaseApplicationComponent implements OnDestroy, OnInit {
  /** Model state */
  readonly model = inject(ModelState);
  /** Page state */
  readonly page = inject(PageState);
  /** Registration state */
  readonly registration = inject(RegistrationState);
  /** Snackbar service */
  readonly snackbar = inject(MatSnackBar);
  /** Metadata service */
  readonly metadata = inject(MetadataService);
  /** Global config */
  private readonly globalConfig = inject<GlobalConfigState<AppOptions>>(GlobalConfigState);

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

  /** Whether to use the embedded app */
  protected readonly embedded = toSignal(this.page.useCancelRegistrationCallback$);

  /** The current view side */
  protected readonly viewSide = toSignal(this.model.viewSide$);

  /** The current view type, either 'register' or 'preview', default is register */
  protected readonly viewType = toSignal(this.model.viewType$, { initialValue: 'register' });

  /** Whether the organ axis is hidden */
  protected readonly disableOrganAxis = toSignal(this.model.disableOrganAxis$, { initialValue: false });

  /** All subscriptions managed by the container. */
  private readonly subscriptions = new Subscription();

  /**
   * Creates an instance of app component.
   */
  constructor() {
    super();

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
  }

  /**
   * Initializes app: opens snackbar and sets premade options
   */
  ngOnInit(): void {
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
    this.updateView('register');
    this.model.setViewSide(selection);
  }

  /**
   * Handles updating of the boolean that keeps track of current view
   * and calling the event emitter.
   *
   * @param selection 3D (true) or Register (false)
   */
  updateView(type: ViewType): void {
    this.model.setViewType(type);
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
