import { AnyContentTemplateSchema, ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

export type DataSelector = z.infer<typeof DataSelectorSchema>;

export const DataSelectorSchema = ContentTemplateSchema.extend({
  component: z.literal('DataSelector'),
  label: z.string(),
  initialSelection: z.string().optional(),
  data: z.record(AnyContentTemplateSchema),
});
