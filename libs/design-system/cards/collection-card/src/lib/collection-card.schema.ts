import { ContentTemplateSchema, ProjectedContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { IconListSchema } from '@hra-ui/design-system/icons';
import * as z from 'zod';

/** Tag type inferred from TagSchema */
export type Tag = z.infer<typeof TagSchema>;

/** Schema for a tag with icon and text */
export const TagSchema = z.object({
  icon: z.string(),
  text: z.string(),
});

/** Content template collection card data */
export type CollectionCard = z.infer<typeof CollectionCardSchema>;

/** Schema for content template collection card data */
export const CollectionCardSchema = ContentTemplateSchema.extend({
  component: z.literal('CollectionCard'),
  tagline: z.string(),
  taglineChips: z.array(z.string()).optional(),
  image: z.string().optional(),
  icons: IconListSchema.optional(),
  tags: z.array(TagSchema).optional(),
  label: z.string().optional(),
  supportingText: z.string().optional(),
  actionsInfo: z.record(z.string(), z.string()).optional(),
  actionsLeft: ProjectedContentTemplateSchema.optional(),
  actionsRight: ProjectedContentTemplateSchema.optional(),
}).meta({ id: 'CollectionCard' });
