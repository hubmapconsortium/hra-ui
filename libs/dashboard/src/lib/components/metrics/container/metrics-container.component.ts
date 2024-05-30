import { Component, input } from '@angular/core';
import { z } from 'zod';
import { DashboardComponent } from '../../../dashboard/dashboard.model';
import { METRICS_CARD_DEF, MetricsCardComponent } from '../card/metrics-card.component';

@Component({
  selector: 'hra-dashboard-metrics-container',
  templateUrl: './metrics-container.component.html',
  styleUrl: './metrics-container.component.scss',
  imports: [MetricsCardComponent],
  standalone: true,
})
export class MetricsContainerComponent implements DashboardComponent<typeof MetricsContainerComponent> {
  static readonly type = 'MetricsContainer';
  static readonly def = z.object({
    type: z.literal('MetricsContainer'),
    items: METRICS_CARD_DEF.array(),
  });

  readonly spec = input<z.infer<(typeof MetricsContainerComponent)['def']>>();
}
