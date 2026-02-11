import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';
import { getOptionalRouteData } from '../utils/route-properties';

/** Crumbs data key */
export const CRUMBS_DATA_KEY = 'crumbs';

/** Root crumbs */
export const ROOT_CRUMBS: BreadcrumbItem[] = [
  { name: 'Apps', route: 'https://apps.humanatlas.io' },
  { name: 'Cell Distance Explorer', route: '/' },
];

/**
 * Creates a resolver function for breadcrumb items
 * @param crumbs Additional crumbs or a function to generate them based on the route
 * @returns Resolver function for breadcrumb items
 */
export function createCrumbsResolver(
  crumbs?: BreadcrumbItem[] | ((route: ActivatedRouteSnapshot) => BreadcrumbItem[]),
): ResolveFn<BreadcrumbItem[]> {
  return (route) => {
    const parentCrumbs = getOptionalRouteData<BreadcrumbItem[]>(route, CRUMBS_DATA_KEY, ROOT_CRUMBS, true);
    const additionalCrumbs = typeof crumbs === 'function' ? crumbs(route) : (crumbs ?? []);
    return [...parentCrumbs, ...additionalCrumbs];
  };
}

/**
 * Removes the route from the last breadcrumb item
 * @param crumbs Breadcrumb items
 * @returns Breadcrumb items with the last item's route removed
 */
export function removeLastCrumbRoute(crumbs: BreadcrumbItem[]): BreadcrumbItem[] {
  if (crumbs.length === 0) {
    return crumbs;
  }

  return [...crumbs.slice(0, -1), { name: crumbs[crumbs.length - 1].name }];
}
