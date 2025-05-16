import { AnyContentTemplateSchema, ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

/** Schema structure of a flex container */
export const FlexContainerSchema = ContentTemplateSchema.extend({
  component: z.literal('FlexContainer'),
  rowGap: z.string().optional(),
  columnGap: z.string().optional(),
  content: AnyContentTemplateSchema.array(),
});
