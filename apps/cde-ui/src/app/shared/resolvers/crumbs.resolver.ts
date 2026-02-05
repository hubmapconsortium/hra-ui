import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';
import { getOptionalRouteData } from '../utils/route-properties';

export const CRUMBS_DATA_KEY = 'crumbs';

export const ROOT_CRUMBS: BreadcrumbItem[] = [
  { name: 'Apps', route: 'https://apps.humanatlas.io' },
  { name: 'Cell Distance Explorer', route: '/' },
];

export function createCrumbsResolver(
  crumbs?: BreadcrumbItem[] | ((route: ActivatedRouteSnapshot) => BreadcrumbItem[]),
): ResolveFn<BreadcrumbItem[]> {
  return (route) => {
    const parentCrumbs = getOptionalRouteData<BreadcrumbItem[]>(route, CRUMBS_DATA_KEY, ROOT_CRUMBS, true);
    const additionalCrumbs = typeof crumbs === 'function' ? crumbs(route) : (crumbs ?? []);
    return [...parentCrumbs, ...additionalCrumbs];
  };
}

export function removeLastCrumbRoute(crumbs: BreadcrumbItem[]): BreadcrumbItem[] {
  if (crumbs.length === 0) {
    return crumbs;
  }

  return [...crumbs.slice(0, -1), { name: crumbs[crumbs.length - 1].name }];
}
