import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { PageTableSchema } from '@hra-ui/design-system/table';
import { z } from 'zod';

/** Type for Summary Statistics Table */
export type SummaryStatisticsTable = z.infer<typeof SummaryStatisticsTableSchema>;

/** Schema for Summary Statistics Table Component
 * This schema extends the ContentTemplateSchema and PageTableSchema,
 * adding properties specific to the summary statistics table component.
 */
export const SummaryStatisticsTableSchema = ContentTemplateSchema.merge(
  PageTableSchema.pick({
    columns: true,
  }),
).extend({
  component: z.literal('SummaryStatisticsTable'),
  csvUrl: z.string(),
  organColumn: z.string(),
});
