import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { IconButtonSizeDirective } from './icon-button-size/icon-button-size.directive';
import { IconButtonVariantDirective } from './icon-button-variant/icon-button-variant.directive';

/** Module exporting icon button and related utilities */
@NgModule({
  imports: [IconButtonSizeDirective, IconButtonVariantDirective],
  exports: [MatButtonModule, MatIconModule, IconButtonSizeDirective, IconButtonVariantDirective],
})
export class IconButtonModule {}
