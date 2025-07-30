import { ActivatedRouteSnapshot, Route } from '@angular/router';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';
import { createJsonSpecResolver } from '@hra-ui/design-system/content-templates/resolvers';
import { NotFoundPageComponent } from '@hra-ui/design-system/error-pages/not-found-page';
import { ServerErrorPageComponent } from '@hra-ui/design-system/error-pages/server-error-page';
import { TableColumn } from '@hra-ui/design-system/table';

import { KnowledgeGraphObjectsDataSchema } from './digital-objects.schema';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MetadataPageComponent } from './pages/metadata-page/metadata-page.component';

/** Digital objects api */
const DO_URL = 'https://apps.humanatlas.io/api/kg/digital-objects';

/** Column info for digital object table */
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
    column: 'typeIcon',
    label: 'Type',
    type: 'icon',
  },
  {
    column: 'organIcon',
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

/** Column info for metadata table */
const metadataColumns: TableColumn[] = [
  {
    column: 'provenance',
    label: 'Provenance',
    type: 'text',
  },
  {
    column: 'metadata',
    label: 'Metadata',
    type: 'markdown',
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
      data: createJsonSpecResolver(DO_URL, KnowledgeGraphObjectsDataSchema),
    },
  },
  {
    path: 'metadata/:type/:name/:version',
    component: MetadataPageComponent,
    data: {
      columns: metadataColumns,
      helpUrl: 'https://docs.humanatlas.io/apps',
    },
    resolve: {
      crumbs: (route: ActivatedRouteSnapshot) => {
        const name = route.params['name'];
        return [{ name: 'Apps' }, { name: name }]; //TODO: display the actual label
      },
      doData: createJsonSpecResolver(DO_URL, KnowledgeGraphObjectsDataSchema),
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
