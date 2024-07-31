/**
 * Merges two objects.
 * Keys with undefined values do not override previous values.
 *
 * @param obj1 The first object
 * @param obj2 The first object
 * @returns A merged object
 */
export function mergeObjects<T, U>(obj1: T, obj2: U): T & U;
/**
 * Merged three objects
 * @param obj1 The first object
 * @param obj2 The first object
 * @param obj3 The third object
 */
export function mergeObjects<T, U, V>(obj1: T, obj2: U, obj3: V): T & U & V;
/**
 * Merged four objects
 * @param obj1 The first object
 * @param obj2 The first object
 * @param obj3 The third object
 * @param obj4 The fourth object
 */
export function mergeObjects<T, U, V, X>(obj1: T, obj2: U, obj3: V, obj4: X): T & U & V & X;
/**
 * Merges objects
 * @param objects Objects to merge
 * @returns Merged object
 */
export function mergeObjects(...objects: Record<string, unknown>[]): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const obj of objects) {
    for (const key in obj) {
      const value = obj[key];
      if (value !== undefined) {
        result[key] = value;
      }
    }
  }
  return result;
}
