import { computed } from '@angular/core';
import { signalStore, withComputed } from '@ngrx/signals';
import { withFilters } from './with-filters.feature';
import { withOrdering } from './with-ordering.feature';
import { withPeople } from './with-people.feature';

export const CurrentTeamStore = signalStore(
  withPeople(),
  withFilters(),
  withOrdering(),
  withComputed((store) => ({
    numPeople: computed(() => store.people().length),
    numFilteredPeople: computed(() => store.filteredPeople().length),
  })),
);
