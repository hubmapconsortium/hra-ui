import { NgModule } from '@angular/core';
import {
  ClickEventDirective,
  DoubleClickEventDirective,
  EventDirective,
  HoverEventDirective,
  ModelChangeEventDirective,
} from './event/event.directive';
import { FeatureDirective } from './feature/feature.directive';

@NgModule({
  imports: [
    ClickEventDirective,
    DoubleClickEventDirective,
    EventDirective,
    FeatureDirective,
    HoverEventDirective,
    ModelChangeEventDirective,
  ],
  exports: [
    ClickEventDirective,
    DoubleClickEventDirective,
    EventDirective,
    FeatureDirective,
    HoverEventDirective,
    ModelChangeEventDirective,
  ],
})
export class AnalyticsModule {}
