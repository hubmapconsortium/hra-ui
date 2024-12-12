import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { provideDesignSystem } from '@hra-ui/design-system';
import { ButtonModule } from '@hra-ui/design-system/button';
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
    ButtonModule,
    MicroTooltipDirective,
  ],
  providers: [provideDesignSystem()],
  exports: [OpacitySliderComponent],
})
export class OpacitySliderModule {}
