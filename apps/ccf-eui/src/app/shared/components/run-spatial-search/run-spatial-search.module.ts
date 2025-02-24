import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { RunSpatialSearchComponent } from './run-spatial-search.component';
import { SpatialSearchConfigBehaviorModule } from '../spatial-search-config-behavior/spatial-search-config-behavior.module';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule, SpatialSearchConfigBehaviorModule, ButtonsModule],
  declarations: [RunSpatialSearchComponent],
  exports: [RunSpatialSearchComponent],
})
export class RunSpatialSearchModule {}
