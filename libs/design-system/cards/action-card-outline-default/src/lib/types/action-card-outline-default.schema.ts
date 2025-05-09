import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

export type ActionCardOutlineDefault = z.infer<typeof ActionCardOutlineDefaultSchema>;

export const ActionCardOutlineDefaultSchema = ContentTemplateSchema.extend({
  component: z.literal('ActionCardOutlineDefault'),
  app: z.string(),
  tagline: z.string().optional(),
  description: z.string(),
  leftActionName: z.string(),
  leftActionUrl: z.string(),
  rightActionName: z.string(),
  rightActionUrl: z.string(),
});

export type ActionCardOutlineDefaultList = z.infer<typeof ActionCardOutlineDefaultListSchema>;

export const ActionCardOutlineDefaultListSchema = ContentTemplateSchema.extend({
  component: z.literal('ActionCardOutlineDefaultList'),
  cards: ActionCardOutlineDefaultSchema.array(),
});
