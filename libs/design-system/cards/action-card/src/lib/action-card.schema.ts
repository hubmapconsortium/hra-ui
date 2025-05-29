import { ContentTemplateSchema, ProjectedContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

export type ActionCardVariant = z.infer<typeof ActionCardVariantSchema>;

export const ActionCardVariantSchema = z.enum(['elevated', 'flat', 'outlined', 'outlined-with-icons']);

export type ActionCard = z.infer<typeof ActionCardSchema>;

export const ActionCardSchema = ContentTemplateSchema.extend({
  component: z.literal('ActionCard'),
  variant: ActionCardVariantSchema,
  tagline: z.string(),
  subtagline: z.string().optional(),
  image: z.string().optional(),
  // TODO icons
  content: ProjectedContentTemplateSchema,
  actionsLeft: ProjectedContentTemplateSchema.optional(),
  actionsRight: ProjectedContentTemplateSchema.optional(),
});
