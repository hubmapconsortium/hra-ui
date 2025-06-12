import { ProjectedContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { IconListSchema } from '@hra-ui/design-system/icons';
import { z } from 'zod';

/** Content page type */
export type ContentPageData = z.infer<typeof ContentPageDataSchema>;

/** Schema for content page data */
export const ContentPageDataSchema = z.object({
  $schema: z.string(),
  title: z.string(),
  subtitle: z.string(),
  icons: IconListSchema.optional(),
  action: z
    .object({
      label: z.string(),
      url: z.string(),
    })
    .optional(),
  headerContent: ProjectedContentTemplateSchema.optional(),
  content: ProjectedContentTemplateSchema,
});
