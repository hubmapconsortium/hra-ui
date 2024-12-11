import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from '@hra-ui/design-system/button';
import { MicroTooltipDirective } from '@hra-ui/design-system/micro-tooltip';

import { ReviewModalModule } from '../review-modal/review-modal.module';
import { ReviewButtonComponent } from './review-button.component';

@NgModule({
  declarations: [ReviewButtonComponent],
  imports: [CommonModule, ReviewModalModule, ButtonModule, MicroTooltipDirective],
  exports: [ReviewButtonComponent],
})
export class ReviewButtonModule {}
