import { Injectable, OnDestroy, inject } from '@angular/core';
import { NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN, NGX_WINDOW } from 'ngx-google-analytics';
import { Subscription } from 'rxjs';

import { ConsentService } from './consent.service';

@Injectable()
export class GoogleAnalyticsSyncService implements OnDestroy {
  private readonly window = inject<Record<string, boolean> | null>(NGX_WINDOW);

  private readonly token: string;
  private readonly subscriptions = new Subscription();

  constructor() {
    const consentService = inject(ConsentService);

    this.token = inject(NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN).trackingCode;

    this.subscriptions.add(
      consentService.consentChange.subscribe((consent) => this.toggleGoogleAnalytics(consent === 'rescinded')),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private toggleGoogleAnalytics(disabled: boolean): void {
    if (this.window) {
      this.window[`ga-disable-${this.token}`] = disabled;
    }
  }
}
