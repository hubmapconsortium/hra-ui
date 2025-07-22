import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { DataViewerVariantSchema, ReleaseVersionDataSchema } from '@hra-ui/design-system/data-viewer';
import { z } from 'zod';

/** Type for Data Viewer with Query Params */
export type DataViewerWithQueryParams = z.infer<typeof DataViewerWithQueryParamsSchema>;

/** Schema for Data Viewer with Query Params Component */
export const DataViewerWithQueryParamsSchema = ContentTemplateSchema.extend({
  component: z.literal('DataViewerWithQueryParams'),
  variant: DataViewerVariantSchema,
  githubIconsUrl: z.string(),
  releaseVersionData: ReleaseVersionDataSchema.array(),
});
