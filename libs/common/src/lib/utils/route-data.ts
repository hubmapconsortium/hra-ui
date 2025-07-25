import { assertInInjectionContext, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Data, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

/**
 * Fetches the custom data from the current route.
 * @returns Signal containing data from the current route.
 */
export function routeData(): Signal<Data> {
  assertInInjectionContext(routeData);

  const router = inject(Router);
  const data$ = router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map(() => extractData(router)),
  );

  return toSignal(data$, { initialValue: {} });
}

/**
 * Extracts the data from route using the router instance.
 * @param router Router instance.
 * @returns Data from the current route.
 */
function extractData(router: Router): Data {
  const snapshot = router.routerState.snapshot;
  let route = snapshot.root;
  while (route.firstChild) {
    route = route.firstChild;
  }

  return route.data;
}
