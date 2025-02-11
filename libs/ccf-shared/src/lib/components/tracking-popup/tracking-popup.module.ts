import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TrackingPopupComponent } from './tracking-popup.component';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

@NgModule({
  imports: [CommonModule, ButtonsModule],
  declarations: [TrackingPopupComponent],
  exports: [TrackingPopupComponent],
})
export class TrackingPopupModule {}
