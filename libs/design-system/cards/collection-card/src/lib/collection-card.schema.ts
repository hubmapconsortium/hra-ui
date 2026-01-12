import { ContentTemplateSchema, ProjectedContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { IconListSchema } from '@hra-ui/design-system/icons';
import * as z from 'zod';

/** Content template collection card data */
export type CollectionCard = z.infer<typeof CollectionCardSchema>;

/** Schema for content template collection card data */
export const CollectionCardSchema = ContentTemplateSchema.extend({
  component: z.literal('CollectionCard'),
  tagline: z.string(),
  image: z.string().optional(),
  icons: IconListSchema.optional(),
  chips: z.array(z.string()).optional(),
  content: ProjectedContentTemplateSchema.optional(),
  additionalInfo: z.record(z.string(), z.string()).optional(),
  actionsLeft: ProjectedContentTemplateSchema.optional(),
  actionsRight: ProjectedContentTemplateSchema.optional(),
}).meta({ id: 'CollectionCard' });
