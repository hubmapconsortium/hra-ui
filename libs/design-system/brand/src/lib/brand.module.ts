import { NgModule } from '@angular/core';
import { BrandLogoComponent } from '@hra-ui/design-system/brand/logo';
import { BrandMarkComponent } from '@hra-ui/design-system/brand/mark';
import { ProductLogoComponent } from '@hra-ui/design-system/brand/product-logo';

/** Exports all brand components, modules, etc. */
@NgModule({
  imports: [BrandLogoComponent, BrandMarkComponent, ProductLogoComponent],
  exports: [BrandLogoComponent, BrandMarkComponent, ProductLogoComponent],
})
export class BrandModule {}
