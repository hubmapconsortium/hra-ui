import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IconComponent } from './icon/icon.component';

@NgModule({
  imports: [IconComponent],
  exports: [MatIconModule, IconComponent],
})
export class IconsModule {}
