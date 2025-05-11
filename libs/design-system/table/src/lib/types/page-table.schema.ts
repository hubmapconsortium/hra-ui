import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

/** Schema for table link */
export const TableLinkSchema = z.object({
  /** Link label */
  label: z.unknown(),
  /** Link url */
  url: z.string(),
});

/** Type for table link */
export type TableLink = z.infer<typeof TableLinkSchema>;

/** Schema for markdown table entry */
export const TableMarkdownSchema = z.object({
  /** Markdown as string */
  markdown: z.string(),
});

/** Type for markdown table entry */
export type TableMarkdown = z.infer<typeof TableMarkdownSchema>;

/** Schema for table style */
export const TableVariantSchema = z.enum(['alternating', 'divider', 'basic']);

/** Type for table style */
export type TableVariant = z.infer<typeof TableVariantSchema>;

/** Schema for a single table row */
export const TableRowSchema = z.record(
  z.string(),
  z.union([z.string(), z.number(), TableLinkSchema, TableMarkdownSchema]),
);

/** Type for a single table row */
export type TableRow = z.infer<typeof TableRowSchema>;

/** Schema for table columns */
export const TableColumnsSchema = z.union([z.array(z.string()), z.record(z.string(), z.string())]);

/** Type for table columns */
export type TableColumns<T extends TableRow> = (keyof T & string)[] | Partial<Record<keyof T & string, string>>;

/** Page table component data */
export type PageTable = z.infer<typeof PageTableSchema>;

/** Schema for page table component */
export const PageTableSchema = ContentTemplateSchema.extend({
  data: z.array(TableRowSchema),
  columns: TableColumnsSchema,
  style: TableVariantSchema.default('alternating'),
  enableSort: z.boolean().default(false),
  verticalDividers: z.boolean().default(false),
});
