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

export type DigitalObjectsData = z.infer<typeof DigitalObjectsDataSchema>;

export const DigitalObjectsDataSchema = z.object({
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

export type DigitalObjectMetadata = z.infer<typeof DigitalObjectMetadataSchema>;

export const DigitalObjectMetadataSchema = z.record(z.string(), z.any());
