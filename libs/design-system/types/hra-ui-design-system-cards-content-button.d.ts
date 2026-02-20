import * as _angular_core from '@angular/core';
import * as z from 'zod';

/**
 * Content button action card component
 */
declare class ContentButtonComponent {
    /** Image url */
    readonly imageSrc: _angular_core.InputSignal<string>;
    /** Date to display on card */
    readonly date: _angular_core.InputSignal<string>;
    /** Card tagline (less than 2 lines or truncated) */
    readonly tagline: _angular_core.InputSignal<string>;
    /** Tags to display on bottom of card */
    readonly tags: _angular_core.InputSignal<string[] | undefined>;
    /** Url for the button */
    readonly link: _angular_core.InputSignal<string>;
    /** Whether the link is external */
    readonly external: _angular_core.InputSignalWithTransform<boolean, unknown>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ContentButtonComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<ContentButtonComponent, "hra-content-button", never, { "imageSrc": { "alias": "imageSrc"; "required": true; "isSignal": true; }; "date": { "alias": "date"; "required": true; "isSignal": true; }; "tagline": { "alias": "tagline"; "required": true; "isSignal": true; }; "tags": { "alias": "tags"; "required": false; "isSignal": true; }; "link": { "alias": "link"; "required": true; "isSignal": true; }; "external": { "alias": "external"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/** Content button action card type */
type ContentButton = z.infer<typeof ContentButtonSchema>;
/** Schema for content button action card data */
declare const ContentButtonSchema: z.ZodObject<{
    classes: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    styles: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    controllers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
    }, z.core.$loose>>>;
    component: z.ZodLiteral<"ContentButton">;
    imageSrc: z.ZodString;
    date: z.ZodString;
    tagline: z.ZodString;
    tags: z.ZodOptional<z.ZodArray<z.ZodString>>;
    link: z.ZodString;
    external: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;

export { ContentButtonComponent, ContentButtonSchema };
export type { ContentButton };
