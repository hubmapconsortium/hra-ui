import { Route } from '@angular/router';
import { ContentPageComponent } from './pages/content-page/content-page.component';
import { ContentPageDataSchema } from './pages/content-page/types/content-page.schema';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { PublicationsPageComponent } from './pages/publications-page/publications-page.component';
import { PublicationsPageDataSchema } from './pages/publications-page/publications-page.schema';
import { ReleaseNotesPageComponent } from './pages/release-notes-page/release-notes-page.component';
import { landingPageResolver } from './resolvers/landing-page/landing-page.resolver';
import { releaseVersionResolver } from './resolvers/release-notes-page/release-version.resolver';
import { createJsonSpecResolver } from './resolvers/spec.resolver';
import { createYamlSpecResolver } from './resolvers/yaml-spec/yaml-spec.resolver';

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
    path: 'release-notes',
    redirectTo: 'release-notes/v2.3',
  },
  {
    path: 'publications',
    component: PublicationsPageComponent,
    resolve: {
      publications: createJsonSpecResolver('https://cns.iu.edu/publications.json?sort=hra', PublicationsPageDataSchema),
    },
  },
  {
    path: '3d-reference-library',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/3d-reference-library-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'standard-operating-procedures',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver(
        'assets/content/standard-operating-procedures-page/data.yaml',
        ContentPageDataSchema,
      ),
    },
  },
  {
    path: 'vccf',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/vccf-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'training',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/training-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
