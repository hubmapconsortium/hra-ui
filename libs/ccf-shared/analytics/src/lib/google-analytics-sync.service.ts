import { Injectable, OnDestroy, inject } from '@angular/core';
import { NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN, NGX_WINDOW } from 'ngx-google-analytics';
import { Subscription } from 'rxjs';
import { ConsentService } from './consent.service';

/** Syncs analytics with the current user tracking consent */
@Injectable()
export class GoogleAnalyticsSyncService implements OnDestroy {
  /** Reference to window */
  private readonly window = inject<Record<string, boolean> | null>(NGX_WINDOW);

  /** Analytics tracking token */
  private readonly token = inject(NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN).trackingCode;
  /** Subscriptions */
  private readonly subscriptions = new Subscription();

  /** Initializes the service */
  constructor() {
    const consentService = inject(ConsentService);
    this.subscriptions.add(
      consentService.consentChange.subscribe((consent) => this.toggleGoogleAnalytics(consent === 'rescinded')),
    );
  }

  /** Cleans up the service */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /**
   * Toggles whether analytics is enabled/disabled
   *
   * @param disabled Whether analytics should be disabled
   */
  private toggleGoogleAnalytics(disabled: boolean): void {
    if (this.window) {
      this.window[`ga-disable-${this.token}`] = disabled;
    }
  }
}
