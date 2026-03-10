import {
  AnyContentTemplateSchema,
  ClassesSchema,
  setContentTemplateSpecs,
  StylesSchema,
} from '@hra-ui/cdk/content-template';
import { ButtonSchema } from '@hra-ui/design-system/buttons/button';
import { TextHyperlinkSchema } from '@hra-ui/design-system/buttons/text-hyperlink';
import { ApiCommandSchema } from '@hra-ui/design-system/content-templates/api-command';
import { ContentPageDataSchema } from '@hra-ui/design-system/content-templates/content-page';
import { FlexContainerSchema } from '@hra-ui/design-system/content-templates/flex-container';
import { GridContainerSchema } from '@hra-ui/design-system/content-templates/grid-container';
import { ImageSchema } from '@hra-ui/design-system/content-templates/image';
import { MarkdownSchema } from '@hra-ui/design-system/content-templates/markdown';
import { PageSectionSchema } from '@hra-ui/design-system/content-templates/page-section';
import { IconSchema } from '@hra-ui/design-system/icons';
import { PageTableSchema } from '@hra-ui/design-system/table';
import * as z from 'zod';
import { StudiesGridSchema } from '../../components/studies-grid/types/studies-grid.schema';

export {
  AnyContentTemplateSchema,
  ApiCommandSchema,
  ButtonSchema,
  ClassesSchema,
  FlexContainerSchema,
  GridContainerSchema,
  IconSchema,
  ImageSchema,
  MarkdownSchema,
  PageSectionSchema,
  PageTableSchema,
  StylesSchema,
  TextHyperlinkSchema,
};

export default z.lazy(() => {
  setContentTemplateSpecs([
    ApiCommandSchema,
    ButtonSchema,
    FlexContainerSchema,
    GridContainerSchema,
    IconSchema,
    ImageSchema,
    MarkdownSchema,
    PageSectionSchema,
    PageTableSchema,
    TextHyperlinkSchema,
    StudiesGridSchema,
  ]);

  return ContentPageDataSchema;
});
