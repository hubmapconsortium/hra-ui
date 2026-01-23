import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RedirectCommand, ResolveFn, Router } from '@angular/router';
import { load } from 'js-yaml';
import { catchError, map, of } from 'rxjs';
import { PeopleItem, PeopleItemSchema } from '../../schemas/people.schema';

/** Base URL for CNS website content */
const CNS_CONTENT_BASE_URL = 'https://raw.githubusercontent.com/cns-iu/cns-website/refs/heads/gh-pages/content/people';

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
 * Creates a resolver that fetches people profile data from external YAML source
 *
 * @param baseUrl Base URL for person content
 * @returns A resolver function that fetches and validates person data
 */
export function createPeopleProfileResolver(baseUrl: string = CNS_CONTENT_BASE_URL): ResolveFn<PeopleItem> {
  return (route: ActivatedRouteSnapshot) => {
    const http = inject(HttpClient);
    const router = inject(Router);
    const slug = route.paramMap.get('slug');

    if (!slug) {
      return createErrorRedirectCommand(router, '/404');
    }

    const url = `${baseUrl}/${slug}/data.yaml`;

    return http.get(url, { responseType: 'text' }).pipe(
      map((data) => load(data, { filename: url }) as unknown),
      map((data) => {
        const parsed = PeopleItemSchema.parse({ ...(data as object), slug });
        return {
          ...parsed,
          image: parsed.image ? `${baseUrl}/${slug}/${parsed.image}` : parsed.image,
        };
      }),
      catchError((error: unknown) => {
        const is404 = error instanceof HttpErrorResponse && error.status === 404;
        return of(createErrorRedirectCommand(router, is404 ? '/404' : '/500'));
      }),
    );
  };
}
