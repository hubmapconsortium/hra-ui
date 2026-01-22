import { computed } from '@angular/core';
import { patchState, signalMethod, signalStoreFeature, withComputed, withMethods, withState } from '@ngrx/signals';
import { PeopleResearchItem, PublicationTypes, ResearchItem } from '../../../schemas/research/research.schema';

export interface ResearchState {
  researchItems: ResearchItem[];
  peopleItems: PeopleResearchItem[];
  pubTypes: PublicationTypes;
}

const initialState: ResearchState = {
  researchItems: [],
  peopleItems: [],
  pubTypes: [],
};

export function withResearch() {
  return signalStoreFeature(
    withState(initialState),
    withComputed((store) => {
      return {
        numResearchItems: computed(() => store.researchItems().length),
      };
    }),
    withMethods((store) => ({
      setResearchItems: signalMethod((researchItems: ResearchItem[]) => patchState(store, { researchItems })),
      setPeopleItems: signalMethod((peopleItems: PeopleResearchItem[]) => patchState(store, { peopleItems })),
      setPublicationTypes: signalMethod((pubTypes: PublicationTypes) => patchState(store, { pubTypes })),
    })),
  );
}
