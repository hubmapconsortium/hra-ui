import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

/** Custom route strategy to prevent reloading of pages when navigating back to them */
export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private cache = new Map<string, DetachedRouteHandle>();

  /** Determines if the route should be cached. */
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return route.data?.['reuse'] ?? false;
  }

  /** Stores the detached route for future reuse. */
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
    if (handle) {
      this.cache.set(route.routeConfig?.path as string, handle);
    }
  }

  /** Checks if a cached route can be reattached. */
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return this.cache.has(route.routeConfig?.path as string);
  }

  /** Retrieves a cached route for reuse. */
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return this.cache.get(route.routeConfig?.path as string) || null;
  }

  /** Defines if the current route can be reused without destruction. */
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}
