import { computed } from '@angular/core';
import { signalStore, withComputed } from '@ngrx/signals';
import { withFilters } from './with-filters.feature';
import { withOrdering } from './with-ordering.feature';
import { withPeople } from './with-people.feature';

/**
 * Signal store for managing current team state
 * Combines people management, filtering, and ordering features
 * Provides computed signals for total and filtered people counts
 */
export const CurrentTeamStore = signalStore(
  withPeople(),
  withFilters(),
  withOrdering(),
  withComputed((store) => ({
    /** Total number of people in the store */
    numPeople: computed(() => store.people().length),
    /** Number of people after applying filters */
    numFilteredPeople: computed(() => store.filteredPeople().length),
  })),
);
