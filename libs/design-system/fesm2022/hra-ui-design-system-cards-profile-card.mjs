import * as i0 from '@angular/core';
import { input, booleanAttribute, ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { AssetUrlPipe } from '@hra-ui/common/url';
import * as i1 from 'ngx-markdown';
import { MarkdownModule } from 'ngx-markdown';
import { ContentTemplateSchema, ProjectedContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

/**
 * Profile Card for displaying user information and relevant links
 */
class ProfileCardComponent {
    /** Field for profile picture URL */
    pictureUrl = input.required(...(ngDevMode ? [{ debugName: "pictureUrl" }] : []));
    /** Field for profile name */
    name = input.required(...(ngDevMode ? [{ debugName: "name" }] : []));
    /** Field for description */
    description = input.required(...(ngDevMode ? [{ debugName: "description" }] : []));
    /** Whether to center card content */
    centerContent = input(false, ...(ngDevMode ? [{ debugName: "centerContent", transform: booleanAttribute }] : [{ transform: booleanAttribute }]));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: ProfileCardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.9", type: ProfileCardComponent, isStandalone: true, selector: "hra-profile-card", inputs: { pictureUrl: { classPropertyName: "pictureUrl", publicName: "pictureUrl", isSignal: true, isRequired: true, transformFunction: null }, name: { classPropertyName: "name", publicName: "name", isSignal: true, isRequired: true, transformFunction: null }, description: { classPropertyName: "description", publicName: "description", isSignal: true, isRequired: true, transformFunction: null }, centerContent: { classPropertyName: "centerContent", publicName: "centerContent", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "class.hra-profile-card-center-content": "centerContent()" } }, ngImport: i0, template: "<div class=\"picture\">\n  <img [attr.src]=\"pictureUrl() | assetUrl\" [attr.alt]=\"`Profile picture of ${name()}`\" />\n</div>\n<div class=\"content\">\n  <div class=\"name\">{{ name() }}</div>\n  <markdown class=\"description\" [data]=\"description()\" />\n</div>\n<div class=\"actions\">\n  <ng-content></ng-content>\n</div>\n", styles: [":host{display:flex;flex-direction:column;width:17rem}:host .picture{width:11.25rem;height:13.375rem;clip-path:polygon(0% 0%,100% 0%,100% 90%,90% 100%,0% 100%);border-left:.75rem solid #ff0043;margin-bottom:2rem}:host .picture img{height:100%;width:100%;object-fit:cover}:host .content{margin-bottom:1rem;flex-grow:1}:host .content .name{font:var(--mat-sys-title-medium);letter-spacing:var(--mat-sys-title-medium-tracking);color:var(--mat-sys-secondary);margin-bottom:.5rem}:host .content .description{font:var(--mat-sys-body-large);letter-spacing:var(--mat-sys-body-large-tracking);color:var(--mat-sys-on-secondary-fixed);margin-top:0}:host .content .description ::ng-deep p{margin-top:0}:host.hra-profile-card-center-content{text-align:center}:host.hra-profile-card-center-content .picture{margin:0 auto 2rem}:host.hra-profile-card-center-content .actions{display:flex;justify-content:center}:host .actions{font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking)}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "ngmodule", type: MatIconModule }, { kind: "ngmodule", type: MarkdownModule }, { kind: "component", type: i1.MarkdownComponent, selector: "markdown, [markdown]", inputs: ["data", "src", "disableSanitizer", "inline", "clipboard", "clipboardButtonComponent", "clipboardButtonTemplate", "emoji", "katex", "katexOptions", "mermaid", "mermaidOptions", "lineHighlight", "line", "lineOffset", "lineNumbers", "start", "commandLine", "filterOutput", "host", "prompt", "output", "user"], outputs: ["error", "load", "ready"] }, { kind: "pipe", type: AssetUrlPipe, name: "assetUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: ProfileCardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-profile-card', imports: [AssetUrlPipe, HraCommonModule, MatIconModule, MarkdownModule], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[class.hra-profile-card-center-content]': 'centerContent()',
                    }, template: "<div class=\"picture\">\n  <img [attr.src]=\"pictureUrl() | assetUrl\" [attr.alt]=\"`Profile picture of ${name()}`\" />\n</div>\n<div class=\"content\">\n  <div class=\"name\">{{ name() }}</div>\n  <markdown class=\"description\" [data]=\"description()\" />\n</div>\n<div class=\"actions\">\n  <ng-content></ng-content>\n</div>\n", styles: [":host{display:flex;flex-direction:column;width:17rem}:host .picture{width:11.25rem;height:13.375rem;clip-path:polygon(0% 0%,100% 0%,100% 90%,90% 100%,0% 100%);border-left:.75rem solid #ff0043;margin-bottom:2rem}:host .picture img{height:100%;width:100%;object-fit:cover}:host .content{margin-bottom:1rem;flex-grow:1}:host .content .name{font:var(--mat-sys-title-medium);letter-spacing:var(--mat-sys-title-medium-tracking);color:var(--mat-sys-secondary);margin-bottom:.5rem}:host .content .description{font:var(--mat-sys-body-large);letter-spacing:var(--mat-sys-body-large-tracking);color:var(--mat-sys-on-secondary-fixed);margin-top:0}:host .content .description ::ng-deep p{margin-top:0}:host.hra-profile-card-center-content{text-align:center}:host.hra-profile-card-center-content .picture{margin:0 auto 2rem}:host.hra-profile-card-center-content .actions{display:flex;justify-content:center}:host .actions{font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking)}\n"] }]
        }], propDecorators: { pictureUrl: [{ type: i0.Input, args: [{ isSignal: true, alias: "pictureUrl", required: true }] }], name: [{ type: i0.Input, args: [{ isSignal: true, alias: "name", required: true }] }], description: [{ type: i0.Input, args: [{ isSignal: true, alias: "description", required: true }] }], centerContent: [{ type: i0.Input, args: [{ isSignal: true, alias: "centerContent", required: false }] }] } });

/** Profile card schema */
const ProfileCardSchema = ContentTemplateSchema.extend({
    component: z.literal('ProfileCard'),
    name: z.string(),
    description: z.string(),
    pictureUrl: z.string(),
    centerContent: z.boolean().optional(),
    actions: ProjectedContentTemplateSchema.optional(),
});

/** ProfileCard content template definition */
const ProfileCardDef = {
    component: ProfileCardComponent,
    spec: ProfileCardSchema,
    projectedProperties: {
        '*': 'actions',
    },
};

/**
 * Generated bundle index. Do not edit.
 */

export { ProfileCardComponent, ProfileCardDef, ProfileCardSchema };
//# sourceMappingURL=hra-ui-design-system-cards-profile-card.mjs.map
