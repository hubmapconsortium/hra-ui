import * as z from 'zod';

/** Tag item schema */
export const TagItemSchema = z
  .object({
    /** Slug identifier for the tag */
    slug: z.string(),
    /** Display name of the tag */
    name: z.string(),
    /** Description of the tag */
    description: z.string(),
  })
  .meta({ id: 'TagItem' });

/** Tags data schema - array of tag items */
export const TagsDataSchema = z.array(TagItemSchema).meta({ id: 'TagsData' });

/** Type for a single tag item */
export type TagItem = z.infer<typeof TagItemSchema>;

/** Type for the tags data array */
export type TagsData = z.infer<typeof TagsDataSchema>;
