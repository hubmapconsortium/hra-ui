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
import {
  ResearchCategory,
  ResearchEventType,
  ResearchFundingType,
  ResearchItem,
  ResearchItemType,
  ResearchPersonType,
  ResearchPublicationType,
} from '../../../schemas/research/research.schema';
import { ResearchState } from './with-research.feature';

type TypedSearchListOption<T extends string> = SearchListOption & { id: T };

export type CategoryOption = TypedSearchListOption<ResearchCategory>;

export type EventOption = TypedSearchListOption<ResearchEventType>;

export type FundingOption = TypedSearchListOption<ResearchFundingType>;

export type PublicationOption = TypedSearchListOption<ResearchPublicationType>;

export type PeopleOption = TypedSearchListOption<ResearchPersonType>;

export interface YearOption extends SearchListOption {
  year: number;
}

export interface FilterProps {
  people: Signal<PeopleOption[]>;
  filters: Signal<FilterOptionCategory<SearchListOption>[]>;
  filteredItems: Signal<ResearchItem[]>;
  numFilteredItems: Signal<number>;
  countsByCategory: Signal<Record<string, number>>;
  countsByType: Signal<Record<string, number>>;
  countsByPeople: Signal<Record<string, number>>;
  countsByYear: Signal<Record<string, number>>;
  counts: Signal<Record<string, number>[]>;
}

type InternalProps = { [key: `_${string}`]: unknown };

interface FilterState {
  categories: CategoryOption[] | null;
  events: EventOption[] | null;
  funding: FundingOption[] | null;
  publicationIds: string[] | null;
  peopleIds: string[] | null;
  years: YearOption[] | null;
  search: string | null;
}

function createYearList(startYear: number): number[] {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let year = currentYear; year >= startYear; year--) {
    years.push(year);
  }

  return years;
}

export const CATEGORY_OPTIONS: CategoryOption[] = [
  { id: 'data-tool', label: 'Data & tools' },
  { id: 'event', label: 'Events' },
  { id: 'funding', label: 'Funding' },
  { id: 'display', label: 'Interactive displays' },
  { id: 'miscellaneous', label: 'Miscellaneous' },
  { id: 'news', label: 'News' },
  { id: 'presentation', label: 'Presentations' },
  { id: 'publication', label: 'Publications' },
  { id: 'software', label: 'Software Products' },
  { id: 'teaching', label: 'Teaching' },
  { id: 'visualization', label: 'Visualizations' },
];

export const EVENT_OPTIONS: EventOption[] = [
  { id: '24-hour' as ResearchEventType, label: '24-hour' },
  { id: 'amatria' as ResearchEventType, label: 'Amatria' },
  { id: 'workshop' as ResearchEventType, label: 'Workshops' },
];

export const FUNDING_OPTIONS: FundingOption[] = [
  { id: 'research-funding' as ResearchFundingType, label: 'Research funding' },
  { id: 'teaching-funding' as ResearchFundingType, label: 'Teaching funding' },
  { id: 'workshop-funding' as ResearchFundingType, label: 'Workshop funding' },
];

export const YEAR_OPTIONS: YearOption[] = createYearList(1991).map((year) => ({
  id: year.toString(),
  label: year.toString(),
  year,
}));

const CATEGORIES_FILTER: FilterOptionCategory<CategoryOption> = {
  id: 'category',
  label: 'Category',
  options: CATEGORY_OPTIONS,
  selected: [],
};

const EVENTS_FILTER: FilterOptionCategory<EventOption> = {
  id: 'event-type',
  label: 'Event Type',
  options: EVENT_OPTIONS,
  selected: [],
};

const FUNDING_FILTER: FilterOptionCategory<FundingOption> = {
  id: 'funding-type',
  label: 'Funding Type',
  options: FUNDING_OPTIONS,
  selected: [],
};

const PUBLICATIONS_FILTER: FilterOptionCategory<PublicationOption> = {
  id: 'publication-type',
  label: 'Publication Type',
  options: [],
  selected: [],
};

const PEOPLE_FILTER: FilterOptionCategory<PeopleOption> = {
  id: 'people',
  label: 'People',
  options: [],
  selected: [],
};

const YEARS_FILTER: FilterOptionCategory<YearOption> = {
  id: 'year',
  label: 'Year',
  options: YEAR_OPTIONS,
  selected: [],
};

