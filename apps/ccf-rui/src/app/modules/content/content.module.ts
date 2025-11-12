import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { BodyUiComponent } from 'ccf-body-ui';
import { SpatialSearchKeyboardUIBehaviorModule, StoreDebugModule } from 'ccf-shared';

import { ContentComponent } from '../content/content.component';

@NgModule({
  imports: [HraCommonModule, MatIconModule, StoreDebugModule, SpatialSearchKeyboardUIBehaviorModule, BodyUiComponent],
  declarations: [ContentComponent],
  exports: [ContentComponent],
})
export class ContentModule {}
