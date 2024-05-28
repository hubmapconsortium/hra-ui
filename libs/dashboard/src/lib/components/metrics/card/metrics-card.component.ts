import { z } from 'zod';
import { METRICS_ITEM_DEF } from '../item/metrics-item.component';

export const METRICS_CARD_DEF = z.object({
  title: z.string(),
  tooltip: z.string(),
  source: z.string().url().optional(),
  items: METRICS_ITEM_DEF.array(),
});
