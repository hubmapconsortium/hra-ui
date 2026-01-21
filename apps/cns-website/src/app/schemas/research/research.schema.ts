import * as z from 'zod';

export type ResearchCategory = z.infer<typeof ResearchCategory>;

export const ResearchCategory = z
  .enum([
    'data-tool',
    'event',
    'funding',
    'display',
    'miscellaneous',
    'news',
    'presentation',
    'publication',
    'software',
    'teaching',
    'visualization',
  ])
  .meta({ id: 'ResearchCategory' });

export type ResearchEventType = z.infer<typeof ResearchEventType>;

export const ResearchEventType = z.string().brand('ResearchEventType').meta({ id: 'ResearchEventType' });

export type ResearchFundingType = z.infer<typeof ResearchFundingType>;

export const ResearchFundingType = z.string().brand('ResearchFundingType').meta({ id: 'ResearchFundingType' });

export type ResearchPublicationType = z.infer<typeof ResearchPublicationType>;

export const ResearchPublicationType = z
  .string()
  .brand('ResearchPublicationType')
  .meta({ id: 'ResearchPublicationType' });

export type ResearchItemType = ResearchEventType | ResearchFundingType | ResearchPublicationType;

export type ResearchPersonType = z.infer<typeof ResearchPersonType>;

export const ResearchPersonType = z.string().meta({ id: 'ResearchPersonType' });

export type ResearchItem = z.infer<typeof ResearchItemSchema>;

export const ResearchItemSchema = z
  .object({
    slug: z.string(),
    category: ResearchCategory,
    type: z.union([ResearchEventType, ResearchFundingType, ResearchPublicationType]),
    title: z.string().trim(),
    description: z.string(),
    tags: z
      .string()
      .array()
      .transform((tags) => (tags.length ? [...new Set(tags)] : tags)),
    people: z.string().array(),
    link: z.string().optional(),
    dateStart: z.iso.date().transform((date) => new Date(date)),
    dateEnd: z.iso.date().transform((date) => new Date(date)),
  })
  .meta({ id: 'ResearchItem' });

export type ResearchPageData = z.infer<typeof ResearchPageDataSchema>;

export const ResearchPageDataSchema = ResearchItemSchema.array().meta({ id: 'ResearchPageData' });

export default ResearchPageDataSchema;

export type PeopleResearchItem = z.infer<typeof PeopleResearchItemSchema>;

/** People research data schema */
export const PeopleResearchItemSchema = z
  .object({
    slug: z.string().optional(),
    name: z.string(),
    lastName: z.string(),
    roles: z.array(z.any()),
  })
  .meta({ id: 'PeopleResearchItem' });

export const PeopleResearchDataSchema = PeopleResearchItemSchema.array().meta({ id: 'PeopleResearchData' });
