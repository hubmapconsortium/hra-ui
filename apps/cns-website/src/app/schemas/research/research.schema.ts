import * as z from 'zod';

/** Allowed research categories */
export type ResearchCategory = z.infer<typeof ResearchCategory>;

/** Zod enum of research categories */
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

/** Type for research event identifiers */
export type ResearchEventType = z.infer<typeof ResearchEventType>;

/** Branded string for research event types */
export const ResearchEventType = z.string().brand('ResearchEventType').meta({ id: 'ResearchEventType' });

/** Type for research funding identifiers */
export type ResearchFundingType = z.infer<typeof ResearchFundingType>;

/** Branded string for research funding types */
export const ResearchFundingType = z.string().brand('ResearchFundingType').meta({ id: 'ResearchFundingType' });

/** Type for research publication identifiers */
export type ResearchPublicationType = z.infer<typeof ResearchPublicationType>;

/** Branded string for research publication types */
export const ResearchPublicationType = z
  .string()
  .brand('ResearchPublicationType')
  .meta({ id: 'ResearchPublicationType' });

/** Union of all research item type identifiers */
export type ResearchItemType = ResearchEventType | ResearchFundingType | ResearchPublicationType;

/** Type for research person identifiers */
export type ResearchPersonType = z.infer<typeof ResearchPersonType>;

/** Unbranded string for person identifiers */
export const ResearchPersonType = z.string().meta({ id: 'ResearchPersonType' });

/** Typed research item */
export type ResearchItem = z.infer<typeof ResearchItemSchema>;

/** Schema for individual research items */
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

/** Research page data collection */
export type ResearchPageData = z.infer<typeof ResearchPageDataSchema>;

/** Schema for a list of research items */
export const ResearchPageDataSchema = ResearchItemSchema.array().meta({ id: 'ResearchPageData' });

export default ResearchPageDataSchema;

/** People research item type */
export type PeopleResearchItem = z.infer<typeof PeopleResearchItemSchema>;

/** Schema for people research items */
export const PeopleResearchItemSchema = z
  .object({
    slug: z.string(),
    name: z.string(),
    lastName: z.string(),
    roles: z.array(z.any()),
  })
  .meta({ id: 'PeopleResearchItem' });

/** Collection of people research items */
export const PeopleResearchDataSchema = PeopleResearchItemSchema.array().meta({ id: 'PeopleResearchData' });

/** Publication type definition */
export const PublicationTypeSchema = z
  .object({
    label: z.string(),
    value: z.string(),
  })
  .meta({ id: 'PublicationType' });

/** Collection of publication type definitions */
export const PublicationTypesSchema = PublicationTypeSchema.array().meta({ id: 'PublicationTypeData' });

/** Publication types type */
export type PublicationTypes = z.infer<typeof PublicationTypesSchema>;
