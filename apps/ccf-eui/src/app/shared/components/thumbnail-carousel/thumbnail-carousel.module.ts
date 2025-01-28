import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ThumbnailCarouselComponent } from './thumbnail-carousel.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule],
  declarations: [ThumbnailCarouselComponent],
  exports: [ThumbnailCarouselComponent],
})
export class ThumbnailCarouselModule {}
