import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

/**
 * Text hyperlink component type
 */
export type TextHyperlink = z.infer<typeof TextHyperlinkSchema>;

/**
 * Text hyperlink component schema
 */
export const TextHyperlinkSchema = ContentTemplateSchema.extend({
  component: z.literal('TextHyperlink'),
  text: z.string(),
  url: z.string(),
  icon: z.string().optional(),
});
