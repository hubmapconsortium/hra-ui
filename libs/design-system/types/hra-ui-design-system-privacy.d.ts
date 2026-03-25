import { PrivacyPreferencesTab } from '@hra-ui/design-system/privacy/privacy-preferences';
import * as i0 from '@angular/core';

/** Service for managing privacy preferences and consent banner */
declare class PrivacyPreferencesService {
    /** Reference to Angular Material dialog service */
    private readonly dialog;
    /** Reference to consent service */
    private readonly consent;
    /** Scroll strategy that repositions the dialog on scroll */
    private readonly repositionScrollStrategy;
    /** Whether to sync preferences to local storage */
    private readonly syncEnabled;
    /** Constructor */
    constructor();
    /** Launch the privacy preferences workflow */
    launch(): void;
    /** Check whether privacy preferences are stored in local storage */
    hasPrivacyPreferences(): boolean;
    /** Retrieve privacy preferences from local storage */
    getPrivacyPreferences(): Record<string, boolean>;
    /** Enable syncing of preferences to local storage */
    enableSync(): void;
    /** Open the consent banner dialog */
    openConsentBanner(): void;
    /** Open the privacy preferences dialog */
    openPrivacyPreferences(tab?: PrivacyPreferencesTab): void;
    /** Check whether a privacy-related dialog is currently open */
    private hasActiveDialog;
    private handleDialogResult;
    static ɵfac: i0.ɵɵFactoryDeclaration<PrivacyPreferencesService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PrivacyPreferencesService>;
}

export { PrivacyPreferencesService };
