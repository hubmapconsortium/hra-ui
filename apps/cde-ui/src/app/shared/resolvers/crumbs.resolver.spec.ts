import { ActivatedRouteSnapshot, convertToParamMap, RouterStateSnapshot } from '@angular/router';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';
import { createCrumbsResolver, CRUMBS_DATA_KEY, removeLastCrumbRoute, ROOT_CRUMBS } from './crumbs.resolver';

describe('CRUMBS_DATA_KEY', () => {
  it('should be a string', () => {
    expect(typeof CRUMBS_DATA_KEY).toBe('string');
  });

  it('should have value "crumbs"', () => {
    expect(CRUMBS_DATA_KEY).toBe('crumbs');
  });
});

describe('ROOT_CRUMBS', () => {
  it('should be an array of BreadcrumbItem', () => {
    expect(Array.isArray(ROOT_CRUMBS)).toBe(true);
    expect(ROOT_CRUMBS.length).toBeGreaterThan(0);
  });

  it('should have Apps as first item', () => {
    expect(ROOT_CRUMBS[0].name).toBe('Apps');
  });

  it('should have Cell Distance Explorer as second item', () => {
    expect(ROOT_CRUMBS[1].name).toBe('Cell Distance Explorer');
  });
});

describe('createCrumbsResolver', () => {
  const mockRouterState = { url: '/' } as unknown as RouterStateSnapshot;

  function createMockRoute(
    data: Record<string, unknown> = {},
    params: Record<string, string> = {},
    parent?: ActivatedRouteSnapshot,
  ): ActivatedRouteSnapshot {
    return {
      paramMap: convertToParamMap(params),
      data,
      parent,
    } as unknown as ActivatedRouteSnapshot;
  }

  describe('with no additional crumbs', () => {
    const parentCrumbs: BreadcrumbItem[] = [{ name: 'Parent', route: '/parent' }];
    const parentRoute = createMockRoute({ [CRUMBS_DATA_KEY]: parentCrumbs });

    it('should return root crumbs when no parent crumbs exist', () => {
      const route = createMockRoute();
      const resolver = createCrumbsResolver();
      const result = resolver(route, mockRouterState);

      expect(result).toEqual(ROOT_CRUMBS);
    });

    it('should return parent crumbs when they exist', () => {
      const resolver = createCrumbsResolver();
      const result = resolver(parentRoute, mockRouterState);

      expect(result).toEqual(parentCrumbs);
    });

    it('should walk parent routes to find crumbs', () => {
      const route = createMockRoute({}, {}, parentRoute);
      const resolver = createCrumbsResolver();
      const result = resolver(route, mockRouterState);

      expect(result).toEqual(parentCrumbs);
    });
  });

  describe('with static crumbs array', () => {
    const parentCrumbs: BreadcrumbItem[] = [{ name: 'Home', route: '/' }];
    const additionalCrumbs: BreadcrumbItem[] = [{ name: 'Studies', route: '/studies' }];

    it('should combine parent crumbs with additional crumbs', () => {
      const route = createMockRoute({ [CRUMBS_DATA_KEY]: parentCrumbs });
      const resolver = createCrumbsResolver(additionalCrumbs);
      const result = resolver(route, mockRouterState);

      expect(result).toEqual([...parentCrumbs, ...additionalCrumbs]);
    });

    it('should use root crumbs as default if no parent crumbs exist', () => {
      const route = createMockRoute();
      const resolver = createCrumbsResolver(additionalCrumbs);
      const result = resolver(route, mockRouterState);

      expect(result).toEqual([...ROOT_CRUMBS, ...additionalCrumbs]);
    });

    it('should handle empty additional crumbs array', () => {
      const route = createMockRoute();
      const resolver = createCrumbsResolver([]);
      const result = resolver(route, mockRouterState);

      expect(result).toEqual(ROOT_CRUMBS);
    });

    it('should handle multiple additional crumbs', () => {
      const additionalCrumbsMulti: BreadcrumbItem[] = [
        { name: 'Studies', route: '/studies' },
        { name: 'Study 1', route: '/studies/1' },
        { name: 'Visualizations', route: '/studies/1/viz' },
      ];
      const route = createMockRoute({ [CRUMBS_DATA_KEY]: parentCrumbs });
      const resolver = createCrumbsResolver(additionalCrumbsMulti);
      const result = resolver(route, mockRouterState);

      expect(result).toEqual([...parentCrumbs, ...additionalCrumbsMulti]);
    });
  });

  describe('with function-based crumbs', () => {
    it('should call the function with the route', () => {
      const crumbsFn = jest.fn(() => [{ name: 'Dynamic', route: '/dynamic' }]);
      const route = createMockRoute({}, { id: '123' });
      const resolver = createCrumbsResolver(crumbsFn);
      resolver(route, mockRouterState);

      expect(crumbsFn).toHaveBeenCalledWith(route);
    });

    it('should combine parent crumbs with function-generated crumbs', () => {
      const parentCrumbs: BreadcrumbItem[] = [{ name: 'Home', route: '/' }];
      const crumbsFn = () => [{ name: 'Dynamic Item', route: '/dynamic' }];
      const route = createMockRoute({ [CRUMBS_DATA_KEY]: parentCrumbs });
      const resolver = createCrumbsResolver(crumbsFn);
      const result = resolver(route, mockRouterState);

      expect(result).toEqual([...parentCrumbs, { name: 'Dynamic Item', route: '/dynamic' }]);
    });

    it('should handle function that returns empty array', () => {
      const parentCrumbs: BreadcrumbItem[] = [{ name: 'Home', route: '/' }];
      const crumbsFn = () => [];
      const route = createMockRoute({ [CRUMBS_DATA_KEY]: parentCrumbs });
      const resolver = createCrumbsResolver(crumbsFn);
      const result = resolver(route, mockRouterState);

      expect(result).toEqual(parentCrumbs);
    });

    it('should use route parameters in function', () => {
      const crumbsFn = (route: ActivatedRouteSnapshot) => [
        { name: `Item ${route.paramMap.get('id')}`, route: `/items/${route.paramMap.get('id')}` },
      ];
      const parentCrumbs: BreadcrumbItem[] = [{ name: 'Home', route: '/' }];
      const route = createMockRoute({ [CRUMBS_DATA_KEY]: parentCrumbs }, { id: '42' });
      const resolver = createCrumbsResolver(crumbsFn);
      const result = resolver(route, mockRouterState);

      expect(result).toEqual([
        { name: 'Home', route: '/' },
        { name: 'Item 42', route: '/items/42' },
      ]);
    });

    it('should handle function generating multiple crumbs', () => {
      const crumbsFn = () => [
        { name: 'Item 1', route: '/1' },
        { name: 'Item 2', route: '/2' },
      ];
      const route = createMockRoute();
      const resolver = createCrumbsResolver(crumbsFn);
      const result = resolver(route, mockRouterState);

      expect(result).toEqual([...ROOT_CRUMBS, { name: 'Item 1', route: '/1' }, { name: 'Item 2', route: '/2' }]);
    });
  });
});

