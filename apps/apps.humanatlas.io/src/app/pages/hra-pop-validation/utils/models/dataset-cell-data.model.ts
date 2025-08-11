import { z } from 'zod';

export const DatasetCellSparqlBindingSchema = z.object({
  organ_id: z.object({ value: z.string() }),
  organ: z.object({ value: z.string() }),
  dataset: z.object({ value: z.string() }),
  sex: z.object({ value: z.string() }),
  tool: z.object({ value: z.string() }),
  modality: z.object({ value: z.string() }),
  cell_id: z.object({ value: z.string() }),
  cell_label: z.object({ value: z.string() }),
  cell_count: z.object({ value: z.string() }),
  cell_percentage: z.object({ value: z.string() }),
});

export const ParsedDatasetCellDataSchema = z.object({
  organId: z.string(),
  organ: z.string(),
  datasetId: z.string(),
  sex: z.string(),
  tool: z.string(),
  modality: z.string(),
  cellId: z.string(),
  cellLabel: z.string(),
  cellCount: z.number(),
  cellPercentage: z.number(),
});

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

export type DatasetCellSparqlBinding = z.infer<typeof DatasetCellSparqlBindingSchema>;
export type ParsedDatasetCellData = z.infer<typeof ParsedDatasetCellDataSchema>;

export function parseDatasetCell(raw: unknown): ParsedDatasetCellData {
  return DatasetCellDataTransformSchema.parse(raw);
}
