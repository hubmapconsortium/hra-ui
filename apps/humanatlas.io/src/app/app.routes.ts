import { Route } from '@angular/router';
import { AppLayoutComponent, AppLayoutDataSchema } from '@hra-ui/application';
import { createJsonSpecResolver, createYamlSpecResolver } from '@hra-ui/design-system/content-templates/resolvers';
import { NotFoundPageComponent } from '@hra-ui/design-system/error-pages/not-found-page';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { PublicationsPageComponent } from './pages/publications-page/publications-page.component';
import { createReleaseNotesContentResolver } from './resolvers/release-notes-content.resolver';
import { LandingPageDataSchema } from './schemas/landing-page/landing-page.schema';
import { PublicationsPageDataSchema } from './schemas/publications-page/publications-page.schema';
import { ReleaseNotesVersionsSchema } from './schemas/release-notes-version/release-notes-version.schema';
import { createExternalRedirectRoute } from './utils/external-redirect';

/** Application routes */
export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageComponent,
    data: {
      siteNavigation: false,
    },
    resolve: {
      data: createYamlSpecResolver('assets/content/landing-page/data.yaml', LandingPageDataSchema),
    },
  },

  // Content pages
  // Please try to keep sorted in alphabetical order
  {
    path: '2d-ftu-illustrations',
    component: AppLayoutComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/2d-ftu-illustrations/data.yaml', AppLayoutDataSchema),
    },
  },
  {
    path: '3d-reference-library',
    component: AppLayoutComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/3d-reference-library-page/data.yaml', AppLayoutDataSchema),
    },
  },
  {
    path: 'about',
    component: AppLayoutComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/about-page/data.yaml', AppLayoutDataSchema),
    },
  },
  {
    path: 'api',
    component: AppLayoutComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/api-page/data.yaml', AppLayoutDataSchema),
    },
  },
  {
    path: 'asctb-azimuth',
    component: AppLayoutComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/asctb-azimuth-page/data.yaml', AppLayoutDataSchema),
    },
  },
  {
    path: 'asctb-reporter',
    component: AppLayoutComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/asctb-reporter-page/data.yaml', AppLayoutDataSchema),
    },
  },
  {
    path: 'asctb-tables',
    component: AppLayoutComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/asctb-tables-page/data.yaml', AppLayoutDataSchema),
    },
  },
  {
    path: 'ccf-ontology',
    component: AppLayoutComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/ccf-ontology-page/data.yaml', AppLayoutDataSchema),
    },
  },
  {
    path: 'cell-population-graphs',
    component: AppLayoutComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/cell-population-graphs/data.yaml', AppLayoutDataSchema),
    },
  },
  {
    path: 'cell-type-annotations',
    component: AppLayoutComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/cell-type-annotations-page/data.yaml', AppLayoutDataSchema),
    },
  },
  {
    path: 'editorial-board',
    redirectTo: '/about#editorial-board',
  },
  {
    path: 'exploration-user-interface',
    component: AppLayoutComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/eui-page/data.yaml', AppLayoutDataSchema),
    },
  },
  {
    path: 'faq',
    pathMatch: 'full',
    redirectTo: '/faq/omap',
  },
  {
    path: 'faq/omap',
    component: AppLayoutComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/omap-faqs-page/data.yaml', AppLayoutDataSchema),
    },
  },
  {
    path: 'hra-organ-gallery',
    component: AppLayoutComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/organ-gallery-page/data.yaml', AppLayoutDataSchema),
    },
  },
  {
    path: 'kaggle-four',
    component: AppLayoutComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/kaggle-four-page/data.yaml', AppLayoutDataSchema),
    },
  },
  {
    path: 'kaggle-one',
    component: AppLayoutComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/kaggle-one-page/data.yaml', AppLayoutDataSchema),
    },
  },
  {
    path: 'kaggle-two',
    component: AppLayoutComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/kaggle-two-page/data.yaml', AppLayoutDataSchema),
    },
  },
  {
    path: 'kaggle-three',
    component: AppLayoutComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/kaggle-three-page/data.yaml', AppLayoutDataSchema),
    },
  },
  {
    path: 'landing-page',
    redirectTo: '/',
  },
  {
    path: 'millitome',
    component: AppLayoutComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/millitome/data.yaml', AppLayoutDataSchema),
    },
  },
  {
    path: 'omap',
    component: AppLayoutComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/omap-page/data.yaml', AppLayoutDataSchema),
    },
  },
  {
    path: 'overview-data',
    component: AppLayoutComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/data-page/data.yaml', AppLayoutDataSchema),
    },
  },
  {
    path: 'overview-tools',
    ...createExternalRedirectRoute('https://docs.humanatlas.io/apps'),
  },
  {
    path: 'overview-training-outreach',
    component: AppLayoutComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/training-page/data.yaml', AppLayoutDataSchema),
    },
  },
  {
    path: 'overview-use-the-hra',
    ...createExternalRedirectRoute('https://docs.humanatlas.io/apps'),
  },
  {
    path: 'privacy-policy',
    component: AppLayoutComponent,
    data: {
      hideNavigation: true,
    },
    resolve: {
      data: createYamlSpecResolver('assets/content/privacy-policy-page/data.yaml', AppLayoutDataSchema),
    },
  },
  {
    path: 'publications',
    component: PublicationsPageComponent,
    resolve: {
      publications: createJsonSpecResolver('https://cns.iu.edu/publications.json?sort=hra', PublicationsPageDataSchema),
    },
  },
  {
    path: 'registration-user-interface',
    component: AppLayoutComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/rui-page/data.yaml', AppLayoutDataSchema),
    },
  },
  {
    path: 'release-notes',
    pathMatch: 'full',
    // Preferably this would redirect to the latest version based on the versions data
    // But it is not available at this point. Async redirectTo may become available in angular 20
    redirectTo: '/release-notes/v2.3',
  },
  {
    path: 'release-notes/:version',
    component: AppLayoutComponent,
    resolve: {
      versions: createYamlSpecResolver('assets/content/release-notes-page/versions.yaml', ReleaseNotesVersionsSchema),
      data: createReleaseNotesContentResolver('assets/content/release-notes-page/'),
    },
  },
  {
    path: 'standard-operating-procedures',
    component: AppLayoutComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/standard-operating-procedures-page/data.yaml', AppLayoutDataSchema),
    },
  },
  {
    path: 'team',
    redirectTo: '/about',
  },
  {
    path: 'usage-metrics',
    ...createExternalRedirectRoute('https://apps.humanatlas.io/dashboard/usage'),
  },
  {
    path: 'user-story',
    ...createExternalRedirectRoute('https://docs.humanatlas.io/apps'),
  },
  {
    path: 'user-story/1',
    component: AppLayoutComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/cell-population-predictor-page/data.yaml', AppLayoutDataSchema),
    },
  },
  {
    path: 'user-story/2',
    component: AppLayoutComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/tissue-origin-predictor-page/data.yaml', AppLayoutDataSchema),
    },
  },
  {
    path: 'user-story/3',
    component: AppLayoutComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/explore-biomarker-expressions-page/data.yaml', AppLayoutDataSchema),
    },
  },
  {
    path: 'user-story/4',
    component: AppLayoutComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/ftu-explorer-page/data.yaml', AppLayoutDataSchema),
    },
  },
  {
    path: 'user-story/5',
    component: AppLayoutComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/cell-distance-explorer-page/data.yaml', AppLayoutDataSchema),
    },
  },
  {
    path: 'user-story/6',
    component: AppLayoutComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/web-components-page/data.yaml', AppLayoutDataSchema),
    },
  },
  {
    path: 'user-story/7',
    component: AppLayoutComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/dashboard-page/data.yaml', AppLayoutDataSchema),
    },
  },
  {
    path: 'vccf',
    component: AppLayoutComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/vccf-page/data.yaml', AppLayoutDataSchema),
    },
  },

  // Error pages and redirects
  {
    path: '**',
    component: NotFoundPageComponent,
    data: {
      siteNavigation: false,
    },
  },
];
