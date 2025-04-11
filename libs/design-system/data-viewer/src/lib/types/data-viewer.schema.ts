import { z } from 'zod';

/** Type for viewer card data */
export type ViewerCardData = z.infer<typeof ViewerCardDataSchema>;
/** Schema for viewer card data */
export const ViewerCardDataSchema = z.object({
  name: z.string(),
  metadata: z.string().url(),
  ai: z.string().url().optional(),
  png: z.string().url().optional(),
  svg: z.string().url().optional(),
  crosswalk: z.string().url().optional(),
  threeDimImage: z.string().url().optional(),
  alt: z.string().optional(),
});

/** All viewer card data for an organ */
export type OrganData = z.infer<typeof OrganDataSchema>;
/** Schema for organ data */
export const OrganDataSchema = z.object({
  name: z.string(),
  icon: z.string().url(),
  viewerCardData: ViewerCardDataSchema.array(),
});

/** Organ version data including organ data */
export type OrganVersionData = z.infer<typeof OrganVersionDataSchema>;
/** Schema for organ version data */
export const OrganVersionDataSchema = z.object({
  releaseName: z.string(),
  releaseDate: z.string(),
  version: z.string(),
  crosswalk: z.string().url(),
  organData: OrganDataSchema.array(),
  extractionCsvUrl: z.string().url().optional(),
  referenceCsvUrl: z.string().url().optional(),
});
