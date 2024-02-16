import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReviewModalModule } from '../review-modal/review-modal.module';
import { ReviewButtonComponent } from './review-button.component';

@NgModule({
  declarations: [ReviewButtonComponent],
  imports: [CommonModule, ReviewModalModule, MatButtonModule, MatTooltipModule],
  exports: [ReviewButtonComponent],
})
export class ReviewButtonModule {}
