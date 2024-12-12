import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ReviewModalComponent } from './review-modal.component';
import { ButtonModule } from '@hra-ui/design-system/button';

@NgModule({
  declarations: [ReviewModalComponent],
  imports: [CommonModule, MatDialogModule, MatIconModule, ButtonModule],
  exports: [ReviewModalComponent],
})
export class ReviewModalModule {}
