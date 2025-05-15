import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

/** Profile card button type */
export type ProfileCardButton = z.infer<typeof ProfileCardButtonSchema>;

/** Profile card button schema */
export const ProfileCardButtonSchema = z.object({
  label: z.string(),
  url: z.string(),
});

/** Type for profile card */
export type ProfileCard = z.infer<typeof ProfileCardSchema>;

/** Profile card schema */
export const ProfileCardSchema = ContentTemplateSchema.extend({
  component: z.literal('ProfileCard'),
  alignment: z.enum(['left', 'right']).optional(),
  name: z.string(),
  description: z.string(),
  pictureUrl: z.string(),
  action: ProfileCardButtonSchema.optional(),
});
