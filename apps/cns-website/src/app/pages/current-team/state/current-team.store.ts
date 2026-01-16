import { computed, Signal, WritableSignal } from '@angular/core';
import { signalStore, withHooks } from '@ngrx/signals';
import { linkedQueryParam } from 'ngxtension/linked-query-param';
import {
  parseGroupBy,
  parseRoles,
  parseSortBy,
  parseTeamType,
  parseYears,
  serializeRoles,
  serializeYears,
} from './serialization';
import { withFilters } from './with-filters.feature';
import { withOrdering } from './with-ordering.feature';
import { withPeople } from './with-people.feature';

function createWritableStateSlice<T>(stateSignal: Signal<T>, set: (value: T) => void): WritableSignal<T> {
  const signal = computed(() => stateSignal()) as WritableSignal<T>;
  signal.set = set;
  signal.update = (updateFn) => set(updateFn(stateSignal()));
  signal.asReadonly = () => stateSignal;
  return signal;
}

/**
 * Signal store for managing current team state.
 * Combines people management, filtering, and ordering features.
 */
export const CurrentTeamStore = signalStore(
  withPeople(),
  withFilters(),
  withOrdering(),
  withHooks({
    onInit(store) {
      const teamType = createWritableStateSlice(store.team, store.setTeam);
      const roles = createWritableStateSlice(store.roles, store.setRoles);
      const years = createWritableStateSlice(store.years, store.setYears);
      const search = createWritableStateSlice(store.search, store.setSearch);
      const sortBy = createWritableStateSlice(store._sortBy, store.setSortBy);
      const groupBy = createWritableStateSlice(store.groupBy, store.setGroupBy);
      const commonOptions = { replaceUrl: false, preserveFragment: true };

      linkedQueryParam('team', { source: teamType, parse: parseTeamType, ...commonOptions });
      linkedQueryParam('roles', { source: roles, parse: parseRoles, stringify: serializeRoles, ...commonOptions });
      linkedQueryParam('years', { source: years, parse: parseYears, stringify: serializeYears, ...commonOptions });
      linkedQueryParam('search', { source: search, ...commonOptions });
      linkedQueryParam('sortBy', { source: sortBy, parse: parseSortBy, ...commonOptions });
      linkedQueryParam('groupBy', { source: groupBy, parse: parseGroupBy, ...commonOptions });
    },
  }),
);
