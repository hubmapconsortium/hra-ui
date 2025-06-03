import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

export type IconData = z.infer<typeof IconDataSchema>;

export const IconDataSchema = z.object({
  svgIcon: z.string().optional(),
  fontIcon: z.string().optional(),
  fontSet: z.string().optional(),
  inline: z.boolean().optional(),
});

export type Icon = z.infer<typeof IconSchema>;

export const IconSchema = ContentTemplateSchema.extend({
  component: z.literal('Icon'),
}).merge(IconDataSchema);

export type IconList = z.infer<typeof IconListSchema>;

export const IconListSchema = z.union([
  z.union([z.string(), IconDataSchema]),
  z.union([z.string(), IconDataSchema]).array(),
]);
