import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { FeaturedContentData, FeaturedContentDataSchema } from '../../schemas/featured-content/featured-content.schema';

const FEATURED_CONTENT_URL = 'https://cns-iu.github.io/cns-website/assets/indexes/app-featured.json';

function createErrorRedirectCommand(router: Router, url: string): RedirectCommand {
  const path = router.parseUrl(url);
  return new RedirectCommand(path, {
    skipLocationChange: true,
    replaceUrl: false,
  });
}

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
