import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

import { ReviewModalComponent } from './review-modal.component';

@NgModule({
  declarations: [ReviewModalComponent],
  imports: [HraCommonModule, MatDialogModule, MatIconModule, ButtonsModule],
  exports: [ReviewModalComponent],
})
export class ReviewModalModule {}
