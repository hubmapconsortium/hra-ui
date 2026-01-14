import * as z from 'zod';

/** Featured content item schema */
export const FeaturedContentItemSchema = z
  .object({
    slug: z.string(),
    category: z.string(),
    type: z.string(),
    people: z.array(z.string()),
    link: z.string(),
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    dateStart: z.string(),
    dateEnd: z.string(),
  })
  .meta({ id: 'FeaturedContentItem' });

/** Featured content data schema containing categorized content */
export const FeaturedContentDataSchema = z
  .object({
    featured: z.array(FeaturedContentItemSchema),
    news: z.array(FeaturedContentItemSchema),
    publications: z.array(FeaturedContentItemSchema),
  })
  .meta({ id: 'FeaturedContentData' });

/** Type for a single featured content item */
export type FeaturedContentItem = z.infer<typeof FeaturedContentItemSchema>;

/** Type for the complete featured content data structure */
export type FeaturedContentData = z.infer<typeof FeaturedContentDataSchema>;
