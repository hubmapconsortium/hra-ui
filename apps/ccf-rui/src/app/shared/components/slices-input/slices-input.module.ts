import { CommonModule } from '@angular/common';
import { importProvidersFrom, NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NumbersOnlyModule } from 'ccf-shared';
import { SlicesInputComponent } from './slices-input.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatRippleModule,
    MatTooltipModule,
    NumbersOnlyModule,
    MatFormFieldModule,
    PlainTooltipDirective,
  ],
  providers: [importProvidersFrom(BrowserAnimationsModule)],
  declarations: [SlicesInputComponent],
  exports: [SlicesInputComponent],
})
export class SlicesInputModule {}
