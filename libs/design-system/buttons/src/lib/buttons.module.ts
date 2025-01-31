import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  CtaButtonDirective,
  ButtonSizeDirective,
  ButtonVariantDirective,
  PrimaryButtonVariantDirective,
  SecondaryButtonVariantDirective,
} from '@hra-ui/design-system/buttons/button';

/** All re-exported modules, components, directives, etc. */
const REEXPORTS = [
  MatButtonModule,
  CtaButtonDirective,
  ButtonSizeDirective,
  ButtonVariantDirective,
  PrimaryButtonVariantDirective,
  SecondaryButtonVariantDirective,
];

/** Packages up subpackage angular exports for easier use */
@NgModule({
  imports: REEXPORTS,
  exports: REEXPORTS,
})
export class ButtonsModule {}
