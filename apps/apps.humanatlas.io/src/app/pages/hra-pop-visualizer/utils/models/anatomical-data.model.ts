import { z } from 'zod';

export const AnatomicalSparqlBindingSchema = z.object({
  organ: z.object({ value: z.string() }),
  as: z.object({ value: z.string() }),
  as_label: z.object({ value: z.string() }),
  sex: z.object({ value: z.string() }),
  tool: z.object({ value: z.string() }),
  modality: z.object({ value: z.string() }),
  cell_id: z.object({ value: z.string() }),
  cell_label: z.object({ value: z.string() }),
  cell_count: z.object({ value: z.string() }),
  cell_percentage: z.object({ value: z.string() }),
  dataset_count: z.object({ value: z.string() }),
});

export const ParsedAnatomicalDataSchema = z.object({
  organ: z.string(),
  anatomicalStructureId: z.string(),
  anatomicalStructureLabel: z.string(),
  sex: z.string(),
  tool: z.string(),
  modality: z.string(),
  cellId: z.string(),
  cellLabel: z.string(),
  cellCount: z.number(),
  cellPercentage: z.number(),
  datasetCount: z.number(),
});

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

export type AnatomicalSparqlBinding = z.infer<typeof AnatomicalSparqlBindingSchema>;
export type ParsedAnatomicalData = z.infer<typeof ParsedAnatomicalDataSchema>;

export function parseAnatomical(raw: unknown): ParsedAnatomicalData {
  return AnatomicalDataTransformSchema.parse(raw);
}
