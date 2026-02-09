import type { Tag } from '@hra-ui/design-system/cards/collection-card';
import type { BaseStudy } from './studies.schema';

export interface PublicationItem {
  label: string;
  url: string;
}

function simplePluralizeWord(count: number, word: string): string {
  return word + (count === 1 ? '' : 's');
}

export function getChips(study: BaseStudy): string[] {
  const {
    datasets: { length: numDatasets },
    cellCount,
  } = study;
  return [
    `${numDatasets.toLocaleString()} ${simplePluralizeWord(numDatasets, 'dataset')}`,
    `${cellCount.toLocaleString()} ${simplePluralizeWord(cellCount, 'cell')}`,
  ];
}

export function getTags(study: BaseStudy): Tag[] {
  const { consortium, euiUrl } = study;
  const tags: Tag[] = [];
  if (consortium) {
    tags.push({ icon: 'diversity_3', text: consortium });
  }
  if (euiUrl) {
    tags.push({ icon: 'check_circle', text: 'HRA registered' });
  }

  return tags;
}

export function zipCitationsAndPublications(study: BaseStudy): PublicationItem[] {
  const { citations, publications } = study;
  const publicationItems: PublicationItem[] = [];
  for (let index = 0; index < publications.length; index++) {
    const label = citations?.[index] ?? '';
    const url = publications[index];
    if (label && url) {
      publicationItems.push({ label, url });
    }
  }

  return publicationItems;
}
