import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AppNavButtonComponent } from '@hra-ui/design-system/buttons/app-nav-button';
import { BreadcrumbsComponent } from '@hra-ui/design-system/buttons/breadcrumbs';
import {
  ButtonSizeDirective,
  ButtonVariantDirective,
  CtaButtonDirective,
  PrimaryButtonVariantDirective,
  SecondaryButtonVariantDirective,
} from '@hra-ui/design-system/buttons/button';
import { NavigationCategoryToggleComponent } from '@hra-ui/design-system/buttons/navigation-category-toggle';
import { TextHyperlinkDirective } from '@hra-ui/design-system/buttons/text-hyperlink';

/** All re-exported modules, components, directives, etc. */
const REEXPORTS = [
  MatButtonModule,
  MatButtonToggleModule,

  AppNavButtonComponent,
  BreadcrumbsComponent,
  ButtonSizeDirective,
  ButtonVariantDirective,
  CtaButtonDirective,
  NavigationCategoryToggleComponent,
  PrimaryButtonVariantDirective,
  SecondaryButtonVariantDirective,
  TextHyperlinkDirective,
];

/** Packages up subpackage angular exports for easier use */
@NgModule({
  imports: REEXPORTS,
  exports: REEXPORTS,
})
export class ButtonsModule {}
