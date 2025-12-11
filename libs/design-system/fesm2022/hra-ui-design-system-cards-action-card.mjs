import * as i0 from '@angular/core';
import { input, ChangeDetectionStrategy, Component } from '@angular/core';
import { AssetUrlPipe } from '@hra-ui/common/url';
import * as i1 from '@angular/material/divider';
import { MatDividerModule } from '@angular/material/divider';
import { HraCommonModule } from '@hra-ui/common';
import * as i2 from '@hra-ui/design-system/icons';
import { coerceIconList, IconsModule, IconListSchema } from '@hra-ui/design-system/icons';
import { ContentTemplateSchema, ProjectedContentTemplateSchema } from '@hra-ui/cdk/content-template';
import * as z from 'zod';

/** Helper component for projecting card actions into the right location */
class ActionCardActionComponent {
    /** Whether the actions should be put on the left or right side of the card */
    alignment = input(...(ngDevMode ? [undefined, { debugName: "alignment" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ActionCardActionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.15", type: ActionCardActionComponent, isStandalone: true, selector: "hra-action-card-action", inputs: { alignment: { classPropertyName: "alignment", publicName: "alignment", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: '<ng-content />', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ActionCardActionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'hra-action-card-action',
                    template: '<ng-content />',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], propDecorators: { alignment: [{ type: i0.Input, args: [{ isSignal: true, alias: "alignment", required: false }] }] } });
/**
 * Design system action card
 * The card consists of an image on top (or icons for the `outlined-with-icons` variant)
 * followed by a title and content and optionally actions
 */
class ActionCardComponent {
    /** Card layout variant */
    variant = input.required(...(ngDevMode ? [{ debugName: "variant" }] : []));
    /** Title */
    tagline = input.required(...(ngDevMode ? [{ debugName: "tagline" }] : []));
    /** Smaller title show above the primary title for `elevated` cards */
    subtagline = input(...(ngDevMode ? [undefined, { debugName: "subtagline" }] : []));
    /** Image url show on top except for `outlined-with-icons` cards */
    image = input(...(ngDevMode ? [undefined, { debugName: "image" }] : []));
    /** Icons shown for `outlined-with-icons` cards */
    icons = input([], ...(ngDevMode ? [{ debugName: "icons", transform: coerceIconList }] : [{ transform: coerceIconList }]));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ActionCardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.15", type: ActionCardComponent, isStandalone: true, selector: "hra-action-card", inputs: { variant: { classPropertyName: "variant", publicName: "variant", isSignal: true, isRequired: true, transformFunction: null }, tagline: { classPropertyName: "tagline", publicName: "tagline", isSignal: true, isRequired: true, transformFunction: null }, subtagline: { classPropertyName: "subtagline", publicName: "subtagline", isSignal: true, isRequired: false, transformFunction: null }, image: { classPropertyName: "image", publicName: "image", isSignal: true, isRequired: false, transformFunction: null }, icons: { classPropertyName: "icons", publicName: "icons", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "class": "\"hra-action-card-variant-\" + variant()" } }, ngImport: i0, template: "@if (variant() !== 'outlined-with-icons') {\n  <div class=\"header\">\n    @if (image(); as src) {\n      <img class=\"image\" alt=\"\" [attr.src]=\"src | assetUrl\" />\n    }\n  </div>\n}\n\n@if (variant() === 'outlined' && image()) {\n  <mat-divider />\n}\n\n<div class=\"content\">\n  @if (variant() === 'elevated') {\n    <div class=\"subtagline\">{{ subtagline() }}</div>\n  }\n  <div class=\"tagline\">\n    @for (icon of icons(); track icon) {\n      <hra-icon class=\"icon\" [icon]=\"icon\" />\n    }\n    <span>{{ tagline() }}</span>\n  </div>\n\n  <div class=\"description\">\n    <ng-content />\n  </div>\n\n  <div class=\"actions\">\n    <ng-content select=\"hra-action-card-action:not([alignment='right'])\" />\n    <div class=\"spacer\"></div>\n    <ng-content select=\"hra-action-card-action[alignment='right']\" />\n  </div>\n</div>\n", styles: [":host{display:flex;flex-direction:column;overflow:hidden;flex-grow:1}:host .header .image{width:100%;aspect-ratio:16/9}:host .content{display:flex;flex-direction:column;flex-grow:1}:host .content .tagline{display:flex;align-items:center;gap:.75rem}:host .content .tagline .icon{flex-shrink:0;width:3rem;height:3rem}:host .content .description{flex-grow:1}:host .content .actions{display:flex;font:var(--mat-sys-label-large);letter-spacing:var(--mat-sys-label-large-tracking)}:host .content .actions .spacer{flex-grow:1}:host.hra-action-card-variant-elevated,:host.hra-action-card-variant-flat,:host.hra-action-card-variant-outlined,:host.hra-action-card-variant-outlined-with-icons{width:100%;min-width:17rem;max-width:25.5rem}:host.hra-action-card-variant-elevated .content .subtagline,:host.hra-action-card-variant-flat .content .subtagline,:host.hra-action-card-variant-outlined .content .subtagline,:host.hra-action-card-variant-outlined-with-icons .content .subtagline{font:var(--mat-sys-title-small);letter-spacing:var(--mat-sys-title-small-tracking);color:var(--mat-sys-on-secondary-fixed)}:host.hra-action-card-variant-elevated .content .tagline,:host.hra-action-card-variant-flat .content .tagline,:host.hra-action-card-variant-outlined .content .tagline,:host.hra-action-card-variant-outlined-with-icons .content .tagline{font:var(--mat-sys-title-medium);letter-spacing:var(--mat-sys-title-medium-tracking);color:var(--mat-sys-secondary);margin-bottom:.5rem}:host.hra-action-card-variant-elevated .content .description,:host.hra-action-card-variant-flat .content .description,:host.hra-action-card-variant-outlined .content .description,:host.hra-action-card-variant-outlined-with-icons .content .description{font:var(--mat-sys-body-large);letter-spacing:var(--mat-sys-body-large-tracking);color:var(--mat-sys-primary);margin-bottom:2rem}:host.hra-action-card-variant-elevated{border-radius:.75rem;background-color:var(--mat-sys-surface-container-low);box-shadow:0 .3125rem 1rem rgb(from var(--mat-sys-secondary) r g b/24%)}:host.hra-action-card-variant-elevated .content{margin:1rem}:host.hra-action-card-variant-flat .content{margin-top:1.5rem}:host.hra-action-card-variant-outlined,:host.hra-action-card-variant-outlined-with-icons{border:.0625rem solid var(--mat-sys-outline);border-radius:.75rem;background-color:var(--mat-sys-on-primary)}:host.hra-action-card-variant-outlined .content .tagline,:host.hra-action-card-variant-outlined-with-icons .content .tagline{font:var(--mat-sys-title-small);letter-spacing:var(--mat-sys-title-small-tracking)}:host.hra-action-card-variant-outlined .content{margin:.75rem 1rem}:host.hra-action-card-variant-outlined .content .tagline{margin-bottom:.25rem}:host.hra-action-card-variant-outlined-with-icons .content{margin:1rem}:host.hra-action-card-variant-outlined-with-icons .content .tagline{margin-bottom:.75rem}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "ngmodule", type: MatDividerModule }, { kind: "component", type: i1.MatDivider, selector: "mat-divider", inputs: ["vertical", "inset"] }, { kind: "ngmodule", type: IconsModule }, { kind: "component", type: i2.IconComponent, selector: "hra-icon", inputs: ["icon", "svgIcon", "fontIcon", "fontSet", "inline"] }, { kind: "pipe", type: AssetUrlPipe, name: "assetUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ActionCardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-action-card', imports: [AssetUrlPipe, HraCommonModule, MatDividerModule, IconsModule], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[class]': '"hra-action-card-variant-" + variant()',
                    }, template: "@if (variant() !== 'outlined-with-icons') {\n  <div class=\"header\">\n    @if (image(); as src) {\n      <img class=\"image\" alt=\"\" [attr.src]=\"src | assetUrl\" />\n    }\n  </div>\n}\n\n@if (variant() === 'outlined' && image()) {\n  <mat-divider />\n}\n\n<div class=\"content\">\n  @if (variant() === 'elevated') {\n    <div class=\"subtagline\">{{ subtagline() }}</div>\n  }\n  <div class=\"tagline\">\n    @for (icon of icons(); track icon) {\n      <hra-icon class=\"icon\" [icon]=\"icon\" />\n    }\n    <span>{{ tagline() }}</span>\n  </div>\n\n  <div class=\"description\">\n    <ng-content />\n  </div>\n\n  <div class=\"actions\">\n    <ng-content select=\"hra-action-card-action:not([alignment='right'])\" />\n    <div class=\"spacer\"></div>\n    <ng-content select=\"hra-action-card-action[alignment='right']\" />\n  </div>\n</div>\n", styles: [":host{display:flex;flex-direction:column;overflow:hidden;flex-grow:1}:host .header .image{width:100%;aspect-ratio:16/9}:host .content{display:flex;flex-direction:column;flex-grow:1}:host .content .tagline{display:flex;align-items:center;gap:.75rem}:host .content .tagline .icon{flex-shrink:0;width:3rem;height:3rem}:host .content .description{flex-grow:1}:host .content .actions{display:flex;font:var(--mat-sys-label-large);letter-spacing:var(--mat-sys-label-large-tracking)}:host .content .actions .spacer{flex-grow:1}:host.hra-action-card-variant-elevated,:host.hra-action-card-variant-flat,:host.hra-action-card-variant-outlined,:host.hra-action-card-variant-outlined-with-icons{width:100%;min-width:17rem;max-width:25.5rem}:host.hra-action-card-variant-elevated .content .subtagline,:host.hra-action-card-variant-flat .content .subtagline,:host.hra-action-card-variant-outlined .content .subtagline,:host.hra-action-card-variant-outlined-with-icons .content .subtagline{font:var(--mat-sys-title-small);letter-spacing:var(--mat-sys-title-small-tracking);color:var(--mat-sys-on-secondary-fixed)}:host.hra-action-card-variant-elevated .content .tagline,:host.hra-action-card-variant-flat .content .tagline,:host.hra-action-card-variant-outlined .content .tagline,:host.hra-action-card-variant-outlined-with-icons .content .tagline{font:var(--mat-sys-title-medium);letter-spacing:var(--mat-sys-title-medium-tracking);color:var(--mat-sys-secondary);margin-bottom:.5rem}:host.hra-action-card-variant-elevated .content .description,:host.hra-action-card-variant-flat .content .description,:host.hra-action-card-variant-outlined .content .description,:host.hra-action-card-variant-outlined-with-icons .content .description{font:var(--mat-sys-body-large);letter-spacing:var(--mat-sys-body-large-tracking);color:var(--mat-sys-primary);margin-bottom:2rem}:host.hra-action-card-variant-elevated{border-radius:.75rem;background-color:var(--mat-sys-surface-container-low);box-shadow:0 .3125rem 1rem rgb(from var(--mat-sys-secondary) r g b/24%)}:host.hra-action-card-variant-elevated .content{margin:1rem}:host.hra-action-card-variant-flat .content{margin-top:1.5rem}:host.hra-action-card-variant-outlined,:host.hra-action-card-variant-outlined-with-icons{border:.0625rem solid var(--mat-sys-outline);border-radius:.75rem;background-color:var(--mat-sys-on-primary)}:host.hra-action-card-variant-outlined .content .tagline,:host.hra-action-card-variant-outlined-with-icons .content .tagline{font:var(--mat-sys-title-small);letter-spacing:var(--mat-sys-title-small-tracking)}:host.hra-action-card-variant-outlined .content{margin:.75rem 1rem}:host.hra-action-card-variant-outlined .content .tagline{margin-bottom:.25rem}:host.hra-action-card-variant-outlined-with-icons .content{margin:1rem}:host.hra-action-card-variant-outlined-with-icons .content .tagline{margin-bottom:.75rem}\n"] }]
        }], propDecorators: { variant: [{ type: i0.Input, args: [{ isSignal: true, alias: "variant", required: true }] }], tagline: [{ type: i0.Input, args: [{ isSignal: true, alias: "tagline", required: true }] }], subtagline: [{ type: i0.Input, args: [{ isSignal: true, alias: "subtagline", required: false }] }], image: [{ type: i0.Input, args: [{ isSignal: true, alias: "image", required: false }] }], icons: [{ type: i0.Input, args: [{ isSignal: true, alias: "icons", required: false }] }] } });

