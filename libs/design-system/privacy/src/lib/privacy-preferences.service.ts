import { Injectable, effect, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConsentService } from '@hra-ui/common/analytics';
import {
  CONSENT_BANNER_ARIA_LABELLEDBY_ID,
  ConsentBannerComponent,
  ConsentBannerResult,
} from '@hra-ui/design-system/privacy/consent-banner';
import store from 'store2';

/** Key used to store privacy preferences in local storage */
const PRIVACY_PREFERENCES_STORAGE_KEY = '__hra-analytics-privacy-preferences';
/** ID for the consent banner dialog */
const CONSENT_BANNER_DIALOG_ID = 'consentBannerDialog';
/** ID for the privacy preferences dialog */
const PRIVACY_PREFERENCES_DIALOG_ID = 'privacyPreferencesDialog';

/** Service for managing privacy preferences and consent banner */
@Injectable({
  providedIn: 'root',
})
export class PrivacyPreferencesService {
  /** Reference to Angular Material dialog service */
  private readonly dialog = inject(MatDialog);
  /** Reference to consent service */
  private readonly consent = inject(ConsentService);
  /** Whether to sync preferences to local storage */
  private readonly syncEnabled = signal(false);

  /** Constructor */
  constructor() {
    effect(() => {
      if (this.syncEnabled()) {
        const categories = this.consent.categories();
        store.local.set(PRIVACY_PREFERENCES_STORAGE_KEY, categories);
      }
    });
  }

  /** Launch the privacy preferences workflow */
  launch(): void {
    if (this.hasPrivacyPreferences()) {
      this.consent.updateCategories(this.getPrivacyPreferences());
      this.enableSync();
    } else {
      this.openConsentBanner();
    }
  }

  /** Check whether privacy preferences are stored in local storage */
  hasPrivacyPreferences(): boolean {
    return store.local.has(PRIVACY_PREFERENCES_STORAGE_KEY);
  }
  /** Retrieve privacy preferences from local storage */
  getPrivacyPreferences(): Record<string, boolean> {
    return store.local.get(PRIVACY_PREFERENCES_STORAGE_KEY) ?? {};
  }
  /** Enable syncing of preferences to local storage */
  enableSync(): void {
    this.syncEnabled.set(true);
  }
  /** Open the consent banner dialog */
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
      autoFocus: false,
    });

    ref.afterClosed().subscribe((result) => this.handleConsentBannerResult(result));
  }
  /** Open the privacy preferences dialog */
  openPrivacyPreferences(): void {
    if (this.hasActiveDialog()) {
      return;
    }

    // TODO
  }
  /** Check whether a privacy-related dialog is currently open */
  private hasActiveDialog(): boolean {
    const ids = [CONSENT_BANNER_DIALOG_ID, PRIVACY_PREFERENCES_DIALOG_ID];
    return ids.some((id) => this.dialog.getDialogById(id) !== undefined);
  }
  /** Handle the result from the consent banner dialog */
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
