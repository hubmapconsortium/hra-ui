import { z } from 'zod';

/** Data id of a funder */
export type FunderId = Funder['id'];

/** A funder item */
export type Funder = z.infer<typeof FunderSchema>;
/** Schema for a funder item */
export const FunderSchema = z.object({
  id: z.string().brand<'FunderId'>(),
  name: z.string(),
  link: z.string().url(),
  image: z.string(),
});

/** Multiple funders object */
export type Funders = z.infer<typeof FundersSchema>;
/** Schema for multiple funders */
export const FundersSchema = z.object({
  $schema: z.string(),
  funders: FunderSchema.array(),
});

export default FundersSchema;
