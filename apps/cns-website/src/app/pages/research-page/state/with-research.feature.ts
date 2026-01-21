import { computed } from '@angular/core';
import { patchState, signalMethod, signalStoreFeature, withComputed, withMethods, withState } from '@ngrx/signals';
import { PeopleResearchItem, ResearchItem } from '../../../schemas/research/research.schema';
import { PeopleOption } from './with-filters.feature';

export interface ResearchState {
  researchItems: ResearchItem[];
  peopleOptions: PeopleOption[];
  // Define state properties here
}

const initialState: ResearchState = {
  researchItems: [],
  peopleOptions: [],
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
      setResearchItems: signalMethod((researchItems: ResearchItem[]) => patchState(store, { researchItems })),
      setPeopleOptions: signalMethod((peopleData: PeopleResearchItem[]) =>
        patchState(store, { peopleOptions: createPeopleList(peopleData) }),
      ),
    })),
  );
}

function createPeopleList(options: PeopleResearchItem[] | null): PeopleOption[] {
  if (options) {
    return options.map((person) => ({
      id: person.slug || '',
      label: person.name,
    }));
  }
  return [];
}
