import * as i0 from '@angular/core';
import { input, numberAttribute, ChangeDetectionStrategy, Component } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';

/**
 * End of Results Indicator Component
 */
class EndOfResultsIndicatorComponent {
    /** Count of filtered results */
    count = input.required(...(ngDevMode ? [{ debugName: "count", transform: numberAttribute }] : [{ transform: numberAttribute }]));
    /** Label text for results count */
    label = input('Results:', ...(ngDevMode ? [{ debugName: "label" }] : []));
    /** Description text */
    description = input('End of results', ...(ngDevMode ? [{ debugName: "description" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: EndOfResultsIndicatorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.12", type: EndOfResultsIndicatorComponent, isStandalone: true, selector: "hra-end-of-results-indicator", inputs: { count: { classPropertyName: "count", publicName: "count", isSignal: true, isRequired: true, transformFunction: null }, label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: false, transformFunction: null }, description: { classPropertyName: "description", publicName: "description", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<div class=\"results-count\">{{ label() }} {{ count() | number }}</div>\n<div class=\"end-message\">{{ description() }}</div>\n", styles: [":host{display:flex;width:100%;gap:.75rem;justify-content:center;align-items:center;padding:1rem}:host .results-count,:host .end-message{display:flex;justify-content:center;align-items:center;min-width:5rem;padding:.5rem 1rem;border:.0625rem solid var(--mat-sys-outline-variant);border-radius:.25rem;background-color:var(--mat-sys-on-primary);color:var(--mat-sys-primary);font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking)}@media(max-width:39.9375rem){:host{flex-direction:column;gap:.75rem}:host .results-count,:host .end-message{width:100%}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "pipe", type: i1.DecimalPipe, name: "number" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: EndOfResultsIndicatorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-end-of-results-indicator', imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"results-count\">{{ label() }} {{ count() | number }}</div>\n<div class=\"end-message\">{{ description() }}</div>\n", styles: [":host{display:flex;width:100%;gap:.75rem;justify-content:center;align-items:center;padding:1rem}:host .results-count,:host .end-message{display:flex;justify-content:center;align-items:center;min-width:5rem;padding:.5rem 1rem;border:.0625rem solid var(--mat-sys-outline-variant);border-radius:.25rem;background-color:var(--mat-sys-on-primary);color:var(--mat-sys-primary);font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking)}@media(max-width:39.9375rem){:host{flex-direction:column;gap:.75rem}:host .results-count,:host .end-message{width:100%}}\n"] }]
        }], propDecorators: { count: [{ type: i0.Input, args: [{ isSignal: true, alias: "count", required: true }] }], label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: false }] }], description: [{ type: i0.Input, args: [{ isSignal: true, alias: "description", required: false }] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { EndOfResultsIndicatorComponent };
//# sourceMappingURL=hra-ui-design-system-indicators-end-of-results.mjs.map
