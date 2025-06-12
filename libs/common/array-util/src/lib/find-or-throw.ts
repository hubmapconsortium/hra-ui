/** Default error message for no matches */
const NO_MATCH_ERROR_MESSAGE = 'Could not find a matching item';

/**
 * Creates an error
 *
 * @param error Error message
 * @returns A new error with the provided message
 */
function getNoMatchError(error: string | (() => string) = NO_MATCH_ERROR_MESSAGE): Error {
  return new Error(typeof error === 'function' ? error() : error);
}

/**
 * Searches an array for an item matching the provided predicate. Throws if there is no match.
 *
 * @param array Array to search
 * @param pred Predicate used to test for a match
 * @param error Error message used if no matching item is found
 * @returns The first matching item
 */
export function findOrThrow<T>(
  array: T[],
  pred: (value: T, index: number, array: T[]) => boolean,
  error?: string | (() => string),
): T {
  const item = array.find(pred);
  if (item === undefined) {
    throw getNoMatchError(error);
  }

  return item;
}
