import * as z from 'zod';
import { AnyRole, RoleSchema } from './roles.schema';

/** Type for people identifiers */
export type PeopleId = z.infer<typeof PeopleIdSchema>;
/** Branded type for people identifiers */
export const PeopleIdSchema = z.string().brand('PeopleId');

/** Type for a single people item */
export type PeopleItem = z.infer<typeof PeopleItemSchema>;

/** People item schema */
export const PeopleItemSchema = z
  .object({
    slug: PeopleIdSchema,
    name: z.string(),
    lastName: z.string(),
    image: z.string().optional(),
    roles: z.array(RoleSchema).transform((roles) => roles.sort(compareRolesByEndDateDesc)),
  })
  .meta({ id: 'PeopleItem' });

/** Type for the people data array */
export type PeopleData = z.infer<typeof PeopleDataSchema>;

/** People data schema (array of items) */
export const PeopleDataSchema = z.array(PeopleItemSchema);

/**
 * Compare two roles by their end dates in descending order.
 *
 * @param a First role to compare
 * @param b Second role to compare
 * @returns Comparison result for sorting
 */
function compareRolesByEndDateDesc(a: AnyRole, b: AnyRole): number {
  const aEnd = a.dateEnd?.getTime() ?? Number.MAX_VALUE;
  const bEnd = b.dateEnd?.getTime() ?? Number.MAX_VALUE;
  return bEnd - aEnd;
}
