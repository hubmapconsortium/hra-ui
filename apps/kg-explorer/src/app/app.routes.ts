import { Route } from '@angular/router';
import { NotFoundPageComponent } from '@hra-ui/design-system/error-pages/not-found-page';
import { ServerErrorPageComponent } from '@hra-ui/design-system/error-pages/server-error-page';
import { TableColumn } from '@hra-ui/design-system/table';

import { MainPageComponent } from './pages/main-page/main-page.component';
import { MetadataPageComponent } from './pages/metadata-page/metadata-page.component';
import {
  asctbResolver,
  biomarkersResolver,
  cellTypeResolver,
  documentationUrlResolver,
  doMetadataResolver,
  kgResolver,
  ontologyResolver,
  productLabelResolver,
} from './utils/kg-resolver';

/** Digital objects api */
export const DO_URL = 'https://apps.humanatlas.io/api/kg/digital-objects';

/** Column info for digital object table */
export const DO_COLUMNS: TableColumn[] = [
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
    column: 'lastPublished',
    label: 'Date last published',
    type: 'text',
  },
];

/** Column info for metadata table */
export const METADATA_COLUMNS: TableColumn[] = [
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
      columns: DO_COLUMNS,
    },
    resolve: {
      data: kgResolver(DO_URL),
      asctbTermOccurrences: asctbResolver(),
      ontologyTree: ontologyResolver(),
      cellTypeTree: cellTypeResolver(),
      biomarkerTree: biomarkersResolver(),
    },
  },
  {
    path: ':type/:name/:version',
    component: MetadataPageComponent,
    data: {
      columns: METADATA_COLUMNS,
    },
    resolve: {
      doData: kgResolver(DO_URL),
      metadata: doMetadataResolver(),
      documentationUrl: documentationUrlResolver(),
      typeLabel: productLabelResolver(),
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
