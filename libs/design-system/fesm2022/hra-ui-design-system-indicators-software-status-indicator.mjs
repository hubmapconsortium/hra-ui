import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { input, computed, Directive, ChangeDetectionStrategy, Component } from '@angular/core';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';

/** Record of button fonts */
const STATUS_FONTS = {
    small: 'var(--mat-sys-label-micro)',
    medium: 'var(--mat-sys-label-medium)',
    large: 'var(--mat-sys-label-large)',
};
/**
 * Directive for icon buttons
 */
class SoftwareStatusSizeDirective {
    /** Size of icon button to use */
    size = input.required(...(ngDevMode ? [{ debugName: "size", alias: 'hraSoftwareStatusSize' }] : [{ alias: 'hraSoftwareStatusSize' }]));
    /** Font */
    font = computed(() => STATUS_FONTS[this.size()], ...(ngDevMode ? [{ debugName: "font" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: SoftwareStatusSizeDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.7", type: SoftwareStatusSizeDirective, isStandalone: true, selector: "[hraSoftwareStatusSize]", inputs: { size: { classPropertyName: "size", publicName: "hraSoftwareStatusSize", isSignal: true, isRequired: true, transformFunction: null } }, host: { properties: { "style.font": "font()" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: SoftwareStatusSizeDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[hraSoftwareStatusSize]',
                    standalone: true,
                    host: {
                        '[style.font]': 'font()',
                    },
                }]
        }], propDecorators: { size: [{ type: i0.Input, args: [{ isSignal: true, alias: "hraSoftwareStatusSize", required: true }] }] } });

/**
 * Indicator to display software status in nav header
 */
class SoftwareStatusIndicatorComponent {
    /** Current status of app */
    status = input.required(...(ngDevMode ? [{ debugName: "status" }] : []));
    /** Size of indicator */
    size = input('medium', ...(ngDevMode ? [{ debugName: "size" }] : []));
    /** Tooltips corresponding to software status */
    tooltips = {
        Preview: 'Earliest development stage: Core features are under construction and evolving.',
        Alpha: 'Early testing stage: Features may change. Expect bugs and incomplete functionality.',
        Beta: 'Near-final stage: Most features are ready, fewer bugs, and more feedback is needed.',
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: SoftwareStatusIndicatorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.7", type: SoftwareStatusIndicatorComponent, isStandalone: true, selector: "hra-software-status-indicator", inputs: { status: { classPropertyName: "status", publicName: "status", isSignal: true, isRequired: true, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<div\n  class=\"app-description\"\n  [hraSoftwareStatusSize]=\"size()\"\n  [hraPlainTooltip]=\"tooltips[status()]\"\n  hraPlainTooltipSize=\"small\"\n>\n  {{ status() }}\n</div>\n", styles: [":host .app-description{font:var(--mat-sys-label-micro);letter-spacing:var(--mat-sys-label-micro-tracking);border-radius:.125rem;width:fit-content;padding:.125rem .25rem;color:var(--mat-sys-on-tertiary-fixed);background:rgb(from var(--mat-sys-on-tertiary-container) r g b/.08);cursor:default}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: PlainTooltipDirective, selector: "[hraPlainTooltip]", inputs: ["hraPlainTooltipSize"] }, { kind: "directive", type: SoftwareStatusSizeDirective, selector: "[hraSoftwareStatusSize]", inputs: ["hraSoftwareStatusSize"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: SoftwareStatusIndicatorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-software-status-indicator', imports: [CommonModule, PlainTooltipDirective, SoftwareStatusSizeDirective], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  class=\"app-description\"\n  [hraSoftwareStatusSize]=\"size()\"\n  [hraPlainTooltip]=\"tooltips[status()]\"\n  hraPlainTooltipSize=\"small\"\n>\n  {{ status() }}\n</div>\n", styles: [":host .app-description{font:var(--mat-sys-label-micro);letter-spacing:var(--mat-sys-label-micro-tracking);border-radius:.125rem;width:fit-content;padding:.125rem .25rem;color:var(--mat-sys-on-tertiary-fixed);background:rgb(from var(--mat-sys-on-tertiary-container) r g b/.08);cursor:default}\n"] }]
        }], propDecorators: { status: [{ type: i0.Input, args: [{ isSignal: true, alias: "status", required: true }] }], size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { SoftwareStatusIndicatorComponent };
//# sourceMappingURL=hra-ui-design-system-indicators-software-status-indicator.mjs.map
