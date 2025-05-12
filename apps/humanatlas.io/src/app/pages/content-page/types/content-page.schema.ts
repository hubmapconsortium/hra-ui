import {
  AnyContentTemplateSchema,
  ClassesSchema,
  setContentTemplateSpecs,
  StylesSchema,
} from '@hra-ui/cdk/content-template';
import { MarkdownSchema } from '@hra-ui/design-system/content-templates/markdown';
import { PageSectionSchema } from '@hra-ui/design-system/content-templates/page-section';
import { DataViewerSchema } from '@hra-ui/design-system/data-viewer';
import { z } from 'zod';

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

export {
  AnyContentTemplateSchema,
  ClassesSchema,
  DataViewerSchema,
  MarkdownSchema,
  PageSectionSchema,
  StylesSchema,
  // TODO: Add more
};

export default z.lazy(() => {
  setContentTemplateSpecs([
    DataViewerSchema,
    MarkdownSchema,
    PageSectionSchema,
    // TODO: Add more
  ]);

  return ContentPageDataSchema;
});
