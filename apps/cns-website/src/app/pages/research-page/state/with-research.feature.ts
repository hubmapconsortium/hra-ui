import { computed } from '@angular/core';
import { patchState, signalMethod, signalStoreFeature, withComputed, withMethods, withState } from '@ngrx/signals';
import { PeopleResearchItem, PublicationTypes, ResearchItem } from '../../../schemas/research/research.schema';

/** Core research page state containing all research data */
export interface ResearchState {
  /** Research items to display */
  researchItems: ResearchItem[];
  /** People items associated with research */
  peopleItems: PeopleResearchItem[];
  /** Publication type definitions */
  pubTypes: PublicationTypes;
}

/** Initial empty research state */
const initialState: ResearchState = {
  researchItems: [],
  peopleItems: [],
  pubTypes: [],
};

/**
 * Provides core research data management.
 * Stores research items, people, and publication type definitions.
 */
export function withResearch() {
  return signalStoreFeature(
    withState(initialState),
    withComputed((store) => {
      return {
        /** Count of research items */
        numResearchItems: computed(() => store.researchItems().length),
      };
    }),
    withMethods((store) => ({
      /** Sets research items */
      setResearchItems: signalMethod((researchItems: ResearchItem[]) => patchState(store, { researchItems })),
      /** Sets people items */
      setPeopleItems: signalMethod((peopleItems: PeopleResearchItem[]) => patchState(store, { peopleItems })),
      /** Sets publication types */
      setPublicationTypes: signalMethod((pubTypes: PublicationTypes) => patchState(store, { pubTypes })),
    })),
  );
}
