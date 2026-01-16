import { computed, Signal } from '@angular/core';
import {
  patchState,
  SignalMethod,
  signalMethod,
  signalStoreFeature,
  type,
  withComputed,
  withMethods,
} from '@ngrx/signals';
import { entityConfig, setEntities, withEntities } from '@ngrx/signals/entities';
import { PeopleProfileItem, Role } from '../../../schemas/people-profile/people-profile.schema';

/**
 * Normalized role types for team members
 */
export type RoleType = 'collaborator' | 'master-student' | 'phd-student' | 'staff' | 'student';

/**
 * Props provided by the people feature
 */
export type PeopleProps = {
  /** List of all people */
  people: Signal<PeopleProfileItem[]>;
  /** Total number of people */
  numPeople: Signal<number>;
  /** Map of people to their roles (sorted by most recent role) */
  rolesByPerson: Signal<Map<PeopleProfileItem, Role[]>>;
  /** Map of people to their start year */
  startYearByPerson: Signal<Map<PeopleProfileItem, number>>;
  /** Map of people to their end year (null if currently active) */
  endYearByPerson: Signal<Map<PeopleProfileItem, number | null>>;
  /** Map of people to their display order */
  displayOrderByPerson: Signal<Map<PeopleProfileItem, number>>;
};

/**
 * Methods provided by the people feature
 */
export type PeopleMethods = {
  /** Get the normalized role type for a given role */
  getRoleType(role: Role): RoleType;
  /** Get the display title for a team member */
  getMemberTitle(person: PeopleProfileItem): string;
  /** Check if a person was active in a given year */
  isActiveInYear(person: PeopleProfileItem, year: number): boolean;
  /** Set the list of people */
  setPeople: SignalMethod<PeopleProfileItem[]>;
};

/**
 * Entity configuration for people
 */
const peopleConfig = entityConfig({
  collection: 'people',
  entity: type<PeopleProfileItem>(),
  selectId: (person) => person.slug,
});

/**
 * Creates a map of people to a derived property from their roles
 *
 * @param people List of people
 * @param getProperty Function to extract the desired property from a role
 * @param reducer Function to reduce the list of properties to a single value
 * @returns Map of people to the derived property
 */
function createRolesPropertyMap<T, R>(
  people: PeopleProfileItem[],
  getProperty: (role: Role) => T,
  reducer: (values: T[]) => R,
): Map<PeopleProfileItem, R> {
  const result = new Map<PeopleProfileItem, R>();
  for (const person of people) {
    const values = person.roles.map(getProperty);
    result.set(person, reducer(values));
  }
  return result;
}

/**
 * Sorts roles by end date in descending order (most recent first)
 *
 * @param a First role
 * @param b Second role
 * @returns Comparison result
 */
function sortRoleByDateDesc(a: Role, b: Role): number {
  const aEnd = a.dateEnd?.getTime();
  const bEnd = b.dateEnd?.getTime();
  if (aEnd === undefined) {
    return aEnd === bEnd ? 0 : -1;
  } else if (bEnd === undefined) {
    return 1;
  }

  return bEnd - aEnd;
}

/**
 * Adds people data, role mappings, and query methods
 *
 * @returns Signal store feature
 */
export function withPeople() {
  return signalStoreFeature(
    withEntities(peopleConfig),
    withComputed(({ peopleEntities }) => {
      const people = computed(() => peopleEntities().filter((person) => person.roles.length > 0));
      const numPeople = computed(() => people().length);

      const rolesByPerson = computed(() =>
        createRolesPropertyMap(
          people(),
          (role) => role,
          (roles) => roles.sort(sortRoleByDateDesc),
        ),
      );

      const displayOrderByPerson = computed(() =>
        createRolesPropertyMap(
          people(),
          (role) => (role.type === 'member' && typeof role.displayOrder === 'number' ? role.displayOrder : 99999),
          (orders) => Math.min(...orders),
        ),
      );

      const startYearByPerson = computed(() =>
        createRolesPropertyMap(
          people(),
          (role) => role.dateStart.getFullYear(),
          (years) => Math.max(...years),
        ),
      );

      const endYearByPerson = computed(() =>
        createRolesPropertyMap(
          people(),
          (role) => role.dateEnd?.getFullYear() ?? null,
          (years) => {
            if (years.some((year) => year === null)) {
              return null;
            }
            return Math.max(...(years as number[]));
          },
        ),
      );

      return {
        people,
        numPeople,
        rolesByPerson,
        displayOrderByPerson,
        startYearByPerson,
        endYearByPerson,
      } satisfies PeopleProps;
    }),
    withMethods((store) => ({
      getMemberTitle: (person: PeopleProfileItem) => {
        const rolesByPerson = store.rolesByPerson();
        const role = rolesByPerson.get(person)?.[0];
        switch (role?.type) {
          case 'collaborator':
            return `Collaborator - ${role.project}`;
          case 'member':
            return role.title || '';
          case 'student':
            return `${role.degree} Student - ${role.topic}`;
          default:
            return '';
        }
      },
      getRoleType: (role: Role): RoleType => {
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
      },
      isActiveInYear: (person: PeopleProfileItem, year: number) => {
        for (const role of person.roles) {
          const startYear = role.dateStart.getFullYear();
          const endYear = role.dateEnd ? role.dateEnd.getFullYear() : null;
          if (year >= startYear && (endYear === null || year <= endYear)) {
            return true;
          }
        }

        return false;
      },
      setPeople: signalMethod((people: PeopleProfileItem[]) => patchState(store, setEntities(people, peopleConfig))),
    })),
  );
}
