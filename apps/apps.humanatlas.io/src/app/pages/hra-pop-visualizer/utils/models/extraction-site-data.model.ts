import { z } from 'zod';

/**
 * Zod schema for validating SPARQL binding responses for extraction site data
 */
export const ExtractionSiteSparqlBindingSchema = z.object({
  /** Organ identifier */
  organ_id: z.object({ value: z.string() }),
  /** Organ name */
  organ: z.object({ value: z.string() }),
  /** Extraction site identifier */
  extraction_site: z.object({ value: z.string() }),
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
 * Zod schema for parsed extraction site data structure
 */
export const ParsedExtractionSiteDataSchema = z.object({
  /** Organ identifier */
  organId: z.string(),
  /** Organ name */
  organ: z.string(),
  /** Extraction site identifier */
  extractionSiteId: z.string(),
  /** Enhanced extraction site label in format: htan-{organ}-{creator_last_name}-{creation_year} */
  extractionSiteLabel: z.string().optional(),
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
export const ExtractionSiteDataTransformSchema = ExtractionSiteSparqlBindingSchema.transform((raw) => ({
  organId: raw.organ_id.value,
  organ: raw.organ.value,
  extractionSiteId: raw.extraction_site.value,
  sex: raw.sex.value,
  tool: raw.tool.value,
  modality: raw.modality.value,
  cellId: raw.cell_id.value,
  cellLabel: raw.cell_label.value,
  cellCount: Number(raw.cell_count.value),
  cellPercentage: Number(raw.cell_percentage.value),
}));

/** Type for raw SPARQL binding response for extraction site data */
export type ExtractionSiteSparqlBinding = z.infer<typeof ExtractionSiteSparqlBindingSchema>;

/** Type for parsed extraction site data */
export type ParsedExtractionSiteData = z.infer<typeof ParsedExtractionSiteDataSchema>;

/**
 * Parses raw SPARQL binding data into structured extraction site data
 * @param raw - Raw SPARQL binding object
 * @returns Parsed extraction site data object
 */
export function parseExtractionSite(raw: unknown): ParsedExtractionSiteData {
  return ExtractionSiteDataTransformSchema.parse(raw);
}
