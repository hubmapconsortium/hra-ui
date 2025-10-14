import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { input, ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Step indicator for module components that have multiple steps
 */
class StepIndicatorComponent {
    /** Step value */
    value = input.required(...(ngDevMode ? [{ debugName: "value" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: StepIndicatorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.3", type: StepIndicatorComponent, isStandalone: true, selector: "hra-step-indicator", inputs: { value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: "<span class=\"step-number\">{{ value() }}</span>\n", styles: [":host .step-number{font:var(--mat-sys-label-large);letter-spacing:var(--mat-sys-label-large-tracking);background-color:var(--mat-sys-inverse-surface);color:var(--mat-sys-on-primary);display:flex;width:2rem;height:2rem;line-height:2rem;border-radius:50%;justify-content:center;align-items:center}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: StepIndicatorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-step-indicator', imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<span class=\"step-number\">{{ value() }}</span>\n", styles: [":host .step-number{font:var(--mat-sys-label-large);letter-spacing:var(--mat-sys-label-large-tracking);background-color:var(--mat-sys-inverse-surface);color:var(--mat-sys-on-primary);display:flex;width:2rem;height:2rem;line-height:2rem;border-radius:50%;justify-content:center;align-items:center}\n"] }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { StepIndicatorComponent };
//# sourceMappingURL=hra-ui-design-system-indicators-step-indicator.mjs.map
