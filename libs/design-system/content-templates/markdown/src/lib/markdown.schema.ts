import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

export type Markdown = z.infer<typeof MarkdownSchema>;

export const MarkdownSchema = ContentTemplateSchema.extend({
  component: z.literal('Markdown'),
  data: z.string().optional(),
  src: z.string().optional(),
});
