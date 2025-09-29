import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HraCommonModule } from '@hra-ui/common';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { NumbersOnlyModule } from 'ccf-shared';

import { SlicesInputComponent } from './slices-input.component';

@NgModule({
  imports: [HraCommonModule, MatInputModule, MatFormFieldModule, PlainTooltipDirective, NumbersOnlyModule],
  declarations: [SlicesInputComponent],
  exports: [SlicesInputComponent],
})
export class SlicesInputModule {}
