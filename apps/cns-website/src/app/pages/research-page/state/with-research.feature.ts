import { computed } from '@angular/core';
import { patchState, signalMethod, signalStoreFeature, withComputed, withMethods, withState } from '@ngrx/signals';
import { PeopleItem } from '../../../schemas/people.schema';
import { PublicationTypeItem } from '../../../schemas/publication-types.schema';
import { ResearchItem, ResearchTypeId } from '../../../schemas/research.schema';
import { TagItem } from '../../../schemas/tags.schema';

/** Core research page state containing all research data */
export interface ResearchState {
  /** Research items to display */
  researchItems: ResearchItem[];
  /** People items associated with research */
  peopleItems: PeopleItem[];
  /** Publication type definitions */
  pubTypes: PublicationTypeItem[];
  /** Tag items */
  tags: TagItem[];
}

/** Initial empty research state */
const initialState: ResearchState = {
  researchItems: [],
  peopleItems: [],
  pubTypes: [],
  tags: [],
};

/**
 * Provides core research data management.
 * Stores research items, people, publication type definitions, and tags.
 */
export function withResearch() {
  return signalStoreFeature(
    withState(initialState),
    withComputed((store) => {
      return {
        /** Count of research items */
        numResearchItems: computed(() => store.researchItems().length),
        /** Map of tags for quick lookup */
        tagsMap: computed(
          () => new Map(store.tags().map((tag) => [tag.slug, { name: tag.name, description: tag.description }])),
        ),
      };
    }),
    withMethods((store) => ({
      /** Sets research items */
      setResearchItems: signalMethod((researchItems: ResearchItem[]) =>
        patchState(store, {
          researchItems: researchItems.map((item) => ({
            ...item,
            type: (item.type !== '' ? item.type : 'unknown') as ResearchTypeId,
          })),
        }),
      ),
      /** Sets people items */
      setPeopleItems: signalMethod((peopleItems: PeopleItem[]) => patchState(store, { peopleItems })),
      /** Sets publication types */
      setPublicationTypes: signalMethod((pubTypes: PublicationTypeItem[]) =>
        patchState(store, { pubTypes: [...pubTypes, { label: 'Unknown', value: 'unknown' as ResearchTypeId }] }),
      ),
      /** Sets tag items */
      setTags: signalMethod((tags: TagItem[]) => patchState(store, { tags })),
    })),
  );
}
