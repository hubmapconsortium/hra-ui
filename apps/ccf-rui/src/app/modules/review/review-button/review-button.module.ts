import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ButtonModule } from '@hra-ui/design-system/button';

import { ReviewModalModule } from '../review-modal/review-modal.module';
import { ReviewButtonComponent } from './review-button.component';

@NgModule({
  declarations: [ReviewButtonComponent],
  imports: [CommonModule, ReviewModalModule, ButtonModule, MatTooltipModule],
  exports: [ReviewButtonComponent],
})
export class ReviewButtonModule {}
