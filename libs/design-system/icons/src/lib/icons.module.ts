import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IconComponent } from './icon/icon.component';

/**
 * Exports all icon related components, etc.
 * Also reexports the material icon module
 */
@NgModule({
  imports: [IconComponent],
  exports: [MatIconModule, IconComponent],
})
export class IconsModule {}
