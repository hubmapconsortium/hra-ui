import * as i0 from '@angular/core';
import { ContentTemplateDef } from '@hra-ui/cdk/content-template';

/**
 * Copy email button component that copies given email ID to clipboard on click.
 */
declare class CopyEmailButtonComponent {
    /** Email Id */
    readonly emailId: i0.InputSignal<string>;
    /** Snackbar service */
    private readonly snackbar;
    /** Trigerred when user clicks on the Copy button */
    openCopiedSnackbar(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CopyEmailButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CopyEmailButtonComponent, "hra-copy-email-button", never, { "emailId": { "alias": "emailId"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

/** Content template definition for CopyEmailButtonComponent */
declare const CopyEmailButtonDef: ContentTemplateDef<CopyEmailButtonComponent>;

export { CopyEmailButtonComponent, CopyEmailButtonDef };
