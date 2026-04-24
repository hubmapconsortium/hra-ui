import { ResearchTypeId } from '../schemas/research-type.schema';
import { ResearchItem } from '../schemas/research.schema';

const EVENT_PLACEHOLDER_TYPES = ['conference', 'meeting', 'other', 'presentation', 'tutorial', 'visit', 'workshop'];

const PUBLICATION_PLACEHOLDER_TYPES = [
  'article-journal',
  'book',
  'broadcast',
  'chapter',
  'manuscript',
  'paper-conference',
  'patent',
  'periodical',
  'report',
  'thesis',
  'unknown',
];

const PLACEHOLDER_TYPES = [...EVENT_PLACEHOLDER_TYPES, ...PUBLICATION_PLACEHOLDER_TYPES] as ResearchTypeId[];

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
    if (PLACEHOLDER_TYPES.includes(item.type)) {
      return `${url}-${item.type}.png`;
    }
  }
  return `${url}.png`;
}
