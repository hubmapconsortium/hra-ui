import { ContentTemplateSchema, ProjectedContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { IconListSchema } from '@hra-ui/design-system/icons';
import { z } from 'zod';

/** Action card variants */
export type ActionCardVariant = z.infer<typeof ActionCardVariantSchema>;

/** Schema for action card variants */
export const ActionCardVariantSchema = z.enum(['elevated', 'flat', 'outlined', 'outlined-with-icons']);

/** Content template action card data */
export type ActionCard = z.infer<typeof ActionCardSchema>;

/** Schema for content template action card data */
export const ActionCardSchema = ContentTemplateSchema.extend({
  component: z.literal('ActionCard'),
  variant: ActionCardVariantSchema,
  tagline: z.string(),
  subtagline: z.string().optional(),
  image: z.string().optional(),
  icons: IconListSchema.optional(),
  content: ProjectedContentTemplateSchema.optional(),
  actionsLeft: ProjectedContentTemplateSchema.optional(),
  actionsRight: ProjectedContentTemplateSchema.optional(),
});
