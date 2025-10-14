import * as i0 from '@angular/core';

/** Result of the consent banner */
type ConsentBannerResult = 'allow-all' | 'allow-necessary' | 'customize';
/** Dialog panel class */
declare const CONSENT_BANNER_PANEL_CLASS = "hra-consent-banner-panel";
/** Aria labelledby id of consent banner component */
declare const CONSENT_BANNER_ARIA_LABELLEDBY_ID = "consentBannerDialogTitle";
/** Consent Banner Component */
declare class ConsentBannerComponent {
    /**
     * Aria labelledby id
     */
    readonly ariaLabelledbyId = "consentBannerDialogTitle";
    static ɵfac: i0.ɵɵFactoryDeclaration<ConsentBannerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConsentBannerComponent, "hra-consent-banner", never, {}, {}, never, never, true, never>;
}

export { CONSENT_BANNER_ARIA_LABELLEDBY_ID, CONSENT_BANNER_PANEL_CLASS, ConsentBannerComponent };
export type { ConsentBannerResult };
