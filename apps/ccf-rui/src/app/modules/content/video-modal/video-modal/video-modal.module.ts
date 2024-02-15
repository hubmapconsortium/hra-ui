import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { VideoModalComponent } from './video-modal.component';

@NgModule({
  declarations: [VideoModalComponent],
  imports: [CommonModule, YouTubePlayerModule, MatIconModule, MatDialogModule],
  exports: [VideoModalComponent],
})
export class VideoModalModule {}
