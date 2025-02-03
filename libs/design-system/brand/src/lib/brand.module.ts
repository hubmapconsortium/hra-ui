import { NgModule } from '@angular/core';
import { BrandLogoComponent } from '@hra-ui/design-system/brand/logo';

const REEXPORTS = [BrandLogoComponent];

@NgModule({
  imports: REEXPORTS,
  exports: REEXPORTS,
})
export class BrandModule {}
