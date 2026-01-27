import * as z from 'zod';

/** Type for tag identifiers */
export type TagId = z.infer<typeof TagIdSchema>;

/** Branded type for tag identifiers */
export const TagIdSchema = z.string().brand('TagId');

/** Type for a single tag item */
export type TagItem = z.infer<typeof TagItemSchema>;

/** Tag item schema */
export const TagItemSchema = z
  .object({
    /** Tag identifier */
    slug: TagIdSchema,
    /** Display name of the tag */
    name: z.string(),
    /** Description of the tag */
    description: z.string(),
  })
  .meta({ id: 'TagItem' });

/** Type for the tags data array */
export type TagsData = z.infer<typeof TagsDataSchema>;

/** Tags data schema - array of tag items */
export const TagsDataSchema = z.array(TagItemSchema).meta({ id: 'TagsData' });
