import { ProviderToken, inject } from '@angular/core';
import { CanActivateFn, MaybeAsync, NavigationExtras, Router } from '@angular/router';
import { map } from 'rxjs';
import { dashboardUrlResolver } from '../resolvers/dashboard-data/dashboard-data.resolver';
import { maybeAsyncToObservable } from '../utils/maybe-async-to-observable';

export function dashboardCanActivate(
  indexUrl: string | ProviderToken<MaybeAsync<string>>,
  routeParamKey?: string,
  commands: unknown[] = ['/'],
  navigationExtras?: NavigationExtras,
): CanActivateFn {
  const urlResolver = dashboardUrlResolver(indexUrl, routeParamKey);

  return (route, state) => {
    const router = inject(Router);
    const url$ = maybeAsyncToObservable(urlResolver(route, state));
    return url$.pipe(map((url) => (url ? true : router.createUrlTree(commands, navigationExtras))));
  };
}
