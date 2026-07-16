import * as z from 'zod';

/** Type for research type identifiers */
export type ResearchTypeId = z.infer<typeof ResearchTypeIdSchema>;
/** Branded type for research type identifiers */
export const ResearchTypeIdSchema = z.string().brand('ResearchTypeId');

/** Type for a single research type item */
export type ResearchTypeItem = z.infer<typeof ResearchTypeItemSchema>;

/** Research type item schema */
export const ResearchTypeItemSchema = z
  .object({
    /** Label for the research type */
    label: z.string(),
    /** Value for the research type */
    value: ResearchTypeIdSchema,
  })
  .meta({ id: 'ResearchTypeItem' });

/** Type for the research types data array */
export type ResearchTypesData = z.infer<typeof ResearchTypesDataSchema>;

/** Research types data schema - array of research type items */
export const ResearchTypesDataSchema = z.array(ResearchTypeItemSchema).meta({ id: 'ResearchTypesData' });
