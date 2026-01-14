import { computed, Signal } from '@angular/core';
import { patchState, signalMethod, signalStoreFeature, type, withComputed, withMethods } from '@ngrx/signals';
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
  /** Map of people to their role types */
  rolesByPerson: Signal<Map<PeopleProfileItem, Set<RoleType>>>;
  /** Map of people to their start year */
  startYearByPerson: Signal<Map<PeopleProfileItem, number>>;
  /** Map of people to their end year (null if currently active) */
  endYearByPerson: Signal<Map<PeopleProfileItem, number | null>>;
};

/**
 * Methods provided by the people feature
 */
export type PeopleMethods = {
  /** Set the list of people */
  setPeople(people: PeopleProfileItem[]): void;
  /** Check if a person was active in a given year */
  isActiveInYear(person: PeopleProfileItem, year: number): boolean;
  /** Get the display title for a team member */
  getMemberTitle(person: PeopleProfileItem): string;
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
 * Convert a role to its normalized role type
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
 * Adds people data, role mappings, and query methods
 * @returns Signal store feature
 */
export function withPeople() {
  return signalStoreFeature(
    withEntities(peopleConfig),
    withComputed(({ peopleEntities }) => ({
      people: computed(() => peopleEntities().filter((person) => person.roles.length > 0)),
      rolesByPerson: computed(() => {
        const people = peopleEntities();
        const rolesByPerson = new Map<PeopleProfileItem, Set<RoleType>>();
        for (const person of people) {
          const roles = person.roles.map(roleToType);
          rolesByPerson.set(person, new Set(roles));
        }

        return rolesByPerson;
      }),
      startYearByPerson: computed(() => {
        const people = peopleEntities();
        const startYearByPerson = new Map<PeopleProfileItem, number>();
        for (const person of people) {
          const years = person.roles.map((role) => role.dateStart.getFullYear());
          startYearByPerson.set(person, Math.max(...years));
        }
        return startYearByPerson;
      }),
      endYearByPerson: computed(() => {
        const people = peopleEntities();
        const endYearByPerson = new Map<PeopleProfileItem, number | null>();
        for (const person of people) {
          const years = person.roles.map((role) => role.dateEnd?.getFullYear() ?? null);
          const hasOngoing = years.some((year) => year === null);
          endYearByPerson.set(person, hasOngoing ? null : Math.max(...(years as number[])));
        }
        return endYearByPerson;
      }),
    })),
    withMethods((store) => ({
      setPeople: signalMethod((people: PeopleProfileItem[]) => patchState(store, setEntities(people, peopleConfig))),
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
      getMemberTitle: (person: PeopleProfileItem) => {
        const role = person.roles[0];
        if (!role) {
          return '';
        }

        switch (role.type) {
          case 'member':
            return role.title || '';
          case 'student':
            return `${role.degree} Student - ${role.topic}`;
          case 'collaborator':
            return `Collaborator - ${role.project}`;
          default:
            return '';
        }
      },
    })),
  );
}
