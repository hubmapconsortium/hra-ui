import { Route } from '@angular/router';

import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { PublicationsPageComponent } from './pages/publications-page/publications-page.component';
import { landingPageResolver } from './resolvers/landing-page/landing-page.resolver';
import { publicationsResolver } from './resolvers/publications-page/publications-page-resolver';

/** Application routes */
export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageComponent,
    resolve: {
      data: landingPageResolver,
    },
  },
  {
    path: 'publications',
    component: PublicationsPageComponent,
    resolve: {
      publications: publicationsResolver,
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
