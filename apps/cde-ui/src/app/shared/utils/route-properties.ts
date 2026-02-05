import { ActivatedRouteSnapshot } from '@angular/router';
import { NotFoundError } from './not-found-error';

function getRouteProperty<T>(
  route: ActivatedRouteSnapshot,
  walkParents: boolean,
  name: string,
  defaultValue: T | undefined,
  accessor: (route: ActivatedRouteSnapshot) => T | null | undefined,
): T {
  let currentRoute: ActivatedRouteSnapshot | null = route;
  while (currentRoute) {
    const value = accessor(currentRoute);
    if (value !== null && value !== undefined) {
      return value;
    }
    currentRoute = walkParents ? currentRoute.parent : null;
  }

  if (defaultValue !== undefined) {
    return defaultValue;
  }

  throw new NotFoundError(`Required route property not found: ${name}`);
}

export function getRequiredRouteParam(route: ActivatedRouteSnapshot, paramName: string, walkParents = false): string {
  return getRouteProperty(route, walkParents, `param ${paramName}`, undefined, (r) => r.paramMap.get(paramName));
}

export function getRequiredRouteData<T>(route: ActivatedRouteSnapshot, dataKey: string, walkParents = false): T {
  return getRouteProperty<T>(route, walkParents, `data ${dataKey}`, undefined, (r) => r.data[dataKey]);
}

export function getOptionalRouteData<T>(
  route: ActivatedRouteSnapshot,
  dataKey: string,
  defaultValue: T,
  walkParents = false,
): T {
  return getRouteProperty<T>(route, walkParents, `data ${dataKey}`, defaultValue, (r) => r.data[dataKey]);
}
