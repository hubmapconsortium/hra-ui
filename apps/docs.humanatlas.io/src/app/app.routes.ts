import { Route } from '@angular/router';
import { ContentPageComponent, ContentPageDataSchema } from '@hra-ui/design-system/content-templates/content-page';
import { createYamlSpecResolver } from '@hra-ui/design-system/content-templates/resolvers';
import { NotFoundPageComponent } from '@hra-ui/design-system/error-pages/not-found-page';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { LandingPageDataSchema } from './schemas/landing-page/landing-page.schema';

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
    path: 'apps',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/apps-overview-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'dev',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/introduction-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'dev/api',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/api-reference-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'dev/apps',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/apps-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'dev/changelog',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/changelog-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'dev/design-system',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/design-system-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'dev/digital-objects',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/digital-objects-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'dev/faq',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/faqs/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'dev/kg',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/knowledge-graph-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'dev/support',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/support-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'dev/tutorials',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/tutorials-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'dev/web-components',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/web-components-page/data.yaml', ContentPageDataSchema),
    },
  },

  // Error pages and redirects
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];
