import * as z from 'zod';

/** Type inferred from DatasetSchema */
export type Dataset = z.infer<typeof DatasetSchema>;

/** Zod schema for dataset data from YAML */
export const DatasetSchema = z.object({
  slug: z.string(),
  thumbnail: z.string(),

  // Visualization parameters
  nodes: z.string(),
  edges: z.string(),
  'node-target-key': z.string(),
  'node-target-value': z.string(),
  'node-cl-id-key': z.string(),
  'max-edge-distance': z.number(),

  // Summary statistics
  cellCount: z.number(),
  originalCellTypesCount: z.number(),
  level3CellTypesCount: z.number(),
  level2CellTypesCount: z.number(),
  level1CellTypesCount: z.number(),
});

/** Type inferred from StudySchema */
export type Study = z.infer<typeof StudySchema>;

/** Zod schema for study data from YAML */
export const StudySchema = z.object({
  slug: z.string(),
  organName: z.string(),
  description: z.string(),
  thumbnail: z.string(),
  authors: z.string(),
  affiliations: z.string(),
  consortium: z.string(),
  technology: z.string(),
  euiUrl: z.string(),
  cellCount: z.number(),
  citations: z.array(z.string()),
  publications: z.array(z.string()),
  datasets: z.array(DatasetSchema),
});

/** Type inferred from StudiesSchema */
export type Studies = z.infer<typeof StudiesSchema>;

/** Schema for the gallery YAML structure */
export const StudiesSchema = z.object({
  studies: z.array(StudySchema),
});
