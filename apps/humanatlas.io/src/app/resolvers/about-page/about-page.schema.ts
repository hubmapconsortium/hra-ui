import { z } from 'zod';

/** Profile card data */
export const ProfileCardSchema = z.object({
  name: z.string(),
  description: z.string(),
  thumbnailUrl: z.string(),
  actionUrl: z.string(),
  actionName: z.string(),
});

/** Schema for about page sections */
export const AboutPageSectionsSchema = z.object({
  heading: z.string(),
  level: z.number(),
  descriptions: z.string(),
  teamCards: ProfileCardSchema.array().optional(),
  buttonUrl: z.string().optional(),
  buttonText: z.string().optional(),
});

/** Type for about page data */
export type AboutPageData = z.infer<typeof AboutPageDataSchema>;

/** Schema for about page */
export const AboutPageDataSchema = z.object({
  header: AboutPageSectionsSchema,
  sections: AboutPageSectionsSchema.array(),
});
