import { ContentTemplateDef } from '@hra-ui/cdk/content-template';
import * as _angular_core from '@angular/core';
import * as z from 'zod';

/**
 * Component for displaying an image in the content template
 */
declare class ImageComponent {
    /** Image src */
    readonly src: _angular_core.InputSignal<string>;
    /** Image alt text */
    readonly alt: _angular_core.InputSignal<string | undefined>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ImageComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<ImageComponent, "hra-image", never, { "src": { "alias": "src"; "required": true; "isSignal": true; }; "alt": { "alias": "alt"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/** Content template definition for ImageComponent */
declare const ImageDef: ContentTemplateDef<ImageComponent>;

/** Schema for image component */
declare const ImageSchema: z.ZodObject<{
    classes: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    styles: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    controllers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
    }, z.core.$loose>>>;
    component: z.ZodLiteral<"Image">;
    src: z.ZodString;
    alt: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;

export { ImageComponent, ImageDef, ImageSchema };
