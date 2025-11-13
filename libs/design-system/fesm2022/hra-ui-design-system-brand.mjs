import * as i0 from '@angular/core';
import { NgModule, makeEnvironmentProviders } from '@angular/core';
import { BrandLogoComponent } from '@hra-ui/design-system/brand/logo';
import { BrandMarkComponent } from '@hra-ui/design-system/brand/mark';
import { provideMiscellaneousLogos } from '@hra-ui/design-system/brand/miscellaneous-logo';
import { provideOrganLogos } from '@hra-ui/design-system/brand/organ-logo';
import { provideProductLogos } from '@hra-ui/design-system/brand/product-logo';

/** Exports all brand components, modules, etc. */
class BrandModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: BrandModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.11", ngImport: i0, type: BrandModule, imports: [BrandLogoComponent, BrandMarkComponent], exports: [BrandLogoComponent, BrandMarkComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: BrandModule, imports: [BrandLogoComponent, BrandMarkComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: BrandModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [BrandLogoComponent, BrandMarkComponent],
                    exports: [BrandLogoComponent, BrandMarkComponent],
                }]
        }] });

/**
 * Provide brand components
 */
function provideBrand() {
    return makeEnvironmentProviders([provideMiscellaneousLogos(), provideOrganLogos(), provideProductLogos()]);
}

/**
 * Generated bundle index. Do not edit.
 */

export { BrandModule, provideBrand };
//# sourceMappingURL=hra-ui-design-system-brand.mjs.map
