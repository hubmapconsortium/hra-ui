import * as i0 from '@angular/core';
import { input, booleanAttribute, ChangeDetectionStrategy, Component } from '@angular/core';
import * as i2 from '@angular/material/chips';
import { MatChipsModule } from '@angular/material/chips';
import * as i4 from '@angular/router';
import { RouterModule } from '@angular/router';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import * as i1 from '@angular/common';
import * as i3 from '@angular/material/button';
import * as i5 from '@hra-ui/common/url';
import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import * as z from 'zod';

/**
 * Content button action card component
 */
class ContentButtonComponent {
    /** Image url */
    imageSrc = input.required(...(ngDevMode ? [{ debugName: "imageSrc" }] : []));
    /** Date to display on card */
    date = input.required(...(ngDevMode ? [{ debugName: "date" }] : []));
    /** Card tagline (less than 2 lines or truncated) */
    tagline = input.required(...(ngDevMode ? [{ debugName: "tagline" }] : []));
    /** Tags to display on bottom of card */
    tags = input(...(ngDevMode ? [undefined, { debugName: "tags" }] : []));
    /** Url for the button */
    link = input.required(...(ngDevMode ? [{ debugName: "link" }] : []));
    /** Whether the link is external */
    external = input(true, ...(ngDevMode ? [{ debugName: "external", transform: booleanAttribute }] : [{ transform: booleanAttribute }]));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: ContentButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.7", type: ContentButtonComponent, isStandalone: true, selector: "hra-content-button", inputs: { imageSrc: { classPropertyName: "imageSrc", publicName: "imageSrc", isSignal: true, isRequired: true, transformFunction: null }, date: { classPropertyName: "date", publicName: "date", isSignal: true, isRequired: true, transformFunction: null }, tagline: { classPropertyName: "tagline", publicName: "tagline", isSignal: true, isRequired: true, transformFunction: null }, tags: { classPropertyName: "tags", publicName: "tags", isSignal: true, isRequired: false, transformFunction: null }, link: { classPropertyName: "link", publicName: "link", isSignal: true, isRequired: true, transformFunction: null }, external: { classPropertyName: "external", publicName: "external", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "@if (external()) {\n  <a mat-button [attr.href]=\"link()\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"content-button\">\n    <ng-container *ngTemplateOutlet=\"content\" />\n  </a>\n} @else {\n  <a mat-button [routerLink]=\"link()\" class=\"content-button\">\n    <ng-container *ngTemplateOutlet=\"content\" />\n  </a>\n}\n\n<ng-template #content>\n  <div class=\"header\">\n    <img class=\"image\" [attr.src]=\"imageSrc() | assetUrl\" alt=\"\" />\n  </div>\n\n  <div class=\"content\">\n    <span class=\"date\">{{ date() }}</span>\n    <span class=\"tagline\">{{ tagline() }}</span>\n    <mat-chip-set class=\"tags\">\n      @for (tag of tags(); track tag) {\n        <mat-chip class=\"tag\">{{ tag }}</mat-chip>\n      }\n    </mat-chip-set>\n  </div>\n</ng-template>\n", styles: [":host{display:flex;flex-direction:column;overflow:hidden;flex-grow:1;width:100%;min-width:16.25rem;max-width:23.75rem;background-color:var(--mat-sys-on-primary);--mat-button-text-state-layer-color: var(--mat-sys-secondary);--mat-button-text-hover-state-layer-opacity: 0;--mat-chip-elevated-container-color: var(--mat-sys-surface-container-low);--mat-chip-label-text-font: var(--mat-sys-label-small-font);--mat-chip-label-text-line-height: var(--mat-sys-label-small-line-height);--mat-chip-label-text-size: var(--mat-sys-label-small-size);--mat-chip-label-text-tracking: var(--mat-sys-label-small-tracking);--mat-chip-label-text-weight: var(--mat-sys-label-small-weight);--mat-chip-container-height: 1.75rem}:host .content-button{text-align:start;justify-content:start;height:fit-content;width:100%;padding:1rem;border:.0625rem solid var(--mat-sys-outline);border-radius:.75rem}:host .content-button:hover .image{max-width:13.5rem}:host .content-button:focus-visible{outline-color:var(--mat-sys-secondary)}:host .header{height:8.25rem}:host .header .image{width:100%;aspect-ratio:16/9;max-width:11.75rem;border-radius:.75rem;object-fit:cover;transition:.3s ease-in-out;background:var(--mat-sys-on-primary)}:host .content{display:flex;flex-direction:column;flex-grow:1}:host .content .date{font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking);color:var(--mat-sys-secondary);margin-bottom:.375rem}:host .content .tagline{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;font:var(--mat-sys-label-large);letter-spacing:var(--mat-sys-label-large-tracking);color:var(--mat-sys-primary);margin-bottom:1rem}@supports (line-clamp: 2){:host .content .tagline{display:block;line-clamp:2}}:host .tag{margin-top:0;margin-bottom:0;pointer-events:none}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: MatChipsModule }, { kind: "component", type: i2.MatChip, selector: "mat-basic-chip, [mat-basic-chip], mat-chip, [mat-chip]", inputs: ["role", "id", "aria-label", "aria-description", "value", "color", "removable", "highlighted", "disableRipple", "disabled"], outputs: ["removed", "destroyed"], exportAs: ["matChip"] }, { kind: "component", type: i2.MatChipSet, selector: "mat-chip-set", inputs: ["disabled", "role", "tabIndex"] }, { kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i3.MatButton, selector: "    button[matButton], a[matButton], button[mat-button], button[mat-raised-button],    button[mat-flat-button], button[mat-stroked-button], a[mat-button], a[mat-raised-button],    a[mat-flat-button], a[mat-stroked-button]  ", inputs: ["matButton"], exportAs: ["matButton", "matAnchor"] }, { kind: "ngmodule", type: RouterModule }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i5.AssetUrlPipe, name: "assetUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: ContentButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-content-button', imports: [HraCommonModule, MatChipsModule, ButtonsModule, RouterModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (external()) {\n  <a mat-button [attr.href]=\"link()\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"content-button\">\n    <ng-container *ngTemplateOutlet=\"content\" />\n  </a>\n} @else {\n  <a mat-button [routerLink]=\"link()\" class=\"content-button\">\n    <ng-container *ngTemplateOutlet=\"content\" />\n  </a>\n}\n\n<ng-template #content>\n  <div class=\"header\">\n    <img class=\"image\" [attr.src]=\"imageSrc() | assetUrl\" alt=\"\" />\n  </div>\n\n  <div class=\"content\">\n    <span class=\"date\">{{ date() }}</span>\n    <span class=\"tagline\">{{ tagline() }}</span>\n    <mat-chip-set class=\"tags\">\n      @for (tag of tags(); track tag) {\n        <mat-chip class=\"tag\">{{ tag }}</mat-chip>\n      }\n    </mat-chip-set>\n  </div>\n</ng-template>\n", styles: [":host{display:flex;flex-direction:column;overflow:hidden;flex-grow:1;width:100%;min-width:16.25rem;max-width:23.75rem;background-color:var(--mat-sys-on-primary);--mat-button-text-state-layer-color: var(--mat-sys-secondary);--mat-button-text-hover-state-layer-opacity: 0;--mat-chip-elevated-container-color: var(--mat-sys-surface-container-low);--mat-chip-label-text-font: var(--mat-sys-label-small-font);--mat-chip-label-text-line-height: var(--mat-sys-label-small-line-height);--mat-chip-label-text-size: var(--mat-sys-label-small-size);--mat-chip-label-text-tracking: var(--mat-sys-label-small-tracking);--mat-chip-label-text-weight: var(--mat-sys-label-small-weight);--mat-chip-container-height: 1.75rem}:host .content-button{text-align:start;justify-content:start;height:fit-content;width:100%;padding:1rem;border:.0625rem solid var(--mat-sys-outline);border-radius:.75rem}:host .content-button:hover .image{max-width:13.5rem}:host .content-button:focus-visible{outline-color:var(--mat-sys-secondary)}:host .header{height:8.25rem}:host .header .image{width:100%;aspect-ratio:16/9;max-width:11.75rem;border-radius:.75rem;object-fit:cover;transition:.3s ease-in-out;background:var(--mat-sys-on-primary)}:host .content{display:flex;flex-direction:column;flex-grow:1}:host .content .date{font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking);color:var(--mat-sys-secondary);margin-bottom:.375rem}:host .content .tagline{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;font:var(--mat-sys-label-large);letter-spacing:var(--mat-sys-label-large-tracking);color:var(--mat-sys-primary);margin-bottom:1rem}@supports (line-clamp: 2){:host .content .tagline{display:block;line-clamp:2}}:host .tag{margin-top:0;margin-bottom:0;pointer-events:none}\n"] }]
        }], propDecorators: { imageSrc: [{ type: i0.Input, args: [{ isSignal: true, alias: "imageSrc", required: true }] }], date: [{ type: i0.Input, args: [{ isSignal: true, alias: "date", required: true }] }], tagline: [{ type: i0.Input, args: [{ isSignal: true, alias: "tagline", required: true }] }], tags: [{ type: i0.Input, args: [{ isSignal: true, alias: "tags", required: false }] }], link: [{ type: i0.Input, args: [{ isSignal: true, alias: "link", required: true }] }], external: [{ type: i0.Input, args: [{ isSignal: true, alias: "external", required: false }] }] } });

/** Schema for content button action card data */
const ContentButtonSchema = ContentTemplateSchema.extend({
    component: z.literal('ContentButton'),
    image: z.string(),
    date: z.string(),
    tagline: z.string(),
    tags: z.array(z.string()).optional(),
    link: z.string(),
    external: z.boolean().optional(),
});

/**
 * Generated bundle index. Do not edit.
 */

export { ContentButtonComponent, ContentButtonSchema };
//# sourceMappingURL=hra-ui-design-system-cards-content-button.mjs.map
