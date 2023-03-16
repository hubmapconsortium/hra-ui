/**
 * Extract a member of a discriminated union.
 */
export type UnionMember<T, K extends PropertyKey, D> = Extract<T, { [P in K]: D }>;
