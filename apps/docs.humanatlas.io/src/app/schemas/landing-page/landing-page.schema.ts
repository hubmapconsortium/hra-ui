import { z } from 'zod';

/** Doc card item type */
export type DocCardItem = z.infer<typeof DocCardItemSchema>;

/** Doc card item Zod schema */
export const DocCardItemSchema = z.object({
  tagline: z.string(),
  description: z.string(),
  route1: z.string(),
  action1: z.string(),
  route2: z.string().optional(),
  action2: z.string().optional(),
});

/** Landing page data type */
export type LandingPageData = z.infer<typeof LandingPageDataSchema>;

/** Landing page data schema */
export const LandingPageDataSchema = z.object({
  $schema: z.string(),
  docCardInfo: DocCardItemSchema.array(),
});

export default LandingPageDataSchema;
