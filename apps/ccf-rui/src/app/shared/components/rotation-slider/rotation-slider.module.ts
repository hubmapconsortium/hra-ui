import { NgModule } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';

import { RotationSliderComponent } from './rotation-slider.component';
import { SliderBoxModule } from './slider-box/slider-box.module';

@NgModule({
  declarations: [RotationSliderComponent],
  imports: [HraCommonModule, PlainTooltipDirective, SliderBoxModule],
  exports: [RotationSliderComponent],
})
export class RotationSliderModule {}
