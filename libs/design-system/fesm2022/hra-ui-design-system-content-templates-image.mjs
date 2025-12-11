import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { input, ChangeDetectionStrategy, Component } from '@angular/core';
import { AssetUrlPipe } from '@hra-ui/common/url';
import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import * as z from 'zod';

/**
 * Component for displaying an image in the content template
 */
class ImageComponent {
    /** Image src */
    src = input.required(...(ngDevMode ? [{ debugName: "src" }] : []));
    /** Image alt text */
    alt = input(...(ngDevMode ? [undefined, { debugName: "alt" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ImageComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.15", type: ImageComponent, isStandalone: true, selector: "hra-image", inputs: { src: { classPropertyName: "src", publicName: "src", isSignal: true, isRequired: true, transformFunction: null }, alt: { classPropertyName: "alt", publicName: "alt", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: '<img [src]="src() | assetUrl" [alt]="alt()"/>', isInline: true, styles: [":host{display:block}:host img{width:100%}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "pipe", type: AssetUrlPipe, name: "assetUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ImageComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-image', imports: [CommonModule, AssetUrlPipe], template: '<img [src]="src() | assetUrl" [alt]="alt()"/>', changeDetection: ChangeDetectionStrategy.OnPush, styles: [":host{display:block}:host img{width:100%}\n"] }]
        }], propDecorators: { src: [{ type: i0.Input, args: [{ isSignal: true, alias: "src", required: true }] }], alt: [{ type: i0.Input, args: [{ isSignal: true, alias: "alt", required: false }] }] } });

/** Schema for image component */
const ImageSchema = ContentTemplateSchema.extend({
    component: z.literal('Image'),
    src: z.string(),
    alt: z.string().optional(),
}).meta({ id: 'Image' });

/** Content template definition for ImageComponent */
const ImageDef = {
    component: ImageComponent,
    spec: ImageSchema,
};

/**
 * Generated bundle index. Do not edit.
 */

export { ImageComponent, ImageDef, ImageSchema };
//# sourceMappingURL=hra-ui-design-system-content-templates-image.mjs.map
