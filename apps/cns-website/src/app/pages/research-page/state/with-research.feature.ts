import { patchState, signalMethod, signalStoreFeature, withComputed, withMethods, withState } from '@ngrx/signals';
import { ResearchItem } from '../../../schemas/research/research.schema';
import { computed } from '@angular/core';

export interface ResearchState {
  researchItems: ResearchItem[];
  // Define state properties here
}

const initialState: ResearchState = {
  researchItems: [],
  // Initialize other state properties here
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
      setResearchItems: signalMethod((items: ResearchItem[]) => patchState(store, { researchItems: items })),
    })),
  );
}
