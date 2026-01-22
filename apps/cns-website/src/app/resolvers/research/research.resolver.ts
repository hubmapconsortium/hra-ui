import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import * as z from 'zod';
import ResearchPageDataSchema, {
  PeopleResearchDataSchema,
  PeopleResearchItem,
  PublicationTypes,
  PublicationTypesSchema,
  ResearchPageData,
} from '../../schemas/research/research.schema';

const PUBLICATIONS_INDEX_URL = 'https://cns-iu.github.io/cns-website/assets/indexes/app-publications.json';
const NEWS_INDEX_URL = 'https://cns-iu.github.io/cns-website/assets/indexes/app-news.json';
const PEOPLE_INDEX_URL = 'https://cns-iu.github.io/cns-website/assets/indexes/app-people.json';
const PUBLICATION_TYPES_INDEX_URL = 'https://cns-iu.github.io/cns-website/assets/indexes/app-publication-types.json';

function createErrorRedirectCommand(router: Router, type: '404' | '500'): RedirectCommand {
  const path = router.parseUrl(`/${type}`);
  return new RedirectCommand(path, {
    skipLocationChange: true,
    replaceUrl: false,
  });
}

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

export function createPublicationsDataResolver(): ResolveFn<ResearchPageData> {
  return createZodValidatedDataResolver(PUBLICATIONS_INDEX_URL, ResearchPageDataSchema);
}

export function createNewsDataResolver(): ResolveFn<ResearchPageData> {
  return createZodValidatedDataResolver(NEWS_INDEX_URL, ResearchPageDataSchema);
}

export function createResearchDataResolver(): ResolveFn<ResearchPageData> {
  return (route, state) => {
    const publications = createPublicationsDataResolver()(route, state) as Observable<
      ResearchPageData | RedirectCommand
    >;
    const news = createNewsDataResolver()(route, state) as Observable<ResearchPageData | RedirectCommand>;
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

export function createPeopleResolver(): ResolveFn<PeopleResearchItem[]> {
  return createZodValidatedDataResolver(PEOPLE_INDEX_URL, PeopleResearchDataSchema);
}

export function createPublicationTypesResolver(): ResolveFn<PublicationTypes> {
  return createZodValidatedDataResolver(PUBLICATION_TYPES_INDEX_URL, PublicationTypesSchema);
}
