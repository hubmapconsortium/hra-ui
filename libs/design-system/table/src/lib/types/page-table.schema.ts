import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { enableSelection } from 'ngx-scrollbar/lib/utils/common';
import { z } from 'zod';

/** Type for table style */
export type TableVariant = z.infer<typeof TableVariantSchema>;

/** Schema for table style */
export const TableVariantSchema = z.enum(['alternating', 'divider', 'basic']);

/** Type for a single table row */
export type TableRow = z.infer<typeof TableRowSchema>;

/** Schema for a single table row */
export const TableRowSchema = z.record(z.union([z.string(), z.number(), z.boolean()]));

/** Type for Text Column */
export type TextColumnType = z.infer<typeof TextColumnTypeSchema>;

/** Schema for Text Column */
export const TextColumnTypeSchema = z.object({
  type: z.literal('text'),
});

/** Type for Numeric Column */
export type NumericColumnType = z.infer<typeof NumericColumnTypeSchema>;

/** Schema for Numeric Column */
export const NumericColumnTypeSchema = z.object({
  type: z.literal('numeric'),
  // TODO add format
});

/** Type for Markdown Column */
export type MarkdownColumnType = z.infer<typeof MarkdownColumnTypeSchema>;

/** Schema for Markdown Column */
export const MarkdownColumnTypeSchema = z.object({
  type: z.literal('markdown'),
});

/** Type for Link Column */
export type LinkColumnType = z.infer<typeof LinkColumnTypeSchema>;

/** Schema for Markdown Column */
export const LinkColumnTypeSchema = z.object({
  type: z.literal('link'),
  urlColumn: z.string(),
});

export type CheckboxColumnType = z.infer<typeof CheckboxColumnTypeSchema>;

export const CheckboxColumnTypeSchema = z.object({
  type: z.literal('checkbox'),
});

/** Union of Schema Types for Simple Columns */
export const SimpleTableColumnTypeSchema = z.union([
  TextColumnTypeSchema.shape.type,
  NumericColumnTypeSchema.shape.type,
  MarkdownColumnTypeSchema.shape.type,
  CheckboxColumnTypeSchema.shape.type,
]);

/** Inferred types for Table Columns */
export type TableColumnType = z.infer<typeof TableColumnTypeSchema>;

/** Union of Schema Types for Table Columns */
export const TableColumnTypeSchema = z.union([
  TextColumnTypeSchema,
  NumericColumnTypeSchema,
  MarkdownColumnTypeSchema,
  LinkColumnTypeSchema,
  CheckboxColumnTypeSchema,
]);

/** Type for table columns */
export type TableColumn = z.infer<typeof TableColumnSchema>;

/** Type for the columns with type specified */
export type TableColumnWithType<C extends TableColumnType> = Omit<TableColumn, 'type'> & { type: C };

/** Schema for table columns */
export const TableColumnSchema = z.object({
  column: z.string(),
  label: z.string(),
  type: z.union([SimpleTableColumnTypeSchema, TableColumnTypeSchema]).default('text'),
});

/** Page table component data */
export type PageTable = z.infer<typeof PageTableSchema>;

/** Schema for page table component */
export const PageTableSchema = ContentTemplateSchema.extend({
  component: z.literal('PageTable'),
  csvUrl: z.string().optional(),
  columns: TableColumnSchema.array().optional(),
  rows: z.array(TableRowSchema).optional(),
  style: TableVariantSchema.optional(),
  enableSort: z.boolean().optional(),
  verticalDividers: z.boolean().optional(),
  enableSelection: z.boolean().optional(),
});
