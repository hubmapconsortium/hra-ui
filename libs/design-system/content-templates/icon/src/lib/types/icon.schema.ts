import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

/**
 * Type for Icon
 */
export type Icon = z.infer<typeof IconSchema>;

/**
 * Schema for Icon
 *
 * This schema extends the ContentTemplateSchema and adds additional properties
 * specific to the icon component.
 */
export const IconSchema = ContentTemplateSchema.extend({
  component: z.literal('Icon'),
  fontIcon: z.string().optional(),
  svgIcon: z.string().optional(),
});
