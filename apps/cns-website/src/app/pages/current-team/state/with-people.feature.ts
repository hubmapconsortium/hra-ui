import { computed, Signal } from '@angular/core';
import { patchState, signalMethod, signalStoreFeature, type, withComputed, withMethods } from '@ngrx/signals';
import { entityConfig, setEntities, withEntities } from '@ngrx/signals/entities';
import { PeopleProfileItem, Role } from '../../../schemas/people-profile/people-profile.schema';

export type RoleType = 'collaborator' | 'master-student' | 'phd-student' | 'staff' | 'student';

export type PeopleProps = {
  people: Signal<PeopleProfileItem[]>;
  rolesByPerson: Signal<Map<PeopleProfileItem, Set<RoleType>>>;
  startYearByPerson: Signal<Map<PeopleProfileItem, number>>;
  endYearByPerson: Signal<Map<PeopleProfileItem, number | null>>;
};

export type PeopleMethods = {
  setPeople(people: PeopleProfileItem[]): void;
  isActiveInYear(person: PeopleProfileItem, year: number): boolean;
  getMemberTitle(person: PeopleProfileItem): string;
};

const peopleConfig = entityConfig({
  collection: 'people',
  entity: type<PeopleProfileItem>(),
  selectId: (person) => person.slug,
});

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
