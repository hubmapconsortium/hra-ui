import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { DigitalObjectsJsonLd, V1Service } from '@hra-api/ng-client';
import { render } from '@testing-library/angular';
import { provideMarkdown } from 'ngx-markdown';
import { of } from 'rxjs';

import { DigitalObjectMetadata, PersonInfo } from '../../digital-objects-metadata.schema';
import { DownloadService } from '../../services/download.service';
import * as mockDoData from '../../testing/mock-data.json';
import * as mockMetadata from '../../testing/mock-metadata.json';
import { MetadataPageComponent } from './metadata-page.component';

jest.mock('@google/model-viewer', () => ({}));

describe('MetadataPageComponent', () => {
  async function setup(
    metadata?: DigitalObjectMetadata,
    doData?: DigitalObjectsJsonLd,
    actRoute?: ActivatedRoute,
    v1Service?: V1Service,
  ) {
    return render(MetadataPageComponent, {
      componentInputs: {
        metadata,
        doData: doData,
        columns: [],
      },
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: actRoute },
        { provide: DownloadService, useValue: mockDownloadService },
        { provide: V1Service, useValue: v1Service },
        provideMarkdown(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
  }

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
  } as unknown as ActivatedRoute;

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
  } as unknown as V1Service;

  it('should navigate to a 404 page if no metadata', async () => {
    await setup(undefined, mockDoData as DigitalObjectsJsonLd, mockActivatedRoute, mockV1Service);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
  });

  it('should navigate to the correct version route', async () => {
    const { fixture } = await setup(
      mockMetadata,
      mockDoData as DigitalObjectsJsonLd,
      mockActivatedRoute,
      mockV1Service,
    );
    component = fixture.componentInstance;
    expect(component.currentVersion()).toBe('v1.0');
    component.currentVersion.set('v2.0');
    fixture.detectChanges();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['ref-organ', 'heart', 'v2.0']);
  });

  it('handles empty params', async () => {
    const emptyParamsActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jest.fn().mockImplementation((key: string) => {
            const params: Record<string, string> = {};
            return params[key];
          }),
        },
      },
    } as unknown as ActivatedRoute;

    const { fixture } = await setup(
      mockMetadata,
      mockDoData as DigitalObjectsJsonLd,
      emptyParamsActivatedRoute,
      mockV1Service,
    );
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
    } as unknown as V1Service;

    const { fixture } = await setup(
      mockMetadata,
      mockDoData2 as DigitalObjectsJsonLd,
      mockActivatedRoute,
      mockV1Service2,
    );
    const instance = fixture.componentInstance;
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
    } as DigitalObjectsJsonLd;

    const { fixture } = await setup(mockMetadata, mockDoData3, mockActivatedRoute, mockV1Service);
    const instance = fixture.componentInstance;
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
    } as unknown as DigitalObjectMetadata;

    const { fixture } = await setup(
      mockMetadata2,
      mockDoData as DigitalObjectsJsonLd,
      mockActivatedRoute,
      mockV1Service,
    );

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
