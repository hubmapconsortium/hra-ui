import { computed, Signal, WritableSignal } from '@angular/core';
import { signalStore, withHooks } from '@ngrx/signals';
import { linkedQueryParam } from 'ngxtension/linked-query-param';
import {
  parseCategories,
  parseEvents,
  parseFunding,
  parseGroupBy,
  parsePeople,
  parsePublications,
  parseSearch,
  parseSortBy,
  parseView,
  parseYears,
  serializeCategories,
  serializeEvents,
  serializeFunding,
  serializePeople,
  serializePublications,
  serializeYears,
} from './serialization';
import { withFilters } from './with-filters.feature';
import { withOrdering } from './with-ordering.feature';
import { withResearch } from './with-research.feature';
import { withView } from './with-view.feature';

function createWritableStateSlice<T>(stateSignal: Signal<T>, set: (value: T) => void): WritableSignal<T> {
  const signal = computed(() => stateSignal()) as WritableSignal<T>;
  signal.set = set;
  signal.update = (updateFn) => set(updateFn(stateSignal()));
  signal.asReadonly = () => stateSignal;
  return signal;
}

export const ResearchStore = signalStore(
  withResearch(),
  withView(),
  withFilters(),
  withOrdering(),
  withHooks({
    onInit(store) {
      const view = createWritableStateSlice(store.view, store.setView);
      const categories = createWritableStateSlice(store.categories, store.setCategories);
      const events = createWritableStateSlice(store.events, store.setEvents);
      const funding = createWritableStateSlice(store.funding, store.setFunding);
      const publications = createWritableStateSlice(store.publications, store.setPublications);
      const people = createWritableStateSlice(store.people, store.setPeople);
      const years = createWritableStateSlice(store.years, store.setYears);
      const search = createWritableStateSlice(store.search, store.setSearch);
      const sortBy = createWritableStateSlice(store.sortBy, store.setSortBy);
      const groupBy = createWritableStateSlice(store.groupBy, store.setGroupBy);
      const commonOptions = { replaceUrl: true, preserveFragment: true };

      linkedQueryParam('view', { source: view, parse: parseView, ...commonOptions });
      linkedQueryParam('category', {
        source: categories,
        parse: parseCategories,
        stringify: serializeCategories,
        ...commonOptions,
      });
      linkedQueryParam('event', {
        source: events,
        parse: parseEvents,
        stringify: serializeEvents,
        ...commonOptions,
      });
      linkedQueryParam('funding', {
        source: funding,
        parse: parseFunding,
        stringify: serializeFunding,
        ...commonOptions,
      });
      linkedQueryParam('publication', {
        source: publications,
        parse: parsePublications,
        stringify: serializePublications,
        ...commonOptions,
      });
      linkedQueryParam('people', {
        source: people,
        parse: parsePeople,
        stringify: serializePeople,
        ...commonOptions,
      });
      linkedQueryParam('year', {
        source: years,
        parse: parseYears,
        stringify: serializeYears,
        ...commonOptions,
      });
      linkedQueryParam('search', { source: search, parse: parseSearch, ...commonOptions });
      linkedQueryParam('sortBy', { source: sortBy, parse: parseSortBy, ...commonOptions });
      linkedQueryParam('groupBy', { source: groupBy, parse: parseGroupBy, ...commonOptions });
    },
  }),
);
