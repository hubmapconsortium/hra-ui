import { ResearchItem } from '../schemas/research.schema';

/**
 * Gets image url and uses the appropriate placeholder if none is provided.
 * @param item Research item
 * @returns image url
 */
export function getImageUrl(item: ResearchItem): string {
  if (item.image) {
    return item.image;
  }
  const url = `assets/placeholder-images/placeholder-${item.category}`;
  if (item.category === 'publication' || item.category === 'event') {
    return `${url}-${item.type}.png`;
  }
  return `${url}.png`;
}
