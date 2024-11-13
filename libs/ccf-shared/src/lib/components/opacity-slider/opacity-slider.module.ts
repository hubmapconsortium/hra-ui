import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { OpacitySliderComponent } from './opacity-slider.component';

import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { provideInput } from '@hra-ui/design-system/input';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [OpacitySliderComponent],
  imports: [CommonModule, MatIconModule, MatSliderModule, MatRippleModule, MatInputModule],
  providers: [provideInput()],
  exports: [OpacitySliderComponent],
})
export class OpacitySliderModule {}
