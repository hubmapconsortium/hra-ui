/**
 * Searches an array for an item matching the provided predicate. Throws if there is no match.
 *
 * @param array Array to search
 * @param pred Predicate used to test for a match
 * @param error Error message used if no matching item is found
 * @returns The first matching item
 */
declare function findOrThrow<T>(array: T[], pred: (value: T, index: number, array: T[]) => boolean, error?: string | (() => string)): T;

export { findOrThrow };
