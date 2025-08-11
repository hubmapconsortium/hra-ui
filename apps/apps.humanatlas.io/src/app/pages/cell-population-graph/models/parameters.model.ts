/**
 * Main configuration and model definitions for the Cell Population Graph application.
 */

import { z } from 'zod';

/** Configuration JSON URL */
export const MAIN_CONFIG_JSON =
  'https://raw.githubusercontent.com/hubmapconsortium/tissue-bar-graphs/static/config/main.config.json';

/** Order types for sorting */
export const OrderTypeSchema = z.enum(['ascending', 'descending']);
/** Order type for sorting */
export type OrderType = z.infer<typeof OrderTypeSchema>;

/** Graph attributes used for sorting and grouping */
export type GraphAttribute = z.infer<typeof GraphAttributeSchema>;
/** Graph attributes schema */
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

/** Configuration schema for the Cell Population Graph */
export type Configuration = z.infer<typeof ConfigurationSchema>;
/** Configuration schema */
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

/** Labels for graph attributes */
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

/** Graph selection state schema */
export type GraphSelectionState = z.infer<typeof GraphSelectionStateSchema>;
/** Graph selection state schema */
export const GraphSelectionStateSchema = z.object({
  datasetSource: z.string(),
  sortBy: z.string(),
  orderType: OrderTypeSchema,
  groupBy: GraphAttributeSchema,
  yAxisField: GraphAttributeSchema,
  xAxisField: GraphAttributeSchema,
});

/** Dataset option schema */
export type DatasetOption = z.infer<typeof DatasetOptionSchema>;
/** Dataset option schema */
export const DatasetOptionSchema = z.object({
  key: z.string(),
  label: z.string(),
});

/** Group option schema */
export type GroupOption = z.infer<typeof GroupOptionSchema>;
/** Group option schema */
export const GroupOptionSchema = z.object({
  key: GraphAttributeSchema,
  label: z.string(),
});
