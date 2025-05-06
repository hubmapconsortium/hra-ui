import { Route } from '@angular/router';

import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ReleaseNotesPageComponent } from './pages/release-notes-page/release-notes-page.component';
import { landingPageResolver } from './resolvers/landing-page/landing-page.resolver';
import { releaseVersionResolver } from './resolvers/release-notes-page/release-version.resolver';

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
    path: 'release-notes/:version',
    component: ReleaseNotesPageComponent,
    resolve: {
      versions: releaseVersionResolver,
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
