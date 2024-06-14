import { Route } from '@angular/router';
import { DashboardComponentOutletComponent } from '@hra-ui/dashboard';
import { dashboardCanActivate } from './shared/guards/dashboard.guard';
import { dashboardDataResolver } from './shared/resolvers/dashboard-data/dashboard-data.resolver';
import { yamlFileResolver } from './shared/resolvers/yaml-file/yaml-file.resolver';

/** Index spec file URL */
const INDEX_SPEC_URL = 'https://cdn.humanatlas.io/hra-dashboard-data/dashboards/index.yaml';

/** Application routes definition */
export const appRoutes: Route[] = [
  {
    path: '',
    component: DashboardComponentOutletComponent,
    resolve: {
      spec: yamlFileResolver(INDEX_SPEC_URL),
    },
  },
  {
    path: ':dashboard',
    component: DashboardComponentOutletComponent,
    canActivate: [dashboardCanActivate(INDEX_SPEC_URL)],
    resolve: {
      spec: dashboardDataResolver(INDEX_SPEC_URL),
    },
  },
  { path: '**', redirectTo: '' },
];
