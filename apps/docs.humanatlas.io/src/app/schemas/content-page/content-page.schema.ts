import {
  AnyContentTemplateSchema,
  ClassesSchema,
  setContentTemplateSpecs,
  StylesSchema,
} from '@hra-ui/cdk/content-template';
import { ButtonSchema } from '@hra-ui/design-system/buttons/button';
import { TextHyperlinkSchema } from '@hra-ui/design-system/buttons/text-hyperlink';
import { ActionCardSchema } from '@hra-ui/design-system/cards/action-card';
import { ProfileCardSchema } from '@hra-ui/design-system/cards/profile-card';
import { CodeBlockSchema } from '@hra-ui/design-system/code-block';
import { ApiCommandSchema } from '@hra-ui/design-system/content-templates/api-command';
import { ContentPageDataSchema } from '@hra-ui/design-system/content-templates/content-page';
import { FlexContainerSchema } from '@hra-ui/design-system/content-templates/flex-container';
import { ImageSchema } from '@hra-ui/design-system/content-templates/image';
import { MarkdownSchema } from '@hra-ui/design-system/content-templates/markdown';
import { PageSectionSchema } from '@hra-ui/design-system/content-templates/page-section';
import { VersionedDataTableSchema } from '@hra-ui/design-system/content-templates/versioned-data-table';
import { YouTubePlayerSchema } from '@hra-ui/design-system/content-templates/youtube-player';
import { DataViewerSchema } from '@hra-ui/design-system/data-viewer';
import { IconSchema } from '@hra-ui/design-system/icons';
import { PageTableSchema } from '@hra-ui/design-system/table';
import { z } from 'zod';

export {
  ActionCardSchema,
  AnyContentTemplateSchema,
  ApiCommandSchema,
  ButtonSchema,
  ClassesSchema,
  CodeBlockSchema,
  DataViewerSchema,
  FlexContainerSchema,
  IconSchema,
  ImageSchema,
  MarkdownSchema,
  PageSectionSchema,
  PageTableSchema,
  ProfileCardSchema,
  StylesSchema,
  TextHyperlinkSchema,
  VersionedDataTableSchema,
  YouTubePlayerSchema,
};

export default z.lazy(() => {
  setContentTemplateSpecs([
    ActionCardSchema,
    ApiCommandSchema,
    ButtonSchema,
    CodeBlockSchema,
    DataViewerSchema,
    FlexContainerSchema,
    IconSchema,
    ImageSchema,
    MarkdownSchema,
    PageSectionSchema,
    PageTableSchema,
    ProfileCardSchema,
    TextHyperlinkSchema,
    VersionedDataTableSchema,
    YouTubePlayerSchema,
  ]);

  return ContentPageDataSchema;
});
