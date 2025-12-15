import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { input, computed, ChangeDetectionStrategy, Component } from '@angular/core';
import * as i1 from '@angular/material/progress-spinner';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * HRA Progress Spinner Component
 */
class ProgressSpinnerComponent {
    /**
     * Field for variant option
     */
    size = input('large', ...(ngDevMode ? [{ debugName: "size" }] : []));
    /**
     * Field for color option
     */
    color = input.required(...(ngDevMode ? [{ debugName: "color" }] : []));
    /**
     * Computed field for the diameter of the spinner.
     */
    diameter = computed(() => {
        return this.size() === 'small' ? 24 : 48;
    }, ...(ngDevMode ? [{ debugName: "diameter" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ProgressSpinnerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.15", type: ProgressSpinnerComponent, isStandalone: true, selector: "hra-progress-spinner", inputs: { size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, color: { classPropertyName: "color", publicName: "color", isSignal: true, isRequired: true, transformFunction: null } }, host: { properties: { "class": "\"hra-spinner-color-\" + color()" } }, ngImport: i0, template: "<mat-spinner mode=\"indeterminate\" [diameter]=\"diameter()\" />\n", styles: [":host{display:block}:host.hra-spinner-color-dark{--mat-progress-spinner-active-indicator-color: var(--mat-sys-secondary)}:host.hra-spinner-color-light{--mat-progress-spinner-active-indicator-color: var(--mat-sys-on-secondary)}:host.hra-spinner-color-color{--mat-progress-spinner-active-indicator-color: var(--mat-sys-on-tertiary-fixed)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: MatProgressSpinnerModule }, { kind: "component", type: i1.MatProgressSpinner, selector: "mat-progress-spinner, mat-spinner", inputs: ["color", "mode", "value", "diameter", "strokeWidth"], exportAs: ["matProgressSpinner"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ProgressSpinnerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-progress-spinner', imports: [CommonModule, MatProgressSpinnerModule], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[class]': '"hra-spinner-color-" + color()',
                    }, template: "<mat-spinner mode=\"indeterminate\" [diameter]=\"diameter()\" />\n", styles: [":host{display:block}:host.hra-spinner-color-dark{--mat-progress-spinner-active-indicator-color: var(--mat-sys-secondary)}:host.hra-spinner-color-light{--mat-progress-spinner-active-indicator-color: var(--mat-sys-on-secondary)}:host.hra-spinner-color-color{--mat-progress-spinner-active-indicator-color: var(--mat-sys-on-tertiary-fixed)}\n"] }]
        }], propDecorators: { size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }], color: [{ type: i0.Input, args: [{ isSignal: true, alias: "color", required: true }] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { ProgressSpinnerComponent };
//# sourceMappingURL=hra-ui-design-system-indicators-progress-spinner.mjs.map
