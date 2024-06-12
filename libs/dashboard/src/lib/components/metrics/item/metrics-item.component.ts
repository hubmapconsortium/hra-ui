import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { z } from 'zod';

/** Type definition of Metrics Item */
export type MetricsItemSpec = z.infer<typeof METRICS_ITEM_DEF>;

/** Metrics Item definition object */
export const METRICS_ITEM_DEF = z.object({
  label: z.string(),
  count: z.number(),
  unit: z.string().optional(),
});

/** Metrics Item Component, renders item with count */
@Component({
  selector: 'hra-metrics-item',
  templateUrl: './metrics-item.component.html',
  styleUrl: './metrics-item.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetricsItemComponent {
  /** Input for Metrics Item Component */
  readonly spec = input.required<MetricsItemSpec>();
}
