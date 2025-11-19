import * as i0 from '@angular/core';
import { ViewEncapsulation, ChangeDetectionStrategy, Component, input, inject, effect, Directive } from '@angular/core';
import * as i1 from '@angular/material/tooltip';
import { MatTooltip } from '@angular/material/tooltip';
import { registerStyleComponents } from '@hra-ui/cdk/styling';

/**
 * Applies plain tooltip styles globally
 */
class PlainTooltipStylesComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: PlainTooltipStylesComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.12", type: PlainTooltipStylesComponent, isStandalone: true, selector: "hra-plain-tooltip-styles", ngImport: i0, template: '', isInline: true, styles: [".hra-app .hra-plain-tooltip{--mat-tooltip-supporting-text-color: var(--mat-sys-on-primary);--mat-tooltip-container-color: color-mix(in srgb, var(--mat-sys-secondary) 96%, transparent)}.hra-app .hra-plain-tooltip .mat-mdc-tooltip-surface{padding:.25rem .5rem;letter-spacing:unset;max-width:18.5rem;text-align:left}.hra-app .hra-plain-tooltip-medium .mat-mdc-tooltip-surface{font:var(--mat-sys-label-medium)}.hra-app .hra-plain-tooltip-small .mat-mdc-tooltip-surface{font:var(--mat-sys-label-small)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: PlainTooltipStylesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-plain-tooltip-styles', template: '', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, styles: [".hra-app .hra-plain-tooltip{--mat-tooltip-supporting-text-color: var(--mat-sys-on-primary);--mat-tooltip-container-color: color-mix(in srgb, var(--mat-sys-secondary) 96%, transparent)}.hra-app .hra-plain-tooltip .mat-mdc-tooltip-surface{padding:.25rem .5rem;letter-spacing:unset;max-width:18.5rem;text-align:left}.hra-app .hra-plain-tooltip-medium .mat-mdc-tooltip-surface{font:var(--mat-sys-label-medium)}.hra-app .hra-plain-tooltip-small .mat-mdc-tooltip-surface{font:var(--mat-sys-label-small)}\n"] }]
        }] });

/** Directive for Tooltip */
class PlainTooltipDirective {
    /** Size of the tooltip */
    size = input('medium', ...(ngDevMode ? [{ debugName: "size", alias: 'hraPlainTooltipSize' }] : [{ alias: 'hraPlainTooltipSize' }]));
    /** Instance of MatTooltip */
    tooltip = inject(MatTooltip);
    /** Registers the styles and sets class names for the tooltip container */
    constructor() {
        registerStyleComponents([PlainTooltipStylesComponent]);
        effect(() => {
            this.tooltip.tooltipClass = ['hra-plain-tooltip', `hra-plain-tooltip-${this.size()}`];
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: PlainTooltipDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.12", type: PlainTooltipDirective, isStandalone: true, selector: "[hraPlainTooltip]", inputs: { size: { classPropertyName: "size", publicName: "hraPlainTooltipSize", isSignal: true, isRequired: false, transformFunction: null } }, hostDirectives: [{ directive: i1.MatTooltip, inputs: ["matTooltip", "hraPlainTooltip", "matTooltipPosition", "hraPlainTooltipPosition"] }], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: PlainTooltipDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[hraPlainTooltip]',
                    hostDirectives: [
                        {
                            directive: MatTooltip,
                            inputs: ['matTooltip: hraPlainTooltip', 'matTooltipPosition: hraPlainTooltipPosition'],
                        },
                    ],
                }]
        }], ctorParameters: () => [], propDecorators: { size: [{ type: i0.Input, args: [{ isSignal: true, alias: "hraPlainTooltipSize", required: false }] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { PlainTooltipDirective };
//# sourceMappingURL=hra-ui-design-system-tooltips-plain-tooltip.mjs.map
