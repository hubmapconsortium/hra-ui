import { Directive, inject, input } from '@angular/core';
import { EventType } from '@hra-ui/common/analytics/events';
import { AnalyticsService } from '../analytics.service';
import { FeatureDirective } from '../feature/feature.directive';

@Directive({
  selector: '[hraEvent]',
})
export class EventDirective<T extends EventType> {
  readonly event = input.required<T>({ alias: 'hraEvent' });

  private readonly feature = inject(FeatureDirective, { optional: true });
  private readonly analytics = inject(AnalyticsService);
}
