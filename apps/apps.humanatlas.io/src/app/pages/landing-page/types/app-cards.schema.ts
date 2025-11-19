import * as z from 'zod';

/** App card type. */
export type AppCard = z.infer<typeof AppCardSchema>;

/** Schema for structure of an individual app card. */
export const AppCardSchema = z
  .object({
    tagline: z.string(),
    description: z.string(),
    imagePath: z.string(),
    logoPath: z.string(),
    appStatus: z.optional(z.enum(['Preview', 'Alpha', 'Beta'])),
    appUrl: z.string(),
    documentLink: z.string(),
  })
  .meta({ id: 'AppCard' });

/** Schema for structure of an app cards section. */
export const AppCardsSectionSchema = z
  .object({
    tagline: z.string(),
    cards: AppCardSchema.array(),
  })
  .meta({ id: 'AppCardsSection' });

/** Schema for structure of an app cards tab. */
export const AppCardsTabSchema = z
  .object({
    name: z.string(),
    sections: AppCardsSectionSchema.array(),
  })
  .meta({ id: 'AppCardsTab' });

/** Apps type. */
export type AppCards = z.infer<typeof AppCardsSchema>;

/** Schema for default structure of the app cards. */
export const AppCardsSchema = z
  .object({
    $schema: z.string(),
    tabs: AppCardsTabSchema.array(),
  })
  .meta({ id: 'AppCards' });

/** Default export for the app cards schema. */
export default AppCardsSchema;
