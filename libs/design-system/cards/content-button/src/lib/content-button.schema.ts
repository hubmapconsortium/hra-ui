import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import * as z from 'zod';

/** Content button action card type */
export type ContentButton = z.infer<typeof ContentButtonSchema>;

/** Schema for content button action card data */
export const ContentButtonSchema = ContentTemplateSchema.extend({
  component: z.literal('ContentButton'),
  imageSrc: z.string(),
  date: z.string(),
  tagline: z.string(),
  tags: z.array(z.string()).optional(),
  link: z.string(),
  external: z.boolean().optional(),
}).meta({ id: 'ContentButton' });
