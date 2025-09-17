import { AnyContentTemplateSchema, ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

/** Schema structure of a grid container */
export const GridContainerSchema = ContentTemplateSchema.extend({
  component: z.literal('GridContainer'),
  itemMinWidth: z.string().optional(),
  content: AnyContentTemplateSchema.array(),
});
