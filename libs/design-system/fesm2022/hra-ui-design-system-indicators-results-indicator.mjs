import * as i0 from '@angular/core';
import { input, numberAttribute, ChangeDetectionStrategy, Component } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';

/** Results Indicator Component */
class ResultsIndicatorComponent {
    /** Input for value */
    value = input.required(...(ngDevMode ? [{ debugName: "value", transform: numberAttribute }] : [{ transform: numberAttribute }]));
    /** Input for total */
    total = input.required(...(ngDevMode ? [{ debugName: "total", transform: numberAttribute }] : [{ transform: numberAttribute }]));
    /** Input for description */
    description = input.required(...(ngDevMode ? [{ debugName: "description" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: ResultsIndicatorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.9", type: ResultsIndicatorComponent, isStandalone: true, selector: "hra-results-indicator", inputs: { value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: true, transformFunction: null }, total: { classPropertyName: "total", publicName: "total", isSignal: true, isRequired: true, transformFunction: null }, description: { classPropertyName: "description", publicName: "description", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: "<span>{{ description() }} {{ value() | number }} {{ 'of ' }} {{ total() | number }}</span>\n", styles: [":host{--hra-results-indicator-height: 3rem;display:inline-flex;justify-content:center;align-items:center;height:var(--hra-results-indicator-height);color:var(--mat-sys-primary);padding:.5rem .75rem;border:.0625rem solid var(--mat-sys-outline-variant);border-radius:.25rem;font:var(--mat-sys-label-small);letter-spacing:var(--mat-sys-label-small-tracking)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "pipe", type: i1.DecimalPipe, name: "number" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: ResultsIndicatorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-results-indicator', imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<span>{{ description() }} {{ value() | number }} {{ 'of ' }} {{ total() | number }}</span>\n", styles: [":host{--hra-results-indicator-height: 3rem;display:inline-flex;justify-content:center;align-items:center;height:var(--hra-results-indicator-height);color:var(--mat-sys-primary);padding:.5rem .75rem;border:.0625rem solid var(--mat-sys-outline-variant);border-radius:.25rem;font:var(--mat-sys-label-small);letter-spacing:var(--mat-sys-label-small-tracking)}\n"] }]
        }], propDecorators: { value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: true }] }], total: [{ type: i0.Input, args: [{ isSignal: true, alias: "total", required: true }] }], description: [{ type: i0.Input, args: [{ isSignal: true, alias: "description", required: true }] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { ResultsIndicatorComponent };
//# sourceMappingURL=hra-ui-design-system-indicators-results-indicator.mjs.map
