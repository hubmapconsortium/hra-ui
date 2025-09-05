import { z } from 'zod';

/**
 * Zod schema for validating SPARQL binding responses for anatomical data
 */
export const AnatomicalSparqlBindingSchema = z.object({
  /** Organ information from SPARQL response */
  organ: z.object({ value: z.string() }),
  /** Anatomical structure identifier */
  as: z.object({ value: z.string() }),
  /** Anatomical structure label/name */
  as_label: z.object({ value: z.string() }),
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
  /** Dataset count as string */
  dataset_count: z.object({ value: z.string() }),
});

/**
 * Zod schema for parsed anatomical data structure
 */
export const ParsedAnatomicalDataSchema = z.object({
  /** Organ name */
  organ: z.string(),
  /** Anatomical structure identifier */
  anatomicalStructureId: z.string(),
  /** Anatomical structure display label */
  anatomicalStructureLabel: z.string(),
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
  /** Numeric dataset count */
  datasetCount: z.number(),
});

/**
 * Zod transformation schema for converting raw SPARQL bindings to parsed format
 */
export const AnatomicalDataTransformSchema = AnatomicalSparqlBindingSchema.transform((raw) => ({
  organ: raw.organ.value,
  anatomicalStructureId: raw.as.value,
  anatomicalStructureLabel: raw.as_label.value,
  sex: raw.sex.value,
  tool: raw.tool.value,
  modality: raw.modality.value,
  cellId: raw.cell_id.value,
  cellLabel: raw.cell_label.value,
  cellCount: Number(raw.cell_count.value),
  cellPercentage: Number(raw.cell_percentage.value),
  datasetCount: Number(raw.dataset_count.value),
}));

/** Type for raw SPARQL binding response for anatomical data */
export type AnatomicalSparqlBinding = z.infer<typeof AnatomicalSparqlBindingSchema>;

/** Type for parsed anatomical data */
export type ParsedAnatomicalData = z.infer<typeof ParsedAnatomicalDataSchema>;

/**
 * Parses raw SPARQL binding data into structured anatomical data
 * @param raw - Raw SPARQL binding object
 * @returns Parsed anatomical data object
 */
export function parseAnatomical(raw: unknown): ParsedAnatomicalData {
  return AnatomicalDataTransformSchema.parse(raw);
}
