import * as i0 from '@angular/core';
import { EnvironmentProviders } from '@angular/core';
import * as i1 from '@hra-ui/design-system/brand/logo';
import * as i2 from '@hra-ui/design-system/brand/mark';

/** Exports all brand components, modules, etc. */
declare class BrandModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BrandModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BrandModule, never, [typeof i1.BrandLogoComponent, typeof i2.BrandMarkComponent], [typeof i1.BrandLogoComponent, typeof i2.BrandMarkComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BrandModule>;
}

/**
 * Provide brand components
 */
declare function provideBrand(): EnvironmentProviders;

export { BrandModule, provideBrand };
