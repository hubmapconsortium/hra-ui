import { z } from 'zod';

export type AppCard = z.infer<typeof AppCardSchema>;

export const AppCardSchema = z.object({
  tagline: z.string(),
  description: z.string(),
  imagePath: z.string(),
  logoPath: z.string(),
  appStatus: z.optional(z.enum(['Preview', 'Alpha', 'Beta'])),
  appUrl: z.string(),
  documentLink: z.string(),
});

export const AppCardsSectionSchema = z.object({
  tagline: z.string(),
  cards: AppCardSchema.array(),
});

export const AppCardsTabSchema = z.object({
  name: z.string(),
  sections: AppCardsSectionSchema.array(),
});

export type Apps = z.infer<typeof AppCardsSchema>;

export const AppCardsSchema = z.object({
  $schema: z.string(),
  tabs: AppCardsTabSchema.array(),
});

export default AppCardsSchema;
