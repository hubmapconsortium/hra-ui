import { TestBed } from '@angular/core/testing';

import { DigitalObjectMetadata } from '../digital-objects-metadata.schema';
import { DownloadService } from './download.service';

const exampleMetadata: DigitalObjectMetadata = {
  $schema: 'https://cdn.humanatlas.io/digital-objects/schema/2d-ftu-metadata/latest/assets/schema.json',
  '@context': 'https://cdn.humanatlas.io/digital-objects/schema/2d-ftu-metadata/latest/assets/schema.context.jsonld',
  '@type': 'Container',
  id: 'https://lod.humanatlas.io/2d-ftu/kidney-cortical-collecting-duct/v1.3',
  title: 'kidney-cortical-collecting-duct (v1.3) graph data',
  description: 'The graph representation of the 2D Cortical Collecting Duct FTU for Kidney dataset.',
  version: 'v1.3',
  creators: [
    {
      id: 'https://github.com/hubmapconsortium/hra-do-processor',
      label: 'HRA Digital Object Processor',
      conforms_to: 'SoftwareApplication',
      name: 'HRA Digital Object Processor',
      version: '0.9.0',
      target_product: {
        code_repository: 'https://github.com/hubmapconsortium/hra-do-processor',
        see_also:
          'https://github.com/hubmapconsortium/hra-do-processor/commit/7db4da50b0cb86ff1e612a98e97ffa1dbd19bfc4',
      },
      type_of: ['schema:SoftwareApplication'],
    },
  ],
  creation_date: '2025-06-12',
  license: 'https://creativecommons.org/licenses/by/4.0/',
  distributions: [
    {
      id: 'https://lod.humanatlas.io/2d-ftu/kidney-cortical-collecting-duct/v1.3#json',
      label: 'Graph data distribution kidney-cortical-collecting-duct (v1.3) in JSON format',
      title: 'Graph data distribution kidney-cortical-collecting-duct (v1.3) in JSON format',
      downloadUrl: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-cortical-collecting-duct/v1.3/graph.json',
      accessUrl: 'https://lod.humanatlas.io/2d-ftu/kidney-cortical-collecting-duct/v1.3#json',
      mediaType: 'application/json',
    },
    {
      id: 'https://lod.humanatlas.io/2d-ftu/kidney-cortical-collecting-duct/v1.3#turtle',
      label: 'Graph data distribution kidney-cortical-collecting-duct (v1.3) in Turtle format',
      title: 'Graph data distribution kidney-cortical-collecting-duct (v1.3) in Turtle format',
      downloadUrl: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-cortical-collecting-duct/v1.3/graph.ttl',
      accessUrl: 'https://lod.humanatlas.io/2d-ftu/kidney-cortical-collecting-duct/v1.3#turtle',
      mediaType: 'text/turtle',
    },
    {
      id: 'https://lod.humanatlas.io/2d-ftu/kidney-cortical-collecting-duct/v1.3#jsonld',
      label: 'Graph data distribution kidney-cortical-collecting-duct (v1.3) in JSON-LD format',
      title: 'Graph data distribution kidney-cortical-collecting-duct (v1.3) in JSON-LD format',
      downloadUrl: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-cortical-collecting-duct/v1.3/graph.jsonld',
      accessUrl: 'https://lod.humanatlas.io/2d-ftu/kidney-cortical-collecting-duct/v1.3#jsonld',
      mediaType: 'application/ld+json',
    },
    {
      id: 'https://lod.humanatlas.io/2d-ftu/kidney-cortical-collecting-duct/v1.3#rdfxml',
      label: 'Graph data distribution kidney-cortical-collecting-duct (v1.3) in RDF/XML format',
      title: 'Graph data distribution kidney-cortical-collecting-duct (v1.3) in RDF/XML format',
      downloadUrl: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-cortical-collecting-duct/v1.3/graph.xml',
      accessUrl: 'https://lod.humanatlas.io/2d-ftu/kidney-cortical-collecting-duct/v1.3#rdfxml',
      mediaType: 'application/rdf+xml',
    },
    {
      id: 'https://lod.humanatlas.io/2d-ftu/kidney-cortical-collecting-duct/v1.3#ntriples',
      label: 'Graph data distribution kidney-cortical-collecting-duct (v1.3) in N-Triples format',
      title: 'Graph data distribution kidney-cortical-collecting-duct (v1.3) in N-Triples format',
      downloadUrl: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-cortical-collecting-duct/v1.3/graph.nt',
      accessUrl: 'https://lod.humanatlas.io/2d-ftu/kidney-cortical-collecting-duct/v1.3#ntriples',
      mediaType: 'application/n-triples',
    },
    {
      id: 'https://lod.humanatlas.io/2d-ftu/kidney-cortical-collecting-duct/v1.3#nquads',
      label: 'Graph data distribution kidney-cortical-collecting-duct (v1.3) in N-Quads format',
      title: 'Graph data distribution kidney-cortical-collecting-duct (v1.3) in N-Quads format',
      downloadUrl: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-cortical-collecting-duct/v1.3/graph.nq',
      accessUrl: 'https://lod.humanatlas.io/2d-ftu/kidney-cortical-collecting-duct/v1.3#nquads',
      mediaType: 'application/n-quads',
    },
  ],
  label: 'kidney-cortical-collecting-duct (v1.3) graph data',
  name: 'kidney-cortical-collecting-duct',
  type: '2d-ftu',
  publisher: 'HuBMAP',
  see_also: 'https://purl.humanatlas.io/2d-ftu/kidney-cortical-collecting-duct/v1.3',
  was_derived_from: {
    id: 'https://lod.humanatlas.io/2d-ftu/kidney-cortical-collecting-duct/v1.3#raw-data',
    label: '2D Cortical Collecting Duct FTU for Kidney',
    title: '2D Cortical Collecting Duct FTU for Kidney',
    description:
      'This functional tissue unit (FTU) illustration includes cell types related to the cortical collecting duct FTU in the ASCT+B Table [Kidney v1.2](https://doi.org/10.48539/HBM248.CBJV.556). This illustration was inspired by the [Kidney Tissue Atlas Explorer](https://atlas.kpmp.org/explorer) created by the Kidney Precision Medicine Project (KPMP). Multiple histology atlases, especially *Human Microscopic Anatomy* (Krstić 1991) and *Histology: A Text and Atlas* (Wojciech Pawlina and Michael H. Ross 2019) were referenced. Cell types and metrics were primarily defined by (Hu, McDonough, and Layton 2021; Layton and Layton 2019). Uberon describes this FTU as follows: "The cortical collecting duct is the portion of the collecting duct that resides in the renal cortex."\n\n**Bibliography**:\n\n* Hu, Rui, Alicia A. McDonough, and Anita T. Layton. 2021. “Sex Differences in Solute and Water Handling in the Human Kidney: Modeling and Functional Implications.” *iScience* 24 (6): 102667. https://doi.org/10.1016/j.isci.2021.102667.\n* Krstić, Radivoj V. 1991. Human Microscopic Anatomy. Berlin, Heidelberg: *Springer*. https://doi.org/10.1007/978-3-662-02676-2.\n* Layton, Anita T., and Harold E. Layton. 2019. “A Computational Model of Epithelial Solute and Water Transport along a Human Nephron.” Edited by Daniel A Beard. *PLOS Computational Biology* 15 (2): e1006108. https://doi.org/10.1371/journal.pcbi.1006108.\n* Wojciech Pawlina and Michael H. Ross. 2019. “Histology: A Text and Atlas: With Correlated Cell and Molecular Biology. Eighth Edition, 2018 Authors: Wojciech Pawlina; Michael H. Ross.” *Morphologia* 13 (4): 76–89. https://doi.org/10.26641/1997-9665.2019.4.76-89.',
    creators: [
      {
        id: 'https://orcid.org/0000-0002-3775-8574',
        label: 'Rachel Bajema',
        conforms_to: 'Person',
        fullName: 'Rachel Bajema',
        firstName: 'Rachel',
        lastName: 'Bajema',
        orcid: '0000-0002-3775-8574',
        type_of: ['schema:Person'],
      },
    ],
    reviewers: [
      {
        id: 'https://orcid.org/0000-0003-2804-127X',
        label: 'Sanjay Jain',
        conforms_to: 'Person',
        fullName: 'Sanjay Jain',
        firstName: 'Sanjay',
        lastName: 'Jain',
        orcid: '0000-0003-2804-127X',
        type_of: ['schema:Person'],
      },
      {
        id: 'https://orcid.org/0000-0003-4064-0582',
        label: 'Matthias Kretzler',
        conforms_to: 'Person',
        fullName: 'Matthias Kretzler',
        firstName: 'Matthias',
        lastName: 'Kretzler',
        orcid: '0000-0003-4064-0582',
        type_of: ['schema:Person'],
      },
      {
        id: 'https://orcid.org/0000-0001-8143-9231',
        label: 'M. Todd Valerius',
        conforms_to: 'Person',
        fullName: 'M. Todd Valerius',
        firstName: 'M.',
        lastName: 'Valerius',
        orcid: '0000-0001-8143-9231',
        type_of: ['schema:Person'],
      },
    ],
    creation_date: '2025-06-15',
    license:
      'Creative Commons Attribution 4.0 International ([CC BY 4.0](https://creativecommons.org/licenses/by/4.0/))',
    publisher: 'HuBMAP',
    references: [
      'https://doi.org/10.48539/HBM248.CBJV.556',
      'https://doi.org/10.1016/j.isci.2021.102667',
      'https://doi.org/10.1007/978-3-662-02676-2',
      'https://doi.org/10.1371/journal.pcbi.1006108',
      'https://doi.org/10.26641/1997-9665.2019.4.76-89',
    ],
    citation:
      'Bajema, Rachel. 2024. 2D Reference Cortical Collecting Duct FTU for Kidney, v1.3. https://doi.org/10.48539/HBM483.MXQP.399. Accessed on June 15, 2025.',
    citationOverall:
      'Bajema, Rachel, Supriya Bidanta, Ellen Quardokus, Bruce W. Herr II, and Katy Börner. 2024. HuBMAP CCF 2D Reference Object Library https://humanatlas.io/2d-ftu-illustrations. Accessed on June 15, 2025.',
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
    doi: 'https://doi.org/10.48539/HBM483.MXQP.399',
    hubmapId: 'HBM483.MXQP.399',
    project_leads: [
      {
        id: 'https://orcid.org/0000-0002-3321-6137',
        label: 'Katy Börner',
        conforms_to: 'Person',
        fullName: 'Katy Börner',
        firstName: 'Katy',
        lastName: 'Börner',
        orcid: '0000-0002-3321-6137',
        type_of: ['schema:Person'],
      },
    ],
    distributions: [
      {
        id: 'https://lod.humanatlas.io/2d-ftu/kidney-cortical-collecting-duct/v1.3#2d-ftu-kidney-cortical-collecting-duct.svg',
        label: "Raw data distribution '2d-ftu-kidney-cortical-collecting-duct.svg' file",
        title: "Raw data distribution '2d-ftu-kidney-cortical-collecting-duct.svg' file",
        downloadUrl:
          'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-cortical-collecting-duct/v1.3/assets/2d-ftu-kidney-cortical-collecting-duct.svg',
        accessUrl:
          'https://lod.humanatlas.io/2d-ftu/kidney-cortical-collecting-duct/v1.3#2d-ftu-kidney-cortical-collecting-duct.svg',
        mediaType: 'image/svg+xml',
      },
      {
        id: 'https://lod.humanatlas.io/2d-ftu/kidney-cortical-collecting-duct/v1.3#2d-ftu-kidney-cortical-collecting-duct.png',
        label: "Raw data distribution '2d-ftu-kidney-cortical-collecting-duct.png' file",
        title: "Raw data distribution '2d-ftu-kidney-cortical-collecting-duct.png' file",
        downloadUrl:
          'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-cortical-collecting-duct/v1.3/assets/2d-ftu-kidney-cortical-collecting-duct.png',
        accessUrl:
          'https://lod.humanatlas.io/2d-ftu/kidney-cortical-collecting-duct/v1.3#2d-ftu-kidney-cortical-collecting-duct.png',
        mediaType: 'image/png',
      },
      {
        id: 'https://lod.humanatlas.io/2d-ftu/kidney-cortical-collecting-duct/v1.3#2d-ftu-kidney-cortical-collecting-duct.ai',
        label: "Raw data distribution '2d-ftu-kidney-cortical-collecting-duct.ai' file",
        title: "Raw data distribution '2d-ftu-kidney-cortical-collecting-duct.ai' file",
        downloadUrl:
          'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-cortical-collecting-duct/v1.3/assets/2d-ftu-kidney-cortical-collecting-duct.ai',
        accessUrl:
          'https://lod.humanatlas.io/2d-ftu/kidney-cortical-collecting-duct/v1.3#2d-ftu-kidney-cortical-collecting-duct.ai',
        mediaType: 'application/postscript',
      },
      {
        id: 'https://lod.humanatlas.io/2d-ftu/kidney-cortical-collecting-duct/v1.3#crosswalk.csv',
        label: "Raw data distribution 'crosswalk.csv' file",
        title: "Raw data distribution 'crosswalk.csv' file",
        downloadUrl:
          'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-cortical-collecting-duct/v1.3/assets/crosswalk.csv',
        accessUrl: 'https://lod.humanatlas.io/2d-ftu/kidney-cortical-collecting-duct/v1.3#crosswalk.csv',
        mediaType: 'text/csv',
      },
    ],
  },
};

const exampleMetadataWithDuplicates: DigitalObjectMetadata = {
  ...exampleMetadata,
  distributions: [
    ...exampleMetadata.distributions,
    {
      id: 'a second json file type',
      label: '',
      title: 'Second JSON file',
      downloadUrl: '',
      accessUrl: '',
      mediaType: 'application/json',
    },
  ],
};

describe('DownloadService', () => {
  let service: DownloadService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DownloadService],
    });

    service = TestBed.inject(DownloadService);
  });

  it('return download options from the metadata', async () => {
    expect(service.getDownloadOptions(exampleMetadata).length).toEqual(10);
  });

  it('handles duplicate file types', () => {
    expect(service.getDownloadOptions(exampleMetadataWithDuplicates)[10].description).toEqual('Second JSON file');
  });
});
