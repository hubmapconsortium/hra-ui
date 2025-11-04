/**
 * Get a value from a map if the key exists, otherwise create and insert a new value using
 * the provided generator function and return the new value.
 *
 * @param map Map
 * @param key Key to get
 * @param create Function to create new values
 * @returns An existing or newly create value
 */
export function getOrCreate<K, V>(map: Map<K, V>, key: K, create: () => V): V {
  if (map.has(key)) {
    return map.get(key) as V;
  }

  const value = create();
  map.set(key, value);
  return value;
}
