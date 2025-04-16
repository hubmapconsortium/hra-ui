import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { resolveInfo } from './info.resolver';

/**
 * Creates a resolver that fetches predictions based on navigation data
 * @param predictorRoute - Route to redirect to if data is undefined.
 * @param getPredictions - Function that returns predictions based on provided data.
 * @returns A resolver function that emits predictions or redirects.
 */
export function createPredictionsResolver<T, R>(
  predictorRoute: string,
  getPredictions: (data: T) => Observable<R | undefined>,
): ResolveFn<R> {
  return () => {
    const data = resolveInfo<T>();
    if (data === undefined) {
      const path = inject(Router).parseUrl(predictorRoute);
      return new RedirectCommand(path, {
        replaceUrl: true,
      });
    }

    const predictions = getPredictions(data);
    return predictions.pipe(filter((result) => result !== undefined));
  };
}
