import { Injectable, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';

/** State of consent */
export type Consent = 'not-set' | 'given' | 'rescinded';

/** Manages the users tracking consent */
@Injectable()
export class ConsentService implements OnDestroy {
  /** Current state */
  consent: Consent = 'not-set';

  /** Subject that emits whenever the consent changes */
  readonly consentChange = new ReplaySubject<Consent>(1);

  /** Initializes the consent service */
  constructor() {
    this.consentChange.next(this.consent);
  }

  /** Cleans up the service */
  ngOnDestroy(): void {
    this.consentChange.complete();
  }

  /**
   * Update the user tracking consent
   *
   * @param value New consent value
   */
  setConsent(value: Consent): void {
    if (this.consent !== value) {
      this.consent = value;
      this.consentChange.next(value);
    }
  }

  /** Reset the consent state */
  unsetConsent(): void {
    this.setConsent('not-set');
  }
}
