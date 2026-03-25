import * as i0 from '@angular/core';

/**
 * Redirect Page Component
 * - Displays a loading page with an indeterminate progress spinner while redirecting
 */
declare class ArchivedPageComponent {
    /** Path of the archived page that the user is requesting */
    readonly archivedPath: i0.InputSignal<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ArchivedPageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ArchivedPageComponent, "hra-archived-page", never, { "archivedPath": { "alias": "archivedPath"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

export { ArchivedPageComponent };
