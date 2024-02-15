import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { OpacitySliderComponent } from './opacity-slider.component';

import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [OpacitySliderComponent],
  imports: [CommonModule, MatIconModule, MatSliderModule, MatRippleModule],
  exports: [OpacitySliderComponent],
})
export class OpacitySliderModule {}
