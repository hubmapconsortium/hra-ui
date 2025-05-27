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
    path: 'introduction',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/introduction-page/data.yaml', ContentPageDataSchema),
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
