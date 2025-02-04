import { NgModule } from '@angular/core';
import { BrandLogoComponent } from '@hra-ui/design-system/brand/logo';
import { BrandMarkComponent } from '@hra-ui/design-system/brand/mark';

const REEXPORTS = [BrandLogoComponent, BrandMarkComponent];

@NgModule({
  imports: REEXPORTS,
  exports: REEXPORTS,
})
export class BrandModule {}
