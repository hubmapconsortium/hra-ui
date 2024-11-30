import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MicroTooltipDirective } from '@hra-ui/design-system/micro-tooltip';

import { RotationSliderComponent } from './rotation-slider.component';
import { MatButtonModule } from '@angular/material/button';

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
    MicroTooltipDirective,
    MatButtonModule,
  ],
  exports: [RotationSliderComponent],
})
export class RotationSliderModule {}
