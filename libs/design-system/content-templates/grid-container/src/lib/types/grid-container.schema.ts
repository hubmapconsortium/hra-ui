import { AnyContentTemplateSchema, ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

/** Schema structure of a grid container */
export const GridContainerSchema = ContentTemplateSchema.extend({
  component: z.literal('GridContainer'),
  rowGap: z.string().optional(),
  columnGap: z.string().optional(),
  minWidth: z.string(),
  content: AnyContentTemplateSchema.array(),
});
