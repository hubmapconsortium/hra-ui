import { Injector, ProviderToken, inject, runInInjectionContext } from '@angular/core';
import { MaybeAsync, ResolveFn } from '@angular/router';
import { DashboardComponentAnySpec, DashboardComponentSpecFor, DashboardIndexComponent } from '@hra-ui/dashboard';
import { map, switchAll } from 'rxjs';
import { maybeAsyncToObservable } from '../../utils/maybe-async-to-observable';
import { yamlFileResolver } from '../yaml-file/yaml-file.resolver';

type IndexSpec = DashboardComponentSpecFor<typeof DashboardIndexComponent>;

/** Dashboard URL resolver */
export function dashboardUrlResolver(
  indexUrl: string | ProviderToken<MaybeAsync<string>>,
  routeParamKey = 'dashboard',
): ResolveFn<string | undefined> {
  const indexResolver = yamlFileResolver<IndexSpec>(indexUrl, { cache: true });

  return (route, state) => {
    const routeName = route.paramMap.get(routeParamKey) ?? '';
    const index$ = maybeAsyncToObservable(indexResolver(route, state));
    return index$.pipe(
      map((spec) => (spec as IndexSpec).items),
      map((items) => items.find((item) => item.route === routeName)),
      map((item) => item?.url),
    );
  };
}

/** Dashboard data resolver */
export function dashboardDataResolver(
  indexUrl: string | ProviderToken<MaybeAsync<string>>,
  routeParamKey?: string,
): ResolveFn<DashboardComponentAnySpec> {
  const urlResolver = dashboardUrlResolver(indexUrl, routeParamKey);

  return (route, state) => {
    const injector = inject(Injector);
    const url$ = maybeAsyncToObservable(urlResolver(route, state));
    return url$.pipe(
      map((url) => yamlFileResolver<DashboardComponentAnySpec>(url as string, { cache: true })),
      map((resolver) => runInInjectionContext(injector, () => resolver(route, state))),
      map((result) => maybeAsyncToObservable(result)),
      switchAll(),
    );
  };
}
