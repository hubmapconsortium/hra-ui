import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { map } from 'rxjs';
import { PeopleProfileData, PeopleProfileDataSchema } from '../../schemas/people-profile/people-profile.schema';

/** Base URL for CNS website people index */
const CNS_PEOPLE_INDEX_URL = 'https://cns-iu.github.io/cns-website/assets/indexes/app-people.json';

/**
 * Resolver that fetches all team members data from GitHub
 *
 * @returns A resolver function that fetches and validates team members data
 */
export const currentTeamResolver: ResolveFn<PeopleProfileData> = () => {
  const http = inject(HttpClient);

  return http.get<PeopleProfileData>(CNS_PEOPLE_INDEX_URL).pipe(map((data) => PeopleProfileDataSchema.parse(data)));
};
