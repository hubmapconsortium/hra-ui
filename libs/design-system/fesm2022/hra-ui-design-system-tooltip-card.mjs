import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { input, booleanAttribute, ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Tooltip Card component
 */
class TooltipCardComponent {
    /** Input for the card */
    content = input.required(...(ngDevMode ? [{ debugName: "content" }] : []));
    /** Flag to decide whether the card is small */
    small = input(false, ...(ngDevMode ? [{ debugName: "small", transform: booleanAttribute }] : [{ transform: booleanAttribute }]));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: TooltipCardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.11", type: TooltipCardComponent, isStandalone: true, selector: "hra-tooltip-card", inputs: { content: { classPropertyName: "content", publicName: "content", isSignal: true, isRequired: true, transformFunction: null }, small: { classPropertyName: "small", publicName: "small", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "class.small": "small()" } }, ngImport: i0, template: "@for (item of content(); track item) {\n  <section class=\"section\">\n    @if (item.title) {\n      <h4 class=\"title\">{{ item.title }}</h4>\n    }\n    <p class=\"description\">{{ item.description }}</p>\n  </section>\n}\n", styles: [":host{display:block;max-width:28rem;padding:.75rem 1rem;border-radius:.5rem;box-shadow:0 .3125rem 1rem rgb(from var(--mat-sys-shadow) r g b/.322);font:var(--mat-sys-label-large);letter-spacing:var(--mat-sys-label-large-tracking);background:var(--mat-sys-on-primary)}:host .title{margin:0;font-weight:inherit;color:var(--mat-sys-secondary)}:host .description{margin:0 0 1rem;color:var(--mat-sys-primary);white-space:pre-line}:host .section:last-child .description{margin:0}:host.small{max-width:21rem;font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: TooltipCardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-tooltip-card', imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[class.small]': 'small()',
                    }, template: "@for (item of content(); track item) {\n  <section class=\"section\">\n    @if (item.title) {\n      <h4 class=\"title\">{{ item.title }}</h4>\n    }\n    <p class=\"description\">{{ item.description }}</p>\n  </section>\n}\n", styles: [":host{display:block;max-width:28rem;padding:.75rem 1rem;border-radius:.5rem;box-shadow:0 .3125rem 1rem rgb(from var(--mat-sys-shadow) r g b/.322);font:var(--mat-sys-label-large);letter-spacing:var(--mat-sys-label-large-tracking);background:var(--mat-sys-on-primary)}:host .title{margin:0;font-weight:inherit;color:var(--mat-sys-secondary)}:host .description{margin:0 0 1rem;color:var(--mat-sys-primary);white-space:pre-line}:host .section:last-child .description{margin:0}:host.small{max-width:21rem;font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking)}\n"] }]
        }], propDecorators: { content: [{ type: i0.Input, args: [{ isSignal: true, alias: "content", required: true }] }], small: [{ type: i0.Input, args: [{ isSignal: true, alias: "small", required: false }] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { TooltipCardComponent };
//# sourceMappingURL=hra-ui-design-system-tooltip-card.mjs.map
