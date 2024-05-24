export function mergeObjects<T, U>(obj1: T, obj2: U): T & U;
export function mergeObjects<T, U, V>(obj1: T, obj2: U, obj3: V): T & U & V;
export function mergeObjects<T, U, V, X>(obj1: T, obj2: U, obj3: V, obj4: X): T & U & V & X;
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
