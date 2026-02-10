import type { Tag } from '@hra-ui/design-system/cards/collection-card';
import type { BaseStudy } from './studies.schema';

/** Interface representing a publication item with a label and URL */
export interface PublicationItem {
  /** Label or citation for the publication */
  label: string;
  /** URL link to the publication */
  url: string;
}

/**
 * Simple helper function to pluralize a word based on the count
 *
 * @param count Number of items
 * @param word Word to be pluralized
 * @returns Pluralized word if count is not 1, otherwise the original word
 */
function simplePluralizeWord(count: number, word: string): string {
  return word + (count === 1 ? '' : 's');
}

/**
 * Computes the chips to be displayed for a study based on its datasets and cell count
 *
 * @param study The study for which to compute the chips
 * @returns Chips array
 */
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

/**
 * Computes the tags to be displayed for a study based on its consortium and HRA registration status
 *
 * @param study The study for which to compute the tags
 * @returns Tags array
 */
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

/**
 * Zips the citations and publications of a study into PublicationItems
 *
 * @param study The study for which to zip citations and publications
 * @returns PublicationItems
 */
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
