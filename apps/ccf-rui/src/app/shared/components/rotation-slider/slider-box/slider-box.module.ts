import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';

import { SliderBoxComponent } from './slider-box.component';

@NgModule({
  declarations: [SliderBoxComponent],
  imports: [
    HraCommonModule,
    MatIconModule,
    MatSliderModule,
    MatRippleModule,
    MatInputModule,
    MatFormFieldModule,
    ButtonsModule,
    PlainTooltipDirective,
    OverlayModule,
  ],
  exports: [SliderBoxComponent],
})
export class SliderBoxModule {}
