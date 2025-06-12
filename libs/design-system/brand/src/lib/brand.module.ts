import { NgModule } from '@angular/core';
import { BrandLogoComponent } from '@hra-ui/design-system/brand/logo';
import { BrandMarkComponent } from '@hra-ui/design-system/brand/mark';

/** Exports all brand components, modules, etc. */
@NgModule({
  imports: [BrandLogoComponent, BrandMarkComponent],
  exports: [BrandLogoComponent, BrandMarkComponent],
})
export class BrandModule {}
