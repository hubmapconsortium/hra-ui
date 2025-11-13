import * as i0 from '@angular/core';
import { input, ChangeDetectionStrategy, Component } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { ContentTemplateSchema, AnyContentTemplateSchema } from '@hra-ui/cdk/content-template';
import * as z from 'zod';

/**
 * Layout component that allows for grid arrangement of child elements.
 */
class GridContainerComponent {
    /** Minimum item width */
    itemMinWidth = input(...(ngDevMode ? [undefined, { debugName: "itemMinWidth" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: GridContainerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.11", type: GridContainerComponent, isStandalone: true, selector: "hra-grid-container", inputs: { itemMinWidth: { classPropertyName: "itemMinWidth", publicName: "itemMinWidth", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "style.--hra-grid-container-item-min-width": "itemMinWidth()" } }, ngImport: i0, template: '<ng-content />', isInline: true, styles: [":host{--_hra-grid-container-item-min-width: var(--hra-grid-container-item-min-width, 17rem);display:grid;gap:1.5rem;grid-template-columns:repeat(auto-fit,minmax(var(--_hra-grid-container-item-min-width),1fr));justify-items:center}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: GridContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-grid-container', imports: [HraCommonModule], template: '<ng-content />', changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[style.--hra-grid-container-item-min-width]': 'itemMinWidth()',
                    }, styles: [":host{--_hra-grid-container-item-min-width: var(--hra-grid-container-item-min-width, 17rem);display:grid;gap:1.5rem;grid-template-columns:repeat(auto-fit,minmax(var(--_hra-grid-container-item-min-width),1fr));justify-items:center}\n"] }]
        }], propDecorators: { itemMinWidth: [{ type: i0.Input, args: [{ isSignal: true, alias: "itemMinWidth", required: false }] }] } });

/** Schema structure of a grid container */
const GridContainerSchema = ContentTemplateSchema.extend({
    component: z.literal('GridContainer'),
    itemMinWidth: z.string().optional(),
    content: AnyContentTemplateSchema.array(),
});

/** GridContainer content template definition */
const GridContainerDef = {
    component: GridContainerComponent,
    spec: GridContainerSchema,
    projectedProperties: {
        '*': 'content',
    },
};

/**
 * Generated bundle index. Do not edit.
 */

export { GridContainerComponent, GridContainerDef, GridContainerSchema };
//# sourceMappingURL=hra-ui-design-system-content-templates-grid-container.mjs.map
