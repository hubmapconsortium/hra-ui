import { computed, Signal } from '@angular/core';
import {
  patchState,
  signalMethod,
  signalStoreFeature,
  type,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { PeopleProfileItem, Role } from '../../../schemas/people-profile/people-profile.schema';
import { FilterProps, TeamType } from './with-filters.feature';
import { PeopleMethods, PeopleProps, RoleType } from './with-people.feature';

/**
 * Sort options for team members
 */
export type SortBy = 'hierarchical' | 'lastNameAsc' | 'lastNameDesc' | 'endYearNewest' | 'startYearOldest';

/**
 * Group by options for team members
 */
export type GroupBy = 'role' | 'startYear' | 'endYear' | null;

/**
 * Group of people with a label
 */
export interface SortedGroup {
  /** The group label */
  label: string;
  /** Team members in this group */
  people: PeopleProfileItem[];
}

/**
 * Props provided by the ordering feature
 */
export type OrderingProps = {
  /** Selected sort order */
  sortBy: Signal<SortBy>;
  /** People grouped and sorted according to current settings */
  sortedGroupedPeople: Signal<SortedGroup[]>;
};

/** Any internal props */
type InternalProps = { [key: `_${string}`]: unknown };

/**
 * Internal state for ordering
 */
interface OrderingState {
  /** Selected sort order */
  _sortBy: SortBy | null;
  /** Selected grouping option */
  groupBy: GroupBy;
}

/** Grouping keys */
type GroupByKey = '' | 'current' | 'unknown' | 'skip' | RoleType | number;

/**
 * Initial state for ordering
 */
const initialOrderingState: OrderingState = {
  _sortBy: null,
  groupBy: null,
};

/**
 * Compares two team members by last name
 *
 * @param a First team member
 * @param b Second team member
 * @param order Comparison order (-1 for descending, 1 for ascending)
 * @returns Comparison result
 */
function compareByName(a: PeopleProfileItem, b: PeopleProfileItem, order: -1 | 1): number {
  const comparison = a.lastName.localeCompare(b.lastName);
  return order * comparison;
}

/**
 * Compares two team members by a numeric property
 *
 * @param a First team member
 * @param b Second team member
 * @param propertyMap Property map to compare by
 * @param order Comparison order (-1 for descending, 1 for ascending)
 * @returns Comparison result
 */
function compareByNumericProperty(
  a: PeopleProfileItem,
  b: PeopleProfileItem,
  propertyMap: Map<PeopleProfileItem, number | null>,
  order: -1 | 1,
): number {
  const propA = propertyMap.get(a) ?? null;
  const propB = propertyMap.get(b) ?? null;
  if (propA === null) {
    return propB === null ? 0 : -order;
  } else if (propB === null) {
    return order;
  }

  return order * (propA - propB);
}

/**
 * Order of groupBy keys for sorting.
 * Some keys should never appear at this point, but are included to ensure consistency. They are instead given high values (9999).
 * Also 'current' should only appear in combination with numeric years and is always placed before any year.
 */
const GROUP_BY_KEY_ORDER: Record<GroupByKey, number> = {
  '': 9999,
  collaborator: 5,
  current: -1,
  'master-student': 3,
  'phd-student': 2,
  skip: 9999,
  staff: 0,
  student: 4,
  unknown: 6,
};

/**
 * Compares two groupBy keys for sorting
 *
 * @param a First group key
 * @param b Second group key
 * @returns Comparison result
 */
function compareByGroupKey(a: GroupByKey, b: GroupByKey): number {
  if (typeof a === 'number' || typeof b === 'number') {
    if (typeof a === 'string') {
      return -1;
    } else if (typeof b === 'string') {
      return 1;
    }

    return b - a;
  }

  return GROUP_BY_KEY_ORDER[a] - GROUP_BY_KEY_ORDER[b];
}

/**
 * Creates a sorting function based on the selected sort option
 *
 * @param sortBy Selected sort option
 * @param store Store containing people properties
 * @returns A comparison function for sorting team members
 */
function createSortFn(sortBy: SortBy, store: PeopleProps): (a: PeopleProfileItem, b: PeopleProfileItem) => number {
  switch (sortBy) {
    case 'lastNameAsc':
      return (a, b) => compareByName(a, b, 1);
    case 'lastNameDesc':
      return (a, b) => compareByName(a, b, -1);

    case 'endYearNewest': {
      const endYearByPerson = store.endYearByPerson();
      return (a, b) => compareByNumericProperty(a, b, endYearByPerson, -1);
    }
    case 'startYearOldest': {
      const startYearByPerson = store.startYearByPerson();
      return (a, b) => compareByNumericProperty(a, b, startYearByPerson, 1);
    }

    default: {
      const displayOrderByPerson = store.displayOrderByPerson();
      return (a, b) => compareByNumericProperty(a, b, displayOrderByPerson, 1);
    }
  }
}

/**
 * Creates a function to derive groupBy keys for team members
 *
 * @param groupBy Selected grouping option
 * @param store Store containing people properties
 * @returns A function that derives group keys for team members
 */
function createGroupByKeyFn(
  groupBy: GroupBy,
  store: PeopleProps & PeopleMethods,
): (person: PeopleProfileItem) => GroupByKey {
  const rolesByPerson = store.rolesByPerson();
  const impl = createGroupByKeyImpl(groupBy, store);
  return (person) => {
    const roles = rolesByPerson.get(person);
    return roles && roles.length > 0 ? impl(roles[0]) : 'skip';
  };
}

/**
 * Creates implementation for deriving groupBy keys for a team member's role
 *
 * @param groupBy Selected grouping option
 * @param store Store containing people properties
 * @returns A function that derives group keys from a role
 */
function createGroupByKeyImpl(groupBy: GroupBy, store: PeopleProps & PeopleMethods): (role: Role) => GroupByKey {
  switch (groupBy) {
    case 'role':
      return (role) => store.getRoleType(role);
    case 'startYear':
      return (role) => role.dateStart.getFullYear();
    case 'endYear':
      return (role) => role.dateEnd?.getFullYear() ?? 'current';
    default:
      return () => 'unknown';
  }
}

/**
 * Labels for groupBy keys
 */
const GROUP_BY_KEY_LABELS: Record<GroupByKey, string> = {
  '': '',
  collaborator: 'Collaborators',
  current: 'Current',
  'master-student': 'Master Students',
  'phd-student': 'PhD Students',
  skip: '',
  staff: 'Staff',
  student: 'Students',
  unknown: 'Unknown',
};

/**
 * Converts a groupBy key to a human-readable label
 *
 * @param key Key to convert
 * @returns Human-readable label
 */
function groupKeyToLabel(key: GroupByKey): string {
  if (typeof key === 'number') {
    return key.toString();
  }
  return GROUP_BY_KEY_LABELS[key];
}

/**
 * Adds sorting and grouping capabilities for team members
 * Supports multiple sort orders and grouping by role, start year, or end year
 *
 * @returns Signal store feature
 */
export function withOrdering() {
  return signalStoreFeature(
    { state: type<{ team: TeamType }>(), props: type<FilterProps & PeopleProps>(), methods: type<PeopleMethods>() },
    withState<OrderingState>(initialOrderingState),
    withComputed((store) => {
      const sortBy = computed(() => {
        const _sortBy = store._sortBy();
        const team = store.team();
        if (!_sortBy) {
          return team === 'current' ? 'hierarchical' : 'endYearNewest';
        } else if (team === 'past' && _sortBy === 'hierarchical') {
          return 'endYearNewest';
        }

        return _sortBy;
      });

      const _sortFn = computed(() => createSortFn(sortBy(), store));
      const _sortedPeople = computed(() => {
        const people = store.filteredPeople();
        return [...people].sort(_sortFn());
      });

      const _groupByKeyFn = computed(() => createGroupByKeyFn(store.groupBy(), store));
      const _groupedPeople = computed(() => {
        const people = _sortedPeople();
        const groupBy = store.groupBy();
        if (!groupBy) {
          return new Map<GroupByKey, PeopleProfileItem[]>([['', people]]);
        }

        const groupByKeyFn = _groupByKeyFn();
        const groups = new Map<GroupByKey, PeopleProfileItem[]>();
        for (const person of people) {
          const groupKey = groupByKeyFn(person);
          if (groupKey === 'skip') {
            continue;
          }

          let group = groups.get(groupKey);
          if (!group) {
            group = [];
            groups.set(groupKey, group);
          }
          group.push(person);
        }

        return groups;
      });

      const sortedGroupedPeople = computed(() => {
        const groups = Array.from(_groupedPeople().entries());
        groups.sort((a, b) => compareByGroupKey(a[0], b[0]));
        return groups.map(([key, people]) => ({ label: groupKeyToLabel(key), people }));
      });

      return {
        sortBy,
        sortedGroupedPeople,
        _sortFn,
        _sortedPeople,
        _groupByKeyFn,
        _groupedPeople,
      } satisfies OrderingProps & InternalProps;
    }),
    withMethods((store) => ({
      setSortBy: signalMethod((sortBy: SortBy) => patchState(store, { _sortBy: sortBy })),
      setGroupBy: signalMethod((groupBy: GroupBy) => patchState(store, { groupBy })),
    })),
  );
}
