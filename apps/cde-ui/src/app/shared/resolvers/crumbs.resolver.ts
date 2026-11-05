import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';
import { getOptionalRouteData } from '../utils/route-properties';

/** Crumbs data key. Child routes build their crumbs on their parent's. */
export const CRUMBS_DATA_KEY = 'crumbs';

/** Breadcrumbs data key. Pages that show breadcrumbs take them as an input with this name. */
export const BREADCRUMBS_DATA_KEY = 'breadcrumbs';

/** Root crumbs */
export const ROOT_CRUMBS: BreadcrumbItem[] = [
  { name: 'Home', route: 'https://humanatlas.io', icon: 'home' },
  { name: 'Apps', route: 'https://apps.humanatlas.io' },
  { name: 'Cell Distance Explorer', route: '/' },
];

/** Additional crumbs, or a function that generates them from the route */
type AdditionalCrumbs = BreadcrumbItem[] | ((route: ActivatedRouteSnapshot) => BreadcrumbItem[]);

/**
 * Gets a route's crumbs: its parent's crumbs (or the root crumbs) followed by the additional crumbs
 * @param route Activated route snapshot
 * @param crumbs Additional crumbs or a function to generate them based on the route
 * @returns Breadcrumb items for the route
 */
function getCrumbs(route: ActivatedRouteSnapshot, crumbs?: AdditionalCrumbs): BreadcrumbItem[] {
  const parentCrumbs = getOptionalRouteData<BreadcrumbItem[]>(route, CRUMBS_DATA_KEY, ROOT_CRUMBS, true);
  const additionalCrumbs = typeof crumbs === 'function' ? crumbs(route) : (crumbs ?? []);
  return [...parentCrumbs, ...additionalCrumbs];
}

/**
 * Creates a resolver function for breadcrumb items
 * @param crumbs Additional crumbs or a function to generate them based on the route
 * @returns Resolver function for breadcrumb items
 */
export function createCrumbsResolver(crumbs?: AdditionalCrumbs): ResolveFn<BreadcrumbItem[]> {
  return (route) => getCrumbs(route, crumbs);
}

/**
 * Creates a resolver function for the breadcrumbs a page shows, which end with the page itself, unlinked
 * @param crumbs Additional crumbs or a function to generate them based on the route
 * @returns Resolver function for the page's breadcrumbs
 */
export function createBreadcrumbsResolver(crumbs?: AdditionalCrumbs): ResolveFn<BreadcrumbItem[]> {
  return (route) => removeLastCrumbRoute(getCrumbs(route, crumbs));
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
