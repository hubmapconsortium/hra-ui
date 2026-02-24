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
import { PeopleItem } from '../../../schemas/people.schema';
import { AnyRole } from '../../../schemas/roles.schema';
import { FilterProps, TeamType } from './with-filters.feature';
import { PeopleMethods, PeopleProps, RoleType } from './with-people.feature';

/**
 * Sort options for team members
 */
export enum SortBy {
  Hierarchical = 'hierarchical',
  LastNameAsc = 'lastNameAsc',
  LastNameDesc = 'lastNameDesc',
  EndYearNewest = 'endYearNewest',
  StartYearOldest = 'startYearOldest',
}

/**
 * Group by options for team members
 */
export enum GroupBy {
  Role = 'role',
  StartYear = 'startYear',
  EndYear = 'endYear',
}

/**
 * Group of people with a label
 */
export interface SortedGroup {
  /** The group label */
  label: string;
  /** Team members in this group */
  people: PeopleItem[];
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
  groupBy: GroupBy | null;
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
function compareByName(a: PeopleItem, b: PeopleItem, order: -1 | 1): number {
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
  a: PeopleItem,
  b: PeopleItem,
  propertyMap: Map<PeopleItem, number | null>,
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
  current: -1,
  skip: 9999,
  unknown: 6,
  [RoleType.Collaborator]: 5,
  [RoleType.MasterStudent]: 3,
  [RoleType.PhDStudent]: 2,
  [RoleType.Staff]: 0,
  [RoleType.Student]: 4,
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
function createSortFn(sortBy: SortBy, store: PeopleProps): (a: PeopleItem, b: PeopleItem) => number {
  switch (sortBy) {
    case SortBy.LastNameAsc:
      return (a, b) => compareByName(a, b, 1);
    case SortBy.LastNameDesc:
      return (a, b) => compareByName(a, b, -1);

    case SortBy.EndYearNewest: {
      const endYearByPerson = store.endYearByPerson();
      return (a, b) => compareByNumericProperty(a, b, endYearByPerson, -1);
    }
    case SortBy.StartYearOldest: {
      const startYearByPerson = store.startYearByPerson();
      return (a, b) => compareByNumericProperty(a, b, startYearByPerson, 1);
    }

    default: {
      const displayOrderByPerson = store.displayOrderByPerson();
      return (a, b) => {
        const byOrder = compareByNumericProperty(a, b, displayOrderByPerson, 1);
        return byOrder !== 0 ? byOrder : compareByName(a, b, 1);
      };
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
  groupBy: GroupBy | null,
  store: PeopleProps & PeopleMethods,
): (person: PeopleItem) => GroupByKey {
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
function createGroupByKeyImpl(
  groupBy: GroupBy | null,
  store: PeopleProps & PeopleMethods,
): (role: AnyRole) => GroupByKey {
  switch (groupBy) {
    case GroupBy.Role:
      return (role) => store.getRoleType(role);
    case GroupBy.StartYear:
      return (role) => role.dateStart.getFullYear();
    case GroupBy.EndYear:
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
  current: 'Current',
  skip: '',
  unknown: 'Unknown',
  [RoleType.Collaborator]: 'Collaborators',
  [RoleType.MasterStudent]: 'Master Students',
  [RoleType.PhDStudent]: 'PhD Students',
  [RoleType.Staff]: 'Staff',
  [RoleType.Student]: 'Students',
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
          return team === 'current' ? SortBy.Hierarchical : SortBy.EndYearNewest;
        } else if (team === 'past' && _sortBy === SortBy.Hierarchical) {
          return SortBy.EndYearNewest;
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
          return new Map<GroupByKey, PeopleItem[]>([['', people]]);
        }

        const groupByKeyFn = _groupByKeyFn();
        const groups = new Map<GroupByKey, PeopleItem[]>();
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
        if (store.groupBy() === GroupBy.StartYear) {
          groups.reverse();
        }
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
      setSortBy: signalMethod((sortBy: SortBy | null) => patchState(store, { _sortBy: sortBy })),
      setGroupBy: signalMethod((groupBy: GroupBy | null) => patchState(store, { groupBy })),
    })),
  );
}
