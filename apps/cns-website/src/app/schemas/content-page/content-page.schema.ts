import { setContentTemplateSpecs } from '@hra-ui/cdk/content-template';
import { ButtonSchema } from '@hra-ui/design-system/buttons/button';
import { TextHyperlinkSchema } from '@hra-ui/design-system/buttons/text-hyperlink';
import { ActionCardSchema } from '@hra-ui/design-system/cards/action-card';
import { ProfileCardSchema } from '@hra-ui/design-system/cards/profile-card';
import { ApiCommandSchema } from '@hra-ui/design-system/content-templates/api-command';
import { ContentPageDataSchema } from '@hra-ui/design-system/content-templates/content-page';
import { FlexContainerSchema } from '@hra-ui/design-system/content-templates/flex-container';
import { GoogleMapsSchema } from '@hra-ui/design-system/content-templates/google-maps';
import { GridContainerSchema } from '@hra-ui/design-system/content-templates/grid-container';
import { ImageSchema } from '@hra-ui/design-system/content-templates/image';
import { MarkdownSchema } from '@hra-ui/design-system/content-templates/markdown';
import { PageSectionSchema } from '@hra-ui/design-system/content-templates/page-section';
import { YouTubePlayerSchema } from '@hra-ui/design-system/content-templates/youtube-player';
import { IconSchema } from '@hra-ui/design-system/icons';
import { PageTableSchema } from '@hra-ui/design-system/table';
import * as z from 'zod';

export default z.lazy(() => {
  setContentTemplateSpecs([
    ActionCardSchema,
    ApiCommandSchema,
    ButtonSchema,
    FlexContainerSchema,
    GoogleMapsSchema,
    GridContainerSchema,
    IconSchema,
    ImageSchema,
    MarkdownSchema,
    PageSectionSchema,
    PageTableSchema,
    ProfileCardSchema,
    TextHyperlinkSchema,
    YouTubePlayerSchema,
  ]);

  return ContentPageDataSchema;
});
