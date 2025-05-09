import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

export type ActionCardOutlineLargeImage = z.infer<typeof ActionCardOutlineLargeImageSchema>;

export const ActionCardOutlineLargeImageSchema = ContentTemplateSchema.extend({
  component: z.literal('ActionCardOutlineLargeImage'),
  imageUrl: z.string(),
  tagline: z.string().optional(),
  description: z.string().optional(),
  actionName: z.string(),
  actionUrl: z.string(),
});

export type ActionCardOutlineLargeImageList = z.infer<typeof ActionCardOutlineLargeImageListSchema>;

export const ActionCardOutlineLargeImageListSchema = ContentTemplateSchema.extend({
  component: z.literal('ActionCardOutlineLargeImageList'),
  cards: ActionCardOutlineLargeImageSchema.array(),
});
