import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { MicroTooltipDirective } from '@hra-ui/design-system/micro-tooltip';

import { ReviewModalModule } from '../review-modal/review-modal.module';
import { ReviewButtonComponent } from './review-button.component';

@NgModule({
  declarations: [ReviewButtonComponent],
  imports: [CommonModule, ReviewModalModule, ButtonsModule, MicroTooltipDirective],
  exports: [ReviewButtonComponent],
})
export class ReviewButtonModule {}
