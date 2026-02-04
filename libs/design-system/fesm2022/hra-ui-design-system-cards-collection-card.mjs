import * as i0 from '@angular/core';
import { input, ChangeDetectionStrategy, Component } from '@angular/core';
import * as i3 from '@angular/material/chips';
import { MatChipsModule } from '@angular/material/chips';
import { HraCommonModule } from '@hra-ui/common';
import { AssetUrlPipe } from '@hra-ui/common/url';
import * as i2 from '@hra-ui/design-system/icons';
import { coerceIconList, IconsModule, IconListSchema } from '@hra-ui/design-system/icons';
import * as i1 from '@angular/material/icon';
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
    /** Tagline chips shown in the top portion of collection card */
    taglineChips = input([], ...(ngDevMode ? [{ debugName: "taglineChips" }] : []));
    /** Label shown in the card */
    label = input(...(ngDevMode ? [undefined, { debugName: "label" }] : []));
    /** Supporting text shown in the card */
    supportingText = input(...(ngDevMode ? [undefined, { debugName: "supportingText" }] : []));
    /** Tags that are show the description portion of the collection card */
    tags = input([], ...(ngDevMode ? [{ debugName: "tags" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: CollectionCardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.15", type: CollectionCardComponent, isStandalone: true, selector: "hra-collection-card", inputs: { tagline: { classPropertyName: "tagline", publicName: "tagline", isSignal: true, isRequired: true, transformFunction: null }, image: { classPropertyName: "image", publicName: "image", isSignal: true, isRequired: false, transformFunction: null }, icons: { classPropertyName: "icons", publicName: "icons", isSignal: true, isRequired: false, transformFunction: null }, taglineChips: { classPropertyName: "taglineChips", publicName: "taglineChips", isSignal: true, isRequired: false, transformFunction: null }, label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: false, transformFunction: null }, supportingText: { classPropertyName: "supportingText", publicName: "supportingText", isSignal: true, isRequired: false, transformFunction: null }, tags: { classPropertyName: "tags", publicName: "tags", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<div class=\"tagline\">\n  @for (icon of icons(); track icon) {\n    <hra-icon class=\"icon\" [icon]=\"icon\" />\n  }\n  <div class=\"container\">\n    <span class=\"title\">{{ tagline() }}</span>\n    <mat-chip-set>\n      @for (taglineChip of taglineChips(); track taglineChip) {\n        <mat-chip hraChipSize=\"small\">{{ taglineChip }}</mat-chip>\n      }\n    </mat-chip-set>\n  </div>\n</div>\n\n@if (image(); as src) {\n  <img class=\"image\" alt=\"\" [attr.src]=\"src | assetUrl\" />\n}\n\n<div class=\"description\">\n  <div class=\"label\">{{ label() }}</div>\n  <div class=\"supporting-text\">{{ supportingText() }}</div>\n  <mat-chip-set>\n    @for (tag of tags(); track tag) {\n      <mat-chip hraChipSize=\"small\">\n        <mat-icon>{{ tag['icon'] }} </mat-icon>\n        {{ tag['text'] }}\n      </mat-chip>\n    }\n  </mat-chip-set>\n</div>\n\n<div class=\"actions\">\n  <ng-content select=\"hra-collection-card-action:not([alignment='right'])\" />\n  <div class=\"spacer\"></div>\n  <ng-content select=\"hra-collection-card-action[alignment='right']\" />\n</div>\n", styles: [":host{display:flex;flex-direction:column;overflow:hidden;flex-grow:1;width:100%;min-width:16.5rem;max-width:25rem;border:.0625rem solid var(--mat-sys-outline);border-radius:.75rem;background-color:var(--mat-sys-on-primary)}:host mat-chip{margin-top:0rem;margin-bottom:0rem}:host .header,:host .image{width:100%;aspect-ratio:16/9;border-block:.0625rem solid var(--mat-sys-outline)}:host .tagline{display:flex;align-items:center;gap:.75rem;width:calc(100% + 2px);padding:1rem;font:var(--mat-sys-title-small);letter-spacing:var(--mat-sys-title-small-tracking)}:host .tagline .icon{flex-shrink:0;width:3rem;height:3rem}:host .tagline .container .title{display:block;color:var(--mat-sys-secondary);margin-bottom:.5rem}:host .description{flex-grow:1;padding:1rem 1rem .5rem}:host .description .label{margin-bottom:2px;color:var(--mat-sys-secondary);font:var(--mat-sys-label-large);letter-spacing:var(--mat-sys-label-large-tracking)}:host .description .supporting-text{color:var(--mat-sys-primary);margin-bottom:1rem;font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking)}:host .description mat-chip-set{min-height:.25rem}:host .description .tag{display:inline-flex;gap:.4375rem;align-items:center}:host .actions{display:flex;align-items:center;padding:1rem;--mat-button-filled-label-text-font: var(--mat-sys-label-medium-font);--mat-button-filled-label-text-size: var(--mat-sys-label-medium-size);--mat-button-filled-label-text-tracking: var(--mat-sys-label-medium-tracking);--mat-button-filled-label-text-weight: var(--mat-sys-label-medium-weight)}:host .actions .spacer{flex-grow:1}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "ngmodule", type: IconsModule }, { kind: "component", type: i1.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: i2.IconComponent, selector: "hra-icon", inputs: ["icon", "svgIcon", "fontIcon", "fontSet", "inline"] }, { kind: "ngmodule", type: MatChipsModule }, { kind: "component", type: i3.MatChip, selector: "mat-basic-chip, [mat-basic-chip], mat-chip, [mat-chip]", inputs: ["role", "id", "aria-label", "aria-description", "value", "color", "removable", "highlighted", "disableRipple", "disabled"], outputs: ["removed", "destroyed"], exportAs: ["matChip"] }, { kind: "component", type: i3.MatChipSet, selector: "mat-chip-set", inputs: ["disabled", "role", "tabIndex"] }, { kind: "pipe", type: AssetUrlPipe, name: "assetUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: CollectionCardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-collection-card', imports: [AssetUrlPipe, HraCommonModule, IconsModule, MatChipsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"tagline\">\n  @for (icon of icons(); track icon) {\n    <hra-icon class=\"icon\" [icon]=\"icon\" />\n  }\n  <div class=\"container\">\n    <span class=\"title\">{{ tagline() }}</span>\n    <mat-chip-set>\n      @for (taglineChip of taglineChips(); track taglineChip) {\n        <mat-chip hraChipSize=\"small\">{{ taglineChip }}</mat-chip>\n      }\n    </mat-chip-set>\n  </div>\n</div>\n\n@if (image(); as src) {\n  <img class=\"image\" alt=\"\" [attr.src]=\"src | assetUrl\" />\n}\n\n<div class=\"description\">\n  <div class=\"label\">{{ label() }}</div>\n  <div class=\"supporting-text\">{{ supportingText() }}</div>\n  <mat-chip-set>\n    @for (tag of tags(); track tag) {\n      <mat-chip hraChipSize=\"small\">\n        <mat-icon>{{ tag['icon'] }} </mat-icon>\n        {{ tag['text'] }}\n      </mat-chip>\n    }\n  </mat-chip-set>\n</div>\n\n<div class=\"actions\">\n  <ng-content select=\"hra-collection-card-action:not([alignment='right'])\" />\n  <div class=\"spacer\"></div>\n  <ng-content select=\"hra-collection-card-action[alignment='right']\" />\n</div>\n", styles: [":host{display:flex;flex-direction:column;overflow:hidden;flex-grow:1;width:100%;min-width:16.5rem;max-width:25rem;border:.0625rem solid var(--mat-sys-outline);border-radius:.75rem;background-color:var(--mat-sys-on-primary)}:host mat-chip{margin-top:0rem;margin-bottom:0rem}:host .header,:host .image{width:100%;aspect-ratio:16/9;border-block:.0625rem solid var(--mat-sys-outline)}:host .tagline{display:flex;align-items:center;gap:.75rem;width:calc(100% + 2px);padding:1rem;font:var(--mat-sys-title-small);letter-spacing:var(--mat-sys-title-small-tracking)}:host .tagline .icon{flex-shrink:0;width:3rem;height:3rem}:host .tagline .container .title{display:block;color:var(--mat-sys-secondary);margin-bottom:.5rem}:host .description{flex-grow:1;padding:1rem 1rem .5rem}:host .description .label{margin-bottom:2px;color:var(--mat-sys-secondary);font:var(--mat-sys-label-large);letter-spacing:var(--mat-sys-label-large-tracking)}:host .description .supporting-text{color:var(--mat-sys-primary);margin-bottom:1rem;font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking)}:host .description mat-chip-set{min-height:.25rem}:host .description .tag{display:inline-flex;gap:.4375rem;align-items:center}:host .actions{display:flex;align-items:center;padding:1rem;--mat-button-filled-label-text-font: var(--mat-sys-label-medium-font);--mat-button-filled-label-text-size: var(--mat-sys-label-medium-size);--mat-button-filled-label-text-tracking: var(--mat-sys-label-medium-tracking);--mat-button-filled-label-text-weight: var(--mat-sys-label-medium-weight)}:host .actions .spacer{flex-grow:1}\n"] }]
        }], propDecorators: { tagline: [{ type: i0.Input, args: [{ isSignal: true, alias: "tagline", required: true }] }], image: [{ type: i0.Input, args: [{ isSignal: true, alias: "image", required: false }] }], icons: [{ type: i0.Input, args: [{ isSignal: true, alias: "icons", required: false }] }], taglineChips: [{ type: i0.Input, args: [{ isSignal: true, alias: "taglineChips", required: false }] }], label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: false }] }], supportingText: [{ type: i0.Input, args: [{ isSignal: true, alias: "supportingText", required: false }] }], tags: [{ type: i0.Input, args: [{ isSignal: true, alias: "tags", required: false }] }] } });

/** Schema for content template collection card data */
const CollectionCardSchema = ContentTemplateSchema.extend({
    component: z.literal('CollectionCard'),
    tagline: z.string(),
    taglineChips: z.array(z.string()).optional(),
    image: z.string().optional(),
    icons: IconListSchema.optional(),
    tags: z.array(z.record(z.string(), z.string())).optional(),
    label: z.string().optional(),
    supportingText: z.string().optional(),
    actionsInfo: z.record(z.string(), z.string()).optional(),
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
