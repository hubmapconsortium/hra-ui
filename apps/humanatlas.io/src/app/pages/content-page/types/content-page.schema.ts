import {
  AnyContentTemplateSchema,
  ClassesSchema,
  setContentTemplateSpecs,
  StylesSchema,
} from '@hra-ui/cdk/content-template';
import { MarkdownSchema } from '@hra-ui/design-system/content-templates/markdown';
import { PageSectionSchema } from '@hra-ui/design-system/content-templates/page-section';
import { DataViewerSchema } from '@hra-ui/design-system/data-viewer';
import { VersionedDataTableSchema } from '@hra-ui/design-system/content-templates/versioned-data-table';
import { z } from 'zod';
import { PageTableSchema } from '@hra-ui/design-system/table';

/** Content page type */
export type ContentPageData = z.infer<typeof ContentPageDataSchema>;

/** Schema for content page data */
export const ContentPageDataSchema = z.object({
  $schema: z.string(),
  title: z.string(),
  subtitle: z.string(),
  action: z
    .object({
      label: z.string(),
      url: z.string(),
    })
    .optional(),
  content: AnyContentTemplateSchema.array(),
});

export {
  AnyContentTemplateSchema,
  ClassesSchema,
  DataViewerSchema,
  MarkdownSchema,
  PageSectionSchema,
  PageTableSchema,
  StylesSchema,
  VersionedDataTableSchema,
  // TODO: Add more
};

export default z.lazy(() => {
  setContentTemplateSpecs([
    DataViewerSchema,
    MarkdownSchema,
    PageSectionSchema,
    VersionedDataTableSchema,
    PageTableSchema,
    // TODO: Add more
  ]);

  return ContentPageDataSchema;
});
