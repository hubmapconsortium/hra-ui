import * as _angular_core from '@angular/core';

/**
 * Section link for navigation
 */
declare class SectionLinkComponent {
    /** Anchor for href */
    readonly anchor: _angular_core.InputSignal<string | undefined>;
    /** Whether to display the underline */
    readonly underlined: _angular_core.InputSignalWithTransform<boolean, unknown>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<SectionLinkComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<SectionLinkComponent, "h1[hra-section-link], h2[hra-section-link], h3[hra-section-link],    h4[hra-section-link], h5[hra-section-link], h6[hra-section-link]", never, { "anchor": { "alias": "anchor"; "required": false; "isSignal": true; }; "underlined": { "alias": "underlined"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}

export { SectionLinkComponent };
