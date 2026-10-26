import * as i0 from '@angular/core';

/**
 * Server Error Page Component
 * - Displays a 500 error page when there is an internal server error.
 */
declare class ServerErrorPageComponent {
    /** External link for the report issue CTA, such as the issue tracker. It opens in a new tab. */
    readonly reportIssueLink: i0.InputSignal<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ServerErrorPageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ServerErrorPageComponent, "hra-server-error-page", never, { "reportIssueLink": { "alias": "reportIssueLink"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

export { ServerErrorPageComponent };
