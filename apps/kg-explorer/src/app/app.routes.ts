import { ActivatedRouteSnapshot, Route } from '@angular/router';
import { createJsonSpecResolver } from '@hra-ui/design-system/content-templates/resolvers';
import { NotFoundPageComponent } from '@hra-ui/design-system/error-pages/not-found-page';
import { ServerErrorPageComponent } from '@hra-ui/design-system/error-pages/server-error-page';
import { TableColumn } from '@hra-ui/design-system/table';

import { KnowledgeGraphObjectsDataSchema } from './digital-objects.schema';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MetadataPageComponent } from './pages/metadata-page/metadata-page.component';
import { getDocumentationUrl, getProductTooltip } from './utils/utils';

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
      tooltip: 'View file formats and download files',
    },
  },
  {
    column: 'title',
    label: 'Digital objects',
    type: {
      type: 'link',
      urlColumn: 'objectUrl',
      internal: true,
    },
  },
  {
    column: 'typeIcon',
    label: 'Type',
    type: {
      type: 'icon',
      icon: 'typeIcon',
      tooltip: 'typeTooltip',
    },
  },
  {
    column: 'organIcon',
    label: 'Organ',
    type: {
      type: 'icon',
      icon: 'organIcon',
      tooltip: 'organTooltip',
    },
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

/** Help menu options interface */
export interface HelpMenuOptions {
  /** Option label */
  label: string;
  /** Option url */
  url: string;
  /** Optional description for option */
  description?: string;
  /** If the option should have a divider (on top) */
  divider?: boolean;
}

/** Application routes */
export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: MainPageComponent,
    data: {
      reuse: true,
      columns: columns,
    },
    resolve: {
      data: createJsonSpecResolver(DO_URL, KnowledgeGraphObjectsDataSchema),
    },
  },
  {
    path: ':type/:name/:version',
    component: MetadataPageComponent,
    data: {
      columns: metadataColumns,
    },
    resolve: {
      doData: createJsonSpecResolver(DO_URL, KnowledgeGraphObjectsDataSchema),
      documentationUrl: (route: ActivatedRouteSnapshot) => {
        const type = route.params['type'];
        return getDocumentationUrl(type);
      },
      typeLabel: (route: ActivatedRouteSnapshot) => {
        const type = route.params['type'];
        return getProductTooltip(type);
      },
    },
  },
  {
    path: ':type/:name',
    redirectTo: ':type/:name/latest',
  },
  {
    path: '500',
    component: ServerErrorPageComponent,
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];
