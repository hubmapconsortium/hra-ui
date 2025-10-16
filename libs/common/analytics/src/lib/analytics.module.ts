import { NgModule } from '@angular/core';
import {
  ClickEventDirective,
  DoubleClickEventDirective,
  EventDirective,
  HoverEventDirective,
  KeyboardEventDirective,
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
    KeyboardEventDirective,
    ModelChangeEventDirective,
  ],
  exports: [
    ClickEventDirective,
    DoubleClickEventDirective,
    EventDirective,
    FeatureDirective,
    HoverEventDirective,
    KeyboardEventDirective,
    ModelChangeEventDirective,
  ],
})
export class AnalyticsModule {}
