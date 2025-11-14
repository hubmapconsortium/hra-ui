import * as i0 from '@angular/core';
import { EnvironmentProviders } from '@angular/core';
import * as i1 from '@hra-ui/common/analytics';
import * as _angular_router from '@angular/router';
import { ContentTemplateDef } from '@hra-ui/cdk/content-template';
import * as z from 'zod';

/**
 * Applies hyperlink styles when placed on an <a> tag.
 * Also attaches a click event for analytics.
 */
declare class TextHyperlinkDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<TextHyperlinkDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TextHyperlinkDirective, "a[hraHyperlink]", never, {}, {}, never, never, true, [{ directive: typeof i1.ClickEventDirective; inputs: { "hraClickEvent": "hraHyperlink"; }; outputs: {}; }]>;
}

/**
 * Applies text hyperlink styles when placed on a <button> tag.
 * Also attaches a click event for analytics.
 */
declare class TextButtonDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<TextButtonDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TextButtonDirective, "button[hraTextButton]", never, {}, {}, never, never, true, [{ directive: typeof i1.ClickEventDirective; inputs: { "hraClickEvent": "hraTextButton"; }; outputs: {}; }]>;
}

/**
 * Provides the global styles for text hyperlink elements.
 *
 * @returns Text hyperlink providers
 */
declare function provideTextHyperlink(): EnvironmentProviders;

/**
 * Text hyperlink component
 */
declare class TextHyperlinkComponent {
    /**
     * Text hyperlink component text
     */
    readonly text: i0.InputSignal<string>;
    /**
     * Text hyperlink component href
     */
    readonly url: i0.InputSignal<string>;
    /**
     * Text hyperlink component icon
     */
    readonly icon: i0.InputSignal<string | undefined>;
    /**
     * Text hyperlink component router
     */
    private readonly router;
    /**
     * Text hyperlink component url tree
     */
    protected readonly urlTree: i0.Signal<_angular_router.UrlTree | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<TextHyperlinkComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TextHyperlinkComponent, "hra-text-hyperlink", never, { "text": { "alias": "text"; "required": true; "isSignal": true; }; "url": { "alias": "url"; "required": true; "isSignal": true; }; "icon": { "alias": "icon"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/**
 * Text hyperlink component definition
 */
declare const TextHyperlinkDef: ContentTemplateDef<TextHyperlinkComponent>;

/**
 * Text hyperlink component schema
 */
declare const TextHyperlinkSchema: z.ZodObject<{
    classes: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    styles: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    controllers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
    }, z.core.$loose>>>;
    component: z.ZodLiteral<"TextHyperlink">;
    text: z.ZodString;
    url: z.ZodString;
    icon: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;

export { TextButtonDirective, TextHyperlinkComponent, TextHyperlinkDef, TextHyperlinkDirective, TextHyperlinkSchema, provideTextHyperlink };
