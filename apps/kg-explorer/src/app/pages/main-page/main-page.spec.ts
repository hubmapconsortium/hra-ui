import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { TableColumn } from '@hra-ui/design-system/table';
import { render } from '@testing-library/angular';
import { of } from 'rxjs';

import { AsctbTerms, DigitalObjectsJsonLd, TermsIndex } from '../../digital-objects-metadata.schema';
import { DownloadService } from '../../services/download.service';
import * as mockData from '../../testing/mock-data.json';
import * as mockMetadata from '../../testing/mock-metadata.json';
import { MainPageComponent } from './main-page.component';

describe('MainPageComponent', () => {
  const emptyTermsIndex: TermsIndex = { terms: [], purls: [], term_to_purls: [], purl_to_terms: [] };

  async function setup(
    doData?: DigitalObjectsJsonLd,
    asctbTerms?: AsctbTerms,
    termsIndex?: TermsIndex,
    actRoute?: ActivatedRoute,
    httpService?: HttpClient,
    mobile?: boolean,
  ) {
    return render(MainPageComponent, {
      componentInputs: {
        data: doData ?? ({ '@context': {}, '@graph': [] } as DigitalObjectsJsonLd),
        columns: columns as TableColumn[],
        asctbTerms: asctbTerms ?? [],
        termsIndex: termsIndex ?? emptyTermsIndex,
      },
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: actRoute },
        { provide: DownloadService, useValue: mockDownloadService },
        { provide: HttpClient, useValue: httpService ?? defaultMockHttpService },
        mobile ? mobileBreakpointsProvider : screenBreakpointsProvider,
      ],
    });
  }

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

  const mockDownloadService = {
    getDownloadOptions: jest.fn().mockReturnValue([]),
  };

  const defaultMockHttpService = {
    get: jest.fn().mockReturnValue(of({})),
  };

  const mobileBreakpointsProvider = {
    provide: BreakpointObserver,
    useValue: { observe: () => of({ matches: true, breakpoints: {} }) },
  };

  const screenBreakpointsProvider = {
    provide: BreakpointObserver,
    useValue: { observe: () => of({ matches: false, breakpoints: {} }) },
  };

  beforeAll(() => {
    if (typeof ResizeObserver === 'undefined') {
      window.ResizeObserver = jest.fn().mockImplementation(() => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      }));
    }
  });

  it('should initialize filters from query params', async () => {
    const { fixture } = await setup(
      mockData as DigitalObjectsJsonLd,
      [],
      emptyTermsIndex,
      mockActivatedRoute as unknown as ActivatedRoute,
    );
    const instance = fixture.componentInstance;
    const filters = instance.store.currentFilters();

    expect(filters.digitalObjects).toEqual(['2d-ftu']);
    expect(filters.releaseVersion).toEqual(['v1.2', 'v2.2']);
    expect(filters.organs).toEqual(['http://purl.obolibrary.org/obo/UBERON_0002113']);
    expect(filters.anatomicalStructures).toEqual(['aaa']);
    expect(filters.cellTypes).toEqual(['bbb']);
    expect(filters.biomarkers).toEqual(['ccc']);
    expect(filters.searchTerm).toBe('kidney');
  });

  it('should handle no data', async () => {
    const { fixture } = await setup(
      { '@context': {}, '@graph': [] } as DigitalObjectsJsonLd,
      [],
      emptyTermsIndex,
      mockActivatedRoute as unknown as ActivatedRoute,
    );
    const instance = fixture.componentInstance;
    expect(instance.filteredRows()).toEqual([]);
  });

  it('should initialize filters from query params (handles strings)', async () => {
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

    const { fixture } = await setup(
      mockData as DigitalObjectsJsonLd,
      [],
      emptyTermsIndex,
      mockActivatedRoute2 as unknown as ActivatedRoute,
    );

    const instance = fixture.componentInstance;
    const filters = instance.store.currentFilters();

    expect(filters.digitalObjects).toEqual(['2d-ftu']);
    expect(filters.releaseVersion).toEqual(['v1.2']);
    expect(filters.organs).toEqual(['http://purl.obolibrary.org/obo/UBERON_0002113']);
    expect(filters.anatomicalStructures).toEqual(['aaa']);
    expect(filters.cellTypes).toEqual(['bbb']);
    expect(filters.biomarkers).toEqual(['ccc']);
    expect(filters.searchTerm).toBe('kidney');
  });

  it('should initialize filters from query params (handles undefined)', async () => {
    const mockActivatedRoute3 = {
      queryParams: of({
        do: '2d-ftu',
        organs: 'http://purl.obolibrary.org/obo/UBERON_0002113',
      }),
    };
    const { fixture } = await setup(
      mockData as DigitalObjectsJsonLd,
      [],
      emptyTermsIndex,
      mockActivatedRoute3 as unknown as ActivatedRoute,
    );

    const instance = fixture.componentInstance;

    expect(instance.store.currentFilters()).toEqual({
      anatomicalStructures: [],
      biomarkers: [],
      cellTypes: [],
      digitalObjects: ['2d-ftu'],
      organs: ['http://purl.obolibrary.org/obo/UBERON_0002113'],
      releaseVersion: [],
      searchTerm: undefined,
    });
  });

  it('should compute version counts from data', async () => {
    const { fixture } = await setup(
      mockData as DigitalObjectsJsonLd,
      [],
      emptyTermsIndex,
      mockActivatedRoute as unknown as ActivatedRoute,
    );

    const instance = fixture.componentInstance;
    const versionCounts = instance.store.versionCounts();
    expect(versionCounts['v2.3']).toBe(2);
  });

  it('should update query params when filters change', async () => {
    const { fixture } = await setup(
      mockData as DigitalObjectsJsonLd,
      [],
      emptyTermsIndex,
      mockActivatedRoute as unknown as ActivatedRoute,
    );

    const instance = fixture.componentInstance;

    instance.handleFilterSelectionChanges({
      digitalObjects: [{ id: '2d-ftu', label: 'Object 2', count: 5 }],
      releaseVersion: [{ id: 'v2.0', label: 'v2.0', count: 3 }],
      organs: [{ id: 'lung', label: 'Lung', count: 2 }],
      anatomicalStructures: [{ id: 'aaa', label: 'aaa', count: 8 }],
      cellTypes: [{ id: 'bbb', label: 'bbb', count: 9 }],
      biomarkers: [{ id: 'ccc', label: 'ccc', count: 10 }],
    });

    expect(mockRouter.navigate).toHaveBeenCalledWith([''], {
      queryParams: {
        do: ['2d-ftu'],
        versions: ['v2.0'],
        organs: ['lung'],
        as: ['aaa'],
        ct: ['bbb'],
        b: ['ccc'],
        search: 'kidney', // preserved from initial filters
      },
    });
  });

  it('should update searchTerm when search input changes', async () => {
    const { fixture } = await setup(
      mockData as DigitalObjectsJsonLd,
      [],
      emptyTermsIndex,
      mockActivatedRoute as unknown as ActivatedRoute,
    );

    const instance = fixture.componentInstance;

    instance.searchControl.setValue('brain');
    expect(instance.store.currentFilters().searchTerm).toBe('brain');
  });

  it('should handle empty filter fields in handleFilterSelectionChanges', async () => {
    const { fixture } = await setup(
      mockData as DigitalObjectsJsonLd,
      [],
      emptyTermsIndex,
      mockActivatedRoute as unknown as ActivatedRoute,
    );

    const instance = fixture.componentInstance;

    instance.handleFilterSelectionChanges({
      digitalObjects: null,
      releaseVersion: null,
      organs: null,
      anatomicalStructures: null,
      cellTypes: null,
      biomarkers: null,
    });

    const filters = instance.store.currentFilters();
    expect(filters.digitalObjects).toBeUndefined();
    expect(filters.releaseVersion).toBeUndefined();
    expect(filters.organs).toBeUndefined();
    expect(filters.anatomicalStructures).toBeUndefined();
    expect(filters.cellTypes).toBeUndefined();
    expect(filters.biomarkers).toBeUndefined();
    // searchTerm is preserved from the initial route
    expect(filters.searchTerm).toBe('kidney');
  });

  it('applies ontology filters', async () => {
    const asctbTerms: AsctbTerms = [
      { asctb_type: 'AS', iri: 'http://purl.obolibrary.org/obo/UBERON_0002113', label: 'kidney' },
      { asctb_type: 'AS', iri: 'http://purl.obolibrary.org/obo/UBERON_0001678', label: 'outer cortex of kidney' },
    ];

    const { fixture } = await setup(
      mockData as DigitalObjectsJsonLd,
      asctbTerms,
      emptyTermsIndex,
      mockActivatedRoute as unknown as ActivatedRoute,
    );

    const instance = fixture.componentInstance;
    const anatomicalStructuresCategory = instance.filterCategories().find((c) => c.label === 'Anatomical structures');
    expect(anatomicalStructuresCategory?.options?.length).toEqual(2);
  });

  it('applies more filters', async () => {
    const routeWithDoAndSearch = {
      queryParams: of({
        do: ['2d-ftu'],
        search: 'kidney',
      }),
    };

    const { fixture } = await setup(
      mockData as DigitalObjectsJsonLd,
      [],
      emptyTermsIndex,
      routeWithDoAndSearch as unknown as ActivatedRoute,
    );

    const instance = fixture.componentInstance;
    // Trigger an extra CD cycle so rxResource resolves
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    // Only the 2d-ftu row with 'kidney' in the title should survive both filters
    expect(instance.filteredRows().length).toEqual(1);
  });

  it('sets search filter to null if blank', async () => {
    const { fixture } = await setup(
      mockData as DigitalObjectsJsonLd,
      [],
      emptyTermsIndex,
      mockActivatedRoute as unknown as ActivatedRoute,
    );

    const instance = fixture.componentInstance;
    instance.searchControl.setValue('');
    expect(instance.store.currentFilters().searchTerm).toBeNull();
  });

  it('should calculate scroll height based on screen size', async () => {
    const { fixture } = await setup(
      mockData as DigitalObjectsJsonLd,
      [],
      emptyTermsIndex,
      mockActivatedRoute as unknown as ActivatedRoute,
      undefined,
      false,
    );
    const instance = fixture.componentInstance;

    window.innerHeight = 1000;
    window.dispatchEvent(new Event('resize'));

    // instance['setScrollViewportHeight']();
    expect(instance.scrollHeight()).toBe(701);
  });

  it('should calculate scroll height on a small screen', async () => {
    const { fixture } = await setup(
      mockData as DigitalObjectsJsonLd,
      [],
      emptyTermsIndex,
      mockActivatedRoute as unknown as ActivatedRoute,
      undefined,
      true,
    );
    const instance = fixture.componentInstance;

    window.innerHeight = 1000;
    window.innerWidth = 500;
    window.dispatchEvent(new Event('resize'));

    // instance['setScrollViewportHeight']();
    expect(instance.scrollHeight()).toBe(741);
  });

  it('should attach download options to a row', async () => {
    const mockHttpService = {
      get: jest.fn().mockReturnValue(of(mockMetadata)),
    } as unknown as HttpClient;

    const { fixture } = await setup(
      mockData as DigitalObjectsJsonLd,
      [],
      emptyTermsIndex,
      mockActivatedRoute as unknown as ActivatedRoute,
      mockHttpService,
    );
    const instance = fixture.componentInstance;
    instance.downloadId.set('https://lod.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle/v1.2');
    instance['attachDownloadOptions']();
    expect(instance.download.getDownloadOptions).toHaveBeenCalled();
  });

  it('handles empty organ filters', async () => {
    const mockActivatedRoute2 = {
      queryParams: of({
        do: ['2d-ftu'],
        versions: ['v1.2', 'v2.2'],
        organs: [],
        as: ['aaa'],
        ct: ['bbb'],
        b: ['ccc'],
        search: 'kidney',
      }),
    };

    const { fixture } = await setup(
      mockData as DigitalObjectsJsonLd,
      [],
      emptyTermsIndex,
      mockActivatedRoute2 as unknown as ActivatedRoute,
    );
    const instance = fixture.componentInstance;
    expect(instance.filteredRows()).toEqual([]);
  });

  it('handles empty do filters', async () => {
    const mockActivatedRoute3 = {
      queryParams: of({
        do: [],
        versions: ['v1.2', 'v2.2'],
        organs: ['http://purl.obolibrary.org/obo/UBERON_0002113'],
        as: ['aaa'],
        ct: ['bbb'],
        b: ['ccc'],
        search: 'kidney',
      }),
    };

    const { fixture } = await setup(
      mockData as DigitalObjectsJsonLd,
      [],
      emptyTermsIndex,
      mockActivatedRoute3 as unknown as ActivatedRoute,
    );
    const instance = fixture.componentInstance;
    expect(instance.filteredRows()).toEqual([]);
  });
});
