import {
  AnyContentTemplateSchema,
  ClassesSchema,
  setContentTemplateSpecs,
  StylesSchema,
} from '@hra-ui/cdk/content-template';
import { ButtonSchema } from '@hra-ui/design-system/buttons/button';
import { TextHyperlinkSchema } from '@hra-ui/design-system/buttons/text-hyperlink';
import { ProfileCardSchema } from '@hra-ui/design-system/cards/profile-card';
import { ApiCommandSchema } from '@hra-ui/design-system/content-templates/api-command';
import { FlexContainerSchema } from '@hra-ui/design-system/content-templates/flex-container';
import { ImageSchema } from '@hra-ui/design-system/content-templates/image';
import { MarkdownSchema } from '@hra-ui/design-system/content-templates/markdown';
import { PageSectionSchema } from '@hra-ui/design-system/content-templates/page-section';
import { VersionedDataTableSchema } from '@hra-ui/design-system/content-templates/versioned-data-table';
import { DataViewerSchema } from '@hra-ui/design-system/data-viewer';
import { PageTableSchema } from '@hra-ui/design-system/table';
import { z } from 'zod';

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
  ApiCommandSchema,
  ButtonSchema,
  ClassesSchema,
  DataViewerSchema,
  FlexContainerSchema,
  ImageSchema,
  MarkdownSchema,
  PageSectionSchema,
  PageTableSchema,
  ProfileCardSchema,
  StylesSchema,
  TextHyperlinkSchema,
  VersionedDataTableSchema,
  // TODO: Add more
};

export default z.lazy(() => {
  setContentTemplateSpecs([
    ButtonSchema,
    DataViewerSchema,
    FlexContainerSchema,
    ImageSchema,
    MarkdownSchema,
    PageSectionSchema,
    PageTableSchema,
    ProfileCardSchema,
    TextHyperlinkSchema,
    VersionedDataTableSchema,
    // TODO: Add more
  ]);

  return ContentPageDataSchema;
});
