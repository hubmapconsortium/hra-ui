import * as i0 from '@angular/core';
import { input, Directive } from '@angular/core';

/** Style a mat-progress-bar to a specific named color */
class ProgressBarColorDirective {
    /** Color of progress bar */
    color = input.required(...(ngDevMode ? [{ debugName: "color", alias: 'hraProgressBarColor' }] : [{ alias: 'hraProgressBarColor' }]));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ProgressBarColorDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.15", type: ProgressBarColorDirective, isStandalone: true, selector: "mat-progress-bar[hraProgressBarColor]", inputs: { color: { classPropertyName: "color", publicName: "hraProgressBarColor", isSignal: true, isRequired: true, transformFunction: null } }, host: { properties: { "class": "\"hra-progress-bar-color-\" + color()" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ProgressBarColorDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mat-progress-bar[hraProgressBarColor]',
                    host: {
                        '[class]': '"hra-progress-bar-color-" + color()',
                    },
                }]
        }], propDecorators: { color: [{ type: i0.Input, args: [{ isSignal: true, alias: "hraProgressBarColor", required: true }] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { ProgressBarColorDirective };
//# sourceMappingURL=hra-ui-design-system-indicators-progress-bar.mjs.map
