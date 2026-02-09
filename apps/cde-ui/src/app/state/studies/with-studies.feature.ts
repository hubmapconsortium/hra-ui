import { patchState, signalMethod, signalStoreFeature, withMethods, withState } from '@ngrx/signals';
import { Studies, Study } from '../../schemas/study.schema';

export interface TagItem {
  icon: string;
  text: string;
}

export interface PublicationItem {
  label: string;
  url: string;
}

export interface ExtraStudyProps {
  tagline: string;
  thumbnail: string;
  chips: string[];
  tags: TagItem[];
  publications: PublicationItem[];
}

interface StudiesState {
  studies: Study[];
}

const initialState: StudiesState = {
  studies: [],
};

function simplePluralizeWord(count: number, word: string): string {
  return word + (count === 1 ? '' : 's');
}

function computeExtraStudyProps(study: Study): ExtraStudyProps {
  const {
    cellCount,
    consortium,
    citations,
    datasets: { length: numDatasets },
    organName,
    publications: publicationUrls,
    technology,
  } = study;

  const chips = [`${numDatasets} ${simplePluralizeWord(numDatasets, 'dataset')}`];
  if (cellCount) {
    chips.push(`${cellCount.toLocaleString()} ${simplePluralizeWord(cellCount, 'cell')}`);
  }

  const tags: TagItem[] = [];
  if (consortium) {
    tags.push({ icon: 'diversity_3', text: consortium });
  }
  if (study.euiUrl) {
    tags.push({ icon: 'check_circle', text: 'HRA registered' });
  }

  const publications: PublicationItem[] = [];
  for (let index = 0; index < publicationUrls.length; index++) {
    const label = citations[index];
    const url = publicationUrls[index];
    if (label && url) {
      publications.push({ label, url });
    }
  }

  return {
    tagline: `${organName}, ${technology}`,
    thumbnail: `assets/data/gallery/${study.thumbnail}`,
    chips,
    tags,
    publications,
  };
}

export function withStudies() {
  return signalStoreFeature(
    withState(initialState),
    withMethods((store) => {
      const extraPropsCache = new WeakMap<Study, ExtraStudyProps>();

      return {
        setStudies: signalMethod(({ studies }: Studies) => patchState(store, { studies })),
        getExtraProps: (study: Study) => {
          let extraProps = extraPropsCache.get(study);
          if (!extraProps) {
            extraProps = computeExtraStudyProps(study);
            extraPropsCache.set(study, extraProps);
          }
          return extraProps;
        },
      };
    }),
  );
}
