import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';

import { RotationSliderComponent } from './rotation-slider.component';
import { SliderBoxModule } from './slider-box/slider-box.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
  declarations: [RotationSliderComponent],
  imports: [CommonModule, PlainTooltipDirective, SliderBoxModule, OverlayModule, PortalModule],
  exports: [RotationSliderComponent],
})
export class RotationSliderModule {}
