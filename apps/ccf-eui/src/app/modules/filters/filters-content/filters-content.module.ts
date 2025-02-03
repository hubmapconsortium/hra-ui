import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SpatialSearchListModule } from 'ccf-shared';

import { CheckboxModule } from '../../../shared/components/checkbox/checkbox.module';
import { DualSliderModule } from '../../../shared/components/dual-slider/dual-slider.module';
import { RunSpatialSearchModule } from '../../../shared/components/run-spatial-search/run-spatial-search.module';
import { FiltersContentComponent } from './filters-content.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,

    MatButtonModule,
    MatIconModule,

    CheckboxModule,
    DualSliderModule,
    SpatialSearchListModule,
    RunSpatialSearchModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  declarations: [FiltersContentComponent],
  exports: [FiltersContentComponent],
})
export class FiltersContentModule {}
