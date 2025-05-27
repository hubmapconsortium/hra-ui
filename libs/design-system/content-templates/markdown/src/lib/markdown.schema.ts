import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

/** Markdown component data */
export type Markdown = z.infer<typeof MarkdownSchema>;

/** Schema for markdown component */
export const MarkdownSchema = ContentTemplateSchema.extend({
  component: z.literal('Markdown'),
  data: z.string().optional(),
  src: z.string().optional(),
});

export type HraMarkdown = z.infer<typeof HraMarkdownSchema>;

/** Schema for markdown wrapper component */
export const HraMarkdownSchema = ContentTemplateSchema.extend({
  component: z.literal('HraMarkdown'),
  data: z.string().optional(),
  src: z.string().optional(),
});
