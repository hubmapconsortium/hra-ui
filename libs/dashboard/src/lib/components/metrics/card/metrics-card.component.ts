import { z } from 'zod';
import { METRICS_ITEM_DEF, MetricsItemComponent } from '../item/metrics-item.component';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TITLE_CARD_DEF, TitleCardComponent } from '../../title-card/title-card.component';

export const METRICS_CARD_DEF = TITLE_CARD_DEF.extend({
  items: METRICS_ITEM_DEF.array(),
});

@Component({
  selector: 'hra-metrics-card',
  templateUrl: './metrics-card.component.html',
  styleUrl: './metrics-card.component.scss',
  imports: [MatIconModule, MetricsItemComponent, TitleCardComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetricsCardComponent {
  readonly spec = input.required<z.infer<typeof METRICS_CARD_DEF>>();
}
