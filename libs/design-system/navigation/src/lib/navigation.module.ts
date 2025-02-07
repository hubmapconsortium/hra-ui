import { NgModule } from '@angular/core';
import { CtaBarComponent } from '@hra-ui/design-system/navigation/cta-bar';
import { HeaderComponent } from '@hra-ui/design-system/navigation/header';

const REEXPORTS = [CtaBarComponent, HeaderComponent];

@NgModule({
  imports: REEXPORTS,
  exports: REEXPORTS,
})
export class NavigationModule {}
