import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { BodyUiModule, SpatialSearchKeyboardUIBehaviorModule, StoreDebugModule } from 'ccf-shared';

import { ContentComponent } from '../content/content.component';

@NgModule({
  imports: [
    HraCommonModule,
    MatIconModule,
    StoreDebugModule,
    MatRippleModule,
    SpatialSearchKeyboardUIBehaviorModule,
    BodyUiModule,
  ],
  declarations: [ContentComponent],
  exports: [ContentComponent],
})
export class ContentModule {}
