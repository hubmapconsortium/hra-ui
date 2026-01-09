import * as z from 'zod';

export type ResearchItem = z.infer<typeof ResearchItemSchema>;

export const ResearchItemSchema = z
  .object({
    slug: z.string(),
    category: z.string(),
    type: z.string(),
    people: z.string().array(),
    link: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    tags: z.string().array(),
    dateStart: z.string(),
    dateEnd: z.string().optional(),
    imgSrc: z.string(),
  })
  .meta({ id: 'ResearchItem' });

export type ResearchPageData = z.infer<typeof ResearchPageDataSchema>;

export const ResearchPageDataSchema = z
  .object({
    data: ResearchItemSchema.array(),
  })
  .meta({ id: 'ResearchPageData' });

export default ResearchPageDataSchema;
