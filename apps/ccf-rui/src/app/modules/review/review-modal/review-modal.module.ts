import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ReviewModalComponent } from './review-modal.component';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

@NgModule({
  declarations: [ReviewModalComponent],
  imports: [CommonModule, MatDialogModule, MatIconModule, ButtonsModule],
  exports: [ReviewModalComponent],
})
export class ReviewModalModule {}
