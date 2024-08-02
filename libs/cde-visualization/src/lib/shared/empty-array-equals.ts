/**
 * Compares two arrays for equality, specifically checking if both are empty.
 *
 * @param array1 - The first array to compare.
 * @param array2 - The second array to compare.
 * @returns `true` if both arrays are the same reference or both are empty; otherwise, `false`.
 */
export function emptyArrayEquals<T>(array1: T[], array2: T[]): boolean {
  return array1 === array2 || (array1.length === 0 && array2.length === 0);
}
