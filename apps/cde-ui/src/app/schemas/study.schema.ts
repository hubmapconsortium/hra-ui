import * as z from 'zod';

/** Zod schema for raw dataset data from YAML */
export const RawDatasetSchema = z.object({
  slug: z.string(),
  nodes: z.string(),
  edges: z.string(),
  'node-target-key': z.string(),
  'node-target-value': z.string(),
  'node-cl-id-key': z.string().optional(),
  'max-edge-distance': z.number(),
  thumbnail: z.string(),
  cellCount: z.number(),
  originalCellTypesCount: z.number(),
  level3CellTypesCount: z.number(),
  level2CellTypesCount: z.number(),
  level1CellTypesCount: z.number(),
});

/** Zod schema for raw study data from YAML */
export const RawStudySchema = z.object({
  slug: z.string(),
  organName: z.string(),
  technology: z.string(),
  authors: z.string(),
  affiliations: z.string(),
  consortium: z.string().optional(),
  thumbnail: z.string().optional(),
  cellCount: z.number().optional(),
  description: z.string().optional(),
  datasets: z.array(RawDatasetSchema).default([]),
  euiUrl: z.string().optional(),
  publication: z.array(z.string()).optional(),
  publications: z.array(z.string()).optional(),
  citation: z.string().optional(),
  citations: z.array(z.string()).optional(),
});

/** Type inferred from RawStudySchema */
export type RawStudy = z.infer<typeof RawStudySchema>;

/** Schema for the gallery YAML structure */
export const StudyDataSchema = z.object({
  studies: z.array(RawStudySchema),
});

/** Type inferred from StudyDataSchema */
export type StudyDataType = z.infer<typeof StudyDataSchema>;
