import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

/** Outline default card type */
export type ActionCardOutlineDefault = z.infer<typeof ActionCardOutlineDefaultSchema>;

/** Outline default card schema structure */
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

/** Outline default card list schema structure */
export const ActionCardOutlineDefaultListSchema = ContentTemplateSchema.extend({
  component: z.literal('ActionCardOutlineDefaultList'),
  cards: ActionCardOutlineDefaultSchema.array(),
});
