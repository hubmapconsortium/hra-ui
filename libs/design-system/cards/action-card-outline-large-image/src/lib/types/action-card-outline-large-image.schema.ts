import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

/** Large image card type */
export type ActionCardOutlineLargeImage = z.infer<typeof ActionCardOutlineLargeImageSchema>;

/** Large image card schema structure */
export const ActionCardOutlineLargeImageSchema = ContentTemplateSchema.extend({
  component: z.literal('ActionCardOutlineLargeImage'),
  imageUrl: z.string(),
  tagline: z.string().optional(),
  description: z.string().optional(),
  actionName: z.string(),
  actionUrl: z.string(),
});

/** Large image card list schema structure */
export const ActionCardOutlineLargeImageListSchema = ContentTemplateSchema.extend({
  component: z.literal('ActionCardOutlineLargeImageList'),
  cards: ActionCardOutlineLargeImageSchema.array(),
});