/** Schema for action card variants */
const ActionCardVariantSchema = z
    .enum(['elevated', 'flat', 'outlined', 'outlined-with-icons'])
    .meta({ id: 'ActionCardVariant' });
/** Schema for content template action card data */
const ActionCardSchema = ContentTemplateSchema.extend({
    component: z.literal('ActionCard'),
    variant: ActionCardVariantSchema,
    tagline: z.string(),
    subtagline: z.string().optional(),
    image: z.string().optional(),
    icons: IconListSchema.optional(),
    content: ProjectedContentTemplateSchema.optional(),
    actionsLeft: ProjectedContentTemplateSchema.optional(),
    actionsRight: ProjectedContentTemplateSchema.optional(),
}).meta({ id: 'ActionCard' });

/** Content template definition for action card */
const ActionCardDef = {
    component: ActionCardComponent,
    spec: ActionCardSchema,
    projectedProperties: {
        '*': 'content',
        "hra-action-card-action:not([alignment='right'])": 'actionsLeft',
        "hra-action-card-action[alignment='right']": 'actionsRight',
    },
};

/**
 * Generated bundle index. Do not edit.
 */

export { ActionCardActionComponent, ActionCardComponent, ActionCardDef, ActionCardSchema, ActionCardVariantSchema };
//# sourceMappingURL=hra-ui-design-system-cards-action-card.mjs.map
