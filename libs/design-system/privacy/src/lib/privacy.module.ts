import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { PrivacyPreferencesService } from './privacy-preferences.service';
import { ConsentBannerComponent } from '@hra-ui/design-system/privacy/consent-banner';

@NgModule({
  imports: [CommonModule, MatDialogModule, ConsentBannerComponent],
  providers: [PrivacyPreferencesService],
  exports: [ConsentBannerComponent],
})
export class PrivacyModule {}
