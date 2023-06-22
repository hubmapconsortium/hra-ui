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

export const CELL = z.object({
  id: IRI,
  label: z.string(),
});

export const BIOMARKER = z.object({
  id: IRI,
  label: z.string(),
});

export const CELL_SUMMARY_ROW = z.object({
  cell: IRI,
  biomarker: IRI,
  count: COUNT,
  percentage: PERCENTAGE,
});

export const CELL_SUMMARY = z.object({
  label: z.string(),
  cells: CELL.array(),
  biomarkers: BIOMARKER.array(),
  summaries: CELL_SUMMARY_ROW.array(),
});

export const DATA_FILE_REFERENCE = z.object({
  format: z.string(),
  url: URL,
});

export const SOURCE_REFERENCE = z.object({
  label: z.string(),
  link: z.string().url(),
});

export const SVG_REFERENCE = z.object({
  label: z.string(),
  node_name: z.string(),
});

// ---------------------------------------
// Model types
// ---------------------------------------

export type Cell = z.infer<typeof CELL>;

export type Biomarker = z.infer<typeof BIOMARKER>;

export type CellSummaryRow = z.infer<typeof CELL_SUMMARY_ROW>;

export type CellSummary = z.infer<typeof CELL_SUMMARY>;

export type DataFileReference = z.infer<typeof DATA_FILE_REFERENCE>;

export type SourceReference = z.infer<typeof SOURCE_REFERENCE>;

export type SvgReference = z.infer<typeof SVG_REFERENCE>;
