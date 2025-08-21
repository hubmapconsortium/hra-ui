import { NgModule } from '@angular/core';
import { EventDirective } from './event/event.directive';
import { FeatureDirective } from './feature/feature.directive';

@NgModule({
  imports: [EventDirective, FeatureDirective],
  exports: [EventDirective, FeatureDirective],
})
export class AnalyticsModule {}
