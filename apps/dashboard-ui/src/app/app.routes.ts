import { Route } from '@angular/router';
import { DashboardComponentOutletComponent } from '@hra-ui/dashboard';
import { LandingComponent } from './pages/landing/landing.component';
import { dashboardCanActivate } from './shared/guards/dashboard.guard';
import { dashboardDataResolver } from './shared/resolvers/dashboard-data/dashboard-data.resolver';
import { yamlFileResolver } from './shared/resolvers/yaml-file/yaml-file.resolver';

const INDEX_SPEC_URL = 'https://cdn.humanatlas.io/hra-dashboard-data/dashboards/index.yaml';

export const appRoutes: Route[] = [
  // TODO remove the landing component & routes
  { path: 'hra-landing', component: LandingComponent },
  {
    path: 'home',
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
  { path: '**', component: LandingComponent },
];
