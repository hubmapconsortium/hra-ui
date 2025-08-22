import { HttpBackend, HttpClient, provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { HraKgService } from '@hra-api/ng-client';
import { TableColumn } from '@hra-ui/design-system/table';
import { render } from '@testing-library/angular';
import { of } from 'rxjs';

import { DownloadService } from '../../services/download.service';
import { MainPageComponent } from './main-page.component';

describe('MainPageComponent', () => {
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
      column: 'lastPublished',
      label: 'Date last published',
      type: 'text',
    },
  ];

  const mockRouter = {
    navigate: jest.fn(),
  };

  const mockActivatedRoute = {
    queryParams: of({
      do: ['2d-ftu'],
      versions: ['v1.2', 'v2.2'],
      organs: ['http://purl.obolibrary.org/obo/UBERON_0002113'],
      as: ['aaa'],
      ct: ['bbb'],
      b: ['ccc'],
      search: 'kidney',
    }),
  };

  const mockActivatedRoute2 = {
    queryParams: of({
      do: ['2d-ftu'],
      versions: 'v1.2',
      organs: ['http://purl.obolibrary.org/obo/UBERON_0002113'],
      as: 'aaa',
      ct: 'bbb',
      b: 'ccc',
      search: 'kidney',
    }),
  };

  const mockDownloadService = {
    getDownloadOptions: jest.fn().mockReturnValue([]),
  };

  const mockKgService = {
    doSearch: jest.fn().mockReturnValue(of([])),
  };

  const mockData = {
    '@graph': [
      {
        '@id': 'https://lod.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle',
        '@type': 'dcat:Catalog',
        cell_count: 6,
        hraVersions: ['v2.3', 'v2.2', 'v2.1', 'v2.0', 'v1.4', 'v1.3'],
        doVersion: 'v1.2',
        organs: ['kidney'],
        organIds: ['http://purl.obolibrary.org/obo/UBERON_0002113'],
        title: '2D Ascending Thin Limb of Loop of Henle FTU for Kidney',
        doType: '2d-ftu',
        lastUpdated: '2024-12-15',
        doName: 'kidney-ascending-thin-loop-of-henle',
        versions: ['v1.2', 'v1.1', 'v1.0'],
        purl: 'https://purl.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle',
        datasets: [
          'https://lod.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2',
          'https://lod.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.0',
          'https://lod.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.1',
        ],
        lod: 'https://lod.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2',
      },
      {
        '@id': 'https://lod.humanatlas.io/asct-b/ureter',
        '@type': 'dcat:Catalog',
        biomarker_count: '31',
        cell_count: '22',
        hraVersions: ['v2.3', 'v2.2', 'v2.1', 'v2.0', 'v1.4', 'v1.3', 'v1.2', 'v1.1'],
        doVersion: 'v1.0',
        organs: ['ureter'],
        organIds: ['http://purl.obolibrary.org/obo/UBERON_0000056'],
        title: 'Anatomical Structures, Cell Types, plus Biomarkers (ASCT+B) table for Ureter',
        doType: 'asct-b',
        lastUpdated: '2021-12-01',
        doName: 'ureter',
        versions: ['v1.0'],
        purl: 'https://purl.humanatlas.io/asct-b/ureter',
        datasets: 'https://lod.humanatlas.io/asct-b/ureter/v1.0',
        lod: 'https://lod.humanatlas.io/asct-b/ureter/v1.0',
      },
    ],
  };

  const mockMetadata = {
    $schema: 'https://cdn.humanatlas.io/digital-objects/schema/2d-ftu-metadata/latest/assets/schema.json',
    '@context': 'https://cdn.humanatlas.io/digital-objects/schema/2d-ftu-metadata/latest/assets/schema.context.jsonld',
    '@type': 'Container',
    id: 'https://lod.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2',
    title: 'kidney-ascending-thin-loop-of-henle (v1.2) graph data',
    description: 'The graph representation of the 2D Ascending Thin Limb of Loop of Henle FTU for Kidney dataset.',
    version: 'v1.2',
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
        id: 'https://lod.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2#json',
        label: 'Graph data distribution kidney-ascending-thin-loop-of-henle (v1.2) in JSON format',
        title: 'Graph data distribution kidney-ascending-thin-loop-of-henle (v1.2) in JSON format',
        downloadUrl:
          'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2/graph.json',
        accessUrl: 'https://lod.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2#json',
        mediaType: 'application/json',
      },
      {
        id: 'https://lod.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2#turtle',
        label: 'Graph data distribution kidney-ascending-thin-loop-of-henle (v1.2) in Turtle format',
        title: 'Graph data distribution kidney-ascending-thin-loop-of-henle (v1.2) in Turtle format',
        downloadUrl:
          'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2/graph.ttl',
        accessUrl: 'https://lod.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2#turtle',
        mediaType: 'text/turtle',
      },
      {
        id: 'https://lod.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2#jsonld',
        label: 'Graph data distribution kidney-ascending-thin-loop-of-henle (v1.2) in JSON-LD format',
        title: 'Graph data distribution kidney-ascending-thin-loop-of-henle (v1.2) in JSON-LD format',
        downloadUrl:
          'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2/graph.jsonld',
        accessUrl: 'https://lod.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2#jsonld',
        mediaType: 'application/ld+json',
      },
      {
        id: 'https://lod.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2#rdfxml',
        label: 'Graph data distribution kidney-ascending-thin-loop-of-henle (v1.2) in RDF/XML format',
        title: 'Graph data distribution kidney-ascending-thin-loop-of-henle (v1.2) in RDF/XML format',
        downloadUrl:
          'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2/graph.xml',
        accessUrl: 'https://lod.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2#rdfxml',
        mediaType: 'application/rdf+xml',
      },
      {
        id: 'https://lod.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2#ntriples',
        label: 'Graph data distribution kidney-ascending-thin-loop-of-henle (v1.2) in N-Triples format',
        title: 'Graph data distribution kidney-ascending-thin-loop-of-henle (v1.2) in N-Triples format',
        downloadUrl:
          'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2/graph.nt',
        accessUrl: 'https://lod.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2#ntriples',
        mediaType: 'application/n-triples',
      },
      {
        id: 'https://lod.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2#nquads',
        label: 'Graph data distribution kidney-ascending-thin-loop-of-henle (v1.2) in N-Quads format',
        title: 'Graph data distribution kidney-ascending-thin-loop-of-henle (v1.2) in N-Quads format',
        downloadUrl:
          'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2/graph.nq',
        accessUrl: 'https://lod.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2#nquads',
        mediaType: 'application/n-quads',
      },
    ],
    label: 'kidney-ascending-thin-loop-of-henle (v1.2) graph data',
    name: 'kidney-ascending-thin-loop-of-henle',
    type: '2d-ftu',
    publisher: 'HuBMAP',
    see_also: 'https://purl.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2',
    was_derived_from: {
      id: 'https://lod.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2#raw-data',
      label: '2D Ascending Thin Limb of Loop of Henle FTU for Kidney',
      title: '2D Ascending Thin Limb of Loop of Henle FTU for Kidney',
      description:
        'This functional tissue unit (FTU) illustration includes cell types related to the ascending thin limb of loop of Henle FTU in the ASCT+B Table [Kidney v1.2](https://doi.org/10.48539/HBM248.CBJV.556). This illustration was inspired by the [Kidney Tissue Atlas Explorer](https://atlas.kpmp.org/explorer) created by the Kidney Precision Medicine Project (KPMP). Multiple histology atlases, especially *Human Microscopic Anatomy* (Krstić 1991) and *Histology: A Text and Atlas* (Wojciech Pawlina and Michael H. Ross 2019) were referenced. Cell types and metrics were primarily defined by (Hu, McDonough, and Layton 2021; Layton and Layton 2019). Uberon describes this FTU as follows: "A sub-portion of the loop of Henle in the nephron of the kidney that is permeable to ions but not to water." \n\n**Bibliography**:\n\n* Hu, Rui, Alicia A. McDonough, and Anita T. Layton. 2021. “Sex Differences in Solute and Water Handling in the Human Kidney: Modeling and Functional Implications.” *iScience* 24 (6): 102667. https://doi.org/10.1016/j.isci.2021.102667.\n* Krstić, Radivoj V. 1991. Human Microscopic Anatomy. Berlin, Heidelberg: *Springer*. https://doi.org/10.1007/978-3-662-02676-2.\n* Layton, Anita T., and Harold E. Layton. 2019. “A Computational Model of Epithelial Solute and Water Transport along a Human Nephron.” Edited by Daniel A Beard. *PLOS Computational Biology* 15 (2): e1006108. https://doi.org/10.1371/journal.pcbi.1006108.\n* Wojciech Pawlina and Michael H. Ross. 2019. “Histology: A Text and Atlas: With Correlated Cell and Molecular Biology. Eighth Edition, 2018 Authors: Wojciech Pawlina; Michael H. Ross.” *Morphologia* 13 (4): 76–89. https://doi.org/10.26641/1997-9665.2019.4.76-89.',
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
      creation_date: '2024-12-15',
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
        'Bajema, Rachel. 2024. 2D Reference Ascending Thin Limb of Loop of Henle FTU for Kidney, v1.2. https://doi.org/10.48539/HBM489.KLNJ.323. Accessed on December 15, 2024.',
      citationOverall:
        'Bajema, Rachel, Supriya Bidanta, Ellen Quardokus, Bruce W. Herr II, and Katy Börner. 2024. HuBMAP CCF 2D Reference Object Library https://humanatlas.io/2d-ftu-illustrations. Accessed on December 15, 2024.',
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
      doi: 'https://doi.org/10.48539/HBM489.KLNJ.323',
      hubmapId: 'HBM489.KLNJ.323',
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
          id: 'https://lod.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2#2d-ftu-kidney-ascending-thin-loop-of-henle.svg',
          label: "Raw data distribution '2d-ftu-kidney-ascending-thin-loop-of-henle.svg' file",
          title: "Raw data distribution '2d-ftu-kidney-ascending-thin-loop-of-henle.svg' file",
          downloadUrl:
            'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2/assets/2d-ftu-kidney-ascending-thin-loop-of-henle.svg',
          accessUrl:
            'https://lod.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2#2d-ftu-kidney-ascending-thin-loop-of-henle.svg',
          mediaType: 'image/svg+xml',
        },
        {
          id: 'https://lod.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2#2d-ftu-kidney-ascending-thin-loop-of-henle.png',
          label: "Raw data distribution '2d-ftu-kidney-ascending-thin-loop-of-henle.png' file",
          title: "Raw data distribution '2d-ftu-kidney-ascending-thin-loop-of-henle.png' file",
          downloadUrl:
            'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2/assets/2d-ftu-kidney-ascending-thin-loop-of-henle.png',
          accessUrl:
            'https://lod.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2#2d-ftu-kidney-ascending-thin-loop-of-henle.png',
          mediaType: 'image/png',
        },
        {
          id: 'https://lod.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2#2d-ftu-kidney-ascending-thin-loop-of-henle.ai',
          label: "Raw data distribution '2d-ftu-kidney-ascending-thin-loop-of-henle.ai' file",
          title: "Raw data distribution '2d-ftu-kidney-ascending-thin-loop-of-henle.ai' file",
          downloadUrl:
            'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2/assets/2d-ftu-kidney-ascending-thin-loop-of-henle.ai',
          accessUrl:
            'https://lod.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2#2d-ftu-kidney-ascending-thin-loop-of-henle.ai',
          mediaType: 'application/postscript',
        },
        {
          id: 'https://lod.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2#crosswalk.csv',
          label: "Raw data distribution 'crosswalk.csv' file",
          title: "Raw data distribution 'crosswalk.csv' file",
          downloadUrl:
            'https://cdn.humanatlas.io/digital-objects/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2/assets/crosswalk.csv',
          accessUrl: 'https://lod.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2#crosswalk.csv',
          mediaType: 'text/csv',
        },
      ],
    },
  };

  it('should initialize filters from query params', async () => {
    const { fixture } = await render(MainPageComponent, {
      componentInputs: {
        data: mockData,
        columns: columns as TableColumn[],
        asctbTermOccurrences: [],
        ontologyTree: { nodes: {} },
        cellTypeTree: { nodes: {} },
        biomarkerTree: { nodes: {} },
      },
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: DownloadService, useValue: mockDownloadService },
        { provide: HraKgService, useValue: mockKgService },
        provideHttpClient(),
      ],
    });

    const instance = fixture.componentInstance;
    const filters = instance.filters();

    expect(filters.digitalObjects).toEqual(['2d-ftu']);
    expect(filters.releaseVersion).toEqual(['v1.2', 'v2.2']);
    expect(filters.organs).toEqual(['http://purl.obolibrary.org/obo/UBERON_0002113']);
    expect(filters.anatomicalStructures).toEqual(['aaa']);
    expect(filters.cellTypes).toEqual(['bbb']);
    expect(filters.biomarkers).toEqual(['ccc']);
    expect(filters.searchTerm).toBe('kidney');
  });

  it('should initialize filters from query params (handles strings)', async () => {
    const { fixture } = await render(MainPageComponent, {
      componentInputs: {
        data: mockData,
        columns: columns as TableColumn[],
        asctbTermOccurrences: [],
        ontologyTree: { nodes: {} },
        cellTypeTree: { nodes: {} },
        biomarkerTree: { nodes: {} },
      },
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute2 },
        { provide: DownloadService, useValue: mockDownloadService },
        { provide: HraKgService, useValue: mockKgService },
        provideHttpClient(),
      ],
    });

    const instance = fixture.componentInstance;
    const filters = instance.filters();

    expect(filters.digitalObjects).toEqual(['2d-ftu']);
    expect(filters.releaseVersion).toEqual(['v1.2']);
    expect(filters.organs).toEqual(['http://purl.obolibrary.org/obo/UBERON_0002113']);
    expect(filters.anatomicalStructures).toEqual(['aaa']);
    expect(filters.cellTypes).toEqual(['bbb']);
    expect(filters.biomarkers).toEqual(['ccc']);
    expect(filters.searchTerm).toBe('kidney');
  });

  it('should initialize filters from query params (handles undefined)', async () => {
    const { fixture } = await render(MainPageComponent, {
      componentInputs: {
        data: mockData,
        columns: columns as TableColumn[],
        asctbTermOccurrences: [],
        ontologyTree: { nodes: {} },
        cellTypeTree: { nodes: {} },
        biomarkerTree: { nodes: {} },
      },
      providers: [
        { provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({
              do: '2d-ftu',
              organs: 'http://purl.obolibrary.org/obo/UBERON_0002113',
            }),
          },
        },
        { provide: DownloadService, useValue: mockDownloadService },
        { provide: HraKgService, useValue: mockKgService },
        provideHttpClient(),
      ],
    });

    const instance = fixture.componentInstance;

    expect(instance.filters()).toEqual({
      anatomicalStructures: undefined,
      biomarkers: undefined,
      cellTypes: undefined,
      digitalObjects: '2d-ftu',
      organs: 'http://purl.obolibrary.org/obo/UBERON_0002113',
      releaseVersion: undefined,
      searchTerm: '',
    });
  });

  it('should compute version counts from data', async () => {
    const { fixture } = await render(MainPageComponent, {
      componentInputs: {
        data: mockData,
        columns: columns,
        asctbTermOccurrences: [],
        ontologyTree: { nodes: {} },
        cellTypeTree: { nodes: {} },
        biomarkerTree: { nodes: {} },
      },
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: DownloadService, useValue: mockDownloadService },
        { provide: HraKgService, useValue: mockKgService },
        provideHttpClient(),
      ],
    });

    const instance = fixture.componentInstance;
    const versionCounts = instance.versionCounts();
    expect(versionCounts['v2.3']).toBe(2);
  });

  it('should update query params when filters change', async () => {
    const { fixture } = await render(MainPageComponent, {
      componentInputs: {
        data: mockData,
        columns: columns,
        asctbTermOccurrences: [],
        ontologyTree: { nodes: {} },
        cellTypeTree: { nodes: {} },
        biomarkerTree: { nodes: {} },
      },
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: DownloadService, useValue: mockDownloadService },
        { provide: HraKgService, useValue: mockKgService },
        provideHttpClient(),
      ],
    });

    const instance = fixture.componentInstance;

    instance.handleFilterSelectionChanges({
      digitalObjects: [{ id: '2d-ftu', label: 'Object 2', count: 5 }],
      releaseVersion: [{ id: 'v2.0', label: 'v2.0', count: 3 }],
      organs: [{ id: 'lung', label: 'Lung', count: 2 }],
      anatomicalStructures: [],
      cellTypes: [],
      biomarkers: [],
    });

    expect(mockRouter.navigate).toHaveBeenCalledWith([''], {
      queryParams: {
        do: ['2d-ftu'],
        versions: ['v2.0'],
        organs: ['lung'],
        as: [],
        ct: [],
        b: [],
        search: 'kidney', // preserved from initial filters
      },
    });
  });

  it('should update searchTerm when search input changes', async () => {
    const { fixture } = await render(MainPageComponent, {
      componentInputs: {
        data: mockData,
        columns: columns,
        asctbTermOccurrences: [],
        ontologyTree: { nodes: {} },
        cellTypeTree: { nodes: {} },
        biomarkerTree: { nodes: {} },
      },
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: DownloadService, useValue: mockDownloadService },
        { provide: HraKgService, useValue: mockKgService },
        provideHttpClient(),
      ],
    });

    const instance = fixture.componentInstance;

    instance.searchControl.setValue('brain');
    expect(instance.filters().searchTerm).toBe('brain');
  });

  it('should handle null filter fields in handleFilterSelectionChanges', async () => {
    const { fixture } = await render(MainPageComponent, {
      componentInputs: {
        data: mockData,
        columns: columns,
        asctbTermOccurrences: [],
        ontologyTree: { nodes: {} },
        cellTypeTree: { nodes: {} },
        biomarkerTree: { nodes: {} },
      },
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: DownloadService, useValue: mockDownloadService },
        { provide: HraKgService, useValue: mockKgService },
        provideHttpClient(),
      ],
    });

    const instance = fixture.componentInstance;

    instance.handleFilterSelectionChanges({
      digitalObjects: null,
      releaseVersion: null,
      organs: null,
      anatomicalStructures: null,
      cellTypes: null,
      biomarkers: null,
    });

    expect(instance.filters()).toEqual({
      anatomicalStructures: undefined,
      biomarkers: undefined,
      cellTypes: undefined,
      digitalObjects: undefined,
      organs: undefined,
      releaseVersion: undefined,
      searchTerm: 'kidney',
    });
  });

  it('applies ontology filters', async () => {
    const { fixture } = await render(MainPageComponent, {
      componentInputs: {
        data: mockData,
        columns: columns,
        asctbTermOccurrences: [
          ['http://purl.obolibrary.org/obo/UBERON_0002113', 5],
          ['http://purl.obolibrary.org/obo/UBERON_0001678', 2],
          ['foo', 6],
        ],
        ontologyTree: {
          nodes: {
            'http://purl.obolibrary.org/obo/UBERON_0002113': {
              '@id': 'http://purl.obolibrary.org/obo/UBERON_0002113',
              '@type': 'OntologyTreeNode',
              id: 'http://purl.obolibrary.org/obo/UBERON_0002113',
              parent: 'http://purl.obolibrary.org/obo/UBERON_0013702',
              children: [],
              synonymLabels: [],
              label: 'kidney',
            },
            'http://purl.obolibrary.org/obo/UBERON_0001678': {
              '@id': 'http://purl.obolibrary.org/obo/UBERON_0001678',
              '@type': 'OntologyTreeNode',
              id: 'http://purl.obolibrary.org/obo/UBERON_0001678',
              parent: 'http://purl.obolibrary.org/obo/UBERON_0001703',
              children: [],
              synonymLabels: [],
            },
          },
        },
        cellTypeTree: { nodes: {} },
        biomarkerTree: { nodes: {} },
      },
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: DownloadService, useValue: mockDownloadService },
        { provide: HraKgService, useValue: mockKgService },
        provideHttpClient(),
      ],
    });
    const instance = fixture.componentInstance;
    expect(instance.filterCategories()['anatomicalStructures'].options?.length).toEqual(2);
  });

  it('applies more filters', async () => {
    const mockKgService2 = {
      doSearch: jest
        .fn()
        .mockReturnValue(
          of([
            'https://purl.humanatlas.io/2d-ftu/asct-b-2d-models-crosswalk',
            'https://purl.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle',
          ]),
        ),
    };
    const { fixture } = await render(MainPageComponent, {
      componentInputs: {
        data: mockData,
        columns: columns,
        asctbTermOccurrences: [],
        ontologyTree: { nodes: {} },
        cellTypeTree: { nodes: {} },
        biomarkerTree: { nodes: {} },
      },
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: DownloadService, useValue: mockDownloadService },
        { provide: HraKgService, useValue: mockKgService2 },
        provideHttpClient(),
      ],
    });

    const instance = fixture.componentInstance;
    expect(instance.filteredRows().length).toEqual(1);
  });

  it('sets search filter to undefined if blank', async () => {
    const { fixture } = await render(MainPageComponent, {
      componentInputs: {
        data: mockData,
        columns: columns,
        asctbTermOccurrences: [],
        ontologyTree: { nodes: {} },
        cellTypeTree: { nodes: {} },
        biomarkerTree: { nodes: {} },
      },
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: DownloadService, useValue: mockDownloadService },
        { provide: HraKgService, useValue: mockKgService },
        provideHttpClient(),
      ],
    });

    const instance = fixture.componentInstance;
    instance.searchControl.setValue('');
    expect(instance.filters().searchTerm).toBeUndefined();
  });

  it('should calculate scroll height based on screen size', async () => {
    const { fixture } = await render(MainPageComponent, {
      componentInputs: {
        data: mockData,
        columns: columns,
        asctbTermOccurrences: [],
        ontologyTree: { nodes: {} },
        cellTypeTree: { nodes: {} },
        biomarkerTree: { nodes: {} },
      },
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: DownloadService, useValue: mockDownloadService },
        { provide: HraKgService, useValue: mockKgService },
        provideHttpClient(),
      ],
    });
    const instance = fixture.componentInstance;

    window.innerHeight = 1000;
    instance['setScrollViewportHeight']();
    expect(instance.scrollHeight()).toBe(701);
  });

  it('should attach download options to a row', async () => {
    const mockHttpService = {
      get: jest.fn().mockReturnValue(of(mockMetadata)),
    };
    const { fixture } = await render(MainPageComponent, {
      componentInputs: {
        data: mockData,
        columns: columns,
        asctbTermOccurrences: [],
        ontologyTree: { nodes: {} },
        cellTypeTree: { nodes: {} },
        biomarkerTree: { nodes: {} },
      },
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: DownloadService, useValue: mockDownloadService },
        { provide: HraKgService, useValue: mockKgService },
        { provide: HttpClient, useValue: mockHttpService },
        HttpBackend,
      ],
    });
    const instance = fixture.componentInstance;
    instance.downloadId.set('https://lod.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2');
    instance['attachDownloadOptions']();
    expect(instance.download.getDownloadOptions).toHaveBeenCalled();
  });
});
