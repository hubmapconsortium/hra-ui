import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { PrivacyPreferencesService } from './privacy-preferences.service';

@NgModule({
  imports: [CommonModule, MatDialogModule],
  providers: [PrivacyPreferencesService],
})
export class PrivacyModule {}
