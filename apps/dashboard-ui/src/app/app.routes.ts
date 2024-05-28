import { Route } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { DashboardOutletComponent } from '@hra-ui/dashboard';

export const appRoutes: Route[] = [
  { path: 'hra-landing', component: LandingComponent },
  {
    path: 'test',
    component: DashboardOutletComponent,
    data: {
      spec: {
        type: 'MetricsContainer',
      },
    },
  },
  { path: '**', component: LandingComponent },
];
