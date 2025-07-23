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

// const testData: MetadataPageData = {
//   type: 'ftu',
//   organ: 'kidney',
//   title: '2D Outer Medullary Collecting Duct FTU for Kidney',
//   description:
//     'This functional tissue unit (FTU) illustration includes cell types related to the outer medullary collecting duct FTU in the ASCT+B Table [Kidney v1.2](https://doi.org/10.48539/HBM248.CBJV.556). This illustration was inspired by the [Kidney Tissue Atlas Explorer](https://atlas.kpmp.org/explorer) created by the Kidney Precision Medicine Project (KPMP). Multiple histology atlases, especially *Human Microscopic Anatomy* (Krstić 1991) and *Histology: A Text and Atlas* (Wojciech Pawlina and Michael H. Ross 2019) were referenced. Cell types and metrics were primarily defined by (Hu, McDonough, and Layton 2021; Layton and Layton 2019). Uberon describes this FTU as follows: "The outer medullary collecting duct is the portion of the collecting duct that lies in the renal outer medulla." \n\n**Bibliography**:\n\n* Hu, Rui, Alicia A. McDonough, and Anita T. Layton. 2021. “Sex Differences in Solute and Water Handling in the Human Kidney: Modeling and Functional Implications.” *iScience* 24 (6): 102667. https://doi.org/10.1016/j.isci.2021.102667.\n* Krstić, Radivoj V. 1991. Human Microscopic Anatomy. Berlin, Heidelberg: *Springer*. https://doi.org/10.1007/978-3-662-02676-2.\n* Layton, Anita T., and Harold E. Layton. 2019. “A Computational Model of Epithelial Solute and Water Transport along a Human Nephron.” Edited by Daniel A Beard. *PLOS Computational Biology* 15 (2): e1006108. https://doi.org/10.1371/journal.pcbi.1006108.\n* Wojciech Pawlina and Michael H. Ross. 2019. “Histology: A Text and Atlas: With Correlated Cell and Molecular Biology. Eighth Edition, 2018 Authors: Wojciech Pawlina; Michael H. Ross.” *Morphologia* 13 (4): 76–89. https://doi.org/10.26641/1997-9665.2019.4.76-89.',
//   publisher: {
//     name: 'HuBMAP',
//     url: 'https://hubmapconsortium.org/',
//   },
//   funders: [
//     {
//       funder: 'National Institutes of Health',
//       awardNumber: 'OT2OD033756',
//     },
//     {
//       funder: 'National Institutes of Health',
//       awardNumber: 'OT2OD026671',
//     },
//   ],
//   license: 'Creative Commons Attribution 4.0 International ([CC BY 4.0](https://creativecommons.org/licenses/by/4.0/))',
//   tags: ['Functional Tissue Unit', 'Kidney'],

//   creators: [{ name: 'Rachel Bajema', id: 'https://orcid.org/0000-0002-3775-8574' }],
//   leads: [{ name: 'Katy Börner', id: 'https://orcid.org/0000-0002-3321-6137' }],
//   reviewers: [
//     { name: 'Sanjay Jain', id: 'https://orcid.org/0000-0003-2804-127X' },
//     { name: 'Matthias Kretzler', id: 'https://orcid.org/0000-0003-4064-0582' },
//     { name: 'M. Todd Valerius', id: 'https://orcid.org/0000-0001-8143-9231' },
//   ],
//   doi: 'https://doi.org/10.48539/HBM724.KFSK.483',
//   hubmapId: 'HBM724.KFSK.483',
//   dateCreated: '2025-06-12',
//   dateModified: '2025-06-12',

//   image:
//     'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-outer-medullary-collecting-duct/v1.2/assets/2d-ftu-kidney-outer-medullary-collecting-duct.svg',
// };

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
    },
    resolve: {
      crumbs: (route: ActivatedRouteSnapshot) => {
        const name = route.params['name'];
        return [{ name: 'Apps' }, { name: name }];
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
