import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

/**
 * Type for Filled Icon
 */
export type FilledIcon = z.infer<typeof FilledIconSchema>;

/**
 * Schema for Filled Icon
 *
 * This schema extends the ContentTemplateSchema and adds additional properties
 * specific to the filled icon component.
 */
export const FilledIconSchema = ContentTemplateSchema.extend({
  component: z.literal('FilledIcon'),
  fontIcon: z.string().optional(),
  svgIcon: z.string().optional(),
});
