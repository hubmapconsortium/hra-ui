import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { provideDesignSystem } from '@hra-ui/design-system';

import { OpacitySliderComponent } from './opacity-slider.component';

@NgModule({
  declarations: [OpacitySliderComponent],
  imports: [CommonModule, MatIconModule, MatSliderModule, MatRippleModule, MatInputModule, MatButtonModule],
  providers: [provideDesignSystem()],
  exports: [OpacitySliderComponent],
})
export class OpacitySliderModule {}
