import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import * as z from 'zod';
import { PeopleData, PeopleDataSchema } from '../../schemas/people.schema';
import { PublicationTypesData, PublicationTypesDataSchema } from '../../schemas/publication-types.schema';
import { ResearchData, ResearchDataSchema } from '../../schemas/research.schema';

/** Endpoint for publications data */
const PUBLICATIONS_INDEX_URL = 'https://cns-iu.github.io/cns-website/assets/indexes/app-publications.json';
/** Endpoint for news data */
const NEWS_INDEX_URL = 'https://cns-iu.github.io/cns-website/assets/indexes/app-news.json';
/** Endpoint for people data */
const PEOPLE_INDEX_URL = 'https://cns-iu.github.io/cns-website/assets/indexes/app-people.json';
/** Endpoint for publication types data */
const PUBLICATION_TYPES_INDEX_URL = 'https://cns-iu.github.io/cns-website/assets/indexes/app-publication-types.json';

/** Builds a redirect command for error pages.
 * @param router Router instance for URL parsing
 * @param type Error route ('404' or '500')
 */
function createErrorRedirectCommand(router: Router, type: '404' | '500'): RedirectCommand {
  const path = router.parseUrl(`/${type}`);
  return new RedirectCommand(path, {
    skipLocationChange: true,
    replaceUrl: false,
  });
}

/** Creates a resolver that fetches and Zod-validates JSON data.
 * @param url Source endpoint
 * @param schema Zod schema for validation
 */
function createZodValidatedDataResolver<T extends z.ZodType>(url: string, schema: T): ResolveFn<z.infer<T>> {
  return () => {
    const router = inject(Router);
    const http = inject(HttpClient);

    return http.get(url, { responseType: 'json' }).pipe(
      map((data) => schema.parse(data)),
      catchError((error) => {
        const is404 = error instanceof HttpErrorResponse && error.status === 404;
        return of(createErrorRedirectCommand(router, is404 ? '404' : '500'));
      }),
    );
  };
}

/** Resolver for publications research data */
export function createPublicationsDataResolver(): ResolveFn<ResearchData> {
  return createZodValidatedDataResolver(PUBLICATIONS_INDEX_URL, ResearchDataSchema);
}

/** Resolver for news research data */
export function createNewsDataResolver(): ResolveFn<ResearchData> {
  return createZodValidatedDataResolver(NEWS_INDEX_URL, ResearchDataSchema);
}

/** Resolver combining news and publications data */
export function createResearchDataResolver(): ResolveFn<ResearchData> {
  return (route, state) => {
    const publications = createPublicationsDataResolver()(route, state) as Observable<ResearchData | RedirectCommand>;
    const news = createNewsDataResolver()(route, state) as Observable<ResearchData | RedirectCommand>;
    return forkJoin({ publications, news }).pipe(
      map((data) => {
        if (data.news instanceof RedirectCommand) {
          return data.news;
        } else if (data.publications instanceof RedirectCommand) {
          return data.publications;
        }

        return [...data.news, ...data.publications];
      }),
    );
  };
}

/** Resolver for people research data */
export function createPeopleResolver(): ResolveFn<PeopleData> {
  return createZodValidatedDataResolver(PEOPLE_INDEX_URL, PeopleDataSchema);
}

/** Resolver for publication type definitions */
export function createPublicationTypesResolver(): ResolveFn<PublicationTypesData> {
  return createZodValidatedDataResolver(PUBLICATION_TYPES_INDEX_URL, PublicationTypesDataSchema);
}
