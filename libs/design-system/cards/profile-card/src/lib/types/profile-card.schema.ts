import { ContentTemplateSchema, ProjectedContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

/** Type for profile card */
export type ProfileCard = z.infer<typeof ProfileCardSchema>;

/** Profile card schema */
export const ProfileCardSchema = ContentTemplateSchema.extend({
  component: z.literal('ProfileCard'),
  name: z.string(),
  description: z.string(),
  pictureUrl: z.string(),
  centerContent: z.boolean().optional(),
  actions: ProjectedContentTemplateSchema.optional(),
});
