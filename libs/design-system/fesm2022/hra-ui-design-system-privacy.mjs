import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import * as i0 from '@angular/core';
import { inject, signal, effect, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConsentService } from '@hra-ui/common/analytics';
import { ConsentBannerComponent, CONSENT_BANNER_PANEL_CLASS, CONSENT_BANNER_ARIA_LABELLEDBY_ID } from '@hra-ui/design-system/privacy/consent-banner';
import { PrivacyPreferencesComponent } from '@hra-ui/design-system/privacy/privacy-preferences';
import store from 'store2';

/** Key used to store privacy preferences in local storage */
const PRIVACY_PREFERENCES_STORAGE_KEY = '__hra-analytics-privacy-preferences';
/** ID for the consent banner dialog */
const CONSENT_BANNER_DIALOG_ID = 'consentBannerDialog';
/** ID for the privacy preferences dialog */
const PRIVACY_PREFERENCES_DIALOG_ID = 'privacyPreferencesDialog';
/** Service for managing privacy preferences and consent banner */
class PrivacyPreferencesService {
    /** Reference to Angular Material dialog service */
    dialog = inject(MatDialog);
    /** Reference to consent service */
    consent = inject(ConsentService);
    /** Scroll strategy that repositions the dialog on scroll */
    repositionScrollStrategy = inject(ScrollStrategyOptions).reposition();
    /** Whether to sync preferences to local storage */
    syncEnabled = signal(false, ...(ngDevMode ? [{ debugName: "syncEnabled" }] : []));
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
    launch() {
        if (this.hasPrivacyPreferences()) {
            this.consent.updateCategories(this.getPrivacyPreferences());
            this.enableSync();
        }
        else {
            this.openConsentBanner();
        }
    }
    /** Check whether privacy preferences are stored in local storage */
    hasPrivacyPreferences() {
        return store.local.has(PRIVACY_PREFERENCES_STORAGE_KEY);
    }
    /** Retrieve privacy preferences from local storage */
    getPrivacyPreferences() {
        return store.local.get(PRIVACY_PREFERENCES_STORAGE_KEY) ?? {};
    }
    /** Enable syncing of preferences to local storage */
    enableSync() {
        this.syncEnabled.set(true);
    }
    /** Open the consent banner dialog */
    openConsentBanner() {
        if (this.hasActiveDialog()) {
            return;
        }
        const ref = this.dialog.open(ConsentBannerComponent, {
            ariaLabelledBy: CONSENT_BANNER_ARIA_LABELLEDBY_ID,
            autoFocus: false,
            closeOnNavigation: false,
            disableClose: true,
            hasBackdrop: false,
            id: CONSENT_BANNER_DIALOG_ID,
            panelClass: CONSENT_BANNER_PANEL_CLASS,
            minWidth: '100%',
            position: {
                bottom: '0px',
                left: '0px',
                right: '0px',
            },
            scrollStrategy: this.repositionScrollStrategy,
        });
        ref.afterClosed().subscribe((result) => this.handleDialogResult(result));
    }
    /** Open the privacy preferences dialog */
    openPrivacyPreferences(tab) {
        if (this.hasActiveDialog()) {
            return;
        }
        const ref = this.dialog.open(PrivacyPreferencesComponent, {
            ariaLabel: 'Manage privacy preferences',
            ariaModal: true,
            autoFocus: true,
            closeOnNavigation: false,
            data: {
                categories: this.consent.categories(),
                tab,
            },
            hasBackdrop: true,
            id: PRIVACY_PREFERENCES_DIALOG_ID,
            maxWidth: '46.75rem',
            minWidth: '20rem',
            restoreFocus: true,
        });
        ref.afterClosed().subscribe((result) => this.handleDialogResult(result));
    }
    /** Check whether a privacy-related dialog is currently open */
    hasActiveDialog() {
        const ids = [CONSENT_BANNER_DIALOG_ID, PRIVACY_PREFERENCES_DIALOG_ID];
        return ids.some((id) => this.dialog.getDialogById(id) !== undefined);
    }
    handleDialogResult(result = 'dismiss') {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: PrivacyPreferencesService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: PrivacyPreferencesService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: PrivacyPreferencesService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [] });

/**
 * Generated bundle index. Do not edit.
 */

export { PrivacyPreferencesService };
//# sourceMappingURL=hra-ui-design-system-privacy.mjs.map
