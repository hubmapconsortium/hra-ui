import { NgModule } from '@angular/core';
import { BackButtonBarComponent } from '@hra-ui/design-system/navigation/back-button-bar';
import { CtaBarComponent } from '@hra-ui/design-system/navigation/cta-bar';
import { FooterComponent } from '@hra-ui/design-system/navigation/footer';
import { HeaderComponent } from '@hra-ui/design-system/navigation/header';
import { SiteNavigationComponent } from '@hra-ui/design-system/navigation/site-navigation';
import { SkipToContentButtonComponent } from '@hra-ui/design-system/navigation/skip-to-content-button';

/** All sub library components, module, etc. */
const REEXPORTS = [
  BackButtonBarComponent,
  CtaBarComponent,
  FooterComponent,
  HeaderComponent,
  SiteNavigationComponent,
  SkipToContentButtonComponent,
];

/** Exports all brand components, modules, etc. */
@NgModule({
  imports: REEXPORTS,
  exports: REEXPORTS,
})
export class NavigationModule {}
