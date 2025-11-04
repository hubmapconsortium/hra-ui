import { ActionCardSchema } from '@hra-ui/design-system/cards/action-card';
import { z } from 'zod';

/** Landing page data type */
export type LandingPageData = z.infer<typeof LandingPageDataSchema>;

/** Landing page data schema */
export const LandingPageDataSchema = z.object({
  $schema: z.string(),
  tagline: z.string(),
  bannerUrl: z.string(),
  cards: ActionCardSchema.array(),
});

export default LandingPageDataSchema;
