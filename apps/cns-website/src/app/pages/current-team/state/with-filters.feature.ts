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
import { PeopleMethods, PeopleProps, RoleType } from './with-people.feature';
import { PeopleProfileItem } from '../../../schemas/people-profile/people-profile.schema';

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
};

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
    withComputed((store) => ({
      untypedFilters: computed(() => store.filters() as FilterOptionCategory<SearchListOption>[]),
      _filteredByTeam: computed(() => {
        const team = store.team();
        const people = store.people();
        const endYearByPerson = store.endYearByPerson();
        return people.filter((person) => {
          const isActive = endYearByPerson.get(person) === null;
          return team === 'current' ? isActive : !isActive;
        });
      }),
    })),
    withComputed((store) => ({
      _filteredByRole: computed(() => {
        const roles = store.filters()[0].selected ?? [];
        const people = store._filteredByTeam();
        if (roles.length === 0) {
          return people;
        }

        const rolesByPerson = store.rolesByPerson();
        return people.filter((person) => {
          const personRoles = rolesByPerson.get(person);
          return personRoles && roles.some((role) => personRoles.has(role.id));
        });
      }),
    })),
    withComputed((store) => ({
      _filteredByYear: computed(() => {
        const years = store.filters()[1].selected ?? [];
        const people = store._filteredByRole();
        if (years.length === 0) {
          return people;
        }

        return people.filter((person) => {
          return years.some((yearOption) => store.isActiveInYear(person, yearOption.year));
        });
      }),
    })),
    withComputed((store) => ({
      _filteredBySearch: computed(() => {
        const search = store.search().toLowerCase();
        const people = store._filteredByYear();
        if (search.trim() === '') {
          return people;
        }

        return people.filter((person) => person.name.toLowerCase().includes(search));
      }),
    })),
    withComputed((store) => ({
      filteredPeople: computed(() => store._filteredBySearch()),
    })),
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
