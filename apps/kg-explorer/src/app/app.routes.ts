import { ActivatedRouteSnapshot, Route, RouterStateSnapshot } from '@angular/router';
import { NotFoundPageComponent } from '@hra-ui/design-system/error-pages/not-found-page';
import { ServerErrorPageComponent } from '@hra-ui/design-system/error-pages/server-error-page';
import { TableColumn } from '@hra-ui/design-system/table';

import { createJsonSpecResolver } from '@hra-ui/design-system/content-templates/resolvers';
import { AsctbTermsSchema, DigitalObjectsJsonLdSchema, TermsIndexSchema } from './digital-objects-metadata.schema';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MetadataPageComponent } from './pages/metadata-page/metadata-page.component';
import { documentationUrlResolver, doMetadataResolver, productLabelResolver } from './utils/kg-resolver';
import { injectMirrorUrl } from './utils/endpoints';

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
  /** Optional icon for menu option */
  icon?: string;
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
      data: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const mirrorUrl = injectMirrorUrl();
        return createJsonSpecResolver(`${mirrorUrl()}/kg/digital-objects.jsonld`, DigitalObjectsJsonLdSchema)(
          route,
          state,
        );
      },
      asctbTerms: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const mirrorUrl = injectMirrorUrl();
        return createJsonSpecResolver(`${mirrorUrl()}/kg/asctb-terms.json`, AsctbTermsSchema)(route, state);
      },
      termsIndex: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const mirrorUrl = injectMirrorUrl();
        return createJsonSpecResolver(`${mirrorUrl()}/kg/kg-terms-index.json`, TermsIndexSchema)(route, state);
      },
    },
  },
  {
    path: ':type/:name/:version',
    component: MetadataPageComponent,
    data: {
      columns: METADATA_COLUMNS,
    },
    resolve: {
      doData: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const mirrorUrl = injectMirrorUrl();
        return createJsonSpecResolver(`${mirrorUrl()}/kg/digital-objects.jsonld`, DigitalObjectsJsonLdSchema)(
          route,
          state,
        );
      },
      asctbTerms: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const mirrorUrl = injectMirrorUrl();
        return createJsonSpecResolver(`${mirrorUrl()}/kg/asctb-terms.json`, AsctbTermsSchema)(route, state);
      },
      metadata: doMetadataResolver(),
      documentationUrl: documentationUrlResolver(),
      typeLabel: productLabelResolver(),
    },
  },
  {
    path: ':type/:name',
    pathMatch: 'full',
    redirectTo: '/:type/:name/latest',
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
