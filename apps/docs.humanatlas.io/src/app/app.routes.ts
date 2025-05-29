import { Route } from '@angular/router';
import { NotFoundPageComponent } from '@hra-ui/design-system/error-pages/not-found-page';
import { ContentPageComponent, ContentPageDataSchema } from '@hra-ui/design-system/content-templates/content-page';
import { createYamlSpecResolver } from '@hra-ui/design-system/content-templates/resolvers';

/** Application routes */
export const appRoutes: Route[] = [
  // Content pages
  // Please try to keep sorted in alphabetical order

  {
    path: 'design-system',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/design-system-page/data.yaml', ContentPageDataSchema),
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
