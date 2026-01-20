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
  ResearchPublicationType,
} from '../../../schemas/research/research.schema';
import { ResearchState } from './with-research.feature';

type TypedSearchListOption<T extends string> = SearchListOption & { id: T };

export type CategoryOption = TypedSearchListOption<ResearchCategory>;

export type EventOption = TypedSearchListOption<ResearchEventType>;

export type FundingOption = TypedSearchListOption<ResearchFundingType>;

export type PublicationOption = TypedSearchListOption<ResearchPublicationType>;

export type PeopleOption = TypedSearchListOption<string>; // TODO stricter type

export interface YearOption extends SearchListOption {
  year: number;
}

export interface FilterProps {
  filters: Signal<FilterOptionCategory<SearchListOption>[]>;
  filteredItems: Signal<ResearchItem[]>;
  numFilteredItems: Signal<number>;
}

type InternalProps = { [key: `_${string}`]: unknown };

interface FilterState {
  categories: CategoryOption[] | null;
  events: EventOption[] | null;
  funding: FundingOption[] | null;
  publications: PublicationOption[] | null;
  people: PeopleOption[] | null;
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

export const PUBLICATION_OPTIONS: PublicationOption[] = [
  { id: 'broadcast' as ResearchPublicationType, label: 'Audio/video' },
  { id: 'book' as ResearchPublicationType, label: 'Book' },
  { id: 'chapter' as ResearchPublicationType, label: 'Book chapter' },
  { id: 'periodical' as ResearchPublicationType, label: 'Edited journal' },
  { id: 'article-journal' as ResearchPublicationType, label: 'Journal article' },
  { id: 'patent' as ResearchPublicationType, label: 'Patent' },
  { id: 'report' as ResearchPublicationType, label: 'Tech report' },
  { id: 'thesis' as ResearchPublicationType, label: 'Thesis' },
  { id: 'manuscript' as ResearchPublicationType, label: 'Unrefereed' },
  { id: 'paper-conference' as ResearchPublicationType, label: 'Visualizations' },
];

export const YEAR_OPTIONS: YearOption[] = createYearList(2000).map((year) => ({
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
  options: PUBLICATION_OPTIONS,
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
  publications: null,
  people: null,
  years: null,
  search: null,
};

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

export function withFilters() {
  return signalStoreFeature(
    { state: type<ResearchState>() },
    withState(initialState),
    withComputed((store) => {
      const _categoriesFilter = computed(() => ({ ...CATEGORIES_FILTER, selected: store.categories() ?? [] }));
      const _eventsFilter = computed(() => ({ ...EVENTS_FILTER, selected: store.events() ?? [] }));
      const _fundingFilter = computed(() => ({ ...FUNDING_FILTER, selected: store.funding() ?? [] }));
      const _publicationsFilter = computed(() => ({ ...PUBLICATIONS_FILTER, selected: store.publications() ?? [] }));
      const _peopleFilter = computed(() => ({ ...PEOPLE_FILTER, selected: store.people() ?? [] }));
      const _yearsFilter = computed(() => ({ ...YEARS_FILTER, selected: store.years() ?? [] }));
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

      const _selectedTypes = optionsToSet<ResearchItemType>(store.events, store.funding, store.publications);
      const _filteredByType = createFilteredBy(_filteredByCategory, _selectedTypes, (item, selectedTypes) =>
        selectedTypes.has(item.type),
      );

      const _selectedPeople = optionsToSet(store.people);
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

      return {
        filters,
        filteredItems: _filteredBySearch,
        numFilteredItems: computed(() => _filteredBySearch().length),
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
      setPublications: signalMethod((publications: PublicationOption[] | null) => patchState(store, { publications })),
      setPeople: signalMethod((people: PeopleOption[] | null) => patchState(store, { people })),
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
          publications: publications.length > 0 ? publications : null,
          people: people.length > 0 ? people : null,
          years: years.length > 0 ? years : null,
        });
      }),
      resetFilters: () => patchState(store, initialState),
    })),
  );
}
