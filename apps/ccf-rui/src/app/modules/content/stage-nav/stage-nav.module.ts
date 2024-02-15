import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LabeledSlideToggleModule } from '../../../shared/components/labeled-slide-toggle/labeled-slide-toggle.module';

import { StageNavComponent } from './stage-nav.component';

@NgModule({
  imports: [
    CommonModule,
    MatRadioModule,
    MatSelectModule,
    MatIconModule,
    MatDividerModule,
    LabeledSlideToggleModule,
    MatTooltipModule,
  ],
  declarations: [StageNavComponent],
  exports: [StageNavComponent],
})
export class StageNavModule {}
