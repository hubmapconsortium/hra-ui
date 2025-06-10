import { z } from 'zod';

/** Section card item type */
export type SectionCardItem = z.infer<typeof SectionCardItemSchema>;

/** Section card item Zod schema */
export const SectionCardItemSchema = z.object({
  tagline: z.string(),
  icon: z.string(),
  route: z.string().optional(),
  url: z.string().optional(),
  action: z.string(),
});
