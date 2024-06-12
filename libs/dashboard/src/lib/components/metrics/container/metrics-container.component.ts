import { Component, input } from '@angular/core';
import { z } from 'zod';
import { DashboardComponent, DashboardComponentSpecFor } from '../../../dashboard/dashboard.model';
import { TITLE_CARD_DEF, TitleCardComponent } from '../../title-card/title-card.component';
import { METRICS_ITEM_DEF, MetricsItemComponent, MetricsItemSpec } from '../item/metrics-item.component';

/** Metrics card definition */
export const METRICS_CARD_DEF = TITLE_CARD_DEF.extend({
  items: METRICS_ITEM_DEF.array(),
});

/** Metrics Container Component, renders metric cards inside the container */
@Component({
  selector: 'hra-dashboard-metrics-container',
  templateUrl: './metrics-container.component.html',
  styleUrl: './metrics-container.component.scss',
  imports: [TitleCardComponent, MetricsItemComponent],
  standalone: true,
})
export class MetricsContainerComponent implements DashboardComponent<typeof MetricsContainerComponent> {
  /** Input type for Metrics Container Component */
  static readonly def = z.object({
    type: z.literal('MetricsContainer'),
    items: METRICS_CARD_DEF.array(),
  });

  /** Input for metrics container component */
  readonly spec = input.required<DashboardComponentSpecFor<typeof MetricsContainerComponent>>();

  /** Selects css class based on number of items inside the metrics card */
  selectLayoutClass(items: MetricsItemSpec[]): string | undefined {
    if (items.length >= 4) {
      return 'multi-column';
    }

    return undefined;
  }
}
