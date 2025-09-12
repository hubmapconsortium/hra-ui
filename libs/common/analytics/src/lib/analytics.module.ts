import { NgModule } from '@angular/core';
import {
  ClickEventDirective,
  DoubleClickEventDirective,
  EventDirective,
  HoverEventDirective,
} from './event/event.directive';
import { FeatureDirective } from './feature/feature.directive';

@NgModule({
  imports: [ClickEventDirective, DoubleClickEventDirective, EventDirective, FeatureDirective, HoverEventDirective],
  exports: [ClickEventDirective, DoubleClickEventDirective, EventDirective, FeatureDirective, HoverEventDirective],
})
export class AnalyticsModule {}
