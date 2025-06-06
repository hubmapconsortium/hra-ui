import { Route } from '@angular/router';
import { ContentPageComponent, ContentPageDataSchema } from '@hra-ui/design-system/content-templates/content-page';
import { createJsonSpecResolver, createYamlSpecResolver } from '@hra-ui/design-system/content-templates/resolvers';
import { NotFoundPageComponent } from '@hra-ui/design-system/error-pages/not-found-page';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { PublicationsPageComponent } from './pages/publications-page/publications-page.component';
import { createReleaseNotesContentResolver } from './resolvers/release-notes-content.resolver';
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

  // Content pages
  // Please try to keep sorted in alphabetical order
  {
    path: '2d-ftu-illustrations',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/2d-ftu-illustrations/data.yaml', ContentPageDataSchema),
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
    path: 'about',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/about-page/data.yaml', ContentPageDataSchema),
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
    path: 'asctb-azimuth',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/asctb-azimuth-page/data.yaml', ContentPageDataSchema),
    },
  },
  // TODO asctb-reporter
  {
    path: 'asctb-tables',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/asctb-tables-page/data.yaml', ContentPageDataSchema),
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
    path: 'cell-type-annotations',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/cell-type-annotations-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'editorial-board',
    redirectTo: '/about#editorial-board',
  },
  // TODO exploration-user-interface
  // TODO faq/omap
  {
    path: 'hra-organ-gallery',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/organ-gallery-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'kaggle-four',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/kaggle-four-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'kaggle-one',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/kaggle-one-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'kaggle-two',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/kaggle-two-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'kaggle-three',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/kaggle-three-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'landing-page',
    redirectTo: '/',
  },
  {
    path: 'millitome',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/millitome/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'omap',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/omap-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'overview-data',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/data-page/data.yaml', ContentPageDataSchema),
    },
  },
  // TODO overview-tools redirect to docs.humanatlas.io/apps
  {
    path: 'overview-training-outreach',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/training-page/data.yaml', ContentPageDataSchema),
    },
  },
  // TODO overview-use-the-hra redirect to docs.humanatlas.io/apps
  // TODO registration-user-interface
  {
    path: 'publications',
    component: PublicationsPageComponent,
    resolve: {
      publications: createJsonSpecResolver('https://cns.iu.edu/publications.json?sort=hra', PublicationsPageDataSchema),
    },
  },
  {
    path: 'release-notes',
    // Preferably this would redirect to the latest version based on the versions data
    // But it is not available at this point. Async redirectTo may become available in angular 20
    redirectTo: 'release-notes/v2.3',
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
    path: 'team',
    redirectTo: '/about',
  },
  // TODO usage-metrics redirect to apps.humanatlas.io/dashboard/usage
  // TODO user-story/1
  {
    path: 'user-story/2',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/tissue-origin-predictor-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'user-story/3',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver(
        'assets/content/explore-biomarker-expressions-page/data.yaml',
        ContentPageDataSchema,
      ),
    },
  },
  {
    path: 'user-story/4',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/ftu-explorer-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'user-story/5',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/cell-distance-explorer-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'user-story/6',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/web-components-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'user-story/7',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/dashboard-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'vccf',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/vccf-page/data.yaml', ContentPageDataSchema),
    },
  },

  // Error pages and redirects
  {
    path: '404',
    component: NotFoundPageComponent,
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
