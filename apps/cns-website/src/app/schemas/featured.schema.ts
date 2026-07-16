import * as z from 'zod';
import { ResearchItemSchema } from './research.schema';

/** Keys in the featured data object */
export type FeaturedDataKey = keyof FeaturedData;

/** Type for featured data */
export type FeaturedData = z.infer<typeof FeaturedDataSchema>;

/** Featured data schema */
export const FeaturedDataSchema = z
  .object({
    featured: z.array(ResearchItemSchema),
    news: z.array(ResearchItemSchema),
    publications: z.array(ResearchItemSchema),
  })
  .meta({ id: 'FeaturedData' });
