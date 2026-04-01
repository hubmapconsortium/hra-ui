import * as z from 'zod';

/** Type for a single venue item */
export type VenueItem = z.infer<typeof VenueItemSchema>;

/** Venue item schema */
export const VenueItemSchema = z
  .object({
    dateStart: z.string().transform((str) => new Date(str)),
    dateEnd: z
      .string()
      .transform((str) => new Date(str))
      .nullish(),
    title: z.string(),
    venue: z.string().nullish(),
    organizer: z.string().nullish(),
    credit: z.string().nullish(),
    city: z.string().nullish(),
    state: z.string().nullish(),
    country: z.string().nullish(),
    pdfLink: z.string().nullish(),
    websiteUrl: z.string().nullish(),
    venueImages: z.array(z.object({ sm: z.string().optional(), lg: z.string().optional() })).nullish(),
  })
  .meta({ id: 'VenueItem' });

/** Type for the Venue data array */
export type VenueData = z.infer<typeof VenueDataSchema>;

/** Venue data schema (array of items) */
export const VenueDataSchema = z.array(VenueItemSchema);
