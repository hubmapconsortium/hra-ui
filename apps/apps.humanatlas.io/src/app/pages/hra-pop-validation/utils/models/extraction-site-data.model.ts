import { z } from 'zod';

export const ExtractionSiteSparqlBindingSchema = z.object({
  organ_id: z.object({ value: z.string() }),
  organ: z.object({ value: z.string() }),
  extraction_site: z.object({ value: z.string() }),
  sex: z.object({ value: z.string() }),
  tool: z.object({ value: z.string() }),
  modality: z.object({ value: z.string() }),
  cell_id: z.object({ value: z.string() }),
  cell_label: z.object({ value: z.string() }),
  cell_count: z.object({ value: z.string() }),
  cell_percentage: z.object({ value: z.string() }),
});

export const ParsedExtractionSiteDataSchema = z.object({
  organId: z.string(),
  organ: z.string(),
  extractionSiteId: z.string(),
  extractionSiteLabel: z.string().optional(), // Enhanced label in format: htan-{organ}-{creator_last_name}-{creation_year}
  sex: z.string(),
  tool: z.string(),
  modality: z.string(),
  cellId: z.string(),
  cellLabel: z.string(),
  cellCount: z.number(),
  cellPercentage: z.number(),
});

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

export type ExtractionSiteSparqlBinding = z.infer<typeof ExtractionSiteSparqlBindingSchema>;
export type ParsedExtractionSiteData = z.infer<typeof ParsedExtractionSiteDataSchema>;

export function parseExtractionSite(raw: unknown): ParsedExtractionSiteData {
  return ExtractionSiteDataTransformSchema.parse(raw);
}
