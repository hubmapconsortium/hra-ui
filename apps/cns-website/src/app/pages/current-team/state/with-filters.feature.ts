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
import { PeopleProfileItem } from '../../../schemas/people-profile/people-profile.schema';
import { PeopleMethods, PeopleProps, RoleType } from './with-people.feature';

/**
 * Team type filter - current or past members
 */
export type TeamType = 'current' | 'past';

/**
 * Role type option for filtering
 */
export interface RoleTypeOption extends SearchListOption {
  /** The role type identifier */
  id: RoleType;
}

/**
 * Year option for filtering
 */
export interface YearOption extends SearchListOption {
  /** The year value */
  year: number;
}

/**
 * Props provided by the filters feature
 */
export type FilterProps = {
  /** List of people after applying all filters */
  filteredPeople: Signal<PeopleProfileItem[]>;
  /** Number of people after applying all filters */
  numFilteredPeople: Signal<number>;
  /** List of filters with selected options */
  untypedFilters: Signal<FilterOptionCategory<SearchListOption>[]>;
};

/** Any internal props */
type InternalProps = { [key: `_${string}`]: unknown };

/**
 * Internal state for filters
 */
interface FilterState {
  /** Selected team filter */
  team: TeamType;
  /** Filter categories for roles and years */
  filters: [FilterOptionCategory<RoleTypeOption>, FilterOptionCategory<YearOption>];
  /** Search text for filtering by name */
  search: string;
}

/**
 * Create a list of years from startYear to current year
 * @param startYear - The starting year
 * @returns Array of years in descending order
 */
function createYearList(startYear: number): number[] {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let year = currentYear; year >= startYear; year--) {
    years.push(year);
  }

  return years;
}

/**
 * Initial state for filters
 */
const initialFilterState: FilterState = {
  team: 'current',
  filters: [
    {
      id: 'roles',
      label: 'Roles',
      disableSearch: true,
      options: [
        { id: 'collaborator', label: 'Collaborators' },
        { id: 'master-student', label: 'Masters student' },
        { id: 'phd-student', label: 'PhD students' },
        { id: 'staff', label: 'Staff' },
        { id: 'student', label: 'Students' },
      ],
      selected: [],
    },
    {
      id: 'years',
      label: 'Active year',
      options: createYearList(2000).map((year) => ({
        id: year.toString(),
        label: year.toString(),
        year,
      })),
      selected: [],
    },
  ],
  search: '',
};

/**
 * Adds filtering capabilities for team members
 * Filters by team type (current/past), role, active year, and search text
 * @returns Signal store feature
 */
export function withFilters() {
  return signalStoreFeature(
    { props: type<PeopleProps>(), methods: type<PeopleMethods>() },
    withState<FilterState>(initialFilterState),
    withComputed((store) => {
      const _filteredByTeam = computed(() => {
        const team = store.team();
        const people = store.people();
        const endYearByPerson = store.endYearByPerson();
        return people.filter((person) => {
          const isActive = endYearByPerson.get(person) === null;
          return team === 'current' ? isActive : !isActive;
        });
      });

      const _filteredByRole = computed(() => {
        const selectedRoles = store.filters()[0].selected ?? [];
        const selectedTypes = new Set(selectedRoles.map((option) => option.id));
        const people = _filteredByTeam();
        if (selectedRoles.length === 0) {
          return people;
        }

        const rolesByPerson = store.rolesByPerson();
        return people.filter((person) => {
          const roles = rolesByPerson.get(person);
          return roles && roles.some((role) => selectedTypes.has(store.getRoleType(role)));
        });
      });

      const _filteredByYear = computed(() => {
        const years = store.filters()[1].selected ?? [];
        const people = _filteredByRole();
        if (years.length === 0) {
          return people;
        }

        return people.filter((person) => {
          return years.some((yearOption) => store.isActiveInYear(person, yearOption.year));
        });
      });

      const _filteredBySearch = computed(() => {
        const search = store.search().toLowerCase().trim();
        const people = _filteredByYear();
        if (!search) {
          return people;
        }

        return people.filter((person) => person.name.toLowerCase().includes(search));
      });

      return {
        filteredPeople: _filteredBySearch,
        numFilteredPeople: computed(() => _filteredBySearch().length),
        untypedFilters: store.filters as Signal<FilterOptionCategory<SearchListOption>[]>,
        _filteredByTeam,
        _filteredByRole,
        _filteredByYear,
        _filteredBySearch,
      } satisfies FilterProps & InternalProps;
    }),
    withMethods((store) => ({
      setTeam: signalMethod((team: TeamType) => patchState(store, { team })),
      setFilters: signalMethod((filters: FilterOptionCategory<SearchListOption>[]) =>
        patchState(store, { filters: filters as FilterState['filters'] }),
      ),
      setSearch: signalMethod((search: string) => patchState(store, { search })),
      resetFilters: () => patchState(store, initialFilterState),
    })),
  );
}
