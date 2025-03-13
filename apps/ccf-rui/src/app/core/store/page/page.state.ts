import { Computed, DataAction, StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsImmutableDataRepository } from '@angular-ru/ngxs/repositories';
import { Injectable, inject } from '@angular/core';
import { State } from '@ngxs/store';
import { iif, patch } from '@ngxs/store/operators';
import { GlobalConfigState, OrganInfo } from 'ccf-shared';
import { pluckUnique } from 'ccf-shared/rxjs-ext/operators';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, tap, withLatestFrom } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { normalizeOrcid } from '../../../shared/utils/orcid';
import { GlobalConfig } from '../../services/config/config';
import { RegistrationState } from '../registration/registration.state';

/** A record with information about a single person */
export interface Person {
  /** First name */
  firstName: string;
  /** Middle name */
  middleName?: string;
  /** Last name */
  lastName: string;
  /** Email */
  email?: string;
  /** Orcid id */
  orcidId?: string;
}

/** Page state model */
export interface PageStateModel {
  /** Active user */
  user: Person;
  /** Whether or not the initial registration modal has been closed */
  registrationStarted: boolean;
  /** Whether to use the registration callback */
  useCancelRegistrationCallback: boolean;
  /** Whether to the registration callback is set */
  registrationCallbackSet: boolean;
  /** Whether to skip confirmation */
  skipConfirmation: boolean;
  /** If there are any changes */
  hasChanges: boolean;
  /** Organ options */
  organOptions?: OrganInfo[];
  /** Whether the orcid is valid */
  orcidValid: boolean;
}

/**
 * General page global state
 */
@StateRepository()
@State<PageStateModel>({
  name: 'page',
  defaults: {
    user: {
      firstName: '',
      lastName: '',
    },
    registrationStarted: false,
    useCancelRegistrationCallback: false,
    registrationCallbackSet: false,
    skipConfirmation: true,
    hasChanges: false,
    organOptions: [],
    orcidValid: false,
  },
})
@Injectable()
export class PageState extends NgxsImmutableDataRepository<PageStateModel> {
  /** Global config */
  private readonly globalConfig = inject<GlobalConfigState<GlobalConfig>>(GlobalConfigState);
  /** Registration state */
  private readonly reg = inject(RegistrationState);

  /** Active user observable */
  readonly user$ = this.state$.pipe(map((x) => x?.user));
  /** registrationStarted observable */
  readonly registrationStarted$ = this.state$.pipe(pluckUnique('registrationStarted'));
  /** Whether to use the registration callback */
  readonly useCancelRegistrationCallback$ = this.state$.pipe(map((x) => x?.useCancelRegistrationCallback));
  /** Whether to the registration callback is set */
  readonly registrationCallbackSet$ = this.state$.pipe(map((x) => x?.registrationCallbackSet));
  /** Organ options */
  readonly organOptions$ = this.state$.pipe(map((x) => x?.organOptions));
  /** Whether the orcid is valid */
  readonly orcidValid$ = this.state$.pipe(map((x) => x?.orcidValid));

  /** Whether to skip confirmation */
  @Computed()
  get skipConfirmation$(): Observable<boolean> {
    return this.state$.pipe(pluckUnique('skipConfirmation'));
  }

  /** Whether to skip confirmation */
  @Computed()
  get globalSkipConfirmation$(): Observable<boolean> {
    return this.globalConfig.getOption('skipUnsavedChangesConfirmation').pipe(
      map((value) => value ?? environment.skipUnsavedChangesConfirmation),
      distinctUntilChanged(),
    );
  }

  /** If there are any changes */
  @Computed()
  get hasChanges$(): Observable<boolean> {
    return this.state$.pipe(pluckUnique('hasChanges'));
  }

