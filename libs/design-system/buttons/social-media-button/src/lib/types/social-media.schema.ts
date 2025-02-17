import { z } from 'zod';

export type SocialMediaId = SocialMedia['id'];

export type SocialMedia = z.infer<typeof SocialMediaSchema>;
export const SocialMediaSchema = z.object({
  id: z.string().brand<'SocialMediaId'>(),
  icon: z.string(),
  isFontIcon: z.boolean().optional(),
  link: z.string(),
});

export type Socials = z.infer<typeof SocialsSchema>;
export const SocialsSchema = z.object({
  $schema: z.string(),
  socials: SocialMediaSchema.array(),
});

export default SocialsSchema;
