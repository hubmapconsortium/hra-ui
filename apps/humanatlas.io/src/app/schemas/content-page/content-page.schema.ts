import {
  AnyContentTemplateSchema,
  ClassesSchema,
  setContentTemplateSpecs,
  StylesSchema,
} from '@hra-ui/cdk/content-template';
import { ButtonSchema } from '@hra-ui/design-system/buttons/button';
import { TextHyperlinkSchema } from '@hra-ui/design-system/buttons/text-hyperlink';
import { ActionCardOutlineDefaultListSchema } from '@hra-ui/design-system/cards/action-card-outline-default';
import { ActionCardOutlineLargeImageListSchema } from '@hra-ui/design-system/cards/action-card-outline-large-image';
import { ProfileCardSchema } from '@hra-ui/design-system/cards/profile-card';
import { ApiCommandSchema } from '@hra-ui/design-system/content-templates/api-command';
import { ContentPageDataSchema } from '@hra-ui/design-system/content-templates/content-page';
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

export {
  ActionCardOutlineDefaultListSchema,
  ActionCardOutlineLargeImageListSchema,
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
