import { NgModule } from '@angular/core';
import { BrandLogoComponent } from '@hra-ui/design-system/brand/logo';
import { BrandMarkComponent } from '@hra-ui/design-system/brand/mark';

/** All sub library components, module, etc. */
const REEXPORTS = [BrandLogoComponent, BrandMarkComponent];

/** Exports all brand components, modules, etc. */
@NgModule({
  imports: REEXPORTS,
  exports: REEXPORTS,
})
export class BrandModule {}
