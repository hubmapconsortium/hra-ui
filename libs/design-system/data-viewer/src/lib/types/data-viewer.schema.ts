import { z } from 'zod';

/** Schema for viewer file data */
const ViewerFileSchema = z.object({
  label: z.string(),
  url: z.string().url(),
});

/** Type for viewer card data */
export type ViewerCardData = z.infer<typeof ViewerCardSchema>;
const ViewerCardSchema = z.object({
  label: z.string(),
  fileUrl: z.string().url(),
  fullscreenUrl: z.string().url().optional(),
  sourceDataUrl: z.string().url(),
  crosswalkUrl: z.string().url().optional(),
  files: ViewerFileSchema.array(),
  alt: z.string().optional(),
});

/** All viewer card data for an organ */
export type OrganData = z.infer<typeof ViewerOrganDataSchema>;
/** Schema for organ data */
const ViewerOrganDataSchema = z.object({
  label: z.string(),
  icon: z.string(), // This is a mat-icon svg icon
  cards: ViewerCardSchema.array(),
});

/** Organ version data including organ data */
export type OrganVersionData = z.infer<typeof ViewerVersionDataSchema>;
/** Schema for viewer version data */
const ViewerVersionDataSchema = z.object({
  version: z.string(),
  label: z.string(),
  crosswalkUrl: z.string().url().optional(),
  extractionsSitesUrl: z.string().url().optional(),
  referenceOrgansUrl: z.string().url().optional(),
  organData: ViewerOrganDataSchema.array(),
});
