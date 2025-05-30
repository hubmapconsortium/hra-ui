import { Route } from '@angular/router';
import { ContentPageComponent, ContentPageDataSchema } from '@hra-ui/design-system/content-templates/content-page';
import { createYamlSpecResolver } from '@hra-ui/design-system/content-templates/resolvers';
import { NotFoundPageComponent } from '@hra-ui/design-system/error-pages/not-found-page';

/** Application routes */
export const appRoutes: Route[] = [
  // Content pages
  // Please try to keep sorted in alphabetical order

  // TODO: add content pages here!
  {
    path: '',
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
    path: 'changelog',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/changelog-page/data.yaml', ContentPageDataSchema),
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
    path: 'knowledge-graph',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/knowledge-graph-page/data.yaml', ContentPageDataSchema),
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
