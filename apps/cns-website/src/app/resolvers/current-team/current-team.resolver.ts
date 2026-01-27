import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { map } from 'rxjs';
import { PeopleData, PeopleDataSchema } from '../../schemas/people.schema';

/** Base URL for CNS website people index */
const CNS_PEOPLE_INDEX_URL = 'https://cns-iu.github.io/cns-website/assets/indexes/app-people.json';

/**
 * Resolver that fetches all team members data from GitHub
 *
 * @returns A resolver function that fetches and validates team members data
 */
export const currentTeamResolver: ResolveFn<PeopleData> = () => {
  const http = inject(HttpClient);

  return http.get(CNS_PEOPLE_INDEX_URL).pipe(map((data) => PeopleDataSchema.parse(data)));
};
