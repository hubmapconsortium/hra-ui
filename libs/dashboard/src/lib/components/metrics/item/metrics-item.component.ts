import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { z } from 'zod';

export const METRICS_ITEM_DEF = z.object({
  label: z.string(),
  count: z.number(),
  unit: z.string().optional(),
});

@Component({
  selector: 'hra-metrics-item',
  templateUrl: './metrics-item.component.html',
  styleUrl: './metrics-item.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetricsItemComponent {
  readonly spec = input.required<z.infer<typeof METRICS_ITEM_DEF>>();
}
