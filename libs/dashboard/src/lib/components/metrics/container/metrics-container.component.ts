import { Component, computed, input } from '@angular/core';
import { z } from 'zod';
import { DashboardComponent, DashboardComponentSpecFor } from '../../../dashboard/dashboard.model';
import { TITLE_CARD_DEF, TitleCardComponent } from '../../title-card/title-card.component';
import { METRICS_ITEM_DEF, MetricsItemComponent, MetricsItemSpec } from '../item/metrics-item.component';

export type MetricsCard = z.infer<typeof METRICS_CARD_DEF>;

/** Metrics card definition */
export const METRICS_CARD_DEF = TITLE_CARD_DEF.extend({
  items: METRICS_ITEM_DEF.array(),
});

const WIDE_CARD_MIN_ITEM_COUNT = 4;

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

  private readonly layout = computed(() => {
    const cards = this.spec().items;
    const isWide: boolean[] = [];
    for (let index = 0; index < cards.length; index++) {
      const next = cards.at(index + 1);
      if (this.isWideCard(cards[index])) {
        isWide.push(true);
      } else if (next && !this.isWideCard(next)) {
        isWide.push(false, false);
        index += 1;
      } else {
        isWide.push(true);
      }
    }

    return isWide;
  });

  isWideCard(card: MetricsCard): boolean {
    return card.items.length >= WIDE_CARD_MIN_ITEM_COUNT;
  }

  isWideCardAt(index: number): boolean {
    return this.layout()[index];
  }

  /** Selects css class based on number of items inside the metrics card */
  selectLayoutClass(items: MetricsItemSpec[]): string | undefined {
    if (items.length > 3) {
      return 'span-columns';
    }

    return undefined;
  }
}
