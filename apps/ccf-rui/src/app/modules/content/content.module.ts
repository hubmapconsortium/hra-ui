import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { BodyUiModule, SpatialSearchKeyboardUIBehaviorModule, StoreDebugModule } from 'ccf-shared';

import { ContentComponent } from '../content/content.component';
import { VideoModalLauncherModule } from './video-modal/video-modal-launcher/video-modal-launcher.module';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    StoreDebugModule,
    VideoModalLauncherModule,
    MatRippleModule,
    SpatialSearchKeyboardUIBehaviorModule,
    BodyUiModule,
  ],
  declarations: [ContentComponent],
  exports: [ContentComponent],
})
export class ContentModule {}
