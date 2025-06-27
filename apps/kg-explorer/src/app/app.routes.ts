import { Route } from '@angular/router';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';
import { createJsonSpecResolver } from '@hra-ui/design-system/content-templates/resolvers';
import { NotFoundPageComponent } from '@hra-ui/design-system/error-pages/not-found-page';
import { ServerErrorPageComponent } from '@hra-ui/design-system/error-pages/server-error-page';
import { TableColumn } from '@hra-ui/design-system/table';

import { DigitalObjectsDataSchema } from './digital-objects.schema';
import { MainPageComponent } from './pages/main-page/main-page.component';

const DO_URL = 'https://apps.humanatlas.io/api/kg/digital-objects';

/** Column info */
const columns: TableColumn[] = [
  {
    column: 'download',
    label: '',
    type: {
      type: 'menu',
      icon: 'download',
      options: 'downloadOptions',
    },
  },
  {
    column: 'title',
    label: 'Digital Objects',
    type: {
      type: 'link',
      urlColumn: 'objectUrl',
    },
  },
  {
    column: 'type',
    label: 'Type',
    type: 'icon',
  },
  {
    column: 'organ',
    label: 'Organ',
    type: 'icon',
  },
  {
    column: 'cellCount',
    label: '#Cell types',
    type: 'numeric',
  },
  {
    column: 'biomarkerCount',
    label: '#Biomarker types',
    type: 'numeric',
  },
  {
    column: 'lastModified',
    label: 'Date last modified',
    type: 'text',
  },
];

/** Application routes */
export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: MainPageComponent,
    data: {
      crumbs: [{ name: 'Apps' }, { name: 'Knowledge Graph' }] satisfies BreadcrumbItem[],
      helpUrl: 'https://docs.humanatlas.io/apps',
      columns: columns,
    },
    resolve: {
      data: createJsonSpecResolver(DO_URL, DigitalObjectsDataSchema),
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
