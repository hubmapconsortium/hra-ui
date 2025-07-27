/**
 * Main configuration and model definitions for the Cell Population Graph application.
 */

import { z } from 'zod';

/** Configuration JSON URL */
export const MAIN_CONFIG_JSON =
  'https://raw.githubusercontent.com/hubmapconsortium/tissue-bar-graphs/static/config/main.config.json';

/** Preview configuration JSON URL */
export const PREVIEW_CONFIG_JSON =
  'https://raw.githubusercontent.com/hubmapconsortium/tissue-bar-graphs/static/config/preview.config.json';

/** Order types for sorting */
export const OrderTypeSchema = z.enum(['ascending', 'descending']);
export type OrderType = z.infer<typeof OrderTypeSchema>;

/** Preview modes */
export const PreviewModeSchema = z.enum(['bluelake-kidney']);
export type PreviewMode = z.infer<typeof PreviewModeSchema>;

/** Checks if a mode is a valid PreviewMode */
export function isOfTypePreviewMode(mode: string): mode is PreviewMode {
  return PreviewModeSchema.options.includes(mode as any);
}

export type GraphAttribute = z.infer<typeof GraphAttributeSchema>;
export const GraphAttributeSchema = z.enum([
  '',
  'cell_type',
  'dataset_id',
  'count',
  'percentage',
  'order',
  'sex',
  'race',
  'age',
  'cat',
  'exp',
  'location',
  'laterality',
  'y_pos',
  'donor_id',
  'dataset_name',
  'cell_type_ontology_id',
]);

export type Configuration = z.infer<typeof ConfigurationSchema>;
export const ConfigurationSchema = z.object({
  label: z.string(),
  basePath: z.string(),
  datasets: z.array(z.string()),
  groupTypes: z.record(z.string()),
  fixed: z.number().optional(),
  colorPalette: z.array(z.string()),
  sortAttributes: z.array(GraphAttributeSchema),
  defaultYAxisField: GraphAttributeSchema.optional(),
  defaultXAxisField: GraphAttributeSchema.optional(),
  defaultGroupBy: GraphAttributeSchema.optional(),
});

export const GRAPH_ATTRIBUTE_LABELS = {
  '': 'None',
  cell_type: 'Cell Type',
  dataset_id: 'Dataset ID',
  count: 'Cell Count',
  percentage: 'Cell Proportion',
  order: 'Order',
  sex: 'Sex',
  race: 'Ethnicity',
  age: 'Age',
  cat: 'Category',
  exp: 'Exposure',
  location: 'Location',
  laterality: 'Laterality',
  y_pos: 'Vertical Tissue Block Position',
  donor_id: 'Donor',
  dataset_name: 'Dataset Name',
  cell_type_ontology_id: 'CellOntologyID',
};

export type GraphSelectionState = z.infer<typeof GraphSelectionStateSchema>;
export const GraphSelectionStateSchema = z.object({
  datasetSource: z.string(),
  sortBy: z.string(),
  orderType: OrderTypeSchema,
  groupBy: GraphAttributeSchema,
  yAxisField: GraphAttributeSchema,
  xAxisField: GraphAttributeSchema,
});

export type DatasetOption = z.infer<typeof DatasetOptionSchema>;
export const DatasetOptionSchema = z.object({
  key: z.string(),
  label: z.string(),
});

export type GroupOption = z.infer<typeof GroupOptionSchema>;
export const GroupOptionSchema = z.object({
  key: GraphAttributeSchema,
  label: z.string(),
});
