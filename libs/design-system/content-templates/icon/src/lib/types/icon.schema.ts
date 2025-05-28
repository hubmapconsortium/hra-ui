import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

export type Icon = z.infer<typeof IconSchema>;

export const IconSchema = ContentTemplateSchema.extend({
  component: z.literal('Icon'),
  fontIcon: z.string().optional(),
  svgIcon: z.string().optional(),
});
