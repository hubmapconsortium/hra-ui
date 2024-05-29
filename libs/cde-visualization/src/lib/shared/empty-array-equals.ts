export function emptyArrayEquals<T>(array1: T[], array2: T[]): boolean {
  return array1 === array2 || (array1.length === 0 && array2.length === 0);
}
