import { Injectable, effect, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConsentService } from '@hra-ui/common/analytics';
import {
  CONSENT_BANNER_ARIA_LABELLEDBY_ID,
  ConsentBannerComponent,
  ConsentBannerResult,
} from '@hra-ui/design-system/privacy/consent-banner';
import store from 'store2';

const PRIVACY_PREFERENCES_STORAGE_KEY = '__hra-analytics-privacy-preferences';
const CONSENT_BANNER_DIALOG_ID = 'consentBannerDialog';
const PRIVACY_PREFERENCES_DIALOG_ID = 'privacyPreferencesDialog';

/** Service for managing privacy preferences and consent banner */
@Injectable({
  providedIn: 'root',
})
export class PrivacyPreferencesService {
  private readonly dialog = inject(MatDialog);
  private readonly consent = inject(ConsentService);
  private readonly syncEnabled = signal(false);

  constructor() {
    effect(() => {
      if (this.syncEnabled()) {
        const categories = this.consent.categories();
        store.local.set(PRIVACY_PREFERENCES_STORAGE_KEY, categories);
      }
    });
  }

  launch(): void {
    if (this.hasPrivacyPreferences()) {
      this.consent.updateCategories(this.getPrivacyPreferences());
      this.enableSync();
    } else {
      this.openConsentBanner();
    }
  }

  hasPrivacyPreferences(): boolean {
    return store.local.has(PRIVACY_PREFERENCES_STORAGE_KEY);
  }

  getPrivacyPreferences(): Record<string, boolean> {
    return store.local.get(PRIVACY_PREFERENCES_STORAGE_KEY) ?? {};
  }

  enableSync(): void {
    this.syncEnabled.set(true);
  }

  openConsentBanner(): void {
    if (this.hasActiveDialog()) {
      return;
    }

    const ref = this.dialog.open<ConsentBannerComponent, never, ConsentBannerResult>(ConsentBannerComponent, {
      ariaLabelledBy: CONSENT_BANNER_ARIA_LABELLEDBY_ID,
      // ariaModal: true, ??
      closeOnNavigation: false,
      disableClose: true,
      hasBackdrop: false,
      id: CONSENT_BANNER_DIALOG_ID,
      position: {
        bottom: '0px',
        left: '0px',
        right: '0px',
      },
    });

    ref.afterClosed().subscribe((result) => this.handleConsentBannerResult(result));
  }

  openPrivacyPreferences(): void {
    if (this.hasActiveDialog()) {
      return;
    }

    // TODO
  }

  private hasActiveDialog(): boolean {
    const ids = [CONSENT_BANNER_DIALOG_ID, PRIVACY_PREFERENCES_DIALOG_ID];
    return ids.some((id) => this.dialog.getDialogById(id) !== undefined);
  }

  private handleConsentBannerResult(result: ConsentBannerResult = 'allow-necessary'): void {
    switch (result) {
      case 'customize':
        this.openPrivacyPreferences();
        break;

      case 'allow-all':
        this.consent.enableAllCategories();
        this.enableSync();
        break;

      case 'allow-necessary':
        this.consent.disableAllCategories();
        this.enableSync();
        break;
    }
  }
}
