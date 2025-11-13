import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { input, ChangeDetectionStrategy, Component, ViewEncapsulation, makeEnvironmentProviders } from '@angular/core';
import * as i1 from 'ngx-highlightjs';
import { HighlightModule, provideHighlightOptions } from 'ngx-highlightjs';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import * as i2 from 'ngx-scrollbar';
import { provideStyleComponents } from '@hra-ui/cdk/styling';
import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import * as z from 'zod';

/**
 * Component representing a code block.
 * Displays code with syntax highlighting.
 */
class CodeBlockComponent {
    /** Code for the code block */
    code = input.required(...(ngDevMode ? [{ debugName: "code" }] : []));
    /** Language for the code block */
    language = input.required(...(ngDevMode ? [{ debugName: "language" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: CodeBlockComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.11", type: CodeBlockComponent, isStandalone: true, selector: "hra-code-block", inputs: { code: { classPropertyName: "code", publicName: "code", isSignal: true, isRequired: true, transformFunction: null }, language: { classPropertyName: "language", publicName: "language", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: "<ng-scrollbar>\n  <pre class=\"code-block-pre\">\n    <code [highlight]=\"code()\" [language]=\"language()\"></code>\n  </pre>\n</ng-scrollbar>\n", styles: [":host{display:flex;background-color:var(--mat-sys-surface-container);border:solid .0625rem var(--mat-sys-outline-variant);border-radius:.25rem;padding:.75rem;max-height:calc(100vh - 15rem)}:host ng-scrollbar{flex:1 1}:host .code-block-pre{font:var(--mat-sys-code-medium);letter-spacing:var(--mat-sys-code-medium-tracking);margin:0;text-align:left;display:flex;white-space:pre-wrap}:host .code-block-pre code{background-color:var(--mat-sys-surface-container)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: HighlightModule }, { kind: "directive", type: i1.Highlight, selector: "[highlight]", inputs: ["highlight", "language", "ignoreIllegals"], outputs: ["highlighted"] }, { kind: "ngmodule", type: ScrollingModule }, { kind: "component", type: i2.NgScrollbar, selector: "ng-scrollbar:not([externalViewport])", exportAs: ["ngScrollbar"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: CodeBlockComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-code-block', imports: [CommonModule, HighlightModule, ScrollingModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-scrollbar>\n  <pre class=\"code-block-pre\">\n    <code [highlight]=\"code()\" [language]=\"language()\"></code>\n  </pre>\n</ng-scrollbar>\n", styles: [":host{display:flex;background-color:var(--mat-sys-surface-container);border:solid .0625rem var(--mat-sys-outline-variant);border-radius:.25rem;padding:.75rem;max-height:calc(100vh - 15rem)}:host ng-scrollbar{flex:1 1}:host .code-block-pre{font:var(--mat-sys-code-medium);letter-spacing:var(--mat-sys-code-medium-tracking);margin:0;text-align:left;display:flex;white-space:pre-wrap}:host .code-block-pre code{background-color:var(--mat-sys-surface-container)}\n"] }]
        }], propDecorators: { code: [{ type: i0.Input, args: [{ isSignal: true, alias: "code", required: true }] }], language: [{ type: i0.Input, args: [{ isSignal: true, alias: "language", required: true }] }] } });

/** Global styles for code blocks */
class CodeBlockGlobalStylesComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: CodeBlockGlobalStylesComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.11", type: CodeBlockGlobalStylesComponent, isStandalone: true, selector: "hra-code-block-global-styles", ngImport: i0, template: '', isInline: true, styles: ["pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{background:#fff;color:#000}.hljs-comment,.hljs-quote,.hljs-variable{color:green}.hljs-keyword,.hljs-selector-tag,.hljs-built_in,.hljs-name,.hljs-tag{color:#00f}.hljs-string,.hljs-title,.hljs-section,.hljs-attribute,.hljs-literal,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-addition{color:#a31515}.hljs-deletion,.hljs-selector-attr,.hljs-selector-pseudo,.hljs-meta{color:#2b91af}.hljs-doctag{color:gray}.hljs-attr{color:red}.hljs-symbol,.hljs-bullet,.hljs-link{color:#00b0e8}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: CodeBlockGlobalStylesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-code-block-global-styles', template: '', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, styles: ["pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{background:#fff;color:#000}.hljs-comment,.hljs-quote,.hljs-variable{color:green}.hljs-keyword,.hljs-selector-tag,.hljs-built_in,.hljs-name,.hljs-tag{color:#00f}.hljs-string,.hljs-title,.hljs-section,.hljs-attribute,.hljs-literal,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-addition{color:#a31515}.hljs-deletion,.hljs-selector-attr,.hljs-selector-pseudo,.hljs-meta{color:#2b91af}.hljs-doctag{color:gray}.hljs-attr{color:red}.hljs-symbol,.hljs-bullet,.hljs-link{color:#00b0e8}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}\n"] }]
        }] });

/** Provide the code block component and its dependencies to highlight code. */
function provideCodeBlock() {
    return makeEnvironmentProviders([
        provideHighlightOptions({
            coreLibraryLoader: () => import('highlight.js/lib/core'),
            lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'),
            languages: {
                javascript: () => import('highlight.js/lib/languages/javascript'),
                typescript: () => import('highlight.js/lib/languages/typescript'),
                css: () => import('highlight.js/lib/languages/css'),
                xml: () => import('highlight.js/lib/languages/xml'),
                bash: () => import('highlight.js/lib/languages/bash'),
                python: () => import('highlight.js/lib/languages/python'),
                sql: () => import('highlight.js/lib/languages/sql'),
            },
        }),
        provideStyleComponents(CodeBlockGlobalStylesComponent),
    ]);
}

/** Schema for Code Block component */
const CodeBlockSchema = ContentTemplateSchema.extend({
    component: z.literal('CodeBlock'),
    code: z.string().optional(),
    language: z.string().optional(),
});

/** Content template definition for MarkdownComponent */
const CodeBlockDef = {
    component: CodeBlockComponent,
    spec: CodeBlockSchema,
};

/**
 * Generated bundle index. Do not edit.
 */

export { CodeBlockComponent, CodeBlockDef, CodeBlockSchema, provideCodeBlock };
//# sourceMappingURL=hra-ui-design-system-code-block.mjs.map
