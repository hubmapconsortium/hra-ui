import * as z from 'zod';

/** Type for a single venue item */
export type VenueItem = z.infer<typeof VenueItemSchema>;

/** Venue item schema */
export const VenueItemSchema = z
  .object({
    slug: z.string().optional(),
    dateStart: z.string().transform((str) => new Date(str)),
    dateEnd: z.string().transform((str) => new Date(str)),
    title: z.string(),
    venue: z.string(),
    organizer: z.string(),
    credit: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    pdfLink: z.string(),
    venueImages: z.array(z.object({ sm: z.string(), lg: z.string() })),
  })
  .meta({ id: 'VenueItem' });

/** Type for the Venue data array */
export type VenueData = z.infer<typeof VenueDataSchema>;

/** Venue data schema (array of items) */
export const VenueDataSchema = z.array(VenueItemSchema).meta({ id: 'VenueData' });
