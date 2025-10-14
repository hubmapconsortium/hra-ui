/** Default error message for no matches */
const NO_MATCH_ERROR_MESSAGE = 'Could not find a matching item';
/**
 * Creates an error
 *
 * @param error Error message
 * @returns A new error with the provided message
 */
function getNoMatchError(error = NO_MATCH_ERROR_MESSAGE) {
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
function findOrThrow(array, pred, error) {
    const item = array.find(pred);
    if (item === undefined) {
        throw getNoMatchError(error);
    }
    return item;
}

/**
 * Generated bundle index. Do not edit.
 */

export { findOrThrow };
//# sourceMappingURL=hra-ui-common-array-util.mjs.map
