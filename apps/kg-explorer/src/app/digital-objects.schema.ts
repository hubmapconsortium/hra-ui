import { z } from 'zod';

/** Digital object data type */
export type DigitalObjectData = z.infer<typeof DigitalObjectDataSchema>;

/** Digital objects data schema */
export const DigitalObjectDataSchema = z.object({
  '@id': z.string(),
  '@type': z.string(),
  biomarker_count: z.string().optional(),
  cell_count: z.string().optional(),
  doVersion: z.string(),
  organs: z.union([z.string(), z.string().array()]).optional(),
  organIds: z.string().array().optional(),
  title: z.string(),
  doType: z.string(),
  lastUpdated: z.string(),
  doName: z.string(),
  versions: z.string().array(),
  purl: z.string(),
  datasets: z.union([z.string(), z.string().array()]),
  lod: z.string(),
});

/** Knowledge graph data type */
export type KnowledgeGraphObjectsData = z.infer<typeof KnowledgeGraphObjectsDataSchema>;

/** Knowledge graph data schema */
export const KnowledgeGraphObjectsDataSchema = z.object({
  '@context': z.record(
    z.string(),
    z.union([
      z.string(),
      z.object({
        '@id': z.string(),
        '@type': z.string().optional(),
      }),
    ]),
  ),
  '@graph': DigitalObjectDataSchema.array(),
});

/** Digital object metadata type */
export type DigitalObjectMetadata = z.infer<typeof DigitalObjectMetadataSchema>;

/** Digital object metadata schema */
export const DigitalObjectMetadataSchema = z.record(z.string(), z.any());
