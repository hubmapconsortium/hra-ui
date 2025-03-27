import { Injectable, InjectionToken, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Consent, ConsentService } from './consent.service';

/** Local storage key used to store the user consent */
export const LOCAL_STORAGE_CONSENT_KEY = new InjectionToken('Key under which consent is stored', {
  providedIn: 'root',
  factory: () => 'ALLOW_TELEMETRY',
});

/** Syncs the user tracking consent from/to the local storage */
@Injectable()
export class LocalStorageSyncService implements OnDestroy {
  /** Local storage key */
  private readonly key = inject(LOCAL_STORAGE_CONSENT_KEY);

  /** Reference to local storage */
  private readonly storage?: typeof localStorage = undefined;
  /** Subscriptions */
  private readonly subscriptions = new Subscription();

  /** Initializes the service */
  constructor() {
    const consentService = inject(ConsentService);

    try {
      this.storage = localStorage;
    } catch {
      /* Ignored */
    }

    consentService.setConsent(this.loadConsent());
    this.subscriptions.add(consentService.consentChange.subscribe((consent) => this.saveConsent(consent)));
  }

  /** Cleans up the service */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /** Loads consent from local storage */
  private loadConsent(): Consent {
    const rawValue = this.storage?.getItem?.(this.key);
    if (rawValue == null) {
      return 'not-set';
    }

    const value = rawValue.trim().toLowerCase();
    switch (value) {
      case 'given': /* fallthrough */
      case 'rescinded':
        return value;
      default:
        return 'not-set';
    }
  }

  /** Stores consent in local storage */
  private saveConsent(value: Consent): void {
    this.storage?.setItem?.(this.key, value);
  }
}
