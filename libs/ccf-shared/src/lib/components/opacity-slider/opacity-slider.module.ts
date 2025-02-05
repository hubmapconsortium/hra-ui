import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { MicroTooltipDirective } from '@hra-ui/design-system/micro-tooltip';

import { OpacitySliderComponent } from './opacity-slider.component';

@NgModule({
  declarations: [OpacitySliderComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatSliderModule,
    MatRippleModule,
    MatInputModule,
    ButtonsModule,
    MicroTooltipDirective,
  ],
  providers: [],
  exports: [OpacitySliderComponent],
})
export class OpacitySliderModule {}
