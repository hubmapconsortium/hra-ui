import { Overlay, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, effect, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConsentService } from '@hra-ui/common/analytics';
import {
  CONSENT_BANNER_PANEL_CLASS,
  ConsentBannerComponent,
  ConsentBannerResult,
} from '@hra-ui/design-system/privacy/consent-banner';
import {
  PrivacyPreferencesComponent,
  PrivacyPreferencesData,
  PrivacyPreferencesResult,
  PrivacyPreferencesTab,
} from '@hra-ui/design-system/privacy/privacy-preferences';
import store from 'store2';

/** Key used to store privacy preferences in local storage */
const PRIVACY_PREFERENCES_STORAGE_KEY = '__hra-analytics-privacy-preferences';

/** Service for managing privacy preferences and consent banner */
@Injectable({
  providedIn: 'root',
})
export class PrivacyPreferencesService {
  /** Reference to Angular CDK overlay service */
  private readonly overlay = inject(Overlay);
  /** Reference to Angular Material dialog service */
  private readonly dialog = inject(MatDialog);
  /** Reference to consent service */
  private readonly consent = inject(ConsentService);
  /** Scroll strategy that repositions the dialog on scroll */
  private readonly repositionScrollStrategy = inject(ScrollStrategyOptions).reposition();
  /** Whether to sync preferences to local storage */
  private readonly syncEnabled = signal(false);
  /** Whether an active dialog is open */
  private readonly hasActiveDialog = signal(false);

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

    const overlayRef = this.overlay.create({
      disposeOnNavigation: false,
      hasBackdrop: false,
      minWidth: '100%',
      panelClass: CONSENT_BANNER_PANEL_CLASS,
      positionStrategy: this.overlay.position().global().bottom('0').left('0').right('0'),
      scrollStrategy: this.repositionScrollStrategy,
    });
    const portal = new ComponentPortal(ConsentBannerComponent);
    const componentRef = overlayRef.attach(portal);

    componentRef.instance.buttonClick.subscribe((result) => {
      this.handleDialogResult(result);
      overlayRef.dispose();
    });

    this.hasActiveDialog.set(true);
  }

  /** Open the privacy preferences dialog */
  openPrivacyPreferences(tab?: PrivacyPreferencesTab): void {
    if (this.hasActiveDialog()) {
      return;
    }

    const ref = this.dialog.open<PrivacyPreferencesComponent, PrivacyPreferencesData, PrivacyPreferencesResult>(
      PrivacyPreferencesComponent,
      {
        ariaLabel: 'Manage privacy preferences',
        ariaModal: true,
        autoFocus: true,
        closeOnNavigation: false,
        data: {
          categories: this.consent.categories(),
          tab,
        },
        hasBackdrop: true,
        maxWidth: '46.75rem',
        minWidth: '20rem',
        panelClass: 'hra-privacy-preferences-panel',
        restoreFocus: true,
      },
    );

    ref.afterClosed().subscribe((result) => this.handleDialogResult(result));
    this.hasActiveDialog.set(true);
  }

  private handleDialogResult(result: ConsentBannerResult | PrivacyPreferencesResult = 'dismiss'): void {
    this.hasActiveDialog.set(false);

    switch (result) {
      case 'allow-all':
        this.consent.enableAllCategories();
        this.enableSync();
        break;

      case 'allow-necessary':
        this.consent.disableAllCategories();
        this.enableSync();
        break;

      case 'customize':
        this.openPrivacyPreferences('consent');
        break;

      case 'dismiss':
        if (!this.syncEnabled()) {
          this.openConsentBanner();
        }
        break;

      default:
        this.consent.updateCategories(result);
        this.enableSync();
        break;
    }
  }
}
