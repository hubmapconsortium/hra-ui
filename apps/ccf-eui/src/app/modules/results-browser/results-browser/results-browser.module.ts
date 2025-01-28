import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonModule } from '@hra-ui/design-system/button';
import { ExpansionPanelModule } from '@hra-ui/design-system/expansion-panel';

import { DonorCardModule } from '../donor-card/donor-card.module';
import { ResultsBrowserComponent } from './results-browser.component';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';

@NgModule({
  declarations: [ResultsBrowserComponent],
  imports: [
    CommonModule,
    DonorCardModule,
    ExpansionPanelModule,
    MatMenuModule,
    MatIconModule,
    MatCheckboxModule,
    ButtonModule,
    ScrollingModule,
  ],
  exports: [ResultsBrowserComponent],
})
export class ResultsBrowserModule {}
