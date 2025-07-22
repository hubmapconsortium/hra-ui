import { Component, computed, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { watchBreakpoint } from '@hra-ui/cdk/breakpoints';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';
import { IconsModule } from '@hra-ui/design-system/icons';
import { TableColumn, TableComponent } from '@hra-ui/design-system/table';
import { MarkdownComponent } from 'ngx-markdown';

import { MetadataLayoutModule } from '../../metadata-layout/metadata-layout.module';

interface MetadataPageData {
  type: string;
  organ: string;
  title: string; //was_derived_from.title
  description: string; //was_derived_from.description
  publisher: {
    name: string; //publisher
    url: string;
  };
  funders: {
    //was_derived_from.funders
    funder: string;
    awardNumber: string;
  }[];
  license: string; //license
  tags: string[];

  creators: {
    name: string; //was_derived_from.creators.label
    id: string; //was_derived_from.creators.id
  }[];
  leads: {
    name: string; //was_derived_from.project_leads.label
    id: string; //was_derived_from.project_leads.id
  }[];
  reviewers: {
    name: string; //was_derived_from.reviewers.label
    id: string; //was_derived_from.reviewers.id
  }[];
  doi: string; //was_derived_from.doi
  hubmapId: string; //was_derived_from.hubmapId
  dateCreated: string; //creation_date
  dateModified: string;

  image?: string; //was_derived_from.distributions[?].downloadUrl
}

const testData: MetadataPageData = {
  type: 'ftu',
  organ: 'kidney',
  title: '2D Outer Medullary Collecting Duct FTU for Kidney',
  description:
    'This functional tissue unit (FTU) illustration includes cell types related to the outer medullary collecting duct FTU in the ASCT+B Table [Kidney v1.2](https://doi.org/10.48539/HBM248.CBJV.556). This illustration was inspired by the [Kidney Tissue Atlas Explorer](https://atlas.kpmp.org/explorer) created by the Kidney Precision Medicine Project (KPMP). Multiple histology atlases, especially *Human Microscopic Anatomy* (Krstić 1991) and *Histology: A Text and Atlas* (Wojciech Pawlina and Michael H. Ross 2019) were referenced. Cell types and metrics were primarily defined by (Hu, McDonough, and Layton 2021; Layton and Layton 2019). Uberon describes this FTU as follows: "The outer medullary collecting duct is the portion of the collecting duct that lies in the renal outer medulla." \n\n**Bibliography**:\n\n* Hu, Rui, Alicia A. McDonough, and Anita T. Layton. 2021. “Sex Differences in Solute and Water Handling in the Human Kidney: Modeling and Functional Implications.” *iScience* 24 (6): 102667. https://doi.org/10.1016/j.isci.2021.102667.\n* Krstić, Radivoj V. 1991. Human Microscopic Anatomy. Berlin, Heidelberg: *Springer*. https://doi.org/10.1007/978-3-662-02676-2.\n* Layton, Anita T., and Harold E. Layton. 2019. “A Computational Model of Epithelial Solute and Water Transport along a Human Nephron.” Edited by Daniel A Beard. *PLOS Computational Biology* 15 (2): e1006108. https://doi.org/10.1371/journal.pcbi.1006108.\n* Wojciech Pawlina and Michael H. Ross. 2019. “Histology: A Text and Atlas: With Correlated Cell and Molecular Biology. Eighth Edition, 2018 Authors: Wojciech Pawlina; Michael H. Ross.” *Morphologia* 13 (4): 76–89. https://doi.org/10.26641/1997-9665.2019.4.76-89.',
  publisher: {
    name: 'HuBMAP',
    url: 'https://hubmapconsortium.org/',
  },
  funders: [
    {
      funder: 'National Institutes of Health',
      awardNumber: 'OT2OD033756',
    },
    {
      funder: 'National Institutes of Health',
      awardNumber: 'OT2OD026671',
    },
  ],
  license: 'Creative Commons Attribution 4.0 International ([CC BY 4.0](https://creativecommons.org/licenses/by/4.0/))',
  tags: ['Functional Tissue Unit', 'Kidney'],

  creators: [{ name: 'Rachel Bajema', id: 'https://orcid.org/0000-0002-3775-8574' }],
  leads: [{ name: 'Katy Börner', id: 'https://orcid.org/0000-0002-3321-6137' }],
  reviewers: [
    { name: 'Sanjay Jain', id: 'https://orcid.org/0000-0003-2804-127X' },
    { name: 'Matthias Kretzler', id: 'https://orcid.org/0000-0003-4064-0582' },
    { name: 'M. Todd Valerius', id: 'https://orcid.org/0000-0001-8143-9231' },
  ],
  doi: 'https://doi.org/10.48539/HBM724.KFSK.483',
  hubmapId: 'HBM724.KFSK.483',
  dateCreated: '2025-06-12',
  dateModified: '2025-06-12',

  image:
    'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-outer-medullary-collecting-duct/v1.2/assets/2d-ftu-kidney-outer-medullary-collecting-duct.svg',
};

const testIcons = ['product:ftu', 'organ:kidneys'];

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
    IconsModule,
  ],
  templateUrl: './metadata-page.component.html',
  styleUrl: './metadata-page.component.scss',
})
export class MetadataPageComponent {
  readonly metadata = input<MetadataPageData>(testData);

  readonly icons = input<string[]>(testIcons);

  readonly columns = input<TableColumn[]>(columns);

  readonly rows = computed(() => [
    { provenance: 'Creator(s)', metadata: this.createMarkdownList(this.metadata().creators) },
    { provenance: 'Project lead', metadata: this.createMarkdownList(this.metadata().leads) },
    {
      provenance: 'Reviewer(s)',
      metadata: this.createMarkdownList(this.metadata().reviewers),
    },
    { provenance: 'DOI', metadata: `[${this.metadata().doi}](${this.metadata().doi})` },
    { provenance: 'HuBMAP ID', metadata: this.metadata().hubmapId },
    { provenance: 'Date created', metadata: this.metadata().dateCreated },
    { provenance: 'Date last modified', metadata: this.metadata().dateModified },
  ]);

  protected isWMediumScreen = watchBreakpoint('(min-width: 1100px), (max-width: 639.9999px)');

  createMarkdownLink(text: string, url: string): string {
    return `[${text}](${url})`;
  }

  createMarkdownList(items: { name: string; id: string }[]): string {
    if (items.length === 1) {
      return this.createMarkdownLink(items[0].name, items[0].id);
    }
    return items.map((item) => `\n* ${this.createMarkdownLink(item.name, item.id)}`).join();
  }
}
