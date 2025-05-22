import { Route } from '@angular/router';
import { NotFoundPageComponent } from '@hra-ui/design-system/error-pages/not-found-page';

/** Application routes */
export const appRoutes: Route[] = [
  // Content pages
  // Please try to keep sorted in alphabetical order

  // TODO: add content pages here!

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
