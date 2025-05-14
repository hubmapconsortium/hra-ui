import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

/** Type for viewer file data, includes label and URL */
export type ViewerFile = z.infer<typeof ViewerFileSchema>;
/** Schema for viewer file data */
export const ViewerFileSchema = z.object({
  label: z.string(),
  url: z.string().url(),
});

/** Type for viewer card data, includes file data for the card */
export type ViewerCard = z.infer<typeof ViewerCardSchema>;
/** Schema for viewer card data */
export const ViewerCardSchema = z.object({
  label: z.string(),
  alt: z.string().optional(),
  fileUrl: z.string().url(),
  fullscreenUrl: z.string().url().optional(),
  sourceDataUrl: z.string().url(),
  crosswalkUrl: z.string().url().optional(),
  files: ViewerFileSchema.array(),
});

/** Type for individual organ data, includes data for the viewer cards of that organ */
export type ViewerOrganData = z.infer<typeof ViewerOrganDataSchema>;
/** Schema for organ data */
export const ViewerOrganDataSchema = z.object({
  label: z.string(),
  icon: z.string(), // This is a mat-icon svg icon
  cards: ViewerCardSchema.array(),
});

/** Type for release version data, includes organ data for all organs */
export type ReleaseVersionData = z.infer<typeof ReleaseVersionDataSchema>;
/** Schema for release version data */
export const ReleaseVersionDataSchema = z.object({
  version: z.string(),
  label: z.string(),
  date: z.string(),
  crosswalkUrl: z.string().url().optional(),
  extractionsSitesUrl: z.string().url().optional(),
  referenceOrgansUrl: z.string().url().optional(),
  organData: ViewerOrganDataSchema.array(),
});

/** Data viewer component data */
export type DataViewer = z.infer<typeof DataViewerSchema>;

/** Schema for data viewer component */
export const DataViewerSchema = ContentTemplateSchema.extend({
  component: z.literal('DataViewer'),
  variant: z.string(),
  githubIconsUrl: z.string(),
  releaseVersionData: ReleaseVersionDataSchema.array(),
});
