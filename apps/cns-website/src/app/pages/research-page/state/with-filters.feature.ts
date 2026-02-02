import { computed, Signal } from '@angular/core';
import { FilterOptionCategory } from '@hra-ui/design-system/filter-menu';
import { SearchListOption } from '@hra-ui/design-system/search-list';
import {
  patchState,
  signalMethod,
  signalStoreFeature,
  type,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { PeopleId } from '../../../schemas/people.schema';
import { ResearchTypeId, ResearchTypeItem } from '../../../schemas/research-type.schema';
import { ResearchCategoryId, ResearchItem } from '../../../schemas/research.schema';
import { ResearchState } from './with-research.feature';

/** Generic search list option with a typed id */
type TypedSearchListOption<T extends string> = SearchListOption & { id: T };

/** Filter option for research categories */
export type CategoryOption = TypedSearchListOption<ResearchCategoryId>;

/** Filter option for research events */
export type EventOption = TypedSearchListOption<ResearchTypeId>;

/** Filter option for research funding */
export type FundingOption = TypedSearchListOption<ResearchTypeId>;

/** Filter option for research publications */
export type PublicationOption = TypedSearchListOption<ResearchTypeId>;

/** Filter option for people */
export type PeopleOption = TypedSearchListOption<PeopleId>;

/** Year option with numeric year value */
export interface YearOption extends SearchListOption {
  /** Year value */
  year: number;
}

/** Signals exposed by the filters feature */
export interface FilterProps {
  /** Selected people options */
  people: Signal<PeopleOption[]>;
  /** Available filters with selected options */
  filters: Signal<FilterOptionCategory<SearchListOption>[]>;
  /** Items after all filters applied */
  filteredItems: Signal<ResearchItem[]>;
  /** Count of filtered items */
  numFilteredItems: Signal<number>;
  /** Counts by category */
  countsByCategory: Signal<Record<string, number>>;
  /** Counts by type */
  countsByType: Signal<Record<string, number>>;
  /** Counts by people */
  countsByPeople: Signal<Record<string, number>>;
  /** Counts by year */
  countsByYear: Signal<Record<string, number>>;
  /** Aggregate counts array */
  counts: Signal<Record<string, number>[]>;
}

/** Internal filter state backing the signals */
type InternalProps = { [key: `_${string}`]: unknown };

/** Selected filter values for the research page */
interface FilterState {
  /** Selected categories */
  categories: CategoryOption[] | null;
  /** Selected funding options */
  funding: FundingOption[] | null;
  /** Selected publication IDs */
  publicationIds: string[] | null;
  /** Selected event IDs */
  eventIds: string[] | null;
  /** Selected people IDs */
  peopleIds: string[] | null;
  /** Selected years */
  years: YearOption[] | null;
  /** Search text */
  search: string | null;
}

/**
 * Builds a descending list of years starting at startYear.
 * @param startYear Inclusive starting year
 */
function createYearList(startYear: number): number[] {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let year = currentYear; year >= startYear; year--) {
    years.push(year);
  }

  return years;
}

/** Category filter options */
export const CATEGORY_OPTIONS: CategoryOption[] = [
  { id: 'data-tool' as ResearchCategoryId, label: 'Data & tools' },
  { id: 'event' as ResearchCategoryId, label: 'Events' },
  { id: 'funding' as ResearchCategoryId, label: 'Funding' },
  { id: 'display' as ResearchCategoryId, label: 'Interactive displays' },
  { id: 'miscellaneous' as ResearchCategoryId, label: 'Miscellaneous' },
  { id: 'news' as ResearchCategoryId, label: 'News' },
  { id: 'presentation' as ResearchCategoryId, label: 'Presentations' },
  { id: 'publication' as ResearchCategoryId, label: 'Publications' },
  { id: 'software' as ResearchCategoryId, label: 'Software Products' },
  { id: 'teaching' as ResearchCategoryId, label: 'Teaching' },
  { id: 'visualization' as ResearchCategoryId, label: 'Visualizations' },
];

