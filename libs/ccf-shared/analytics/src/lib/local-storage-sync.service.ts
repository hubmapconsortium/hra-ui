import { Injectable, InjectionToken, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';

import { Consent, ConsentService } from './consent.service';

export const LOCAL_STORAGE_CONSENT_KEY = new InjectionToken('Key under which consent is stored', {
  providedIn: 'root',
  factory: () => 'ALLOW_TELEMETRY',
});

@Injectable()
export class LocalStorageSyncService implements OnDestroy {
  private readonly key = inject(LOCAL_STORAGE_CONSENT_KEY);

  private readonly storage?: typeof localStorage = undefined;
  private readonly subscriptions = new Subscription();

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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

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

  private saveConsent(value: Consent): void {
    this.storage?.setItem?.(this.key, value);
  }
}
