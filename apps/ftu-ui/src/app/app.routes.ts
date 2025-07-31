import { Route } from '@angular/router';
import { FtuComponent } from './pages/ftu-page/ftu.component';
import { ftuResolver } from './pages/ftu-page/ftu.resolver';
import { LandingComponent } from './pages/landing-page/landing.component';

/**
 * Application routes definition
 */
export const ROUTES: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingComponent,
    data: {
      isLanding: true,
    },
  },
  {
    path: 'ftu',
    component: FtuComponent,
    data: {
      name: 'ftu',
      id: 'https://purl.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle',
    },
    resolve: {
      id: ftuResolver,
    },
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
