import { NgModule } from '@angular/core';
import { CtaBarComponent } from '@hra-ui/design-system/navigation/cta-bar';
import { FooterComponent } from '@hra-ui/design-system/navigation/footer';
import { HeaderComponent } from '@hra-ui/design-system/navigation/header';

/** All sub library components, module, etc. */
const REEXPORTS = [CtaBarComponent, FooterComponent, HeaderComponent];

/** Exports all brand components, modules, etc. */
@NgModule({
  imports: REEXPORTS,
  exports: REEXPORTS,
})
export class NavigationModule {}
