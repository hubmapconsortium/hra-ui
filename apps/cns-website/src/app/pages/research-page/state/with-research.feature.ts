import { computed } from '@angular/core';
import { patchState, signalMethod, signalStoreFeature, withComputed, withMethods, withState } from '@ngrx/signals';
import { PeopleItem } from '../../../schemas/people.schema';
import { PublicationTypeItem } from '../../../schemas/publication-types.schema';
import { ResearchItem } from '../../../schemas/research.schema';

/** Core research page state containing all research data */
export interface ResearchState {
  /** Research items to display */
  researchItems: ResearchItem[];
  /** People items associated with research */
  peopleItems: PeopleItem[];
  /** Publication type definitions */
  pubTypes: PublicationTypeItem[];
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
      setPeopleItems: signalMethod((peopleItems: PeopleItem[]) => patchState(store, { peopleItems })),
      /** Sets publication types */
      setPublicationTypes: signalMethod((pubTypes: PublicationTypeItem[]) => patchState(store, { pubTypes })),
    })),
  );
}
