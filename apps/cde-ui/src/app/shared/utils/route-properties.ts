import { ActivatedRouteSnapshot } from '@angular/router';
import { NotFoundError } from './not-found-error';

/**
 * Gets a property from the route or its parents
 * @param route Activated route snapshot
 * @param walkParents Whether to walk up the parent routes
 * @param name Name of the property for error messages
 * @param defaultValue Default value if the property is not found
 * @param accessor Function to access the property from a route
 * @returns The property value
 * @throws NotFoundError if the property is not found and no default value is provided
 */
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

/**
 * Gets a required route parameter
 * @param route Activated route snapshot
 * @param paramName Name of the route parameter
 * @param walkParents Whether to walk up the parent routes
 * @returns The route parameter value
 * @throws NotFoundError if the parameter is not found
 */
export function getRequiredRouteParam(route: ActivatedRouteSnapshot, paramName: string, walkParents = false): string {
  return getRouteProperty(route, walkParents, `param ${paramName}`, undefined, (r) => r.paramMap.get(paramName));
}

/**
 * Gets a required route data property
 * @param route Activated route snapshot
 * @param dataKey Name of the route data property
 * @param walkParents Whether to walk up the parent routes
 * @returns The route data property value
 * @throws NotFoundError if the data property is not found
 */
export function getRequiredRouteData<T>(route: ActivatedRouteSnapshot, dataKey: string, walkParents = false): T {
  return getRouteProperty<T>(route, walkParents, `data ${dataKey}`, undefined, (r) => r.data[dataKey]);
}

/**
 * Gets an optional route data property
 * @param route Activated route snapshot
 * @param dataKey Name of the route data property
 * @param defaultValue Default value if the data property is not found
 * @param walkParents Whether to walk up the parent routes
 * @returns The route data property value or the default value
 */
export function getOptionalRouteData<T>(
  route: ActivatedRouteSnapshot,
  dataKey: string,
  defaultValue: T,
  walkParents = false,
): T {
  return getRouteProperty<T>(route, walkParents, `data ${dataKey}`, defaultValue, (r) => r.data[dataKey]);
}
