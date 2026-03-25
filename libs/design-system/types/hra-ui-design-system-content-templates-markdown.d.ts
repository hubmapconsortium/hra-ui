import { ContentTemplateDef } from '@hra-ui/cdk/content-template';
import * as _angular_core from '@angular/core';
import * as z from 'zod';

/**
 * Markdown wrapper component to load markdown from a source file.
 */
declare class MarkdownComponent {
    /** Markdown data input */
    readonly data: _angular_core.InputSignal<string | undefined>;
    /** Markdown source file input */
    readonly src: _angular_core.InputSignal<string | undefined>;
    /** Component's host element */
    private readonly hostEl;
    /** Dom renderer reference */
    private readonly renderer;
    /** Analytics event logger */
    private readonly logEvent;
    /** List of unlisten functions */
    private listeners;
    /** Attach cleanup on component destruction */
    constructor();
    /** Attach event listeners to rendered markdown content */
    attachEventListeners(): void;
    /** Clear all active event listeners from the markdown */
    clearEventListeners(): void;
    /** Attach click event listeners to all anchor tags in the markdown */
    private attachAnchorClickListeners;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<MarkdownComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<MarkdownComponent, "hra-markdown", never, { "data": { "alias": "data"; "required": false; "isSignal": true; }; "src": { "alias": "src"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/** Content template definition for MarkdownComponent */
declare const MarkdownDef: ContentTemplateDef<MarkdownComponent>;

/** Markdown component data */
type Markdown = z.infer<typeof MarkdownSchema>;
/** Schema for markdown component */
declare const MarkdownSchema: z.ZodObject<{
    classes: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    styles: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    controllers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
    }, z.core.$loose>>>;
    component: z.ZodLiteral<"Markdown">;
    data: z.ZodOptional<z.ZodString>;
    src: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;

export { MarkdownComponent, MarkdownDef, MarkdownSchema };
export type { Markdown };
