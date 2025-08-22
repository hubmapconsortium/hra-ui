import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { V1Service } from '@hra-api/ng-client';
import { render } from '@testing-library/angular';
import { provideMarkdown } from 'ngx-markdown';
import { of } from 'rxjs';

import { PersonInfo } from '../../digital-objects-metadata.schema';
import { DownloadService } from '../../services/download.service';
import { MetadataPageComponent } from './metadata-page.component';

jest.mock('@google/model-viewer', () => ({}));

describe('MetadataPageComponent', () => {
  let component: MetadataPageComponent;
  const navigateSpy = jest.fn();

  const mockRouter = {
    navigate: navigateSpy,
  };

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: jest.fn().mockImplementation((key: string) => {
          const params: Record<string, string> = { type: 'ref-organ', name: 'heart', version: 'v1.0' };
          return params[key];
        }),
      },
    },
  };

  const mockDownloadService = {
    getDownloadOptions: jest.fn().mockReturnValue([{ label: 'Download CSV', value: 'csv' }]),
  };

  const mockV1Service = {
    ontologyTreeModel: jest.fn().mockReturnValue(
      of({
        nodes: {
          heart: { label: 'Heart' },
        },
      }),
    ),
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

  const mockDoData = {
    '@graph': [
      {
        '@id': 'https://lod.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle',
        '@type': 'dcat:Catalog',
        cell_count: '6',
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
        '@id': 'https://lod.humanatlas.io/ref-organ/heart',
        versions: ['v1.0', 'v2.0'],
        organIds: ['heart'],
        purl: 'https://example.com/purl',
      },
    ],
  };

  it('should navigate to a 404 page if no metadata', async () => {
    const { fixture } = await render(MetadataPageComponent, {
      componentInputs: {
        metadata: undefined,
        doData: mockDoData,
        columns: [],
      },
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: DownloadService, useValue: mockDownloadService },
        { provide: V1Service, useValue: mockV1Service },
        provideMarkdown(),
        provideHttpClient(),
      ],
    });
    component = fixture.componentInstance;
    expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
  });

  it('should navigate to the correct version route', async () => {
    const { fixture } = await render(MetadataPageComponent, {
      componentInputs: {
        metadata: mockMetadata,
        doData: mockDoData,
        columns: [],
      },
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: DownloadService, useValue: mockDownloadService },
        { provide: V1Service, useValue: mockV1Service },
        provideMarkdown(),
        provideHttpClient(),
      ],
    });
    component = fixture.componentInstance;
    expect(component.currentVersion()).toBe('v1.0');
    component.currentVersion.set('v2.0');
    fixture.detectChanges();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['ref-organ', 'heart', 'v2.0']);
  });

  it('handles empty params', async () => {
    const { fixture } = await render(MetadataPageComponent, {
      componentInputs: {
        metadata: mockMetadata,
        doData: mockDoData,
        columns: [],
      },
      providers: [
        { provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: jest.fn().mockImplementation((key: string) => {
                  const params: Record<string, string> = {};
                  return params[key];
                }),
              },
            },
          },
        },
        { provide: DownloadService, useValue: mockDownloadService },
        { provide: V1Service, useValue: mockV1Service },
        provideMarkdown(),
        provideHttpClient(),
      ],
    });
    component = fixture.componentInstance;
    expect(mockRouter.navigate).toHaveBeenCalledWith(['', '', '']);
  });

  it('should handle missing label in ontology node', async () => {
    const mockDoData2 = {
      '@graph': [
        {
          '@id': 'https://lod.humanatlas.io/ref-organ/heart',
          versions: ['v1.0', 'v2.0'],
          purl: 'https://example.com/purl',
          organIds: ['aaaaaa'],
        },
      ],
    };
    const mockV1Service2 = {
      ontologyTreeModel: jest.fn().mockReturnValue(
        of({
          nodes: {
            aaaaaa: {},
          },
        }),
      ),
    };
    const { fixture } = await render(MetadataPageComponent, {
      componentInputs: {
        metadata: mockMetadata,
        doData: mockDoData2,
        columns: [],
      },
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: DownloadService, useValue: mockDownloadService },
        { provide: V1Service, useValue: mockV1Service2 },
        provideMarkdown(),
        provideHttpClient(),
      ],
    });
    const instance = fixture.componentInstance;
    fixture.detectChanges();

    expect(instance.tags()).toEqual([
      {
        id: 'ref-organ',
        label: '3D Organs',
        type: 'do',
      },
      {
        id: 'aaaaaa',
        label: '',
        type: 'organs',
      },
    ]);
  });

  it('should handle no organIds', async () => {
    const mockDoData3 = {
      '@graph': [
        {
          '@id': 'https://lod.humanatlas.io/ref-organ/heart',
          versions: ['v1.0', 'v2.0'],
          purl: 'https://example.com/purl',
        },
      ],
    };
    const { fixture } = await render(MetadataPageComponent, {
      componentInputs: {
        metadata: mockMetadata,
        doData: mockDoData3,
        columns: [],
      },
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: DownloadService, useValue: mockDownloadService },
        { provide: V1Service, useValue: mockV1Service },
        provideMarkdown(),
        provideHttpClient(),
      ],
    });
    const instance = fixture.componentInstance;
    fixture.detectChanges();

    expect(instance.tags()).toEqual([
      {
        id: 'ref-organ',
        label: '3D Organs',
        type: 'do',
      },
    ]);
  });

  it('should set metadata table rows (handle undefined)', async () => {
    const mockMetadata2 = {
      $schema: 'https://cdn.humanatlas.io/digital-objects/schema/2d-ftu-metadata/latest/assets/schema.json',
      '@context':
        'https://cdn.humanatlas.io/digital-objects/schema/2d-ftu-metadata/latest/assets/schema.context.jsonld',
      '@type': 'Container',
      id: 'https://lod.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2',
      distributions: [],
      was_derived_from: {
        label: '2D Ascending Thin Limb of Loop of Henle FTU for Kidney',
        title: '2D Ascending Thin Limb of Loop of Henle FTU for Kidney',
        description:
          'This functional tissue unit (FTU) illustration includes cell types related to the ascending thin limb of loop of Henle FTU in the ASCT+B Table [Kidney v1.2](https://doi.org/10.48539/HBM248.CBJV.556). This illustration was inspired by the [Kidney Tissue Atlas Explorer](https://atlas.kpmp.org/explorer) created by the Kidney Precision Medicine Project (KPMP). Multiple histology atlases, especially *Human Microscopic Anatomy* (Krstić 1991) and *Histology: A Text and Atlas* (Wojciech Pawlina and Michael H. Ross 2019) were referenced. Cell types and metrics were primarily defined by (Hu, McDonough, and Layton 2021; Layton and Layton 2019). Uberon describes this FTU as follows: "A sub-portion of the loop of Henle in the nephron of the kidney that is permeable to ions but not to water." \n\n**Bibliography**:\n\n* Hu, Rui, Alicia A. McDonough, and Anita T. Layton. 2021. “Sex Differences in Solute and Water Handling in the Human Kidney: Modeling and Functional Implications.” *iScience* 24 (6): 102667. https://doi.org/10.1016/j.isci.2021.102667.\n* Krstić, Radivoj V. 1991. Human Microscopic Anatomy. Berlin, Heidelberg: *Springer*. https://doi.org/10.1007/978-3-662-02676-2.\n* Layton, Anita T., and Harold E. Layton. 2019. “A Computational Model of Epithelial Solute and Water Transport along a Human Nephron.” Edited by Daniel A Beard. *PLOS Computational Biology* 15 (2): e1006108. https://doi.org/10.1371/journal.pcbi.1006108.\n* Wojciech Pawlina and Michael H. Ross. 2019. “Histology: A Text and Atlas: With Correlated Cell and Molecular Biology. Eighth Edition, 2018 Authors: Wojciech Pawlina; Michael H. Ross.” *Morphologia* 13 (4): 76–89. https://doi.org/10.26641/1997-9665.2019.4.76-89.',
        license:
          'Creative Commons Attribution 4.0 International ([CC BY 4.0](https://creativecommons.org/licenses/by/4.0/))',
        publisher: 'HuBMAP',
        funders: [],
        distributions: [],
      },
    };

    const { fixture } = await render(MetadataPageComponent, {
      componentInputs: {
        metadata: mockMetadata2,
        doData: mockDoData,
        columns: [],
      },
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: DownloadService, useValue: mockDownloadService },
        { provide: V1Service, useValue: mockV1Service },
        provideMarkdown(),
        provideHttpClient(),
      ],
    });
    component = fixture.componentInstance;
    expect(mockRouter.navigate).toHaveBeenCalledWith(['ref-organ', 'heart', 'v1.0']);
  });

  it('should generate markdown list from person info', () => {
    const people: PersonInfo[] = [
      {
        conforms_to: '',
        firstName: '',
        fullName: '',
        id: 'https://example.com/alice',
        label: 'Alice',
        lastName: '',
        orcid: '',
        type_of: [],
      },
      {
        conforms_to: '',
        firstName: '',
        fullName: '',
        id: 'https://example.com/bob',
        label: 'Bob',
        lastName: '',
        orcid: '',
        type_of: [],
      },
    ];
    const markdown = component['createMarkdownList'](people);
    expect(markdown).toContain('[Alice](https://example.com/alice)');
    expect(markdown).toContain('[Bob](https://example.com/bob)');
  });

  it('should navigate to tag filter on tagClick', () => {
    component.tagClick('heart', 'organs');
    expect(mockRouter.navigate).toHaveBeenCalledWith([''], { queryParams: { organs: 'heart' } });
  });
});
