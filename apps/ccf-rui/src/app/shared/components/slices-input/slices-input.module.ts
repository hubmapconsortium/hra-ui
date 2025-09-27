import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { NumbersOnlyModule } from 'ccf-shared';

import { SlicesInputComponent } from './slices-input.component';

@NgModule({
  imports: [CommonModule, MatInputModule, MatFormFieldModule, PlainTooltipDirective, NumbersOnlyModule],
  declarations: [SlicesInputComponent],
  exports: [SlicesInputComponent],
})
export class SlicesInputModule {}
