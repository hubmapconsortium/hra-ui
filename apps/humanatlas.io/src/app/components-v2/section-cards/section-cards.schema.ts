import { z } from 'zod';

/** Section card item type */
export type SectionCardItem = z.infer<typeof SectionCardItemSchema>;

/** Section card item Zod schema */
export const SectionCardItemSchema = z.object({
  tagline: z.string(),
  description: z.string(),
  imageSrc: z.string(),
  route: z.string(),
});
