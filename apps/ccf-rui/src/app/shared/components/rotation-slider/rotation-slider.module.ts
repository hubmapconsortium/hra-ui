import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RotationSliderComponent } from './rotation-slider.component';

import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [RotationSliderComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatSliderModule,
    MatRippleModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  exports: [RotationSliderComponent],
})
export class RotationSliderModule {}
