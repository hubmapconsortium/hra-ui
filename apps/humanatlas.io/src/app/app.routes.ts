import { Route } from '@angular/router';

import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { PublicationsPageComponent } from './pages/publications-page/publications-page.component';

/** Application routes */
export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageComponent,
  },
  {
    path: 'publications',
    component: PublicationsPageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
