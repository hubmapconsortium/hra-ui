import { DigitalObjectInfoTypeEnum } from '@hra-api/ng-client';
import * as z from 'zod';

/** Person info type */
export type PersonInfo = z.infer<typeof PersonInfoSchema>;

/** Person info schema */
export const PersonInfoSchema = z
  .object({
    conforms_to: z.string(),
    firstName: z.string(),
    fullName: z.string(),
    id: z.string(),
    label: z.string(),
    lastName: z.string(),
    orcid: z.string(),
    type_of: z.string().array(),
  })
  .meta({ id: 'PersonInfo' });

/** Data distributions type */
export type DistributionsInfo = z.infer<typeof DistributionsInfoSchema>;

/** Data distributions schema */
export const DistributionsInfoSchema = z
  .object({
    accessUrl: z.string(),
    downloadUrl: z.string(),
    id: z.string(),
    label: z.string(),
    mediaType: z.string(),
    title: z.string(),
  })
  .meta({ id: 'DistributionsInfo' });

/** Digital object metadata type */
export type DigitalObjectMetadata = z.infer<typeof DigitalObjectMetadataSchema>;

/** Digital object metadata schema */
export const DigitalObjectMetadataSchema = z
  .object({
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
    name: z.string(),
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
      externalReviewers: PersonInfoSchema.array().optional(),
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
      references: z.string().array(),
      reviewers: PersonInfoSchema.array(),
      title: z.string(),
    }),
  })
  .meta({ id: 'DigitalObjectMetadata' });

/** Digital object info type */
export type DigitalObjectInfo = z.infer<typeof DigitalObjectInfoSchema>;

/** Digital object schema */
export const DigitalObjectInfoSchema = z
  .object({
    '@id': z.string(),
    '@type': z.enum(DigitalObjectInfoTypeEnum),
    title: z.string(),
    doType: z.string(),
    doName: z.string(),
    doVersion: z.string(),
    lastUpdated: z.object({
      '@type': z.string(),
      '@value': z.string(),
    }),
    hraVersions: z.union([z.string(), z.string().array()]).optional(),
    versions: z.union([z.string(), z.string().array()]),
    purl: z.string(),
    datasets: z.union([z.string(), z.string().array()]),
    lod: z.string(),
    cell_count: z.string().optional(),
    biomarker_count: z.string().optional(),
    organs: z.union([z.string(), z.string().array()]).optional(),
    organIds: z.union([z.string(), z.string().array()]).optional(),
  })
  .meta({ id: 'DigitalObjectInfo' });

export type DigitalObjectsJsonLd = z.infer<typeof DigitalObjectsJsonLdSchema>;

export const DigitalObjectsJsonLdSchema = z
  .object({
    '@context': z.record(z.string(), z.any()),
    '@graph': z.array(DigitalObjectInfoSchema),
  })
  .meta({ id: 'DigitalObjectsJsonLd' });

export type AsctbTerms = z.infer<typeof AsctbTermsSchema>;

export const AsctbTermsSchema = z
  .object({
    asctb_type: z.string(),
    iri: z.string(),
    label: z.string(),
  })
  .array()
  .meta({ id: 'AsctbTerms' });

export type TermsIndex = z.infer<typeof TermsIndexSchema>;

export const TermsIndexSchema = z
  .object({
    terms: z.string().array(),
    purls: z.string().array(),
    term_to_purls: z.number().array().array(),
    purl_to_terms: z.number().array().array(),
  })
  .meta({ id: 'TermsIndex' });