const initialState: FilterState = {
  categories: null,
  events: null,
  funding: null,
  publicationIds: null,
  peopleIds: null,
  years: null,
  search: null,
};

function optionsToFilter<Opt extends SearchListOption>(
  base: FilterOptionCategory<Opt>,
  selected: () => Opt[] | null,
  options?: () => Opt[],
): Signal<FilterOptionCategory<Opt>> {
  return computed(() => ({ ...base, options: options?.() ?? base.options, selected: selected() ?? [] }));
}

function optionsToSet<Opt extends string>(...options: (() => TypedSearchListOption<Opt>[] | null)[]): Signal<Set<Opt>> {
  return computed(() => new Set<Opt>(options.flatMap((opts) => opts()?.map((option) => option.id) ?? [])));
}

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

function normalizeSearchString(str: string): string {
  return str
    .trim()
    .toLocaleLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/\s{2,}/, ' ');
}

function toSentenceCase(str: string): string {
  return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
}

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
      const people = computed(() => {
        const options = _peopleOptions();
        const ids = new Set(store.peopleIds() ?? []);
        return options.filter((option) => ids.has(option.id));
      });

      const _publicationOptions = computed(() =>
        store
          .pubTypes()
          .map((pubType) => ({
            id: pubType.value,
            label: toSentenceCase(pubType.label),
          }))
          .sort((a, b) => a.label.localeCompare(b.label)),
      );
      const publications = computed(() => {
        const options = _publicationOptions();
        const ids = new Set(store.publicationIds() ?? []);
        return options.filter((option) => ids.has(option.id));
      });

      const _categoriesFilter = optionsToFilter(CATEGORIES_FILTER, store.categories);
      const _eventsFilter = optionsToFilter(EVENTS_FILTER, store.events);
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

      const _selectedTypes = optionsToSet<ResearchItemType>(
        store.events,
        store.funding,
        publications as Signal<PublicationOption[]>,
      );
      const _filteredByType = createFilteredBy(_filteredByCategory, _selectedTypes, (item, selectedTypes) =>
        selectedTypes.has(item.type),
      );

      const _selectedPeople = optionsToSet<ResearchPersonType>(people);
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
        return items.filter((item) => normalizeSearchString(item.title).includes(normalizedSearch));
      });

      const countsByCategory = countsByKey(_filteredBySearch, (item) => item.category);
      const countsByType = countsByKey(_filteredBySearch, (item) => item.type);
      const countsByPeople = countsByKey(_filteredBySearch, (item) => item.people);
      const countsByYear = countsByKey(_filteredBySearch, (item) => item.dateStart.getFullYear().toString());

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
      setCategories: signalMethod((categories: CategoryOption[] | null) => patchState(store, { categories })),
      setEvents: signalMethod((events: EventOption[] | null) => patchState(store, { events })),
      setFunding: signalMethod((funding: FundingOption[] | null) => patchState(store, { funding })),
      setPublicationIds: signalMethod((publicationIds: string[] | null) => patchState(store, { publicationIds })),
      setPeopleIds: signalMethod((peopleIds: string[] | null) => patchState(store, { peopleIds })),
      setPeople: signalMethod((people: PeopleOption[] | null) =>
        patchState(store, { peopleIds: people?.map((p) => p.id) ?? null }),
      ),
      setYears: signalMethod((years: YearOption[] | null) => patchState(store, { years })),
      setSearch: signalMethod((search: string | null) => patchState(store, { search })),
      updateFilters: signalMethod((filters: FilterOptionCategory<SearchListOption>[]) => {
        const categories = filters[0]?.selected as CategoryOption[];
        const events = filters[1]?.selected as EventOption[];
        const funding = filters[2]?.selected as FundingOption[];
        const publications = filters[3]?.selected as PublicationOption[];
        const people = filters[4]?.selected as PeopleOption[];
        const years = filters[5]?.selected as YearOption[];

        patchState(store, {
          categories: categories.length > 0 ? categories : null,
          events: events.length > 0 ? events : null,
          funding: funding.length > 0 ? funding : null,
          publicationIds: publications.length > 0 ? publications.map((p) => p.id) : null,
          peopleIds: people.length > 0 ? people.map((p) => p.id) : null,
          years: years.length > 0 ? years : null,
        });
      }),
      resetFilters: () => patchState(store, initialState),
    })),
  );
}
