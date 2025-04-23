import { Route } from '@angular/router';

import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { landingPageResolver } from './resolvers/landing-page/landing-page.resolver';
import { ReleaseNotesPageComponent } from './pages/release-notes-page/release-notes-page.component';

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
    component: ReleaseNotesPageComponent,
    // resolve: {
    //   publications: publicationsResolver,
    // },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
