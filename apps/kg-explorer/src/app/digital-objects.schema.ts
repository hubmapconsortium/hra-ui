import { z } from 'zod';

/** Digital object data type */
export type DigitalObjectData = z.infer<typeof DigitalObjectDataSchema>;

/** Digital object data schema */
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
  hraVersions: z.string().array(),
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

/** Person info type */
export type PersonInfo = z.infer<typeof PersonInfoSchema>;

/** Person info schema */
export const PersonInfoSchema = z.object({
  conforms_to: z.string(),
  firstName: z.string(),
  fullName: z.string(),
  id: z.string(),
  label: z.string(),
  lastName: z.string(),
  orcid: z.string(),
  type_of: z.string().array(),
});

/** Data distributions type */
export type DistributionsInfo = z.infer<typeof DistributionsInfoSchema>;

/** Data distributions schema */
export const DistributionsInfoSchema = z.object({
  accessUrl: z.string(),
  downloadUrl: z.string(),
  id: z.string(),
  label: z.string(),
  mediaType: z.string(),
  title: z.string(),
});

/** Digital object metadata type */
export type DigitalObjectMetadata = z.infer<typeof DigitalObjectMetadataSchema>;

/** Digital object metadata schema */
export const DigitalObjectMetadataSchema = z.object({
  $schema: z.string(),
  '@context': z.string(),
  '@type': z.string(),
  creation_date: z.string(),
  creators: z.any().array(),
  description: z.string(),
  distributions: DistributionsInfoSchema.array(),
  id: z.string(),
  label: z.string(),
  license: z.string(),
  publisher: z.string(),
  see_also: z.string(),
  title: z.string(),
  type: z.string(),
  version: z.string(),
  was_derived_from: z.object({
    citation: z.string(),
    citationOverall: z.string(),
    creation_date: z.string(),
    creators: PersonInfoSchema.array(),
    description: z.string(),
    distributions: DistributionsInfoSchema.array(),
    doi: z.string(),
    funders: z
      .object({
        awardNumber: z.string(),
        funder: z.string(),
      })
      .array(),
    hubmapId: z.string(),
    id: z.string(),
    label: z.string(),
    license: z.string(),
    project_leads: PersonInfoSchema.array(),
    publisher: z.string(),
    reviewers: PersonInfoSchema.array(),
    title: z.string(),
  }),
});
