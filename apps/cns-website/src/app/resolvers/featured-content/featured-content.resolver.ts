import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { FeaturedContentData, FeaturedContentDataSchema } from '../../schemas/featured-content/featured-content.schema';

/** URL for the featured content JSON data */
const FEATURED_CONTENT_URL = 'https://cns-iu.github.io/cns-website/assets/indexes/app-featured.json';

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
 * Creates a resolver that fetches featured content data from the external JSON source
 *
 * @param url Optional custom URL for the featured content data
 * @returns A resolver function that fetches and validates featured content data
 */
export function createFeaturedContentResolver(url: string = FEATURED_CONTENT_URL): ResolveFn<FeaturedContentData> {
  return () => {
    const http = inject(HttpClient);
    const router = inject(Router);

    return http.get<unknown>(url).pipe(
      map((data) => FeaturedContentDataSchema.parse(data)),
      catchError((error: unknown) => {
        const is404 = error instanceof HttpErrorResponse && error.status === 404;
        return of(createErrorRedirectCommand(router, is404 ? '/404' : '/500'));
      }),
    );
  };
}
