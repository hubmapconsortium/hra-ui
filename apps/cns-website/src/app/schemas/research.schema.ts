import * as z from 'zod';
import { LocalDateSchema } from './date.schema';
import { PeopleIdSchema } from './people.schema';
import { ResearchTypeIdSchema } from './research-type.schema';

/** Type for research identifiers */
export type ResearchId = z.infer<typeof ResearchIdSchema>;
/** Branded type for research identifiers */
export const ResearchIdSchema = z.string().brand('ResearchId');

/** Type for research category identifier */
export type ResearchCategoryId = z.infer<typeof ResearchCategoryIdSchema>;
/** Type for research category identifier */
export const ResearchCategoryIdSchema = z.string().brand('ResearchCategoryId');

/** Type for project identifiers */
export type ResearchProjectId = z.infer<typeof ResearchProjectIdSchema>;

/** Branded type for project identifiers */
export const ResearchProjectIdSchema = z.string().brand('ResearchProjectId');

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
    title: z.string().default(''),
    /** Link associated with the research */
    link: z.string().optional(),
    /** Start date of the research */
    dateStart: LocalDateSchema,
    /** End date of the research */
    dateEnd: LocalDateSchema,
    /** Thumbnail image for the research */
    thumbnail: z.string().optional(),
    /** Description of the research */
    description: z.string().default(''),
    /** People associated with the research */
    people: z.array(PeopleIdSchema).default(() => []),
    /** Whether to feature this on the homepage */
    featured: z.boolean().default(false),
    /** Projects associated with the research */
    projects: z.array(ResearchProjectIdSchema).default(() => []),
  })
  .meta({ id: 'Research' });

/** Type for the research data array */
export type ResearchData = z.infer<typeof ResearchDataSchema>;

/** Research data schema - array of research items */
export const ResearchDataSchema = z.array(ResearchItemSchema).meta({ id: 'ResearchData' });
