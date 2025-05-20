import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { PageTableSchema } from '@hra-ui/design-system/table';
import { z } from 'zod';

/**
 * Schema for versioned data
 */
export type VersionedData = z.infer<typeof VersionedDataSchema>;

/**
 * Schema for versioned data
 */
export const VersionedDataSchema = PageTableSchema.pick({
  csvUrl: true,
  columns: true,
  rows: true,
  style: true,
  enableSort: true,
  verticalDividers: true,
}).extend({
  label: z.string(),
});

/**
 * Type for versioned Data Table
 */
export type VersionedDataTable = z.infer<typeof VersionedDataTableSchema>;

/**
 * Schema for versioned data table
 *
 * This schema extends the PageTableSchema and adds additional properties
 * specific to the versioned table data component.
 */
export const VersionedDataTableSchema = ContentTemplateSchema.merge(
  PageTableSchema.pick({
    columns: true,
    style: true,
    enableSort: true,
    verticalDividers: true,
  }),
).extend({
  component: z.literal('VersionedDataTable'),
  label: z.string(),
  selection: z.number().optional(),
  items: VersionedDataSchema.array(),
});
