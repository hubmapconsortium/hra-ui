import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HraCommonModule } from '@hra-ui/common';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';

import { BlockSizeInputComponent } from './block-size-input.component';

@NgModule({
  imports: [HraCommonModule, MatInputModule, MatIconModule, MatRippleModule, MatFormFieldModule, PlainTooltipDirective],
  declarations: [BlockSizeInputComponent],
  exports: [BlockSizeInputComponent],
})
export class BlockSizeInputModule {}
