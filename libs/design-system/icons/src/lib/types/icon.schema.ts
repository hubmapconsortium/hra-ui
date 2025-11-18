import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

/** Icon data */
export type IconData = z.infer<typeof IconDataSchema>;

/** Schema for icon data */
export const IconDataSchema = z.object({
  svgIcon: z.string().optional(),
  fontIcon: z.string().optional(),
  fontSet: z.string().optional(),
  inline: z.boolean().optional(),
});

/** Icon content template */
export type Icon = z.infer<typeof IconSchema>;

/** Schema for icon content template */
export const IconSchema = ContentTemplateSchema.extend({
  component: z.literal('Icon'),
}).merge(IconDataSchema);

/** One or more mixed icon items */
export type IconList = z.infer<typeof IconListSchema>;

/** Schema for icon list */
export const IconListSchema = z.union([
  z.union([z.string(), IconDataSchema]),
  z.union([z.string(), IconDataSchema]).array(),
]);
