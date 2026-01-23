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
import { PeopleItem } from '../../../schemas/people.schema';

/**
 * Team type filter - current or past members
 */
export enum TeamType {
  Current = 'current',
  Past = 'past',
}

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
  filteredPeople: Signal<PeopleItem[]>;
  /** Number of people after applying all filters */
  numFilteredPeople: Signal<number>;
  /** Number of people in the selected team (current/past) before other filters */
  numFilteredByTeam: Signal<number>;
  /** List of filters with selected options */
  filters: Signal<FilterOptionCategory<SearchListOption>[]>;
};

/** Any internal props */
type InternalProps = { [key: `_${string}`]: unknown };

/**
 * Internal state for filters
 */
interface FilterState {
  /** Selected team filter */
  team: TeamType;
  /** Selected roles filter */
  roles: RoleTypeOption[] | null;
  /** Selected years filter */
  years: YearOption[] | null;
  /** Search text for filtering by name */
  search: string | null;
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

/** Available role type options for filtering team members by their role */
export const ROLE_TYPE_OPTIONS: RoleTypeOption[] = [
  { id: RoleType.Collaborator, label: 'Collaborators' },
  { id: RoleType.MasterStudent, label: 'Masters student' },
  { id: RoleType.PhDStudent, label: 'PhD students' },
  { id: RoleType.Staff, label: 'Staff' },
  { id: RoleType.Student, label: 'Students' },
];

/** Available year options for filtering team members by active year (from 2000 to current year) */
export const YEAR_OPTIONS: YearOption[] = createYearList(2000).map((year) => ({
  id: year.toString(),
  label: year.toString(),
  year,
}));

/** Filter configuration for roles with all available role type options */
const ROLES_FILTER: FilterOptionCategory<RoleTypeOption> = {
  id: 'roles',
  label: 'Roles',
  disableSearch: true,
  options: ROLE_TYPE_OPTIONS,
  selected: [],
};

/** Filter configuration for years with all available year options */
const YEARS_FILTER: FilterOptionCategory<YearOption> = {
  id: 'years',
  label: 'Active year',
  options: YEAR_OPTIONS,
  selected: [],
};

/**
 * Initial state for filters
 */
const initialFilterState: FilterState = {
  team: TeamType.Current,
  roles: null,
  years: null,
  search: null,
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
      const _rolesFilter = computed(() => ({ ...ROLES_FILTER, selected: store.roles() ?? [] }));
      const _yearsFilter = computed(() => ({ ...YEARS_FILTER, selected: store.years() ?? [] }));
      const filters = computed((): FilterOptionCategory<SearchListOption>[] => [_rolesFilter(), _yearsFilter()]);

      const _peopleByTeam = computed(() => {
        const people = store.people();
        const endYearByPerson = store.endYearByPerson();
        const currentTeam: PeopleItem[] = [];
        const pastTeam: PeopleItem[] = [];
        for (const person of people) {
          const isActive = endYearByPerson.get(person) === null;
          const team = isActive ? currentTeam : pastTeam;
          team.push(person);
        }

        return { current: currentTeam, past: pastTeam };
      });

      const _filteredByTeam = computed(() => {
        const team = store.team();
        const peopleByTeam = _peopleByTeam();
        return peopleByTeam[team];
      });

      const _filteredByRole = computed(() => {
        const selectedRoles = store.roles() ?? [];
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
        const years = store.years() ?? [];
        const people = _filteredByRole();
        if (years.length === 0) {
          return people;
        }

        return people.filter((person) => {
          return years.some((yearOption) => store.isActiveInYear(person, yearOption.year));
        });
      });

      const _filteredBySearch = computed(() => {
        const search = store.search()?.trim();
        const people = _filteredByYear();
        if (!search) {
          return people;
        }

        const normalizedSearch = search
          .toLocaleLowerCase()
          .normalize('NFD')
          .replace(/\p{Diacritic}/gu, '')
          .replace(/\s{2,}/, ' ');

        return people.filter((person) => store.getSearchableText(person).includes(normalizedSearch));
      });

      return {
        filters,
        filteredPeople: _filteredBySearch,
        numFilteredPeople: computed(() => _filteredBySearch().length),
        numFilteredByTeam: computed(() => _filteredByTeam().length),
        _rolesFilter,
        _yearsFilter,
        _peopleByTeam,
        _filteredByTeam,
        _filteredByRole,
        _filteredByYear,
        _filteredBySearch,
      } satisfies FilterProps & InternalProps;
    }),
    withMethods((store) => ({
      setTeam: signalMethod((team: TeamType) => patchState(store, { team })),
      setRoles: signalMethod((roles: RoleTypeOption[] | null) => patchState(store, { roles })),
      setYears: signalMethod((years: YearOption[] | null) => patchState(store, { years })),
      setFilters: signalMethod((filters: FilterOptionCategory<SearchListOption>[]) => {
        const roles = filters[0].selected as RoleTypeOption[];
        const years = filters[1].selected as YearOption[];
        patchState(store, { roles, years });
      }),
      setSearch: signalMethod((search: string | null) => patchState(store, { search })),
      resetFilters: () => patchState(store, initialFilterState),
    })),
  );
}
