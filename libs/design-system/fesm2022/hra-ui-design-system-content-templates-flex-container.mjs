import * as i0 from '@angular/core';
import { input, ChangeDetectionStrategy, Component } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { ContentTemplateSchema, AnyContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

/**
 * Layout component that allows for flexible arrangement of child elements.
 */
class FlexContainerComponent {
    /** Row gap between items */
    rowGap = input(...(ngDevMode ? [undefined, { debugName: "rowGap" }] : []));
    /** Column gap between items */
    columnGap = input(...(ngDevMode ? [undefined, { debugName: "columnGap" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: FlexContainerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.7", type: FlexContainerComponent, isStandalone: true, selector: "hra-flex-container", inputs: { rowGap: { classPropertyName: "rowGap", publicName: "rowGap", isSignal: true, isRequired: false, transformFunction: null }, columnGap: { classPropertyName: "columnGap", publicName: "columnGap", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "style.row-gap": "rowGap()", "style.column-gap": "columnGap()" } }, ngImport: i0, template: '<ng-content />', isInline: true, styles: [":host{display:flex;flex-wrap:wrap}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: FlexContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-flex-container', imports: [HraCommonModule], template: '<ng-content />', changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[style.row-gap]': 'rowGap()',
                        '[style.column-gap]': 'columnGap()',
                    }, styles: [":host{display:flex;flex-wrap:wrap}\n"] }]
        }], propDecorators: { rowGap: [{ type: i0.Input, args: [{ isSignal: true, alias: "rowGap", required: false }] }], columnGap: [{ type: i0.Input, args: [{ isSignal: true, alias: "columnGap", required: false }] }] } });

/** Schema structure of a flex container */
const FlexContainerSchema = ContentTemplateSchema.extend({
    component: z.literal('FlexContainer'),
    rowGap: z.string().optional(),
    columnGap: z.string().optional(),
    content: AnyContentTemplateSchema.array(),
});

/** FlexContainer content template definition */
const FlexContainerDef = {
    component: FlexContainerComponent,
    spec: FlexContainerSchema,
    projectedProperties: {
        '*': 'content',
    },
};

/**
 * Generated bundle index. Do not edit.
 */

export { FlexContainerComponent, FlexContainerDef, FlexContainerSchema };
//# sourceMappingURL=hra-ui-design-system-content-templates-flex-container.mjs.map
