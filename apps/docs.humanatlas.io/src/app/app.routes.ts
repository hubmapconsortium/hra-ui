import { Route } from '@angular/router';
import { ContentPageComponent, ContentPageDataSchema } from '@hra-ui/design-system/content-templates/content-page';
import { createYamlSpecResolver } from '@hra-ui/design-system/content-templates/resolvers';
import { NotFoundPageComponent } from '@hra-ui/design-system/error-pages/not-found-page';
import { LandingPageDataSchema } from './schemas/landing-page/landing-page.schema';
import { LandingPageComponent } from './landing-page/landing-page.component';

/** Application routes */
export const appRoutes: Route[] = [
  // Content pages
  // Please try to keep sorted in alphabetical order

  // TODO: add content pages here!
  {
    path: '',
    component: LandingPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/landing-page/data.yaml', LandingPageDataSchema),
    },
  },
  {
    path: 'introduction',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/introduction-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'api-reference',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/api-reference-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'apps',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/apps-overview-page/data.yaml', ContentPageDataSchema),
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
    path: 'changelog',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/changelog-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'design-system',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/design-system-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'digital-objects',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/digital-objects-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'faqs',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/faqs/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'knowledge-graph',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/knowledge-graph-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'support',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/support-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'tutorials',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/tutorials-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'web-components',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/web-components-page/data.yaml', ContentPageDataSchema),
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
