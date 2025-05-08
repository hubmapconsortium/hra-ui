import { Route } from '@angular/router';

import { AboutPageComponent } from './pages/about-page/about-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { AboutPageResolver } from './resolvers/about-page/about-page.resolver';
import { landingPageResolver } from './resolvers/landing-page/landing-page.resolver';

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
    path: 'about',
    component: AboutPageComponent,
    resolve: {
      data: AboutPageResolver,
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
