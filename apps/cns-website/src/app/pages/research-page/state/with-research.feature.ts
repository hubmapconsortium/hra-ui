import { computed } from '@angular/core';
import { patchState, signalMethod, signalStoreFeature, withComputed, withMethods, withState } from '@ngrx/signals';
import { PeopleItem } from '../../../schemas/people.schema';
import { ResearchTypeId, ResearchTypeItem } from '../../../schemas/research-type.schema';
import { ResearchItem } from '../../../schemas/research.schema';
import { TagItem } from '../../../schemas/tags.schema';

/** Core research page state containing all research data */
export interface ResearchState {
  /** Research items to display */
  researchItems: ResearchItem[];
  /** People items associated with research */
  peopleItems: PeopleItem[];
  /** Publication type definitions */
  pubTypes: ResearchTypeItem[];
  /** Event type definitions */
  eventTypes: ResearchTypeItem[];
  /** Funding type definitions */
  fundingTypes: ResearchTypeItem[];
  /** Tag items */
  tags: TagItem[];
}

/** Initial empty research state */
const initialState: ResearchState = {
  researchItems: [],
  peopleItems: [],
  pubTypes: [],
  eventTypes: [],
  fundingTypes: [],
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
      setPublicationTypes: signalMethod((pubTypes: ResearchTypeItem[]) =>
        patchState(store, { pubTypes: [...pubTypes, { label: 'Unknown', value: 'unknown' as ResearchTypeId }] }),
      ),
      setEventTypes: signalMethod((eventTypes: ResearchTypeItem[]) => patchState(store, { eventTypes })),
      setFundingTypes: signalMethod((fundingTypes: ResearchTypeItem[]) => patchState(store, { fundingTypes })),
      setTags: signalMethod((tags: TagItem[]) => patchState(store, { tags })),
    })),
  );
}
