import { Route } from '@angular/router';

import { ContentPageComponent } from './pages/content-page/content-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { PublicationsPageComponent } from './pages/publications-page/publications-page.component';
import { createReleaseNotesContentResolver } from './resolvers/release-notes-content.resolver';
import { createJsonSpecResolver, createYamlSpecResolver } from './resolvers/spec.resolver';
import { ContentPageDataSchema } from './schemas/content-page/content-page.schema';
import { LandingPageDataSchema } from './schemas/landing-page/landing-page.schema';
import { PublicationsPageDataSchema } from './schemas/publications-page/publications-page.schema';
import { ReleaseNotesVersionsSchema } from './schemas/release-notes-version/release-notes-version.schema';

/** Application routes */
export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/landing-page/data.yaml', LandingPageDataSchema),
    },
  },
  {
    path: 'release-notes/:version',
    component: ContentPageComponent,
    resolve: {
      versions: createYamlSpecResolver('assets/content/release-notes-page/versions.yaml', ReleaseNotesVersionsSchema),
      data: createReleaseNotesContentResolver('assets/content/release-notes-page/'),
    },
  },
  {
    path: 'release-notes',
    // Preferably this would redirect to the latest version based on the versions data
    // But it is not available at this point. Async redirectTo may become available in angular 20
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
    path: 'about',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/about-page/data.yaml', ContentPageDataSchema),
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
    path: 'api',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/api-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'millitome',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/millitome/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'cell-type-annotations',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/cell-type-annotations-page/data.yaml', ContentPageDataSchema),
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
    path: 'asctb-azimuth',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/asctb-azimuth-page/data.yaml', ContentPageDataSchema),
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
    path: 'explore-biomarker-expressions',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver(
        'assets/content/explore-biomarker-expressions-page/data.yaml',
        ContentPageDataSchema,
      ),
    },
  },
  {
    path: 'ccf-ontology',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/ccf-ontology-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'cell-population-graphs',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/cell-population-graphs/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
