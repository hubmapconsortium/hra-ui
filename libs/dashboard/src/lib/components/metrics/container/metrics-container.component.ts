import { Component, input } from '@angular/core';
import { z } from 'zod';
import { DashboardComponent } from '../../../dashboard/dashboard.model';

@Component({
  selector: 'hra-dashboard-metrics-container',
  templateUrl: './metrics-container.component.html',
})
export class MetricsContainerComponent implements DashboardComponent<typeof MetricsContainerComponent> {
  static readonly type = 'MetricsContainer';
  static readonly def = z.object({
    type: z.literal('MetricsContainer'),
    items: z
      .object({
        title: z.string(),
        tooltip: z.string(),
        source: z.string().url().optional(),
        items: z
          .object({
            label: z.string(),
            count: z.number(),
            unit: z.string().optional(),
          })
          .array(),
      })
      .array(),
  });

  readonly spec = input<z.infer<(typeof MetricsContainerComponent)['def']>>();
}
