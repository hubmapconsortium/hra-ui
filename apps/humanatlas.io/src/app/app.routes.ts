import { Route, ResolveFn } from '@angular/router';
import { AppLayoutComponent, AppLayoutData, AppLayoutDataSchema } from '@hra-ui/application';
import { createYamlSpecResolver } from '@hra-ui/design-system/content-templates/resolvers';
import { NotFoundPageComponent } from '@hra-ui/design-system/error-pages/not-found-page';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { createReleaseNotesContentResolver } from './resolvers/release-notes-content.resolver';
import { LandingPageDataSchema } from './schemas/landing-page/landing-page.schema';
import { ReleaseNotesVersionsSchema } from './schemas/release-notes-version/release-notes-version.schema';
import { createExternalRedirectRoute } from './utils/external-redirect';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { assetUrl } from '@hra-ui/common/url';
import { map } from 'rxjs';
import { z } from 'zod';

export function publicationsResolver<T extends z.ZodTypeAny>(url: string, spec: T): ResolveFn<z.infer<T>> {
  return () => {
    const http = inject(HttpClient);
    return http
      .get(assetUrl(url)(), { responseType: 'json' })
      .pipe(map((data) => spec.parse(normalizePublications(data as Record<string, string[]>))));
  };
}

/**
 * Normalizes publications from a mapping object into an array
 *
 * @param publications Mapping from year to contents
 * @returns Array of normalized and sorted items
 */
function normalizePublications(publications: Record<string, string[]>): AppLayoutData {
  const pairs = Object.entries(publications);
  const filteredPairs = pairs.sort((a, b) => +b[0] - +a[0]).filter((pair) => pair[1].length > 0);
  const data = {
    $schema: '../../../app/schemas/content-page/content-page.schema.json',
    content: filteredPairs.map((pair) => {
      return {
        anchor: `year-${pair[0]}`,
        component: 'PageSection',
        content: pair[1].map((value) => convertContent(value)),
        level: 2,
        tagline: pair[0],
      };
    }),
    banner: {
      title: 'Publications',
      imgSrc: 'assets/content/publications-page/images/publications.png',
    },
  } satisfies AppLayoutData;
  return data;
}

function convertContent(value: string) {
  return { component: 'Markdown', data: fixupContent(value) };
}

/**
 * Fixes problems with publication content html
 *
 * @param value HTML string
 * @returns HTML string without author links
 */
function fixupContent(value: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(value, 'text/html');
  const authorLinks = doc.body.querySelectorAll('a[href]:not([itemprop="url"])');
  authorLinks.forEach((link) => link.replaceWith(link.textContent as string));
  const publicationLinks = doc.body.querySelectorAll('a[href^="/docs/publications/"]');
  publicationLinks.forEach((el) => el.setAttribute('href', `https://cns.iu.edu${el.getAttribute('href')}`));
  return doc.body.innerHTML;
}

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
    component: AppLayoutComponent,
    resolve: {
      data: publicationsResolver('https://cns.iu.edu/publications.json?sort=hra', AppLayoutDataSchema),
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
