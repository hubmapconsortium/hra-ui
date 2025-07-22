import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { watchBreakpoint } from '@hra-ui/cdk/breakpoints';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';
import { MetadataLayoutModule } from '@hra-ui/design-system/layouts/metadata';
import { TableColumn, TableComponent, TableRow } from '@hra-ui/design-system/table';
import { MarkdownComponent } from 'ngx-markdown';

interface MetadataPageData {
  type: string;
  organ: string;
  title: string;
  description: string;
  publisher: string;
  funders: string[];
  license: string;
  tags: string[];

  creators: string[];
  leads: string[];
  reviewers: string[];
  doi: string;
  hubmapId: string;
  dateCreated: string;
  dateModified: string;

  image?: string;
}

const testData: MetadataPageData = {
  type: 'ftu',
  organ: 'kidney',
  title: '2D Outer Medullary Collecting Duct FTU for Kidney',
  description:
    'This functional tissue unit (FTU) illustration includes cell types related to the outer medullary collecting duct FTU in the ASCT+B Table [Kidney v1.2](https://doi.org/10.48539/HBM248.CBJV.556). This illustration was inspired by the [Kidney Tissue Atlas Explorer](https://atlas.kpmp.org/explorer) created by the Kidney Precision Medicine Project (KPMP). Multiple histology atlases, especially *Human Microscopic Anatomy* (Krstić 1991) and *Histology: A Text and Atlas* (Wojciech Pawlina and Michael H. Ross 2019) were referenced. Cell types and metrics were primarily defined by (Hu, McDonough, and Layton 2021; Layton and Layton 2019). Uberon describes this FTU as follows: "The outer medullary collecting duct is the portion of the collecting duct that lies in the renal outer medulla." \n\n**Bibliography**:\n\n* Hu, Rui, Alicia A. McDonough, and Anita T. Layton. 2021. “Sex Differences in Solute and Water Handling in the Human Kidney: Modeling and Functional Implications.” *iScience* 24 (6): 102667. https://doi.org/10.1016/j.isci.2021.102667.\n* Krstić, Radivoj V. 1991. Human Microscopic Anatomy. Berlin, Heidelberg: *Springer*. https://doi.org/10.1007/978-3-662-02676-2.\n* Layton, Anita T., and Harold E. Layton. 2019. “A Computational Model of Epithelial Solute and Water Transport along a Human Nephron.” Edited by Daniel A Beard. *PLOS Computational Biology* 15 (2): e1006108. https://doi.org/10.1371/journal.pcbi.1006108.\n* Wojciech Pawlina and Michael H. Ross. 2019. “Histology: A Text and Atlas: With Correlated Cell and Molecular Biology. Eighth Edition, 2018 Authors: Wojciech Pawlina; Michael H. Ross.” *Morphologia* 13 (4): 76–89. https://doi.org/10.26641/1997-9665.2019.4.76-89.',
  publisher: 'HuBMAP',
  funders: ['National Institutes of Health', 'National Science Foundation'],
  license: 'Creative Commons Attribution 4.0 International ([CC BY 4.0](https://creativecommons.org/licenses/by/4.0/))',
  tags: ['Functional Tissue Unit', 'Kidney'],

  creators: ['Rachel Bajema'],
  leads: ['Katy Börner'],
  reviewers: ['Sanjay Jain', 'Matthias Kretzler', 'M. Todd Valerius'],
  doi: 'https://doi.org/10.48539/HBM724.KFSK.483',
  hubmapId: 'HBM724.KFSK.483',
  dateCreated: '2025-06-12',
  dateModified: '2025-06-12',

  image:
    'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-outer-medullary-collecting-duct/v1.2/assets/2d-ftu-kidney-outer-medullary-collecting-duct.svg',
};

const columns: TableColumn[] = [
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

const symbolUrl = 'https://google.com';

/** Example data */
const rows: TableRow[] = [
  { provenance: 'Creator(s)', metadata: `[Rachel Bajema](${symbolUrl})` },
  { provenance: 'Project lead', metadata: `[Katy Börner](${symbolUrl})` },
  {
    provenance: 'Reviewer(s)',
    metadata: `\n* [Sanjay Jain](${symbolUrl})\n* [Matthias Kretzler](${symbolUrl})\n* [M. Todd Valerius](${symbolUrl})`,
  },
  { provenance: 'DOI', metadata: `[https://doi.org/10.48539/HBM489.KLNJ.323](${symbolUrl})` },
  { provenance: 'HuBMAP ID', metadata: 'HBM283.BMNR.744' },
  { provenance: 'Date created', metadata: '2023-12-15' },
  { provenance: 'Date last modified', metadata: '2023-12-15' },
];

@Component({
  selector: 'hra-metadata-page',
  imports: [
    HraCommonModule,
    MatIconModule,
    ButtonsModule,
    PageSectionComponent,
    MetadataLayoutModule,
    MarkdownComponent,
    TableComponent,
  ],
  templateUrl: './metadata-page.component.html',
  styleUrl: './metadata-page.component.scss',
})
export class MetadataPageComponent {
  readonly metadata = input<MetadataPageData>(testData);

  rows = rows;
  columns = columns;

  protected isWideScreen = watchBreakpoint('(min-width: 1100px)');

  protected isSmallScreen = watchBreakpoint('(max-width: 639.9999px)');
}
