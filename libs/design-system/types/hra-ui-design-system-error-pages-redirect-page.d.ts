import * as i0 from '@angular/core';

/**
 * Redirect Page Component
 * - Displays a loading page with an indeterminate progress spinner while redirecting
 */
declare class RedirectPageComponent {
    /** URL that the user is being redirected to */
    readonly redirectUrl: i0.InputSignal<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RedirectPageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RedirectPageComponent, "hra-redirect-page", never, { "redirectUrl": { "alias": "redirectUrl"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

export { RedirectPageComponent };
