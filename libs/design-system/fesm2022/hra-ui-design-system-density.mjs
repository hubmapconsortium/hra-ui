import * as i0 from '@angular/core';
import { input, Directive } from '@angular/core';

/** Density level enum */
const Densities = {
    Compact0: 'compact-0',
    Compact2: 'compact-2',
    Compact4: 'compact-4',
};
/** Style a component to a specific density level */
class DensityDirective {
    /** Density level of the component */
    density = input.required(...(ngDevMode ? [{ debugName: "density", alias: 'hraDensity' }] : [{ alias: 'hraDensity' }]));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: DensityDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.9", type: DensityDirective, isStandalone: true, selector: "[hraDensity]", inputs: { density: { classPropertyName: "density", publicName: "hraDensity", isSignal: true, isRequired: true, transformFunction: null } }, host: { properties: { "class": "\"hra-density-\" + density()" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: DensityDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[hraDensity]',
                    standalone: true,
                    host: {
                        '[class]': '"hra-density-" + density()',
                    },
                }]
        }], propDecorators: { density: [{ type: i0.Input, args: [{ isSignal: true, alias: "hraDensity", required: true }] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { Densities, DensityDirective };
//# sourceMappingURL=hra-ui-design-system-density.mjs.map
