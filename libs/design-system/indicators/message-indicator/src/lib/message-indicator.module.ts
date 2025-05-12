import { NgModule } from '@angular/core';
import { InfoMessageIndicatorComponent } from '@hra-ui/design-system/indicators/message-indicator/info-message-indicator';
import { DangerMessageIndicatorComponent } from '@hra-ui/design-system/indicators/message-indicator/danger-message-indicator';

/**
 * Module that contains the message indicator components.
 */
@NgModule({
  imports: [InfoMessageIndicatorComponent, DangerMessageIndicatorComponent],
  exports: [InfoMessageIndicatorComponent, DangerMessageIndicatorComponent],
})
export class MessageIndicatorModule {}
