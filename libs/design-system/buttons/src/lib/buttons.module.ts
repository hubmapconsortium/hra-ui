import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { AppNavButtonComponent } from '@hra-ui/design-system/buttons/app-nav-button';
import { BreadcrumbsComponent } from '@hra-ui/design-system/buttons/breadcrumbs';
import {
  ButtonSizeDirective,
  ButtonVariantDirective,
  CtaButtonDirective,
  PrimaryButtonVariantDirective,
  SecondaryButtonVariantDirective,
} from '@hra-ui/design-system/buttons/button';
import { ButtonToggleSizeDirective } from '@hra-ui/design-system/buttons/button-toggle';
import { CheckboxErrorVariantDirective } from '@hra-ui/design-system/buttons/checkbox';
import { IconButtonModule } from '@hra-ui/design-system/buttons/icon-button';
import { NavigationCategoryToggleComponent } from '@hra-ui/design-system/buttons/navigation-category-toggle';
import { SocialMediaButtonComponent } from '@hra-ui/design-system/buttons/social-media-button';
import { TextHyperlinkDirective } from '@hra-ui/design-system/buttons/text-hyperlink';

/** All re-exported modules, components, directives, etc. */
const REEXPORTS = [
  MatButtonModule,
  MatButtonToggleModule,
  MatChipsModule,
  IconButtonModule,

  AppNavButtonComponent,
  BreadcrumbsComponent,
  ButtonSizeDirective,
  ButtonToggleSizeDirective,
  ButtonVariantDirective,
  CtaButtonDirective,
  NavigationCategoryToggleComponent,
  PrimaryButtonVariantDirective,
  SecondaryButtonVariantDirective,
  SocialMediaButtonComponent,
  TextHyperlinkDirective,
  CheckboxErrorVariantDirective,
];

/** Packages up subpackage angular exports for easier use */
@NgModule({
  imports: REEXPORTS,
  exports: REEXPORTS,
})
export class ButtonsModule {}
