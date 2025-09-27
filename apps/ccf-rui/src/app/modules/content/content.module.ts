import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BodyUiModule, SpatialSearchKeyboardUIBehaviorModule } from 'ccf-shared';

import { ContentComponent } from '../content/content.component';

@NgModule({
  imports: [CommonModule, MatIconModule, SpatialSearchKeyboardUIBehaviorModule, BodyUiModule],
  declarations: [ContentComponent],
  exports: [ContentComponent],
})
export class ContentModule {}
