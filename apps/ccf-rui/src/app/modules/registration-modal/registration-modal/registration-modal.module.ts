import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RegistrationContentModule } from '../registration-content/registration-content.module';
import { RegistrationModalComponent } from './registration-modal.component';

@NgModule({
  declarations: [RegistrationModalComponent],
  imports: [CommonModule, MatDialogModule, MatIconModule, RegistrationContentModule],
  exports: [RegistrationModalComponent],
})
export class RegistrationModalModule {}
