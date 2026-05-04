/**
 * Utility function to get default thumbnail image URL based on category and type
 *
 * @param category The category of the item
 * @param type The type of the item
 * @returns The URL of the default thumbnail image
 */
export function getDefaultThumbnail(category: string, type: string): string {
  const url = `assets/placeholder-images/placeholder-${category}`;
  if (category === 'publication' || category === 'event') {
    return `${url}-${type}.png`;
  }

  return `${url}.png`;
}
