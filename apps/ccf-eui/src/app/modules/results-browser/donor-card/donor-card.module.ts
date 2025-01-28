import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

import { ThumbnailCarouselModule } from '../../../shared/components/thumbnail-carousel/thumbnail-carousel.module';
import { MetadataCardComponent } from '../metadata-card/metadata-card.component';
import { TissueSectionVisModule } from '../tissue-section-vis/tissue-section-vis.module';
import { DonorCardComponent } from './donor-card.component';

@NgModule({
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatIconModule,
    MetadataCardComponent,
    TissueSectionVisModule,
    ThumbnailCarouselModule,
  ],
  declarations: [DonorCardComponent],
  exports: [DonorCardComponent],
})
export class DonorCardModule {}
