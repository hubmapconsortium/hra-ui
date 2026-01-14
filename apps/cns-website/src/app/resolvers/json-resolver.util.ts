import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import * as z from 'zod';
import { catchError, map, of } from 'rxjs';

/**
 * Creates a generic JSON resolver that fetches data from a URL and validates it with a Zod schema
 *
 * @param url The URL to fetch data from
 * @param schema The Zod schema to validate the response
 * @returns A resolver function that fetches and validates the data
 */
export function createJsonResolver<T>(url: string, schema: z.ZodType<T>): ResolveFn<T> {
  return () => {
    const http = inject(HttpClient);
    const router = inject(Router);

    return http.get<unknown>(url).pipe(
      map((data) => schema.parse(data)),
      catchError((error: unknown) => {
        const is404 = error instanceof HttpErrorResponse && error.status === 404;
        const redirectUrl = is404 ? '/404' : '/500';
        const path = router.parseUrl(redirectUrl);
        return of(new RedirectCommand(path, { skipLocationChange: true, replaceUrl: false }));
      }),
    );
  };
}
