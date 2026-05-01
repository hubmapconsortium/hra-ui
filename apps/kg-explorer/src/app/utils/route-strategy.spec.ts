import { ActivatedRouteSnapshot, DetachedRouteHandle, Route } from '@angular/router';

import { CustomRouteReuseStrategy } from './route-strategy';

describe('CustomRouteReuseStrategy', () => {
  let strategy: CustomRouteReuseStrategy;

  beforeEach(() => {
    strategy = new CustomRouteReuseStrategy();
  });

  function createRoute(path?: string, data?: Record<string, unknown>, routeConfig?: Route): ActivatedRouteSnapshot {
    return {
      data,
      routeConfig: routeConfig ?? ({ path } as Route),
    } as unknown as ActivatedRouteSnapshot;
  }

  it('shouldDetach returns true when route data has reuse=true', () => {
    const route = createRoute('main', { reuse: true });

    expect(strategy.shouldDetach(route)).toBe(true);
  });

  it('shouldDetach returns false when route data has reuse=false or is undefined', () => {
    const nonReusableRoute = createRoute('main', { reuse: false });
    const missingDataRoute = createRoute('main');

    expect(strategy.shouldDetach(nonReusableRoute)).toBe(false);
    expect(strategy.shouldDetach(missingDataRoute)).toBe(false);
  });

  it('store caches route handle when handle is provided', () => {
    const route = createRoute('main');
    const handle = { componentRef: {} } as unknown as DetachedRouteHandle;

    strategy.store(route, handle);

    expect(strategy.shouldAttach(route)).toBe(true);
    expect(strategy.retrieve(route)).toBe(handle);
  });

  it('store does not cache route when handle is null', () => {
    const route = createRoute('main');

    strategy.store(route, null);

    expect(strategy.shouldAttach(route)).toBe(false);
    expect(strategy.retrieve(route)).toBeNull();
  });

  it('shouldAttach returns false and retrieve returns null when route was never cached', () => {
    const route = createRoute('missing');

    expect(strategy.shouldAttach(route)).toBe(false);
    expect(strategy.retrieve(route)).toBeNull();
  });

  it('shouldReuseRoute returns true when future and current routeConfig are the same reference', () => {
    const sharedConfig = { path: 'main' } as Route;
    const future = createRoute(undefined, undefined, sharedConfig);
    const current = createRoute(undefined, undefined, sharedConfig);

    expect(strategy.shouldReuseRoute(future, current)).toBe(true);
  });

  it('shouldReuseRoute returns false when future and current routeConfig differ', () => {
    const future = createRoute(undefined, undefined, { path: 'main' } as Route);
    const current = createRoute(undefined, undefined, { path: 'details' } as Route);

    expect(strategy.shouldReuseRoute(future, current)).toBe(false);
  });
});
