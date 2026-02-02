import { computed, Signal, WritableSignal } from '@angular/core';
import { signalStore, withHooks } from '@ngrx/signals';
import { linkedQueryParam } from 'ngxtension/linked-query-param';
import {
  parseCategories,
  parseEventIds,
  parseFunding,
  parseGroupBy,
  parsePeopleIds,
  parsePublicationIds,
  parseSearch,
  parseSortBy,
  parseView,
  parseYears,
  serializeCategories,
  serializeEventIds,
  serializeFunding,
  serializePeopleIds,
  serializePublicationIds,
  serializeYears,
} from './serialization';
import { withFilters } from './with-filters.feature';
import { withOrdering } from './with-ordering.feature';
import { withResearch } from './with-research.feature';
import { withView } from './with-view.feature';

/**
 * Creates a writable signal slice from a readonly signal and setter function.
 * @param stateSignal Source readonly signal
 * @param set Setter used to update the state
 */
function createWritableStateSlice<T>(stateSignal: Signal<T>, set: (value: T) => void): WritableSignal<T> {
  const signal = computed(() => stateSignal()) as WritableSignal<T>;
  signal.set = set;
  signal.update = (updateFn) => set(updateFn(stateSignal()));
  signal.asReadonly = () => stateSignal;
  return signal;
}

/**
 * Research page state store combining data, filters, view, and ordering.
 * Keeps state in sync with URL query parameters for sharing and navigation.
 */
export const ResearchStore = signalStore(
  withResearch(),
  withView(),
  withFilters(),
  withOrdering(),
  withHooks({
    onInit(store) {
      /** Writable signal slices for linkedQueryParam compatibility */
      const view = createWritableStateSlice(store.view, store.setView);
      const categories = createWritableStateSlice(store.categories, store.setCategories);
      const events = createWritableStateSlice(store.eventIds, store.setEventIds);
      const funding = createWritableStateSlice(store.funding, store.setFunding);
      const publications = createWritableStateSlice(store.publicationIds, store.setPublicationIds);
      const people = createWritableStateSlice(store.peopleIds, store.setPeopleIds);
      const years = createWritableStateSlice(store.years, store.setYears);
      const search = createWritableStateSlice(store.search, store.setSearch);
      const sortBy = createWritableStateSlice(store.sortBy, store.setSortBy);
      const groupBy = createWritableStateSlice(store.groupBy, store.setGroupBy);
      const commonOptions = { replaceUrl: true, preserveFragment: true };

      linkedQueryParam('category', {
        source: categories,
        parse: parseCategories,
        stringify: serializeCategories,
        ...commonOptions,
      });
      linkedQueryParam('event', {
        source: events,
        parse: parseEventIds,
        stringify: serializeEventIds,
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
        parse: parsePublicationIds,
        stringify: serializePublicationIds,
        ...commonOptions,
      });
      linkedQueryParam('people', {
        source: people,
        parse: parsePeopleIds,
        stringify: serializePeopleIds,
        ...commonOptions,
      });
      linkedQueryParam('year', {
        source: years,
        parse: parseYears,
        stringify: serializeYears,
        ...commonOptions,
      });
      linkedQueryParam('search', { source: search, parse: parseSearch, ...commonOptions });
      linkedQueryParam('view', {
        source: view,
        parse: parseView,
        ...commonOptions,
      });
      linkedQueryParam('sort-by', {
        source: sortBy,
        parse: parseSortBy,
        ...commonOptions,
      });
      linkedQueryParam('group-by', { source: groupBy, parse: parseGroupBy, ...commonOptions });
    },
  }),
);
