import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { CdeVisualizationElementProps, Metadata } from '@hra-ui/cde-visualization';
import { getRequiredRouteData, getRequiredRouteParam } from '../utils/route-properties';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';
import { NotFoundError } from '../utils/not-found-error';

/** Examples data key */
export const EXAMPLES_DATA_KEY = 'examples';
/** Example index route parameter */
export const EXAMPLE_INDEX_PARAM = 'index';

/**
 * Gets the example breadcrumbs from the route
 * @param route Activated route snapshot
 * @returns Breadcrumb items for the example
 */
export function getExampleCrumbs(route: ActivatedRouteSnapshot): BreadcrumbItem[] {
  const index = getRequiredRouteParam(route, EXAMPLE_INDEX_PARAM);
  const data = getExampleData(route);
  const name = (data['metadata'] as Metadata).sourceFileName ?? `Example ${index}`;
  return [{ name, route: `/example/${index}` }];
}

/**
 * Creates a resolver for example visualization data
 * @returns Resolver function for example visualization data
 */
export function createExampleResolver(): ResolveFn<Partial<CdeVisualizationElementProps>> {
  return (route) => normalizeData(getExampleData(route));
}

/**
 * Gets the example data from the route
 * @param route Activated route snapshot
 * @returns Example data
 */
function getExampleData(route: ActivatedRouteSnapshot): Record<string, unknown> {
  const index = getRequiredRouteParam(route, EXAMPLE_INDEX_PARAM);
  const examples = getRequiredRouteData<Record<string, unknown>[]>(route, EXAMPLES_DATA_KEY, true);
  const example = examples[Number(index)];
  if (!example) {
    throw new NotFoundError(`Example ${index} not found`);
  }

  return example;
}

/**
 * Formats string as camel case
 * @param value Raw string
 * @returns Formatted string
 */
function kebabCaseToCamelCase(value: string): string {
  return value.replace(/-(\w)/gi, (_, char: string) => char.toUpperCase());
}

/**
 * Normalizes data keys to camel case
 * @param data Input data
 * @returns Formatted data
 */
function normalizeData(data: Record<string, unknown>): Partial<CdeVisualizationElementProps> {
  const result: Partial<CdeVisualizationElementProps> = {};
  for (const key in data) {
    const newKey = kebabCaseToCamelCase(key);
    result[newKey as never] = data[key] as never;
  }

  return result;
}
