import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TrackingPopupComponent } from './tracking-popup.component';
import { ButtonModule } from '@hra-ui/design-system/button';

@NgModule({
  imports: [CommonModule, ButtonModule],
  declarations: [TrackingPopupComponent],
  exports: [TrackingPopupComponent],
})
export class TrackingPopupModule {}
