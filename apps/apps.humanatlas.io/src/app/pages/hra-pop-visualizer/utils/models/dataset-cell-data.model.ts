import { z } from 'zod';

/**
 * Zod schema for validating SPARQL binding responses for dataset cell data
 */
export const DatasetCellSparqlBindingSchema = z.object({
  /** Organ identifier */
  organ_id: z.object({ value: z.string() }),
  /** Organ name */
  organ: z.object({ value: z.string() }),
  /** Dataset identifier */
  dataset: z.object({ value: z.string() }),
  /** Sex information (Male/Female) */
  sex: z.object({ value: z.string() }),
  /** Annotation tool used */
  tool: z.object({ value: z.string() }),
  /** Data modality information */
  modality: z.object({ value: z.string() }),
  /** Cell type identifier */
  cell_id: z.object({ value: z.string() }),
  /** Cell type label/name */
  cell_label: z.object({ value: z.string() }),
  /** Cell count as string */
  cell_count: z.object({ value: z.string() }),
  /** Cell percentage as string */
  cell_percentage: z.object({ value: z.string() }),
});

/**
 * Zod schema for parsed dataset cell data structure
 */
export const ParsedDatasetCellDataSchema = z.object({
  /** Organ identifier */
  organId: z.string(),
  /** Organ name */
  organ: z.string(),
  /** Dataset identifier */
  datasetId: z.string(),
  /** Sex designation */
  sex: z.string(),
  /** Annotation tool identifier */
  tool: z.string(),
  /** Data modality */
  modality: z.string(),
  /** Cell type identifier */
  cellId: z.string(),
  /** Cell type display label */
  cellLabel: z.string(),
  /** Numeric cell count */
  cellCount: z.number(),
  /** Numeric cell percentage */
  cellPercentage: z.number(),
});

/**
 * Zod transformation schema for converting raw SPARQL bindings to parsed format
 */
export const DatasetCellDataTransformSchema = DatasetCellSparqlBindingSchema.transform((raw) => ({
  organId: raw.organ_id.value,
  organ: raw.organ.value,
  datasetId: raw.dataset.value,
  sex: raw.sex.value,
  tool: raw.tool.value,
  modality: raw.modality.value,
  cellId: raw.cell_id.value,
  cellLabel: raw.cell_label.value,
  cellCount: Number(raw.cell_count.value),
  cellPercentage: Number(raw.cell_percentage.value),
}));

/** Type for raw SPARQL binding response for dataset cell data */
export type DatasetCellSparqlBinding = z.infer<typeof DatasetCellSparqlBindingSchema>;

/** Type for parsed dataset cell data */
export type ParsedDatasetCellData = z.infer<typeof ParsedDatasetCellDataSchema>;

/**
 * Parses raw SPARQL binding data into structured dataset cell data
 * @param raw - Raw SPARQL binding object
 * @returns Parsed dataset cell data object
 */
export function parseDatasetCell(raw: unknown): ParsedDatasetCellData {
  return DatasetCellDataTransformSchema.parse(raw);
}
