import { signalStore } from '@ngrx/signals';
import { withFilters } from './with-filters.feature';
import { withOrdering } from './with-ordering.feature';
import { withPeople } from './with-people.feature';

/**
 * Signal store for managing current team state.
 * Combines people management, filtering, and ordering features.
 */
export const CurrentTeamStore = signalStore(withPeople(), withFilters(), withOrdering());
