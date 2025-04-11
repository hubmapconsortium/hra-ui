import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';

import { ReviewModalModule } from '../review-modal/review-modal.module';
import { ReviewButtonComponent } from './review-button.component';

@NgModule({
  declarations: [ReviewButtonComponent],
  imports: [CommonModule, ReviewModalModule, ButtonsModule, PlainTooltipDirective],
  exports: [ReviewButtonComponent],
})
export class ReviewButtonModule {}
