import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RedirectCommand, ResolveFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import {
  PeopleProfileData,
  PeopleProfileItem,
  PeopleProfileItemSchema,
} from '../../schemas/people-profile/people-profile.schema';

/** Base URL for CNS website people index */
const CNS_PEOPLE_INDEX_URL = 'https://cns-iu.github.io/cns-website/assets/indexes/app-people.json';

/**
 * Creates a redirect command for error handling that preserves navigation history
 *
 * @param router Angular router instance
 * @param url Target URL to redirect to (e.g., '/404' or '/500')
 * @returns RedirectCommand configured to skip location change and preserve history
 */
function createErrorRedirectCommand(router: Router, url: string): RedirectCommand {
  const path = router.parseUrl(url);
  return new RedirectCommand(path, {
    skipLocationChange: true,
    replaceUrl: false,
  });
}

/**
 * Creates a resolver that fetches people profile data from people index JSON
 *
 * @param indexUrl URL of the people index JSON file
 * @returns A resolver function that fetches and validates person data
 */
export function createPeopleProfileResolver(indexUrl: string = CNS_PEOPLE_INDEX_URL): ResolveFn<PeopleProfileItem> {
  return (route: ActivatedRouteSnapshot) => {
    const http = inject(HttpClient);
    const router = inject(Router);
    const slug = route.paramMap.get('slug');

    if (!slug) {
      return createErrorRedirectCommand(router, '/404');
    }

    return http.get<PeopleProfileData>(indexUrl).pipe(
      map((people) => {
        // Find the person with matching slug
        const person = people.find((p) => p.slug === slug);

        if (!person) {
          throw new Error('Person not found');
        }

        // Validate and return the person data
        return PeopleProfileItemSchema.parse(person);
      }),
      catchError((error: unknown) => {
        const is404 = error instanceof HttpErrorResponse && error.status === 404;
        const isPersonNotFound = error instanceof Error && error.message === 'Person not found';
        return of(createErrorRedirectCommand(router, is404 || isPersonNotFound ? '/404' : '/500'));
      }),
    );
  };
}
