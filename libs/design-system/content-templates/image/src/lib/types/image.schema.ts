import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

/** Image component data */
export type Image = z.infer<typeof ImageSchema>;

/** Schema for image component */
export const ImageSchema = ContentTemplateSchema.extend({
  component: z.literal('Image'),
  src: z.string(),
  alt: z.string().optional(),
});
