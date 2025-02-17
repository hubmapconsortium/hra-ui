import { z } from 'zod';

/** Social media id */
export type SocialMediaId = SocialMedia['id'];

/** Social media item */
export type SocialMedia = z.infer<typeof SocialMediaSchema>;
/** Schema for social media item */
export const SocialMediaSchema = z.object({
  id: z.string().brand<'SocialMediaId'>(),
  icon: z.string(),
  isFontIcon: z.boolean().optional(),
  link: z.string(),
});

/** Social media items */
export type Socials = z.infer<typeof SocialsSchema>;
/** Schema for social media items */
export const SocialsSchema = z.object({
  $schema: z.string(),
  socials: SocialMediaSchema.array(),
});

export default SocialsSchema;
