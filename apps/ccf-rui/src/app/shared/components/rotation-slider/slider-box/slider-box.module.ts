import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { ButtonModule } from '@hra-ui/design-system/button';

import { SliderBoxComponent } from './slider-box.component';
import { MicroTooltipDirective } from '@hra-ui/design-system/micro-tooltip';

@NgModule({
  declarations: [SliderBoxComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatSliderModule,
    MatRippleModule,
    MatInputModule,
    MatFormFieldModule,
    ButtonModule,
    MicroTooltipDirective,
  ],
  exports: [SliderBoxComponent],
})
export class SliderBoxModule {}