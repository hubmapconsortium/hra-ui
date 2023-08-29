import { z } from 'zod';
import { IRI, URL } from '../shared/common.model';

// ---------------------------------------
// Error messages
// ---------------------------------------

/** Error message for non integer counts */
const COUNT_INTEGER_ERROR = 'Count must be an integer';

/** Error message for negative counts */
const COUNT_RANGE_ERROR = 'Count must be greater than or equal to 0';

/** Error message for negative counts */
const PERCENTAGE_RANGE_ERROR = 'Percentage must be between 0 and 1 (inclusive)';

// ---------------------------------------
// Utility schemas
// ---------------------------------------

/** A integer greater than or equal to zero */
const COUNT = z.number().int(COUNT_INTEGER_ERROR).nonnegative(COUNT_RANGE_ERROR);

/** A number between 0 and 1 inclusive */
const PERCENTAGE = z.number().gte(0, PERCENTAGE_RANGE_ERROR).lte(1, PERCENTAGE_RANGE_ERROR);

// ---------------------------------------
// Model schemas
// ---------------------------------------

/** Zod Schema for a tissue object */
export const TISSUE = z.object({
  id: IRI,
  label: z.string(),
  parent: IRI,
  children: IRI.array().default([]),
  link: z.string().optional(),
});

/** Zod Schema for a tissue library object */
export const TISSUE_LIBRARY = z.object({
  root: IRI,
  nodes: z.record(IRI, TISSUE),
});

/** Zod Schema for a cell object */
export const CELL = z.object({
  id: IRI,
  label: z.string(),
});

/** Zod Schema for a BIOMARKER */
export const BIOMARKER = z.object({
  id: IRI,
  label: z.string(),
});

/** Zod Schema for a CELL_SUMMARY_ROW */
export const CELL_SUMMARY_ROW = z.object({
  cell: IRI,
  biomarker: IRI,
  count: COUNT,
  percentage: PERCENTAGE,
  meanExpression: PERCENTAGE,
  dataset_count: COUNT.optional(),
});

/** Zod Schema for a CELL_SUMMARY */
export const CELL_SUMMARY = z.object({
  label: z.string(),
  cells: CELL.array(),
  biomarkers: BIOMARKER.array(),
  summaries: CELL_SUMMARY_ROW.array(),
});

/** Zod Schema for a DATA_FILE_REFERENCE */
export const DATA_FILE_REFERENCE = z.object({
  format: z.string(),
  url: URL,
});

/** Zod Schema for a SOURCE_REFERENCE */
export const SOURCE_REFERENCE = z.object({
  title: z.string(),
  label: z.string(),
  link: z.string().url(),
});

/** Zod Schema for a ILLUSTRATION_MAPPING_ITEM */
export const ILLUSTRATION_MAPPING_ITEM = z.object({
  id: z.string(),
  label: z.string(),
});

// ---------------------------------------
// Model types
// ---------------------------------------

/** Type for Tissue */
export type Tissue = z.infer<typeof TISSUE>;

/** Type for Tissue */
export type TissueLibrary = z.infer<typeof TISSUE_LIBRARY>;

/** Type for a cell */
export type Cell = z.infer<typeof CELL>;

/** Type for a Biomarker */
export type Biomarker = z.infer<typeof BIOMARKER>;

/** Type for a CellSummaryRow */
export type CellSummaryRow = z.infer<typeof CELL_SUMMARY_ROW>;

/** Type for a CellSummary */
export type CellSummary = z.infer<typeof CELL_SUMMARY>;

/** Type for a DataFileReference */
export type DataFileReference = z.infer<typeof DATA_FILE_REFERENCE>;

/** Type for a SourceReference */
export type SourceReference = z.infer<typeof SOURCE_REFERENCE>;

/** Type for a IllustrationMappingItem */
export type IllustrationMappingItem = z.infer<typeof ILLUSTRATION_MAPPING_ITEM>;
