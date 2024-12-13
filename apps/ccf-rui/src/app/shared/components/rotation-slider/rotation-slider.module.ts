import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MicroTooltipDirective } from '@hra-ui/design-system/micro-tooltip';

import { RotationSliderComponent } from './rotation-slider.component';
import { SliderBoxModule } from './slider-box/slider-box.module';

@NgModule({
  declarations: [RotationSliderComponent],
  imports: [CommonModule, MicroTooltipDirective, SliderBoxModule],
  exports: [RotationSliderComponent],
})
export class RotationSliderModule {}