/** Funding filter options */
export const FUNDING_OPTIONS: FundingOption[] = [
  { id: 'research-funding' as ResearchTypeId, label: 'Research funding' },
  { id: 'teaching-funding' as ResearchTypeId, label: 'Teaching funding' },
  { id: 'workshop-funding' as ResearchTypeId, label: 'Workshop funding' },
];

/** Year filter options from 1991 to current year */
export const YEAR_OPTIONS: YearOption[] = createYearList(1991).map((year) => ({
  id: year.toString(),
  label: year.toString(),
  year,
}));

/** Category filter configuration */
const CATEGORIES_FILTER: FilterOptionCategory<CategoryOption> = {
  id: 'category',
  label: 'Category',
  options: CATEGORY_OPTIONS,
  selected: [],
};

/** Event filter configuration */
const EVENTS_FILTER: FilterOptionCategory<EventOption> = {
  id: 'event-type',
  label: 'Event type',
  options: [],
  selected: [],
};

/** Funding filter configuration */
const FUNDING_FILTER: FilterOptionCategory<FundingOption> = {
  id: 'funding-type',
  label: 'Funding type',
  options: FUNDING_OPTIONS,
  selected: [],
};

/** Publication filter configuration */
const PUBLICATIONS_FILTER: FilterOptionCategory<PublicationOption> = {
  id: 'publication-type',
  label: 'Publication type',
  options: [],
  selected: [],
};

/** People filter configuration */
const PEOPLE_FILTER: FilterOptionCategory<PeopleOption> = {
  id: 'people',
  label: 'People',
  options: [],
  selected: [],
};

/** Year filter configuration */
const YEARS_FILTER: FilterOptionCategory<YearOption> = {
  id: 'year',
  label: 'Year',
  options: YEAR_OPTIONS,
  selected: [],
};

/** Initial filter state with no selections */
const initialState: FilterState = {
  categories: null,
  funding: null,
  publicationIds: null,
  eventIds: null,
  peopleIds: null,
  years: null,
  search: null,
};

/**
 * Converts research type definitions to typed search list options.
 * @param researchTypes Accessor for research type definitions
 * @return Accessor for typed search list options
 */
function researchTypesToOptions(
  researchTypes: () => ResearchTypeItem[],
): Signal<TypedSearchListOption<ResearchTypeId>[]> {
  return computed(() =>
    researchTypes()
      .map((item) => ({
        id: item.value,
        label: toSentenceCase(item.label),
      }))
      .sort((a, b) => a.label.localeCompare(b.label)),
  );
}

/**
 * Filters options by selected IDs.
 * @param options Accessor for all options
 * @param ids Accessor for selected option IDs
 * @return Accessor for typed search list options
 */
function filterOptionsByIds<T extends string>(
  options: () => TypedSearchListOption<T>[],
  ids: () => string[] | null,
): Signal<TypedSearchListOption<T>[]> {
  return computed(() => {
    const idSet = new Set(ids());
    return options().filter((option) => idSet.has(option.id));
  });
}

/**
 * Merges base filter config with current selection and options.
 * @param base Base filter definition
 * @param selected Current selected options accessor
 * @param options Optional dynamic options accessor
 */
function optionsToFilter<Opt extends SearchListOption>(
  base: FilterOptionCategory<Opt>,
  selected: () => Opt[] | null,
  options?: () => Opt[],
): Signal<FilterOptionCategory<Opt>> {
  return computed(() => ({ ...base, options: options?.() ?? base.options, selected: selected() ?? [] }));
}

/**
 * Builds a set of selected option IDs across multiple selections.
 * @param options Accessors returning selected option arrays
 */
function optionsToSet<Opt extends string>(...options: (() => TypedSearchListOption<Opt>[] | null)[]): Signal<Set<Opt>> {
  return computed(() => new Set<Opt>(options.flatMap((opts) => opts()?.map((option) => option.id) ?? [])));
}

