import { z } from 'zod';

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
