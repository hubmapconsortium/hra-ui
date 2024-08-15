import { createLinkId } from '@hra-ui/cdk/state';
import { z } from 'zod';
import { IRI } from '../shared/common.model';

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
  link: z.string().transform(createLinkId).optional(),
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
  id: z.string(),
  label: z.string(),
});

/** Zod Schema for a CELL_SUMMARY_ROW */
export const CELL_SUMMARY_ROW = z.object({
  cell: IRI,
  biomarker: z.string(),
  count: COUNT,
  percentage: PERCENTAGE,
  meanExpression: PERCENTAGE,
  dataset_count: COUNT.optional(),
});

/** Zod Schema for a CELL_SUMMARY */
export const CELL_SUMMARY = z.object({
  cell_source: IRI,
  biomarker_type: z.string(),
  summary: z
    .object({
      cell_id: IRI,
      cell_label: z.string(),
      genes: z
        .object({
          gene_id: z.string(),
          gene_label: z.string(),
          ensemble_id: z.string(),
          mean_expression: z.number(),
        })
        .array(),
      count: z.number(),
      percentage: z.number(),
      dataset_count: z.number().optional(),
    })
    .array(),
});

/** Zod Schema for a DATA_FILE_REFERENCE */
export const DATA_FILE_REFERENCE = z.object({
  format: z.string(),
  url: z.string(),
});

/** Zod Schema for a SOURCE_REFERENCE */
export const SOURCE_REFERENCE = z.object({
  id: IRI,
  title: z.string(),
  label: z.string(),
  authors: z.string().array(),
  year: z.number(),
  doi: z.string(),
  link: z.string().url(),
});

/** Zod Schema for a ILLUSTRATION_MAPPING_ITEM */
export const ILLUSTRATION_MAPPING_ITEM = z.object({
  id: z.string(),
  groupId: z.string(),
  label: z.string(),
  ontologyId: z.string(),
  source: z.any().transform((value): RawCellEntry => value),
});

/** Cell entry zod validator */
export const RAW_CELL_ENTRY = z
  .object({
    label: z.string(),
    svg_id: z.string(),
    svg_group_id: z.string(),
    representation_of: z.string(),
  })
  .passthrough();

/** Illustration file zod validator */
export const RAW_ILLUSTRATION_FILE = z.object({
  file: z.string(),
  file_format: z.string(),
});

/** Illustration zod validator */
export const RAW_ILLUSTRATION = z.object({
  '@id': IRI,
  label: z.string(),
  organ_id: z.string(),
  organ_label: z.string(),
  representation_of: z.string(),
  mapping: RAW_CELL_ENTRY.array(),
  illustration_files: RAW_ILLUSTRATION_FILE.array(),
});

/** Illustration graph jsonld zod validator */
export const RAW_ILLUSTRATIONS_JSONLD = z.object({
  '@graph': RAW_ILLUSTRATION.array(),
});

/** DATASETS Object reflecting the format in the file*/
export const RAW_DATASETS = z.object({
  '@graph': z
    .object({
      '@id': IRI,
      data_sources: z
        .object({
          '@id': IRI,
          label: z.string(),
          description: z.string(),
          authors: z.string().array().optional(),
          year: z.number().optional(),
          doi: z.string().optional(),
          link: z.string(),
        })
        .array(),
    })
    .array(),
});

/** CELL_SUMMARIES zod object reflecting the format in the file*/
export const RAW_CELL_SUMMARIES = z.object({
  '@graph': CELL_SUMMARY.array(),
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

/** Single cell entry in an illustration */
export type RawCellEntry = z.infer<typeof RAW_CELL_ENTRY>;

/** Illustration file information */
export type RawIllustrationFile = z.infer<typeof RAW_ILLUSTRATION_FILE>;

/** Illustration data object */
export type RawIllustration = z.infer<typeof RAW_ILLUSTRATION>;

/** Collection of illustrations as jsonld */
export type RawIllustrationsJsonld = z.infer<typeof RAW_ILLUSTRATIONS_JSONLD>;

/** Collection of datasets */
export type RawDatasets = z.infer<typeof RAW_DATASETS>;

/** Raw cell summary */
export type RawCellSummary = z.infer<typeof RAW_CELL_SUMMARIES>;
