import * as z from 'zod';
import { ResearchTypeIdSchema } from './research.schema';

/** Type for a single publication type item */
export type PublicationTypeItem = z.infer<typeof PublicationTypeItemSchema>;

/** Publication type item schema */
export const PublicationTypeItemSchema = z
  .object({
    /** Label for the publication type */
    label: z.string(),
    /** Value for the publication type */
    value: ResearchTypeIdSchema,
  })
  .meta({ id: 'PublicationTypeItem' });

/** Type for the publication types data array */
export type PublicationTypesData = z.infer<typeof PublicationTypesDataSchema>;

/** Publication types data schema - array of publication type items */
export const PublicationTypesDataSchema = z.array(PublicationTypeItemSchema).meta({ id: 'PublicationTypesData' });
