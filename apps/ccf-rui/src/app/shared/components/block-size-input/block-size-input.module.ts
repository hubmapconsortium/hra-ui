import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

import { BlockSizeInputComponent } from './block-size-input.component';
import { provideInput } from '@hra-ui/design-system/input';

@NgModule({
  imports: [CommonModule, MatInputModule, MatIconModule, MatRippleModule, MatTooltipModule, MatFormFieldModule],
  declarations: [BlockSizeInputComponent],
  providers: [provideInput()],
  exports: [BlockSizeInputComponent],
})
export class BlockSizeInputModule {}
