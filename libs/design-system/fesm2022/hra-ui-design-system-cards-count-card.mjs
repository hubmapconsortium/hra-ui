import * as i0 from '@angular/core';
import { input, signal, effect, ChangeDetectionStrategy, Component } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import * as i1 from '@hra-ui/design-system/icons';
import { IconsModule } from '@hra-ui/design-system/icons';
import * as i2 from '@angular/common';

/**
 * Component representing a count card.
 * Displays a count, a label, and an icon.
 */
class CountCardComponent {
    /** Count */
    count = input.required(...(ngDevMode ? [{ debugName: "count" }] : []));
    /** Show suffix for the count */
    suffix = input(...(ngDevMode ? [undefined, { debugName: "suffix" }] : []));
    /** Label text*/
    label = input.required(...(ngDevMode ? [{ debugName: "label" }] : []));
    /** Icon */
    icon = input.required(...(ngDevMode ? [{ debugName: "icon" }] : []));
    /** Number currently displayed in count */
    currentCount = signal(0, ...(ngDevMode ? [{ debugName: "currentCount" }] : []));
    /**
     * Constructor that initializes the count card component.
     * Starts the count up animation.
     */
    constructor() {
        effect((onCleanup) => {
            const cleanup = this.startCountUp(this.count(), 100);
            onCleanup(cleanup);
        });
    }
    /**
     *  Starts the count up animation.
     *  @param target The target count to reach.
     *  @param numSteps The number of steps in the animation.
     */
    startCountUp(target, numSteps) {
        let animationFrameId;
        const step = Math.ceil(target / numSteps);
        const updateCounter = () => {
            this.currentCount.update((count) => Math.min(count + step, target));
            if (this.currentCount() < target) {
                animationFrameId = requestAnimationFrame(updateCounter);
            }
        };
        this.currentCount.set(0);
        animationFrameId = requestAnimationFrame(updateCounter);
        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: CountCardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.3", type: CountCardComponent, isStandalone: true, selector: "hra-count-card", inputs: { count: { classPropertyName: "count", publicName: "count", isSignal: true, isRequired: true, transformFunction: null }, suffix: { classPropertyName: "suffix", publicName: "suffix", isSignal: true, isRequired: false, transformFunction: null }, label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: true, transformFunction: null }, icon: { classPropertyName: "icon", publicName: "icon", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: "<hra-icon class=\"logo\" [svgIcon]=\"icon()\" />\n<div class=\"count-card-content\">\n  <div class=\"count\">\n    {{ currentCount() | number }}\n    @if (suffix()) {\n      <span>{{ suffix() }}</span>\n    }\n  </div>\n  <p class=\"label-text\">{{ label() }}</p>\n</div>\n", styles: [":host{display:flex;flex-direction:column;align-items:center;padding:1rem 0;width:9rem;gap:1rem}:host .logo{width:3.375rem;height:3.375rem;background-color:var(--mat-sys-inverse-surface)!important}:host .count-card-content{display:flex;flex-direction:column;align-items:center}:host .count{display:flex;font:var(--mat-sys-headline-large);letter-spacing:var(--mat-sys-headline-large-tracking);color:var(--mat-sys-secondary)}:host .label-text{margin:0;font:var(--mat-sys-body-xl);letter-spacing:var(--mat-sys-body-xl-tracking);color:var(--mat-sys-primary);text-align:center}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "ngmodule", type: IconsModule }, { kind: "component", type: i1.IconComponent, selector: "hra-icon", inputs: ["icon", "svgIcon", "fontIcon", "fontSet", "inline"] }, { kind: "pipe", type: i2.DecimalPipe, name: "number" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: CountCardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-count-card', imports: [HraCommonModule, IconsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<hra-icon class=\"logo\" [svgIcon]=\"icon()\" />\n<div class=\"count-card-content\">\n  <div class=\"count\">\n    {{ currentCount() | number }}\n    @if (suffix()) {\n      <span>{{ suffix() }}</span>\n    }\n  </div>\n  <p class=\"label-text\">{{ label() }}</p>\n</div>\n", styles: [":host{display:flex;flex-direction:column;align-items:center;padding:1rem 0;width:9rem;gap:1rem}:host .logo{width:3.375rem;height:3.375rem;background-color:var(--mat-sys-inverse-surface)!important}:host .count-card-content{display:flex;flex-direction:column;align-items:center}:host .count{display:flex;font:var(--mat-sys-headline-large);letter-spacing:var(--mat-sys-headline-large-tracking);color:var(--mat-sys-secondary)}:host .label-text{margin:0;font:var(--mat-sys-body-xl);letter-spacing:var(--mat-sys-body-xl-tracking);color:var(--mat-sys-primary);text-align:center}\n"] }]
        }], ctorParameters: () => [] });

/**
 * Generated bundle index. Do not edit.
 */

export { CountCardComponent };
//# sourceMappingURL=hra-ui-design-system-cards-count-card.mjs.map
