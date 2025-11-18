import {
  AnyContentTemplateSchema,
  ClassesSchema,
  setContentTemplateSpecs,
  StylesSchema,
} from '@hra-ui/cdk/content-template';
import { ButtonSchema } from '@hra-ui/design-system/buttons/button';
import { TextHyperlinkSchema } from '@hra-ui/design-system/buttons/text-hyperlink';
import { ActionCardSchema } from '@hra-ui/design-system/cards/action-card';
import { ContentPageDataSchema } from '@hra-ui/design-system/content-templates/content-page';
import { FlexContainerSchema } from '@hra-ui/design-system/content-templates/flex-container';
import { GridContainerSchema } from '@hra-ui/design-system/content-templates/grid-container';
import { ImageSchema } from '@hra-ui/design-system/content-templates/image';
import { MarkdownSchema } from '@hra-ui/design-system/content-templates/markdown';
import { PageSectionSchema } from '@hra-ui/design-system/content-templates/page-section';
import { IconSchema } from '@hra-ui/design-system/icons';
import * as z from 'zod';

export {
  ActionCardSchema,
  AnyContentTemplateSchema,
  ButtonSchema,
  ClassesSchema,
  FlexContainerSchema,
  GridContainerSchema,
  IconSchema,
  ImageSchema,
  MarkdownSchema,
  PageSectionSchema,
  StylesSchema,
  TextHyperlinkSchema,
};

export default z.lazy(() => {
  setContentTemplateSpecs([
    ActionCardSchema,
    ButtonSchema,
    FlexContainerSchema,
    GridContainerSchema,
    IconSchema,
    ImageSchema,
    MarkdownSchema,
    PageSectionSchema,
    TextHyperlinkSchema,
  ]);

  return ContentPageDataSchema;
});
