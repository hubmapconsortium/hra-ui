import * as i0 from '@angular/core';
import { input, ChangeDetectionStrategy, Component } from '@angular/core';
import * as i2 from '@angular/material/chips';
import { MatChipsModule } from '@angular/material/chips';
import { HraCommonModule } from '@hra-ui/common';
import { AssetUrlPipe } from '@hra-ui/common/url';
import * as i1 from '@hra-ui/design-system/icons';
import { coerceIconList, IconsModule, IconListSchema } from '@hra-ui/design-system/icons';
import { ContentTemplateSchema, ProjectedContentTemplateSchema } from '@hra-ui/cdk/content-template';
import * as z from 'zod';

/** Helper component for projecting card actions into the right location */
class CollectionCardActionComponent {
    /** Whether the actions should be put on the left or right side of the card */
    alignment = input(...(ngDevMode ? [undefined, { debugName: "alignment" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: CollectionCardActionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.15", type: CollectionCardActionComponent, isStandalone: true, selector: "hra-collection-card-action", inputs: { alignment: { classPropertyName: "alignment", publicName: "alignment", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: '<ng-content />', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: CollectionCardActionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'hra-collection-card-action',
                    template: '<ng-content />',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], propDecorators: { alignment: [{ type: i0.Input, args: [{ isSignal: true, alias: "alignment", required: false }] }] } });
/** Design system collection card */
class CollectionCardComponent {
    /** Card title */
    tagline = input.required(...(ngDevMode ? [{ debugName: "tagline" }] : []));
    /** Image url shown in the card */
    image = input(...(ngDevMode ? [undefined, { debugName: "image" }] : []));
    /** Icons shown for collection cards */
    icons = input([], ...(ngDevMode ? [{ debugName: "icons", transform: coerceIconList }] : [{ transform: coerceIconList }]));
    /** Chips/tags shown for collection cards */
    chips = input([], ...(ngDevMode ? [{ debugName: "chips" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: CollectionCardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.15", type: CollectionCardComponent, isStandalone: true, selector: "hra-collection-card", inputs: { tagline: { classPropertyName: "tagline", publicName: "tagline", isSignal: true, isRequired: true, transformFunction: null }, image: { classPropertyName: "image", publicName: "image", isSignal: true, isRequired: false, transformFunction: null }, icons: { classPropertyName: "icons", publicName: "icons", isSignal: true, isRequired: false, transformFunction: null }, chips: { classPropertyName: "chips", publicName: "chips", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<div class=\"tagline\">\n  @for (icon of icons(); track icon) {\n    <hra-icon class=\"icon\" [icon]=\"icon\" />\n  }\n  <div class=\"container\">\n    <span>{{ tagline() }}</span>\n    <mat-chip-set class=\"chips\" aria-label=\"Tags\">\n      @for (chip of chips(); track chip) {\n        <mat-chip hraChipSize=\"small\">{{ chip }}</mat-chip>\n      }\n    </mat-chip-set>\n  </div>\n</div>\n\n@if (image(); as src) {\n  <img class=\"image\" alt=\"\" [attr.src]=\"src | assetUrl\" />\n}\n\n<div class=\"description\">\n  <ng-content />\n</div>\n\n<div class=\"actions\">\n  <ng-content select=\"hra-collection-card-action:not([alignment='right'])\" />\n  <div class=\"spacer\"></div>\n  <ng-content select=\"hra-collection-card-action[alignment='right']\" />\n</div>\n", styles: [":host{display:flex;flex-direction:column;overflow:hidden;flex-grow:1;width:100%;min-width:17rem;max-width:25.5rem;border:.0625rem solid var(--mat-sys-outline);border-radius:.75rem;background-color:var(--mat-sys-on-primary)}:host .header,:host .image{width:100%;aspect-ratio:16/9;border-block:.0625rem solid var(--mat-sys-outline)}:host .tagline{display:flex;align-items:center;gap:.75rem;padding:1rem;font:var(--mat-sys-title-small);letter-spacing:var(--mat-sys-title-small-tracking)}:host .tagline .icon{flex-shrink:0;width:3rem;height:3rem}:host .description{flex-grow:1;padding:1rem 1rem .5rem}:host .actions{display:flex;align-items:center;padding:1rem;font:var(--mat-sys-label-large);letter-spacing:var(--mat-sys-label-large-tracking)}:host .actions .spacer{flex-grow:1}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "ngmodule", type: IconsModule }, { kind: "component", type: i1.IconComponent, selector: "hra-icon", inputs: ["icon", "svgIcon", "fontIcon", "fontSet", "inline"] }, { kind: "ngmodule", type: MatChipsModule }, { kind: "component", type: i2.MatChip, selector: "mat-basic-chip, [mat-basic-chip], mat-chip, [mat-chip]", inputs: ["role", "id", "aria-label", "aria-description", "value", "color", "removable", "highlighted", "disableRipple", "disabled"], outputs: ["removed", "destroyed"], exportAs: ["matChip"] }, { kind: "component", type: i2.MatChipSet, selector: "mat-chip-set", inputs: ["disabled", "role", "tabIndex"] }, { kind: "pipe", type: AssetUrlPipe, name: "assetUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: CollectionCardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-collection-card', imports: [AssetUrlPipe, HraCommonModule, IconsModule, MatChipsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"tagline\">\n  @for (icon of icons(); track icon) {\n    <hra-icon class=\"icon\" [icon]=\"icon\" />\n  }\n  <div class=\"container\">\n    <span>{{ tagline() }}</span>\n    <mat-chip-set class=\"chips\" aria-label=\"Tags\">\n      @for (chip of chips(); track chip) {\n        <mat-chip hraChipSize=\"small\">{{ chip }}</mat-chip>\n      }\n    </mat-chip-set>\n  </div>\n</div>\n\n@if (image(); as src) {\n  <img class=\"image\" alt=\"\" [attr.src]=\"src | assetUrl\" />\n}\n\n<div class=\"description\">\n  <ng-content />\n</div>\n\n<div class=\"actions\">\n  <ng-content select=\"hra-collection-card-action:not([alignment='right'])\" />\n  <div class=\"spacer\"></div>\n  <ng-content select=\"hra-collection-card-action[alignment='right']\" />\n</div>\n", styles: [":host{display:flex;flex-direction:column;overflow:hidden;flex-grow:1;width:100%;min-width:17rem;max-width:25.5rem;border:.0625rem solid var(--mat-sys-outline);border-radius:.75rem;background-color:var(--mat-sys-on-primary)}:host .header,:host .image{width:100%;aspect-ratio:16/9;border-block:.0625rem solid var(--mat-sys-outline)}:host .tagline{display:flex;align-items:center;gap:.75rem;padding:1rem;font:var(--mat-sys-title-small);letter-spacing:var(--mat-sys-title-small-tracking)}:host .tagline .icon{flex-shrink:0;width:3rem;height:3rem}:host .description{flex-grow:1;padding:1rem 1rem .5rem}:host .actions{display:flex;align-items:center;padding:1rem;font:var(--mat-sys-label-large);letter-spacing:var(--mat-sys-label-large-tracking)}:host .actions .spacer{flex-grow:1}\n"] }]
        }], propDecorators: { tagline: [{ type: i0.Input, args: [{ isSignal: true, alias: "tagline", required: true }] }], image: [{ type: i0.Input, args: [{ isSignal: true, alias: "image", required: false }] }], icons: [{ type: i0.Input, args: [{ isSignal: true, alias: "icons", required: false }] }], chips: [{ type: i0.Input, args: [{ isSignal: true, alias: "chips", required: false }] }] } });

/** Schema for content template collection card data */
const CollectionCardSchema = ContentTemplateSchema.extend({
    component: z.literal('CollectionCard'),
    tagline: z.string(),
    image: z.string().optional(),
    icons: IconListSchema.optional(),
    chips: z.array(z.string()).optional(),
    content: ProjectedContentTemplateSchema.optional(),
    additionalInfo: z.record(z.string(), z.string()).optional(),
    actionsLeft: ProjectedContentTemplateSchema.optional(),
    actionsRight: ProjectedContentTemplateSchema.optional(),
}).meta({ id: 'CollectionCard' });

/** Content template definition for collection card */
const CollectionCardDef = {
    component: CollectionCardComponent,
    spec: CollectionCardSchema,
    projectedProperties: {
        '*': 'content',
        "hra-collection-card-action:not([alignment='right'])": 'actionsLeft',
        "hra-collection-card-action[alignment='right']": 'actionsRight',
    },
};

/**
 * Generated bundle index. Do not edit.
 */

export { CollectionCardActionComponent, CollectionCardComponent, CollectionCardDef, CollectionCardSchema };
//# sourceMappingURL=hra-ui-design-system-cards-collection-card.mjs.map
