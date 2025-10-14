import * as _angular_core from '@angular/core';
import { EnvironmentProviders } from '@angular/core';
import { ContentTemplateDef } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

/**
 * Component representing a code block.
 * Displays code with syntax highlighting.
 */
declare class CodeBlockComponent {
    /** Code for the code block */
    readonly code: _angular_core.InputSignal<string>;
    /** Language for the code block */
    readonly language: _angular_core.InputSignal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<CodeBlockComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<CodeBlockComponent, "hra-code-block", never, { "code": { "alias": "code"; "required": true; "isSignal": true; }; "language": { "alias": "language"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

/** Provide the code block component and its dependencies to highlight code. */
declare function provideCodeBlock(): EnvironmentProviders;

/** Content template definition for MarkdownComponent */
declare const CodeBlockDef: ContentTemplateDef<CodeBlockComponent>;

/** Code Block component data */
type CodeBlock = z.infer<typeof CodeBlockSchema>;
/** Schema for Code Block component */
declare const CodeBlockSchema: z.ZodObject<{
    classes: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    styles: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    controllers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
    }, z.core.$loose>>>;
    component: z.ZodLiteral<"CodeBlock">;
    code: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;

export { CodeBlockComponent, CodeBlockDef, CodeBlockSchema, provideCodeBlock };
export type { CodeBlock };