/**
 * Filters items by selected options using a provided predicate.
 * @param items Accessor for all items
 * @param options Accessor for selected option IDs
 * @param filterFn Predicate that checks item against selected options
 */
function createFilteredBy<T, Opt>(
  items: () => T[],
  options: () => Set<Opt>,
  filterFn: (item: T, options: Set<Opt>) => boolean,
): Signal<T[]> {
  return computed(() => {
    const selectedOptions = options();
    const allItems = items();
    if (selectedOptions.size === 0) {
      return allItems;
    }

    return allItems.filter((item) => filterFn(item, selectedOptions));
  });
}

/**
 * Normalizes search text for case/diacritic-insensitive matching.
 * @param str Raw input string
 */
function normalizeSearchString(str: string): string {
  return str
    .trim()
    .toLocaleLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/\s{2,}/, ' ');
}

/**
 * Converts a string to sentence case.
 * @param str Raw input string
 */
function toSentenceCase(str: string): string {
  return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Counts occurrences of keys derived from items.
 * @param items Accessor for items to count
 * @param keyFn Key selector returning one or many keys per item
 */
function countsByKey(
  items: () => ResearchItem[],
  keyFn: (item: ResearchItem) => string | string[],
): Signal<Record<string, number>> {
  return computed(() => {
    const counts: Record<string, number> = {};
    for (const item of items()) {
      const keys = keyFn(item);
      for (const key of Array.isArray(keys) ? keys : [keys]) {
        counts[key] ??= 0;
        counts[key] += 1;
      }
    }
    return counts;
  });
}

/**
 * Adds filtering capabilities for research items.
 * Provides filtered item lists, counts, and filter option signals.
 */
export function withFilters() {
  return signalStoreFeature(
    { state: type<ResearchState>() },
    withState(initialState),
    withComputed((store) => {
      const _peopleOptions = computed(() =>
        store
          .peopleItems()
          .map((person) => ({ id: person.slug, label: person.name }))
          .sort((a, b) => a.label.localeCompare(b.label)),
      );
      const people = filterOptionsByIds(_peopleOptions, store.peopleIds);

      const _publicationOptions = researchTypesToOptions(store.pubTypes);
      const publications = filterOptionsByIds(_publicationOptions, store.publicationIds);

      const _eventOptions = researchTypesToOptions(store.eventTypes);
      const events = filterOptionsByIds(_eventOptions, store.eventIds);

      const _categoriesFilter = optionsToFilter(CATEGORIES_FILTER, store.categories);
      const _eventsFilter = optionsToFilter(EVENTS_FILTER, events, _eventOptions);
      const _fundingFilter = optionsToFilter(FUNDING_FILTER, store.funding);
      const _publicationsFilter = optionsToFilter(PUBLICATIONS_FILTER, publications, _publicationOptions);
      const _peopleFilter = optionsToFilter(PEOPLE_FILTER, people, _peopleOptions);
      const _yearsFilter = optionsToFilter(YEARS_FILTER, store.years);

      const filters = computed((): FilterOptionCategory<SearchListOption>[] => [
        _categoriesFilter(),
        _eventsFilter(),
        _fundingFilter(),
        _publicationsFilter(),
        _peopleFilter(),
        _yearsFilter(),
      ]);

      const _selectedCategories = optionsToSet(store.categories);
      const _filteredByCategory = createFilteredBy(
        store.researchItems,
        _selectedCategories,
        (item, selectedCategories) => selectedCategories.has(item.category),
      );

      const _selectedTypes = optionsToSet(store.funding, publications, events);
      const _filteredByType = createFilteredBy(_filteredByCategory, _selectedTypes, (item, selectedTypes) =>
        selectedTypes.has(item.type),
      );

      const _selectedPeople = optionsToSet(people);
      const _filteredByPeople = createFilteredBy(_filteredByType, _selectedPeople, (item, selectedPeople) =>
        item.people.some((person) => selectedPeople.has(person)),
      );

      const _selectedYears = computed(() => new Set(store.years()?.map((option) => option.year) ?? []));
      const _filteredByYear = createFilteredBy(_filteredByPeople, _selectedYears, (item, selectedYears) =>
        selectedYears.has(item.dateStart.getFullYear()),
      );

      const _filteredBySearch = computed(() => {
        const search = store.search()?.trim();
        const items = _filteredByYear();
        if (!search) {
          return items;
        }

        const normalizedSearch = normalizeSearchString(search);
        return items.filter(
          (item) =>
            normalizeSearchString(item.title).includes(normalizedSearch) ||
            normalizeSearchString(item.description).includes(normalizedSearch),
        );
      });

      const countsByCategory = countsByKey(store.researchItems, (item) => item.category);
      const countsByType = countsByKey(store.researchItems, (item) => item.type);
      const countsByPeople = countsByKey(store.researchItems, (item) => item.people);
      const countsByYear = countsByKey(store.researchItems, (item) => item.dateStart.getFullYear().toString());

      const counts = computed(() => [
        countsByCategory(),
        countsByType(),
        countsByType(),
        countsByType(),
        countsByPeople(),
        countsByYear(),
      ]);

      return {
        people,
        filters,
        filteredItems: _filteredBySearch,
        numFilteredItems: computed(() => _filteredBySearch().length),
        countsByCategory,
        countsByType,
        countsByPeople,
        countsByYear,
        counts,
        _filteredByCategory,
        _filteredByType,
        _filteredByPeople,
        _filteredByYear,
      } satisfies FilterProps & InternalProps;
    }),
    withMethods((store) => ({
      /** Sets selected categories */
      setCategories: signalMethod((categories: CategoryOption[] | null) => patchState(store, { categories })),
      /** Sets selected events */
      setEventIds: signalMethod((eventIds: string[] | null) => patchState(store, { eventIds })),
      /** Sets selected funding options */
      setFunding: signalMethod((funding: FundingOption[] | null) => patchState(store, { funding })),
      /** Sets selected publication IDs */
      setPublicationIds: signalMethod((publicationIds: string[] | null) => patchState(store, { publicationIds })),
      /** Sets selected people IDs */
      setPeopleIds: signalMethod((peopleIds: string[] | null) => patchState(store, { peopleIds })),
      /**
       * Sets selected people options.
       * @param people Selected people options
       */
      setPeople: signalMethod((people: PeopleOption[] | null) =>
        patchState(store, { peopleIds: people?.map((p) => p.id) ?? null }),
      ),
      /**
       * Sets selected years.
       * @param years Selected year options
       */
      setYears: signalMethod((years: YearOption[] | null) => patchState(store, { years })),
      /**
       * Sets search text.
       * @param search Search string
       */
      setSearch: signalMethod((search: string | null) => patchState(store, { search })),
      /**
       * Updates all filters from filter menu selections.
       * @param filters Filter menu categories with selections
       */
      updateFilters: signalMethod((filters: FilterOptionCategory<SearchListOption>[]) => {
        const categories = filters[0]?.selected as CategoryOption[];
        const events = filters[1]?.selected as EventOption[];
        const funding = filters[2]?.selected as FundingOption[];
        const publications = filters[3]?.selected as PublicationOption[];
        const people = filters[4]?.selected as PeopleOption[];
        const years = filters[5]?.selected as YearOption[];

        patchState(store, {
          categories: categories.length > 0 ? categories : null,
          funding: funding.length > 0 ? funding : null,
          publicationIds: publications.length > 0 ? publications.map((p) => p.id) : null,
          eventIds: events.length > 0 ? events.map((e) => e.id) : null,
          peopleIds: people.length > 0 ? people.map((p) => p.id) : null,
          years: years.length > 0 ? years : null,
        });
      }),
      /** Resets all filters to defaults */
      resetFilters: () => patchState(store, initialState),
    })),
  );
}
