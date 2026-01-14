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
import { FilterProps } from './with-filters.feature';
import { PeopleProps, RoleType } from './with-people.feature';

/**
 * Convert a role to its role type
 * @param role - The role to convert
 * @returns The normalized role type
 */
function roleToType(role: Role): RoleType {
  switch (role.type) {
    case 'collaborator':
      return 'collaborator';
    case 'student':
      if (role.degree === 'Ph.D.') {
        return 'phd-student';
      } else if (role.degree === 'Masters') {
        return 'master-student';
      }
      return 'student';
    case 'member':
      return 'staff';
  }
}

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
export interface GroupedPeople {
  /** The group label */
  label: string;
  /** Team members in this group */
  members: PeopleProfileItem[];
}

/**
 * Props provided by the ordering feature
 */
export type OrderingProps = {
  /** People grouped and sorted according to current settings */
  groupedPeople: Signal<GroupedPeople[]>;
};

/**
 * Internal state for ordering
 */
interface OrderingState {
  /** Selected sort order */
  sortBy: SortBy;
  /** Selected grouping option */
  groupBy: GroupBy;
}

/**
 * Initial state for ordering
 */
const initialOrderingState: OrderingState = {
  sortBy: 'hierarchical',
  groupBy: null,
};

/**
 * Get display label for a role type
 * @param roleType - The role type
 * @returns Human-readable label
 */
function getRoleTypeLabel(roleType: RoleType): string {
  switch (roleType) {
    case 'collaborator':
      return 'Collaborators';
    case 'master-student':
      return 'Master Students';
    case 'phd-student':
      return 'PhD Students';
    case 'staff':
      return 'Staff';
    case 'student':
      return 'Students';
  }
}

/**
 * Adds sorting and grouping capabilities for team members
 * Supports multiple sort orders and grouping by role, start year, or end year
 * @returns Signal store feature
 */
export function withOrdering() {
  return signalStoreFeature(
    { props: type<FilterProps & PeopleProps>() },
    withState<OrderingState>(initialOrderingState),
    withComputed((store) => ({
      _sortedPeople: computed(() => {
        const people = store.filteredPeople();
        const sortBy = store.sortBy();
        const startYearByPerson = store.startYearByPerson();
        const endYearByPerson = store.endYearByPerson();

        return [...people].sort((a, b) => {
          switch (sortBy) {
            case 'lastNameAsc':
              return a.lastName.localeCompare(b.lastName);
            case 'lastNameDesc':
              return b.lastName.localeCompare(a.lastName);
            case 'endYearNewest': {
              const endYearA = endYearByPerson.get(a) ?? Date.now();
              const endYearB = endYearByPerson.get(b) ?? Date.now();
              return endYearB - endYearA;
            }
            case 'startYearOldest': {
              const startYearA = startYearByPerson.get(a) ?? 0;
              const startYearB = startYearByPerson.get(b) ?? 0;
              return startYearA - startYearB;
            }
            case 'hierarchical':
            default: {
              const roleA = a.roles[0];
              const roleB = b.roles[0];
              const orderA = roleA?.type === 'member' && roleA.displayOrder != null ? roleA.displayOrder : 999;
              const orderB = roleB?.type === 'member' && roleB.displayOrder != null ? roleB.displayOrder : 999;
              return orderA - orderB;
            }
          }
        });
      }),
    })),
    withComputed((store) => ({
      groupedPeople: computed(() => {
        const people = store._sortedPeople();
        const groupBy = store.groupBy();

        if (!groupBy) {
          return [{ label: '', members: people }];
        }

        const groups = new Map<string, PeopleProfileItem[]>();
        const startYearByPerson = store.startYearByPerson();
        const endYearByPerson = store.endYearByPerson();

        people.forEach((person) => {
          let groupKey: string;

          switch (groupBy) {
            case 'role': {
              // Use the primary role (first role) for grouping
              const primaryRole = person.roles[0];
              if (!primaryRole) {
                groupKey = 'Unknown';
              } else {
                const roleType = roleToType(primaryRole);
                groupKey = getRoleTypeLabel(roleType);
              }
              break;
            }
            case 'startYear': {
              const startYear = startYearByPerson.get(person);
              groupKey = startYear ? startYear.toString() : 'Unknown';
              break;
            }
            case 'endYear': {
              const endYear = endYearByPerson.get(person);
              groupKey = endYear ? endYear.toString() : 'Current';
              break;
            }
            default:
              groupKey = 'Unknown';
          }

          if (!groups.has(groupKey)) {
            groups.set(groupKey, []);
          }
          const groupMembers = groups.get(groupKey);
          if (groupMembers) {
            groupMembers.push(person);
          }
        });

        return Array.from(groups.entries())
          .map(([label, members]) => ({ label, members }))
          .sort((a, b) => {
            if (groupBy === 'startYear' || groupBy === 'endYear') {
              if (a.label === 'Unknown' || a.label === 'Current') {
                return 1;
              }
              if (b.label === 'Unknown' || b.label === 'Current') {
                return -1;
              }
              return parseInt(b.label) - parseInt(a.label);
            }
            return a.label.localeCompare(b.label);
          });
      }),
    })),
    withMethods((store) => ({
      setSortBy: signalMethod((sortBy: SortBy) => patchState(store, { sortBy })),
      setGroupBy: signalMethod((groupBy: GroupBy) => patchState(store, { groupBy })),
    })),
  );
}
