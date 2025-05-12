import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

/** Type for table link */
export type TableLink = z.infer<typeof TableLinkSchema>;

/** Schema for table link */
export const TableLinkSchema = z.object({
  /** Link label */
  label: z.unknown(),
  /** Link url */
  url: z.string(),
});

/** Type for markdown table entry */
export type TableMarkdown = z.infer<typeof TableMarkdownSchema>;

/** Schema for markdown table entry */
export const TableMarkdownSchema = z.object({
  /** Markdown as string */
  markdown: z.string(),
});

/** Type for table style */
export type TableVariant = z.infer<typeof TableVariantSchema>;

/** Schema for table style */
export const TableVariantSchema = z.enum(['alternating', 'divider', 'basic']);

/** Type for a single table row */
export type TableRow = z.infer<typeof TableRowSchema>;

/** Schema for a single table row */
export const TableRowSchema = z.record(z.union([z.string(), z.number(), TableLinkSchema, TableMarkdownSchema]));

/** Type for table columns */
export type TableColumns = z.infer<typeof TableColumnsSchema>;

export type TableColumnsForRows<T extends TableRow> = (keyof T & string)[] | Partial<Record<keyof T & string, string>>;

/** Schema for table columns */
export const TableColumnsSchema = z.union([z.array(z.string()), z.record(z.string(), z.string())]);

/** Page table component data */
export type PageTable = z.infer<typeof PageTableSchema>;

/** Schema for page table component */
export const PageTableSchema = ContentTemplateSchema.extend({
  component: z.literal('PageTable'),
  columns: TableColumnsSchema,
  rows: z.array(TableRowSchema),
  style: TableVariantSchema.default('alternating'),
  enableSort: z.boolean().default(false),
  verticalDividers: z.boolean().default(false),
});
