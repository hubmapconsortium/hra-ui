import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

import { ReviewModalComponent } from './review-modal.component';

@NgModule({
  imports: [HraCommonModule, MatDialogModule, MatIconModule, ButtonsModule],
  declarations: [ReviewModalComponent],
  exports: [ReviewModalComponent],
})
export class ReviewModalModule {}
