import { Route } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page.component';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageComponent,
  },
];
