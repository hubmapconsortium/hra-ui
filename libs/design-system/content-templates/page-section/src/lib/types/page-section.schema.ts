import { ContentTemplateSchema, ProjectedContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { IconListSchema } from '@hra-ui/design-system/icons';
import { z } from 'zod';

/** Schema structure of a Page Section */
export const PageSectionSchema = ContentTemplateSchema.extend({
  component: z.literal('PageSection'),
  tagline: z.string(),
  level: z.number().int().gte(1).lte(6).optional(),
  icons: IconListSchema.optional(),
  anchor: z.string().optional(),
  content: ProjectedContentTemplateSchema,
});
