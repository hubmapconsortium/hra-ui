import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import {
  ButtonSizeDirective,
  ButtonVariantDirective,
  CtaButtonDirective,
  PrimaryButtonVariantDirective,
  SecondaryButtonVariantDirective,
} from '@hra-ui/design-system/buttons/button';
import { TextHyperlinkDirective } from '@hra-ui/design-system/buttons/text-hyperlink';

/** All re-exported modules, components, directives, etc. */
const REEXPORTS = [
  MatButtonModule,
  MatChipsModule,
  ButtonSizeDirective,
  ButtonVariantDirective,
  CtaButtonDirective,
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
