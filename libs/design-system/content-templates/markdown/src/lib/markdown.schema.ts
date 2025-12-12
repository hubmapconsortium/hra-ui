import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import * as z from 'zod';

/** Markdown component data */
export type Markdown = z.infer<typeof MarkdownSchema>;

/** Schema for markdown component */
export const MarkdownSchema = ContentTemplateSchema.extend({
  component: z.literal('Markdown'),
  data: z.string().optional(),
  src: z.string().optional(),
}).meta({ id: 'Markdown' });
