import { Component, computed, input } from '@angular/core';
import { z } from 'zod';
import { DashboardComponent, DashboardComponentSpecFor } from '../../../dashboard/dashboard.model';
import { TITLE_CARD_DEF, TitleCardComponent } from '../../title-card/title-card.component';
import { METRICS_ITEM_DEF, MetricsItemComponent } from '../item/metrics-item.component';

export type MetricsCard = z.infer<typeof METRICS_CARD_DEF>;

/** Metrics card definition */
export const METRICS_CARD_DEF = TITLE_CARD_DEF.extend({
  items: METRICS_ITEM_DEF.array(),
});

/** Limit to decide if cards needs to be wide */
const WIDE_CARD_MIN_ITEM_COUNT = 4;

/** Metrics Container Component, renders metric cards inside the container */
@Component({
  selector: 'hra-dashboard-metrics-container',
  templateUrl: './metrics-container.component.html',
  styleUrl: './metrics-container.component.scss',
  imports: [TitleCardComponent, MetricsItemComponent],
})
export class MetricsContainerComponent implements DashboardComponent<typeof MetricsContainerComponent> {
  /** Input type for Metrics Container Component */
  static readonly def = z.object({
    type: z.literal('MetricsContainer'),
    items: METRICS_CARD_DEF.array(),
  });

  /** Input for metrics container component */
  readonly spec = input.required<DashboardComponentSpecFor<typeof MetricsContainerComponent>>();

  /** Computes the boolean array if a card needs to be wide */
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

  /** Returns if card needs to be wide based on number of items inside it */
  isWideCard(card: MetricsCard): boolean {
    return card.items.length >= WIDE_CARD_MIN_ITEM_COUNT;
  }

  /** Returns if card is wide based on previously computed array */
  isWideCardAt(index: number): boolean {
    return this.layout()[index];
  }
}
