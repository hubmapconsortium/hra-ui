import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { BodyUiModule, SpatialSearchKeyboardUIBehaviorModule, StoreDebugModule } from 'ccf-shared';

import { ContentComponent } from '../content/content.component';

@NgModule({
  imports: [HraCommonModule, MatIconModule, StoreDebugModule, SpatialSearchKeyboardUIBehaviorModule, BodyUiModule],
  declarations: [ContentComponent],
  exports: [ContentComponent],
})
export class ContentModule {}
