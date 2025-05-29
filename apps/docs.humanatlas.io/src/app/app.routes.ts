import { createYamlSpecResolver } from '@hra-ui/design-system/content-templates/resolvers';
import { ContentPageComponent, ContentPageDataSchema } from '@hra-ui/design-system/content-templates/content-page';
import { Route } from '@angular/router';
import { NotFoundPageComponent } from '@hra-ui/design-system/error-pages/not-found-page';

/** Application routes */
export const appRoutes: Route[] = [
  // Content pages
  // Please try to keep sorted in alphabetical order

  // TODO: add content pages here!
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