describe('removeLastCrumbRoute', () => {
  const firstCrumb: BreadcrumbItem = { name: 'Home', route: '/' };
  const secondCrumb: BreadcrumbItem = { name: 'Current', route: '/current' };
  const singleCrumb: BreadcrumbItem[] = [firstCrumb];
  const twoCrumbs: BreadcrumbItem[] = [firstCrumb, { name: 'Studies', route: '/studies' }];
  const threeCrumbs: BreadcrumbItem[] = [
    firstCrumb,
    { name: 'Studies', route: '/studies' },
    { name: 'Study 1', route: '/studies/1' },
  ];
  const crumbsWithoutRoute: BreadcrumbItem[] = [firstCrumb, { name: 'Current' }];

  it('should return empty array for empty input', () => {
    const result = removeLastCrumbRoute([]);
    expect(result).toEqual([]);
  });

  it('should remove route from single crumb', () => {
    const result = removeLastCrumbRoute(singleCrumb);

    expect(result).toEqual([{ name: 'Home' }]);
  });

  it('should remove route from last crumb only', () => {
    const result = removeLastCrumbRoute(threeCrumbs);
    expect(result).toEqual([...threeCrumbs.slice(0, -1), { name: 'Study 1' }]);
  });

  it('should handle crumb without route property', () => {
    const result = removeLastCrumbRoute(crumbsWithoutRoute);
    expect(result).toEqual([firstCrumb, { name: 'Current' }]);
  });

  it('should not mutate original array', () => {
    const originalLength = twoCrumbs.length;
    removeLastCrumbRoute(twoCrumbs);

    expect(twoCrumbs.length).toBe(originalLength);
    expect(twoCrumbs[1].route).toBe('/studies');
  });

  it('should create new array instance', () => {
    const result = removeLastCrumbRoute(singleCrumb);
    expect(result).not.toBe(singleCrumb);
  });

  it('should preserve all crumbs except removing last route', () => {
    const crumbs = [firstCrumb, secondCrumb];
    const result = removeLastCrumbRoute(crumbs);

    expect(result[0]).toBe(firstCrumb);
    expect(result[1].name).toBe(secondCrumb.name);
    expect(result[1].route).toBeUndefined();
  });
});
