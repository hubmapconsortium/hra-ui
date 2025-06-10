import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

/** Code Block component data */
export type CodeBlock = z.infer<typeof CodeBlockSchema>;

/** Schema for Code Block component */
export const CodeBlockSchema = ContentTemplateSchema.extend({
  component: z.literal('CodeBlock'),
  code: z.string().optional(),
  language: z.string().optional(),
});
