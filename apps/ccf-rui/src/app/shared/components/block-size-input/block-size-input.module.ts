import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MicroTooltipDirective } from '@hra-ui/design-system/micro-tooltip';

import { BlockSizeInputComponent } from './block-size-input.component';

@NgModule({
  imports: [CommonModule, MatInputModule, MatIconModule, MatRippleModule, MatFormFieldModule, MicroTooltipDirective],
  declarations: [BlockSizeInputComponent],
  exports: [BlockSizeInputComponent],
})
export class BlockSizeInputModule {}