  /**
   * Initializes this service.
   */
  override ngxsOnInit(): void {
    super.ngxsOnInit();

    combineLatest([this.reg.state$, this.globalConfig.config$])
      .pipe(
        tap(([reg, config]) => {
          this.setState(
            patch({
              registrationCallbackSet: reg.useRegistrationCallback ? !!config.register : false,
              useCancelRegistrationCallback: !!config.cancelRegistration,
              user: iif(!!config.user, config.user ?? { firstName: '', lastName: '', email: '' }),
              registrationStarted: (config.user ?? reg.initialRegistration) ? true : undefined,
            }),
          );
        }),
      )
      .subscribe();

    this.initSkipConfirmationListeners();
  }

  /** Cancel registration */
  cancelRegistration(): void {
    const {
      globalConfig: {
        snapshot: { cancelRegistration: cancelRegistrationCallback },
      },
      snapshot: { useCancelRegistrationCallback, skipConfirmation },
    } = this;

    if (useCancelRegistrationCallback) {
      // eslint-disable-next-line no-alert
      if (skipConfirmation || confirm('Changes you made may not be saved.')) {
        cancelRegistrationCallback?.();
      }
    }
  }

  /** Set whether to use cancel registration */
  @DataAction()
  setUseCancelRegistrationCallback(use: boolean): void {
    this.ctx.patchState({ useCancelRegistrationCallback: use });
  }

  /**
   * Sets the name of the active user.
   *
   * @param name The first and last name
   */
  @DataAction()
  setUserName(name: Pick<Person, 'firstName' | 'middleName' | 'lastName'>): void {
    this.ctx.setState(
      patch({
        user: patch({
          firstName: name.firstName,
          lastName: name.lastName,
          middleName: name.middleName !== '' ? name.middleName : undefined,
        }),
      }),
    );
  }

  /**
   * Saves ORCID id as URI
   * Sets orcidValid to true if blank, otherwise set to true if valid
   * @param id ORCID id
   */
  @DataAction()
  setOrcidId(id?: string): void {
    const orcidId = id && normalizeOrcid(id);
    const orcidValid = id === undefined || orcidId !== undefined;
    this.ctx.setState(
      patch({
        user: patch({ orcidId }),
        orcidValid,
      }),
    );
  }

  /** Set the user email */
  @DataAction()
  setEmail(email?: string): void {
    this.ctx.setState(
      patch({
        user: patch({
          email,
        }),
      }),
    );
  }

  /**
   * Sets registrationStarted to true (when initial registration modal is closed)
   */
  @DataAction()
  registrationStarted(): void {
    this.ctx.setState(
      patch({
        registrationStarted: true,
      }),
    );
  }

  /** Mark that there are unsaved changes */
  @DataAction()
  setHasChanges(): void {
    const {
      snapshot: { registrationStarted, hasChanges },
    } = this;
    if (registrationStarted && !hasChanges) {
      this.ctx.patchState({
        hasChanges: true,
      });
    }
  }

  /** Clears unsaved changes */
  @DataAction()
  clearHasChanges(): void {
    this.ctx.patchState({
      hasChanges: false,
    });
  }

  /** Add confirmation listeners */
  private initSkipConfirmationListeners(): void {
    const updateSkipConfirmation = (skipConfirmation: boolean) => this.patchState({ skipConfirmation });

    this.globalSkipConfirmation$.pipe(filter((s) => s)).subscribe(updateSkipConfirmation);

    this.hasChanges$
      .pipe(
        withLatestFrom(this.globalSkipConfirmation$),
        map(([hasChanges, skipConfirmation]) => skipConfirmation || !hasChanges),
        distinctUntilChanged(),
      )
      .subscribe(updateSkipConfirmation);

    const beforeUnloadListener = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = 'Changes you made may not be saved.';
      return event.returnValue;
    };

    this.skipConfirmation$.subscribe((skipConfirmation) => {
      if (skipConfirmation) {
        removeEventListener('beforeunload', beforeUnloadListener);
      } else {
        addEventListener('beforeunload', beforeUnloadListener);
      }
    });
  }

  /**
   * Converts orcid URI to a regular orcid value
   * @param uri orcid uri
   * @returns orcid id
   */
  uriToOrcid(uri?: string): string {
    return uri ? uri.split('/').slice(-1)[0] : '';
  }
}
