import {
  AnyContentTemplateSchema,
  ClassesSchema,
  ProjectedContentTemplateSchema,
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
import { YouTubePlayerSchema } from '@hra-ui/design-system/content-templates/youtube-player';
import { DataViewerSchema } from '@hra-ui/design-system/data-viewer';
import { PageTableSchema } from '@hra-ui/design-system/table';
import { z } from 'zod';
import { ReleaseNotesVersionSelectorSchema } from '../../components/release-notes-version-selector/release-notes-version-selector.schema';

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
  headerContent: ProjectedContentTemplateSchema.optional(),
  content: ProjectedContentTemplateSchema,
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
  ReleaseNotesVersionSelectorSchema,
  StylesSchema,
  TextHyperlinkSchema,
  VersionedDataTableSchema,
  YouTubePlayerSchema,
};

export default z.lazy(() => {
  setContentTemplateSpecs([
    ApiCommandSchema,
    ButtonSchema,
    DataViewerSchema,
    FlexContainerSchema,
    ImageSchema,
    MarkdownSchema,
    PageSectionSchema,
    PageTableSchema,
    ProfileCardSchema,
    ReleaseNotesVersionSelectorSchema,
    TextHyperlinkSchema,
    VersionedDataTableSchema,
    YouTubePlayerSchema,
    // TODO: Add more
  ]);

  return ContentPageDataSchema;
});
