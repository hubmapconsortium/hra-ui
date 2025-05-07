import { z } from 'zod';
import { AnyContentTemplateSchema } from '@hra-ui/cdk/content-template';

/** Content page type */
export type ContentPageData = z.infer<typeof ContentPageDataSchema>;

/** Schema for content page data */
export const ContentPageDataSchema = z.object({
  // schema: z.string().optional(),
  title: z.string(),
  subtitle: z.string(),
  // actionUrl: z.string().url().optional(),
  content: AnyContentTemplateSchema.array(),
});
