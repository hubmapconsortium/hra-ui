import { ActivatedRouteSnapshot, convertToParamMap } from '@angular/router';
import { NotFoundError } from './not-found-error';
import { getOptionalRouteData, getRequiredRouteData, getRequiredRouteParam } from './route-properties';

function createMockSnapshot(
  params: Record<string, string> = {},
  data: Record<string, unknown> = {},
  parent?: ActivatedRouteSnapshot,
): ActivatedRouteSnapshot {
  return {
    paramMap: convertToParamMap(params),
    data,
    parent,
  } as unknown as ActivatedRouteSnapshot;
}

describe('route-properties', () => {
  const grandparentRoute = createMockSnapshot(
    { grandparentId: '789' },
    { title: 'Grandparent Title', level: 'grandparent' },
  );

  const parentRoute = createMockSnapshot(
    { parentId: '456' },
    { title: 'Parent Title', level: 'parent' },
    grandparentRoute,
  );

  const route = createMockSnapshot(
    { id: '123', resourceId: 'abc' },
    { title: 'Child Title', level: 'child', config: { nested: true } },
    parentRoute,
  );

  describe('getRequiredRouteParam', () => {
    it('should return a route parameter when it exists', () => {
      const result = getRequiredRouteParam(route, 'id');
      expect(result).toBe('123');
    });

    it('should throw NotFoundError when parameter is not found', () => {
      expect(() => getRequiredRouteParam(route, 'nonexistent')).toThrow(NotFoundError);
      expect(() => getRequiredRouteParam(route, 'nonexistent')).toThrow(
        'Required route property not found: param nonexistent',
      );
    });

    it('should walk parent routes when walkParents is true', () => {
      const result = getRequiredRouteParam(route, 'parentId', true);
      expect(result).toBe('456');
    });

    it('should not walk parent routes when walkParents is false (default)', () => {
      expect(() => getRequiredRouteParam(route, 'parentId', false)).toThrow(NotFoundError);
    });

    it('should prefer current route parameter over parent route parameter', () => {
      const parentRouteWithId = createMockSnapshot({ id: '456' }, { title: 'Parent Title' }, grandparentRoute);
      const childRouteWithId = createMockSnapshot({ id: '123' }, { title: 'Child Title' }, parentRouteWithId);
      const result = getRequiredRouteParam(childRouteWithId, 'id', true);

      expect(result).toBe('123');
    });

    it('should walk multiple parent levels when searching for route param', () => {
      const result = getRequiredRouteParam(route, 'grandparentId', true);
      expect(result).toBe('789');
    });
  });

  describe('getRequiredRouteData', () => {
    it('should return route data when it exists', () => {
      const result = getRequiredRouteData<string>(route, 'title');
      expect(result).toBe('Child Title');
    });

    it('should return complex data types', () => {
      const result = getRequiredRouteData(route, 'config');
      expect(result).toEqual({ nested: true });
    });

    it('should throw NotFoundError when data property is not found', () => {
      expect(() => getRequiredRouteData<string>(route, 'nonexistent')).toThrow(NotFoundError);
      expect(() => getRequiredRouteData<string>(route, 'nonexistent')).toThrow(
        'Required route property not found: data nonexistent',
      );
    });

    it('should walk parent routes when walkParents is true', () => {
      const result = getRequiredRouteData<string>(route, 'level', true);
      expect(result).toBe('child');
    });

    it('should not walk parent routes when walkParents is false (default)', () => {
      const routeWithoutLevel = createMockSnapshot({ id: '123' }, {}, parentRoute);

      expect(() => getRequiredRouteData<string>(routeWithoutLevel, 'level', false)).toThrow(NotFoundError);
    });

    it('should prefer current route data over parent route data', () => {
      const result = getRequiredRouteData<string>(route, 'title', true);
      expect(result).toBe('Child Title');
    });

    it('should walk multiple parent levels when searching for route data', () => {
      const result = getRequiredRouteData<string>(route, 'level', true);
      expect(result).toBe('child');
    });

    it('should handle undefined and null as not found', () => {
      const routeWithNullData = createMockSnapshot({}, { title: undefined, value: null });

      expect(() => getRequiredRouteData<string>(routeWithNullData, 'title')).toThrow(NotFoundError);
      expect(() => getRequiredRouteData<string>(routeWithNullData, 'value')).toThrow(NotFoundError);
    });

    it('should handle falsy values that are not undefined/null', () => {
      const routeWithFalsyValues = createMockSnapshot({}, { count: 0, flag: false, text: '' });

      expect(getRequiredRouteData<number>(routeWithFalsyValues, 'count')).toBe(0);
      expect(getRequiredRouteData<boolean>(routeWithFalsyValues, 'flag')).toBe(false);
      expect(getRequiredRouteData<string>(routeWithFalsyValues, 'text')).toBe('');
    });
  });

  describe('getOptionalRouteData', () => {
    it('should return route data when it exists', () => {
      const result = getOptionalRouteData(route, 'title', 'Default Title');
      expect(result).toBe('Child Title');
    });

    it('should return default value when data property is not found', () => {
      const routeWithoutTitle = createMockSnapshot({}, { level: 'child' });
      const result = getOptionalRouteData(routeWithoutTitle, 'title', 'Default Title');

      expect(result).toBe('Default Title');
    });

    it('should return default value when data is undefined', () => {
      const routeWithUndefined = createMockSnapshot({}, { title: undefined });
      const result = getOptionalRouteData(routeWithUndefined, 'title', 'Default Title');

      expect(result).toBe('Default Title');
    });

    it('should return default value when data is null', () => {
      const routeWithNull = createMockSnapshot({}, { title: null });
      const result = getOptionalRouteData(routeWithNull, 'title', 'Default Title');

      expect(result).toBe('Default Title');
    });

    it('should return falsy non-null/undefined values', () => {
      const routeWithFalsyValues = createMockSnapshot({}, { count: 0, flag: false, text: '' });

      expect(getOptionalRouteData(routeWithFalsyValues, 'count', 42)).toBe(0);
      expect(getOptionalRouteData(routeWithFalsyValues, 'flag', true)).toBe(false);
      expect(getOptionalRouteData(routeWithFalsyValues, 'text', 'default')).toBe('');
    });

    it('should walk parent routes when walkParents is true', () => {
      const childRoute = createMockSnapshot({}, {}, parentRoute);
      const result = getOptionalRouteData(childRoute, 'level', 'Default', true);

      expect(result).toBe('parent');
    });

    it('should not walk parent routes when walkParents is false (default)', () => {
      const childRoute = createMockSnapshot({}, {}, parentRoute);
      const result = getOptionalRouteData(childRoute, 'level', 'Default', false);

      expect(result).toBe('Default');
    });

    it('should prefer current route data over parent route data', () => {
      const result = getOptionalRouteData(route, 'title', 'Default Title', true);
      expect(result).toBe('Child Title');
    });

    it('should handle complex default values', () => {
      const defaultConfig = { id: 0, name: 'default' };
      const routeWithoutConfig = createMockSnapshot({}, { level: 'test' });
      const result = getOptionalRouteData(routeWithoutConfig, 'config', defaultConfig);

      expect(result).toEqual(defaultConfig);
    });
  });
});
