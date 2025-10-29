import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';

/** Reexported components, modules, etc. */
const REEXPORTS = [MatSliderModule];
/** Components, modules, etc. for sliders */
class SliderModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: SliderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.9", ngImport: i0, type: SliderModule, imports: [MatSliderModule], exports: [MatSliderModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: SliderModule, imports: [REEXPORTS, MatSliderModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: SliderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: REEXPORTS,
                    exports: REEXPORTS,
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { SliderModule };
//# sourceMappingURL=hra-ui-design-system-slider.mjs.map
