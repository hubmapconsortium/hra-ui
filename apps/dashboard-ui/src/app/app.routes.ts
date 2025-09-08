import { ActivatedRouteSnapshot, Route } from '@angular/router';
import { DashboardComponentOutletComponent } from '@hra-ui/dashboard';
import { dashboardCanActivate } from './shared/guards/dashboard.guard';
import { dashboardDataResolver } from './shared/resolvers/dashboard-data/dashboard-data.resolver';
import { yamlFileResolver } from './shared/resolvers/yaml-file/yaml-file.resolver';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';

/** Index spec file URL */
const INDEX_SPEC_URL = 'https://cdn.humanatlas.io/hra-dashboard-data/dashboards/index.yaml';

/** Base route breadcrumb item */
const BASE_ROUTE_CRUMB: BreadcrumbItem[] = [
  {
    name: 'Apps',
    route: 'https://apps.humanatlas.io',
  },
  {
    name: 'Dashboard',
    route: '/',
  },
];

/** Dashboard page specific breadcrumb items */
const DASHBOARD_PAGE_CRUMBS: Record<string, BreadcrumbItem> = {
  data: { name: 'Data' },
  usage: { name: 'Usage' },
  publications: { name: 'Publications' },
  'experimental-data': { name: 'Experimental Data' },
  'diversity-and-inclusion': { name: 'Diversity and Inclusion' },
};

/** Application routes definition */
export const appRoutes: Route[] = [
  {
    path: '',
    component: DashboardComponentOutletComponent,
    resolve: {
      spec: yamlFileResolver(INDEX_SPEC_URL),
    },
    data: {
      crumbs: [
        { name: 'Apps', route: 'https://apps.humanatlas.io' },
        {
          name: 'Dashboard',
        },
      ] satisfies BreadcrumbItem[],
    },
  },
  {
    path: ':dashboard',
    component: DashboardComponentOutletComponent,
    canActivate: [dashboardCanActivate(INDEX_SPEC_URL)],
    resolve: {
      spec: dashboardDataResolver(INDEX_SPEC_URL),
      crumbs: (route: ActivatedRouteSnapshot) => {
        const dashboard = route.params['dashboard'];
        const crumb = DASHBOARD_PAGE_CRUMBS[dashboard];
        if (crumb) {
          return [...BASE_ROUTE_CRUMB, crumb];
        }
        return undefined;
      },
    },
  },
  { path: '**', redirectTo: '/' },
];
