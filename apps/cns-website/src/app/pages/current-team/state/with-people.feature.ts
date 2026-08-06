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
import { PeopleItem } from '../../../schemas/people.schema';
import { AnyRole } from '../../../schemas/roles.schema';
import {
  formatTenureDateRanges,
  hasProfileDetails as rolesHaveProfileDetails,
  isCurrentRole,
  isRoleActiveInYear,
} from '../../../utils/person-roles';

/**
 * Props provided by the people feature
 */
export type PeopleProps = {
  /** List of all people */
  people: Signal<PeopleItem[]>;
  /** Total number of people */
  numPeople: Signal<number>;
  /** Map of people to their roles (sorted by most recent role) */
  rolesByPerson: Signal<Map<PeopleItem, AnyRole[]>>;
  /** Map of people to their start year */
  startYearByPerson: Signal<Map<PeopleItem, number>>;
  /** Map of people to their end year (null if currently active) */
  endYearByPerson: Signal<Map<PeopleItem, number | null>>;
  /** Map of people to their display order */
  displayOrderByPerson: Signal<Map<PeopleItem, number>>;
  /** Map of people to whether their profile contains meaningful additional details */
  profileDetailsByPerson: Signal<Map<PeopleItem, boolean>>;
  /** Map of people to their formatted continuous CNS tenure streaks */
  tenureDateRangesByPerson: Signal<Map<PeopleItem, string[]>>;
};

/**
 * Methods provided by the people feature
 */
export type PeopleMethods = {
  /** Get the display title for a team member */
  getMemberTitle(person: PeopleItem): string;
  /** Check whether a team member's profile contains details beyond their card and email */
  hasProfileDetails(person: PeopleItem): boolean;
  /** Get continuous CNS tenure streaks for a team member, newest first */
  getTenureDateRanges(person: PeopleItem): string[];
  /** Get the searchable text for a team member */
  getSearchableText(person: PeopleItem): string;
  /** Check if a person was active in a given year */
  isActiveInYear(person: PeopleItem, year: number): boolean;
  /** Set the list of people */
  setPeople: SignalMethod<PeopleItem[]>;
};

/**
 * Entity configuration for people
 */
const peopleConfig = entityConfig({
  collection: 'people',
  entity: type<PeopleItem>(),
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
  people: PeopleItem[],
  getProperty: (role: AnyRole) => T,
  reducer: (values: T[]) => R,
): Map<PeopleItem, R> {
  const result = new Map<PeopleItem, R>();
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
function sortRoleByDateDesc(a: AnyRole, b: AnyRole): number {
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
          (role) => (isCurrentRole(role) ? null : role.dateEnd?.getFullYear()),
          (years) => {
            if (years.some((year) => year === null)) {
              return null;
            }
            const validYears = years.filter((year) => typeof year === 'number');
            return validYears.length === 0 ? Infinity : Math.max(...validYears);
          },
        ),
      );

      const profileDetailsByPerson = computed(
        () =>
          new Map([...rolesByPerson().entries()].map(([person, roles]) => [person, rolesHaveProfileDetails(roles)])),
      );

      const tenureDateRangesByPerson = computed(
        () => new Map([...rolesByPerson().entries()].map(([person, roles]) => [person, formatTenureDateRanges(roles)])),
      );

      return {
        people,
        numPeople,
        rolesByPerson,
        displayOrderByPerson,
        startYearByPerson,
        endYearByPerson,
        profileDetailsByPerson,
        tenureDateRangesByPerson,
      } satisfies PeopleProps;
    }),
    withMethods((store) => {
      const getMemberTitle = (person: PeopleItem) => {
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
      };

      const hasProfileDetails = (person: PeopleItem): boolean => {
        return store.profileDetailsByPerson().get(person) ?? false;
      };

      const getTenureDateRanges = (person: PeopleItem): string[] => {
        return store.tenureDateRangesByPerson().get(person) ?? [];
      };

      const getSearchableText = (person: PeopleItem): string => {
        const parts = [person.name, getMemberTitle(person)];
        return parts
          .join('\t')
          .toLocaleLowerCase()
          .trim()
          .normalize('NFD')
          .replace(/\p{Diacritic}/gu, '')
          .replace(/\s{2,}/, ' ');
      };

      const isActiveInYear = (person: PeopleItem, year: number): boolean => {
        return person.roles.some((role) => isRoleActiveInYear(role, year));
      };

      const setPeople = signalMethod((people: PeopleItem[]) => patchState(store, setEntities(people, peopleConfig)));

      return {
        getMemberTitle,
        hasProfileDetails,
        getTenureDateRanges,
        getSearchableText,
        isActiveInYear,
        setPeople,
      } satisfies PeopleMethods;
    }),
  );
}
