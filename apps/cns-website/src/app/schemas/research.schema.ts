import * as z from 'zod';
import { TagIdSchema } from './tags.schema';

/** Type for research identifiers */
export type ResearchId = z.infer<typeof ResearchIdSchema>;
/** Branded type for research identifiers */
export const ResearchIdSchema = z.string().brand('ResearchId');

/** Type for research category identifier */
export type ResearchCategoryId = z.infer<typeof ResearchCategoryIdSchema>;
/** Type for research category identifier */
export const ResearchCategoryIdSchema = z.string().brand('ResearchCategoryId');

/** Type for research type identifiers */
export type ResearchTypeId = z.infer<typeof ResearchTypeIdSchema>;
/** Branded type for research type identifiers */
export const ResearchTypeIdSchema = z.string().brand('ResearchTypeId');

/** Type for a single research item */
export type ResearchItem = z.infer<typeof ResearchItemSchema>;

/** Research schema */
export const ResearchItemSchema = z
  .object({
    /** Research slug identifier */
    slug: ResearchIdSchema,
    /** Category of the item */
    category: ResearchCategoryIdSchema,
    /** Research type identifier */
    type: ResearchTypeIdSchema,
    /** Title of the research */
    title: z.string(),
    /** Description of the research */
    description: z.string(),
    /** Start date of the research */
    dateStart: z.iso.date().pipe(z.coerce.date()),
    /** End date of the research */
    dateEnd: z.iso.date().pipe(z.coerce.date()),
    /** Link associated with the research */
    link: z.string().optional(),
    /** People associated with the research */
    people: z.array(z.string()),
    /** Tags for categorizing the research */
    tags: z.array(TagIdSchema),
  })
  .meta({ id: 'Research' });

/** Type for the research data array */
export type ResearchData = z.infer<typeof ResearchDataSchema>;

/** Research data schema - array of research items */
export const ResearchDataSchema = z.array(ResearchItemSchema).meta({ id: 'ResearchData' });
