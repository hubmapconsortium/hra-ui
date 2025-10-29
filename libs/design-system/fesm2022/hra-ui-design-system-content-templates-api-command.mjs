import { Clipboard } from '@angular/cdk/clipboard';
import * as i0 from '@angular/core';
import { inject, input, ChangeDetectionStrategy, Component } from '@angular/core';
import * as i1 from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import * as i3 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { CodeBlockComponent } from '@hra-ui/design-system/code-block';
import * as i2 from '@angular/material/button';
import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

/** Displays a card for users to copy and access API information */
class ApiCommandComponent {
    /** Service for copying text to clipboard */
    clipboard = inject(Clipboard);
    /** The request url */
    request = input.required(...(ngDevMode ? [{ debugName: "request" }] : []));
    /** API method to use */
    method = input.required(...(ngDevMode ? [{ debugName: "method" }] : []));
    /** Right button info */
    rightButton = input.required(...(ngDevMode ? [{ debugName: "rightButton" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: ApiCommandComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.9", type: ApiCommandComponent, isStandalone: true, selector: "hra-api-command", inputs: { request: { classPropertyName: "request", publicName: "request", isSignal: true, isRequired: true, transformFunction: null }, method: { classPropertyName: "method", publicName: "method", isSignal: true, isRequired: true, transformFunction: null }, rightButton: { classPropertyName: "rightButton", publicName: "rightButton", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: "<mat-card class=\"url-card\" [class.post]=\"method() === 'POST'\" id=\"url\">\n  <hra-code-block [code]=\"`${method()}: ${request()}`\" language=\"html\"></hra-code-block>\n</mat-card>\n<div class=\"buttons\">\n  <button mat-button (click)=\"clipboard.copy(request())\">\n    <mat-icon>content_copy</mat-icon>\n    Copy\n  </button>\n  <a mat-button [attr.href]=\"rightButton().url\" target=\"_blank\">\n    {{ rightButton().label }}\n    <mat-icon>{{ rightButton().icon }}</mat-icon>\n  </a>\n</div>\n", styles: [":host{display:flex;gap:.5rem;align-items:center;flex-wrap:wrap;--mat-card-elevated-container-shape: .25rem;--mat-card-elevated-container-color: var(--mat-sys-surface-container);--mat-card-elevated-container-elevation: 0}:host .url-card{border-left:solid #bad2e7 .5rem;justify-content:center;overflow:hidden}:host .url-card.post{border-color:#8dc599}:host hra-code-block{border:none;padding:0}:host hra-code-block ::ng-deep code{color:var(--mat-sys-primary)}:host .buttons{display:flex;gap:.25rem}\n"], dependencies: [{ kind: "ngmodule", type: MatCardModule }, { kind: "component", type: i1.MatCard, selector: "mat-card", inputs: ["appearance"], exportAs: ["matCard"] }, { kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i2.MatButton, selector: "    button[matButton], a[matButton], button[mat-button], button[mat-raised-button],    button[mat-flat-button], button[mat-stroked-button], a[mat-button], a[mat-raised-button],    a[mat-flat-button], a[mat-stroked-button]  ", inputs: ["matButton"], exportAs: ["matButton", "matAnchor"] }, { kind: "component", type: i3.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: CodeBlockComponent, selector: "hra-code-block", inputs: ["code", "language"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: ApiCommandComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-api-command', imports: [MatCardModule, ButtonsModule, MatIconModule, CodeBlockComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<mat-card class=\"url-card\" [class.post]=\"method() === 'POST'\" id=\"url\">\n  <hra-code-block [code]=\"`${method()}: ${request()}`\" language=\"html\"></hra-code-block>\n</mat-card>\n<div class=\"buttons\">\n  <button mat-button (click)=\"clipboard.copy(request())\">\n    <mat-icon>content_copy</mat-icon>\n    Copy\n  </button>\n  <a mat-button [attr.href]=\"rightButton().url\" target=\"_blank\">\n    {{ rightButton().label }}\n    <mat-icon>{{ rightButton().icon }}</mat-icon>\n  </a>\n</div>\n", styles: [":host{display:flex;gap:.5rem;align-items:center;flex-wrap:wrap;--mat-card-elevated-container-shape: .25rem;--mat-card-elevated-container-color: var(--mat-sys-surface-container);--mat-card-elevated-container-elevation: 0}:host .url-card{border-left:solid #bad2e7 .5rem;justify-content:center;overflow:hidden}:host .url-card.post{border-color:#8dc599}:host hra-code-block{border:none;padding:0}:host hra-code-block ::ng-deep code{color:var(--mat-sys-primary)}:host .buttons{display:flex;gap:.25rem}\n"] }]
        }], propDecorators: { request: [{ type: i0.Input, args: [{ isSignal: true, alias: "request", required: true }] }], method: [{ type: i0.Input, args: [{ isSignal: true, alias: "method", required: true }] }], rightButton: [{ type: i0.Input, args: [{ isSignal: true, alias: "rightButton", required: true }] }] } });

/** Schema representing the details of an api command button */
const ApiCommandButtonSchema = z.object({
    /** Text for the plain button */
    label: z.string(),
    /** Icon name for the button */
    icon: z.string().optional(),
    /** External URL for the button */
    url: z.string().url().optional(),
});
/** Schema for api command */
const ApiCommandSchema = ContentTemplateSchema.extend({
    component: z.literal('ApiCommand'),
    /** API request url to be displayed in the card */
    request: z.string(),
    /** Can be GET or POST */
    method: z.enum(['GET', 'POST']),
    /** Details of the right button */
    rightButton: ApiCommandButtonSchema,
});

/** Content template definition for ApiCommandComponent */
const ApiCommandDef = {
    component: ApiCommandComponent,
    spec: ApiCommandSchema,
};

/**
 * Generated bundle index. Do not edit.
 */

export { ApiCommandComponent, ApiCommandDef, ApiCommandSchema };
//# sourceMappingURL=hra-ui-design-system-content-templates-api-command.mjs.map
