import * as z from 'zod';

/** Type for a single publication item */
export type PublicationItem = z.infer<typeof PublicationItemSchema>;

/** Publication schema */
export const PublicationItemSchema = z
  .object({
    description: z.string(),
    dateStart: z.coerce.date(),
  })
  .meta({ id: 'Publication' });

/** Type for the publication data array */
export type PublicationData = z.infer<typeof PublicationDataSchema>;

/** Publication data schema - array of publication items */
export const PublicationDataSchema = z.array(PublicationItemSchema).meta({ id: 'PublicationData' });
