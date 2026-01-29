import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import * as i0 from '@angular/core';
import { input, inject, ChangeDetectionStrategy, Component } from '@angular/core';
import * as i2 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i1 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SnackbarService } from '@hra-ui/design-system/snackbar';
import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import * as z from 'zod';

/**
 * Copy email button component that copies given email ID to clipboard on click.
 */
class CopyEmailButtonComponent {
    /** Email Id */
    emailId = input.required(...(ngDevMode ? [{ debugName: "emailId" }] : []));
    /** Snackbar service */
    snackbar = inject(SnackbarService);
    /** Trigerred when user clicks on the Copy button */
    openCopiedSnackbar() {
        this.snackbar.open('Copied to clipboard', '', false, 'start', { duration: 5000 });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: CopyEmailButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.15", type: CopyEmailButtonComponent, isStandalone: true, selector: "hra-copy-email-button", inputs: { emailId: { classPropertyName: "emailId", publicName: "emailId", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: "<button mat-flat-button [cdkCopyToClipboard]=\"emailId()\" (cdkCopyToClipboardCopied)=\"openCopiedSnackbar()\">\n  <mat-icon>content_copy</mat-icon>\n  <span>Copy Email</span>\n</button>\n", styles: [":host{display:block}\n"], dependencies: [{ kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i1.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: MatMenuModule }, { kind: "ngmodule", type: MatButtonModule }, { kind: "component", type: i2.MatButton, selector: "    button[matButton], a[matButton], button[mat-button], button[mat-raised-button],    button[mat-flat-button], button[mat-stroked-button], a[mat-button], a[mat-raised-button],    a[mat-flat-button], a[mat-stroked-button]  ", inputs: ["matButton"], exportAs: ["matButton", "matAnchor"] }, { kind: "directive", type: CdkCopyToClipboard, selector: "[cdkCopyToClipboard]", inputs: ["cdkCopyToClipboard", "cdkCopyToClipboardAttempts"], outputs: ["cdkCopyToClipboardCopied"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: CopyEmailButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-copy-email-button', imports: [MatIconModule, MatMenuModule, MatButtonModule, CdkCopyToClipboard], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button mat-flat-button [cdkCopyToClipboard]=\"emailId()\" (cdkCopyToClipboardCopied)=\"openCopiedSnackbar()\">\n  <mat-icon>content_copy</mat-icon>\n  <span>Copy Email</span>\n</button>\n", styles: [":host{display:block}\n"] }]
        }], propDecorators: { emailId: [{ type: i0.Input, args: [{ isSignal: true, alias: "emailId", required: true }] }] } });

/** HRA button schema */
const CopyEmailButtonSchema = ContentTemplateSchema.extend({
    component: z.literal('CopyEmailButton'),
    emailId: z.email(),
}).meta({ id: 'CopyEmailButton' });

/** Content template definition for CopyEmailButtonComponent */
const CopyEmailButtonDef = {
    component: CopyEmailButtonComponent,
    spec: CopyEmailButtonSchema,
};

/**
 * Generated bundle index. Do not edit.
 */

export { CopyEmailButtonComponent, CopyEmailButtonDef };
//# sourceMappingURL=hra-ui-design-system-content-templates-copy-email.mjs.map
