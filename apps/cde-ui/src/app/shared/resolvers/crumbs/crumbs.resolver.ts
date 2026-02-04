import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';

const ROOT_CRUMBS: BreadcrumbItem[] = [
  { name: 'Apps', route: 'https://apps.humanatlas.io' },
  { name: 'Cell Distance Explorer', route: '/' },
];

export function createCrumbsResolver(
  additionalCrumbs?: BreadcrumbItem[] | ((route: ActivatedRouteSnapshot) => BreadcrumbItem[]),
): ResolveFn<BreadcrumbItem[]> {
  return (route) => {
    const resolvedAdditionalCrumbs =
      typeof additionalCrumbs === 'function' ? additionalCrumbs(route) : (additionalCrumbs ?? []);
    return [...getParentCrumbs(route), ...resolvedAdditionalCrumbs];
  };
}

function getParentCrumbs(route: ActivatedRouteSnapshot): BreadcrumbItem[] {
  let currentRoute: ActivatedRouteSnapshot | null = route.parent;
  while (currentRoute) {
    const { data } = currentRoute;
    if (data['crumbs']) {
      return data['crumbs'] as BreadcrumbItem[];
    }

    currentRoute = currentRoute.parent;
  }

  return ROOT_CRUMBS;
}
