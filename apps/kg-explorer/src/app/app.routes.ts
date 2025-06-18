import { Route } from '@angular/router';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';
import { NotFoundPageComponent } from '@hra-ui/design-system/error-pages/not-found-page';
import { ServerErrorPageComponent } from '@hra-ui/design-system/error-pages/server-error-page';

import { MainPageComponent } from './pages/main-page/main-page.component';

/** Application routes */
export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: MainPageComponent,
    data: {
      crumbs: [{ name: 'Apps' }, { name: 'Knowledge Graph' }] satisfies BreadcrumbItem[],
      helpUrl: 'https://docs.humanatlas.io/apps',
    },
  },
  {
    path: '404',
    component: NotFoundPageComponent,
  },
  {
    path: '500',
    component: ServerErrorPageComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '404',
  },
];
