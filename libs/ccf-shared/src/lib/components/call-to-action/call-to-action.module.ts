import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { CallToActionComponent } from './call-to-action.component';

@NgModule({
  imports: [CommonModule, MatIconModule, MatDialogModule, MatCardModule],
  declarations: [CallToActionComponent],
  exports: [CallToActionComponent],
})
export class CallToActionModule {}
