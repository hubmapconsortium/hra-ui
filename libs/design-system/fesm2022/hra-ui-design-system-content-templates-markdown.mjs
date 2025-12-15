import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { input, inject, ElementRef, Renderer2, DestroyRef, ChangeDetectionStrategy, Component } from '@angular/core';
import { injectLogEvent } from '@hra-ui/common/analytics';
import { CoreEvents } from '@hra-ui/common/analytics/events';
import { AssetUrlPipe } from '@hra-ui/common/url';
import { MarkdownComponent as MarkdownComponent$1 } from 'ngx-markdown';
import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import * as z from 'zod';

/**
 * Markdown wrapper component to load markdown from a source file.
 */
class MarkdownComponent {
    /** Markdown data input */
    data = input(...(ngDevMode ? [undefined, { debugName: "data" }] : []));
    /** Markdown source file input */
    src = input(...(ngDevMode ? [undefined, { debugName: "src" }] : []));
    /** Component's host element */
    hostEl = inject(ElementRef).nativeElement;
    /** Dom renderer reference */
    renderer = inject(Renderer2);
    /** Analytics event logger */
    logEvent = injectLogEvent();
    /** List of unlisten functions */
    listeners = [];
    /** Attach cleanup on component destruction */
    constructor() {
        inject(DestroyRef).onDestroy(() => this.clearEventListeners());
    }
    /** Attach event listeners to rendered markdown content */
    attachEventListeners() {
        this.attachAnchorClickListeners();
    }
    /** Clear all active event listeners from the markdown */
    clearEventListeners() {
        this.listeners.forEach((unlisten) => unlisten());
        this.listeners = [];
    }
    /** Attach click event listeners to all anchor tags in the markdown */
    attachAnchorClickListeners() {
        const { hostEl, listeners, logEvent, renderer } = this;
        const elems = hostEl.querySelectorAll('a');
        const onClick = (event) => logEvent(CoreEvents.Click, {
            trigger: 'click',
            triggerData: event,
        });
        elems.forEach((el) => listeners.push(renderer.listen(el, 'click', onClick)));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: MarkdownComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.15", type: MarkdownComponent, isStandalone: true, selector: "hra-markdown", inputs: { data: { classPropertyName: "data", publicName: "data", isSignal: true, isRequired: false, transformFunction: null }, src: { classPropertyName: "src", publicName: "src", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<markdown\n  [data]=\"data()\"\n  [src]=\"src() ? (src()! | assetUrl) : undefined\"\n  (ready)=\"clearEventListeners(); attachEventListeners()\"\n/>\n", styles: [":host{display:block}:host markdown ::ng-deep p{margin:.75rem 0;line-height:1.6875rem}:host markdown ::ng-deep *:first-child{margin-top:0}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: MarkdownComponent$1, selector: "markdown, [markdown]", inputs: ["data", "src", "disableSanitizer", "inline", "clipboard", "clipboardButtonComponent", "clipboardButtonTemplate", "emoji", "katex", "katexOptions", "mermaid", "mermaidOptions", "lineHighlight", "line", "lineOffset", "lineNumbers", "start", "commandLine", "filterOutput", "host", "prompt", "output", "user"], outputs: ["error", "load", "ready"] }, { kind: "pipe", type: AssetUrlPipe, name: "assetUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: MarkdownComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-markdown', imports: [CommonModule, MarkdownComponent$1, AssetUrlPipe], changeDetection: ChangeDetectionStrategy.OnPush, template: "<markdown\n  [data]=\"data()\"\n  [src]=\"src() ? (src()! | assetUrl) : undefined\"\n  (ready)=\"clearEventListeners(); attachEventListeners()\"\n/>\n", styles: [":host{display:block}:host markdown ::ng-deep p{margin:.75rem 0;line-height:1.6875rem}:host markdown ::ng-deep *:first-child{margin-top:0}\n"] }]
        }], ctorParameters: () => [], propDecorators: { data: [{ type: i0.Input, args: [{ isSignal: true, alias: "data", required: false }] }], src: [{ type: i0.Input, args: [{ isSignal: true, alias: "src", required: false }] }] } });

/** Schema for markdown component */
const MarkdownSchema = ContentTemplateSchema.extend({
    component: z.literal('Markdown'),
    data: z.string().optional(),
    src: z.string().optional(),
}).meta({ id: 'Markdown' });

/** Content template definition for MarkdownComponent */
const MarkdownDef = {
    component: MarkdownComponent,
    spec: MarkdownSchema,
};

/**
 * Generated bundle index. Do not edit.
 */

export { MarkdownComponent, MarkdownDef, MarkdownSchema };
//# sourceMappingURL=hra-ui-design-system-content-templates-markdown.mjs.map
