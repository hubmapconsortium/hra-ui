import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ReviewModalComponent } from './review-modal.component';

@NgModule({
  declarations: [ReviewModalComponent],
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule],
  exports: [ReviewModalComponent],
})
export class ReviewModalModule {}
