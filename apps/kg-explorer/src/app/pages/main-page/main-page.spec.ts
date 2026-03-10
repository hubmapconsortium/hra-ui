import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { DigitalObjectsJsonLd, HraKgService, OntologyTree } from '@hra-api/ng-client';
import { FilterOptionCategory } from '@hra-ui/design-system/filter-menu';
import { SearchListOption } from '@hra-ui/design-system/search-list';
import { TableColumn } from '@hra-ui/design-system/table';
import { render } from '@testing-library/angular';
import { of } from 'rxjs';

import { DownloadService } from '../../services/download.service';
import * as mockData from '../../testing/mock-data.json';
import * as mockMetadata from '../../testing/mock-metadata.json';
import { MainPageComponent } from './main-page.component';

describe('MainPageComponent', () => {
  async function setup(
    doData?: DigitalObjectsJsonLd,
    asctbTermOccurrences?: [string, number][],
    ontologyTree?: OntologyTree,
    cellTypeTree?: OntologyTree,
    biomarkerTree?: OntologyTree,
    actRoute?: ActivatedRoute,
    kgService?: HraKgService,
    httpService?: HttpClient,
    mobile?: boolean,
  ) {
    return render(MainPageComponent, {
      componentInputs: {
        data: doData,
        columns: columns as TableColumn[],
        asctbTermOccurrences,
        ontologyTree,
        cellTypeTree,
        biomarkerTree,
      },
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: actRoute },
        { provide: DownloadService, useValue: mockDownloadService },
        { provide: HraKgService, useValue: kgService },
        { provide: HttpClient, useValue: httpService },
        provideHttpClientTesting(),
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

  const mockKgService = {
    doSearch: jest.fn().mockReturnValue(of([])),
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

  function getFiltersWithSelections(
    currentFilters: FilterOptionCategory<SearchListOption>[],
    selections: Partial<Record<string, string[]>>,
  ): FilterOptionCategory<SearchListOption>[] {
    return currentFilters.map((category) => {
      const selected = selections[category.id]?.map((id) => ({ id, label: id, count: 1 }));
      return {
        ...category,
        selected,
      };
    });
  }

  it('should initialize filters from query params', async () => {
    const { fixture } = await setup(
      mockData as DigitalObjectsJsonLd,
      [],
      { root: '', nodes: {} },
      { root: '', nodes: {} },
      { root: '', nodes: {} },
      mockActivatedRoute as unknown as ActivatedRoute,
      mockKgService as unknown as HraKgService,
    );
    const instance = fixture.componentInstance;
    const filters = instance.currentFilterIds();

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
      {} as DigitalObjectsJsonLd,
      [],
      { root: '', nodes: {} },
      { root: '', nodes: {} },
      { root: '', nodes: {} },
      mockActivatedRoute as unknown as ActivatedRoute,
      mockKgService as unknown as HraKgService,
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
      { root: '', nodes: {} },
      { root: '', nodes: {} },
      { root: '', nodes: {} },
      mockActivatedRoute2 as unknown as ActivatedRoute,
      mockKgService as unknown as HraKgService,
    );

    const instance = fixture.componentInstance;
    const filters = instance.currentFilterIds();

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
      { root: '', nodes: {} },
      { root: '', nodes: {} },
      { root: '', nodes: {} },
      mockActivatedRoute3 as unknown as ActivatedRoute,
      mockKgService as unknown as HraKgService,
    );

    const instance = fixture.componentInstance;

    expect(instance.currentFilterIds()).toEqual({
      anatomicalStructures: undefined,
      biomarkers: undefined,
      cellTypes: undefined,
      digitalObjects: ['2d-ftu'],
      organs: ['http://purl.obolibrary.org/obo/UBERON_0002113'],
      releaseVersion: undefined,
      searchTerm: '',
    });
  });

  it('should compute version counts from data', async () => {
    const { fixture } = await setup(
      mockData as DigitalObjectsJsonLd,
      [],
      { root: '', nodes: {} },
      { root: '', nodes: {} },
      { root: '', nodes: {} },
      mockActivatedRoute as unknown as ActivatedRoute,
      mockKgService as unknown as HraKgService,
    );

    const instance = fixture.componentInstance;
    const versionCounts = instance.versionCounts();
    expect(versionCounts['v2.3']).toBe(2);
  });

  it('should update query params when filters change', async () => {
    const { fixture } = await setup(
      mockData as DigitalObjectsJsonLd,
      [],
      { root: '', nodes: {} },
      { root: '', nodes: {} },
      { root: '', nodes: {} },
      mockActivatedRoute as unknown as ActivatedRoute,
      mockKgService as unknown as HraKgService,
    );

    const instance = fixture.componentInstance;

    instance.handleFilterSelectionChanges(
      getFiltersWithSelections(instance.filterCategories(), {
        digitalObjects: ['2d-ftu'],
        releaseVersion: ['v2.0'],
        organs: ['lung'],
        anatomicalStructures: ['aaa'],
        cellTypes: ['bbb'],
        biomarkers: ['ccc'],
      }),
    );

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
      { root: '', nodes: {} },
      { root: '', nodes: {} },
      { root: '', nodes: {} },
      mockActivatedRoute as unknown as ActivatedRoute,
      mockKgService as unknown as HraKgService,
    );

    const instance = fixture.componentInstance;

    instance.searchControl.setValue('brain');
    expect(instance.currentFilterIds().searchTerm).toBe('brain');
  });

  it('should handle empty filter fields in handleFilterSelectionChanges', async () => {
    const { fixture } = await setup(
      mockData as DigitalObjectsJsonLd,
      [],
      { root: '', nodes: {} },
      { root: '', nodes: {} },
      { root: '', nodes: {} },
      mockActivatedRoute as unknown as ActivatedRoute,
      mockKgService as unknown as HraKgService,
    );

    const instance = fixture.componentInstance;

    instance.currentFilterIds.set({
      ...instance.currentFilterIds(),
      searchTerm: undefined,
    });

    instance.handleFilterSelectionChanges(getFiltersWithSelections(instance.filterCategories(), {}));

    expect(instance.currentFilterIds()).toEqual({
      anatomicalStructures: undefined,
      biomarkers: undefined,
      cellTypes: undefined,
      digitalObjects: undefined,
      organs: undefined,
      releaseVersion: undefined,
      searchTerm: undefined,
    });
  });

  it('applies ontology filters', async () => {
    const { fixture } = await setup(
      mockData as DigitalObjectsJsonLd,
      [
        ['http://purl.obolibrary.org/obo/UBERON_0002113', 5],
        ['http://purl.obolibrary.org/obo/UBERON_0001678', 2],
        ['foo', 6],
      ],
      {
        root: 'root',
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
      { root: '', nodes: {} },
      { root: '', nodes: {} },
      mockActivatedRoute as unknown as ActivatedRoute,
      mockKgService as unknown as HraKgService,
    );

    const instance = fixture.componentInstance;
    const anatomicalStructuresFilter = instance
      .filterCategories()
      .find((category: FilterOptionCategory<SearchListOption>) => category.id === 'anatomicalStructures');
    expect(anatomicalStructuresFilter?.options?.length).toEqual(2);
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
    } as unknown as HraKgService;

    const { fixture } = await setup(
      mockData as DigitalObjectsJsonLd,
      [],
      { root: '', nodes: {} },
      { root: '', nodes: {} },
      { root: '', nodes: {} },
      mockActivatedRoute as unknown as ActivatedRoute,
      mockKgService2,
    );

    const instance = fixture.componentInstance;
    expect(instance.filteredRows().length).toEqual(1);
  });

  it('sets search filter to undefined if blank', async () => {
    const { fixture } = await setup(
      mockData as DigitalObjectsJsonLd,
      [],
      { root: '', nodes: {} },
      { root: '', nodes: {} },
      { root: '', nodes: {} },
      mockActivatedRoute as unknown as ActivatedRoute,
      mockKgService as unknown as HraKgService,
    );

    const instance = fixture.componentInstance;
    instance.searchControl.setValue('');
    expect(instance.currentFilterIds().searchTerm).toBeUndefined();
  });

  it('should calculate scroll height based on screen size', async () => {
    const { fixture } = await setup(
      mockData as DigitalObjectsJsonLd,
      [],
      { root: '', nodes: {} },
      { root: '', nodes: {} },
      { root: '', nodes: {} },
      mockActivatedRoute as unknown as ActivatedRoute,
      mockKgService as unknown as HraKgService,
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
      { root: '', nodes: {} },
      { root: '', nodes: {} },
      { root: '', nodes: {} },
      mockActivatedRoute as unknown as ActivatedRoute,
      mockKgService as unknown as HraKgService,
      undefined,
      true,
    );
    const instance = fixture.componentInstance;

    window.innerHeight = 1000;
    window.innerWidth = 500;
    window.dispatchEvent(new Event('resize'));

    expect(instance.scrollHeight()).toBe(741);
  });

  it('should attach download options to a row', async () => {
    const mockHttpService = {
      get: jest.fn().mockReturnValue(of(mockMetadata)),
    } as unknown as HttpClient;

    const { fixture } = await setup(
      mockData as DigitalObjectsJsonLd,
      [],
      { root: '', nodes: {} },
      { root: '', nodes: {} },
      { root: '', nodes: {} },
      mockActivatedRoute as unknown as ActivatedRoute,
      mockKgService as unknown as HraKgService,
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
      { root: '', nodes: {} },
      { root: '', nodes: {} },
      { root: '', nodes: {} },
      mockActivatedRoute2 as unknown as ActivatedRoute,
      mockKgService as unknown as HraKgService,
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
      { root: '', nodes: {} },
      { root: '', nodes: {} },
      { root: '', nodes: {} },
      mockActivatedRoute3 as unknown as ActivatedRoute,
      mockKgService as unknown as HraKgService,
    );
    const instance = fixture.componentInstance;
    expect(instance.filteredRows()).toEqual([]);
  });

  it('skips digital objects and organs filters when they are undefined (false branches)', async () => {
    // No 'do' and no 'organs' params → digitalObjects/organs stay undefined
    const routeNoDoOrOrgans = {
      queryParams: of({
        search: 'kidney',
      }),
    };

    // doSearch returns the kidney FTU purl so applyMoreFilters gets a real row
    const kgServiceWithResult = {
      doSearch: jest
        .fn()
        .mockReturnValue(of(['https://purl.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle'])),
    } as unknown as HraKgService;

    const { fixture } = await setup(
      mockData as DigitalObjectsJsonLd,
      [],
      { root: '', nodes: {} },
      { root: '', nodes: {} },
      { root: '', nodes: {} },
      routeNoDoOrOrgans as unknown as ActivatedRoute,
      kgServiceWithResult,
    );
    const instance = fixture.componentInstance;

    // Filters with undefined digitalObjects and undefined organs: both if-blocks are skipped
    expect(instance.currentFilterIds().digitalObjects).toBeUndefined();
    expect(instance.currentFilterIds().organs).toBeUndefined();
    // Row passes through (search term 'kidney' matches the title)
    expect(instance.filteredRows().length).toBeGreaterThan(0);
  });

  it('uses [] fallback for rows without organIds when filtering by organs', async () => {
    // The landmark fixture in mock-data has no organIds field
    const landmarkPurl = 'https://purl.humanatlas.io/landmark/main-bronchus-female-landmarks';

    const routeWithOrgansFilter = {
      queryParams: of({
        organs: ['http://purl.obolibrary.org/obo/UBERON_0002113'],
      }),
    };

    // doSearch returns the landmark purl so the row (organIds=undefined) reaches filterOrganResults
    const kgServiceLandmark = {
      doSearch: jest.fn().mockReturnValue(of([landmarkPurl])),
    } as unknown as HraKgService;

    const { fixture } = await setup(
      mockData as DigitalObjectsJsonLd,
      [],
      { root: '', nodes: {} },
      { root: '', nodes: {} },
      { root: '', nodes: {} },
      routeWithOrgansFilter as unknown as ActivatedRoute,
      kgServiceLandmark,
    );
    const instance = fixture.componentInstance;

    // The landmark row has organIds=undefined so the ?? [] fallback is used;
    // since [] contains no organ matching the filter, the row is excluded.
    expect(instance.filteredRows()).toEqual([]);
  });

  it('does not call getDownloadOptions when downloadId does not match any row', async () => {
    const mockHttpService = {
      get: jest.fn().mockReturnValue(of(mockMetadata)),
    } as unknown as HttpClient;

    const { fixture } = await setup(
      mockData as DigitalObjectsJsonLd,
      [],
      { root: '', nodes: {} },
      { root: '', nodes: {} },
      { root: '', nodes: {} },
      mockActivatedRoute as unknown as ActivatedRoute,
      mockKgService as unknown as HraKgService,
      mockHttpService,
    );
    const instance = fixture.componentInstance;

    // Clear call count accumulated by earlier tests before asserting
    mockDownloadService.getDownloadOptions.mockClear();

    // Set a downloadId that doesn't match any row's `id`
    instance.downloadId.set('https://lod.humanatlas.io/nonexistent/object/v1.0');
    instance['attachDownloadOptions']();
    expect(instance.download.getDownloadOptions).not.toHaveBeenCalled();
  });

  it('uses empty string fallback when searchTerm is undefined inside filterSearchFormResults', async () => {
    const { fixture } = await setup(
      mockData as DigitalObjectsJsonLd,
      [],
      { root: '', nodes: {} },
      { root: '', nodes: {} },
      { root: '', nodes: {} },
      mockActivatedRoute as unknown as ActivatedRoute,
      mockKgService as unknown as HraKgService,
    );
    const instance = fixture.componentInstance;

    // Force searchTerm to undefined so the ?? '' fallback fires inside filterSearchFormResults
    instance.currentFilterIds.set({ ...instance.currentFilterIds(), searchTerm: undefined });

    // Any non-empty title includes '' so all rows pass through
    const rows = [{ title: 'kidney test' }, { title: 'brain region' }] as Parameters<
      (typeof instance)['filterSearchFormResults']
    >[0];
    const result = instance['filterSearchFormResults'](rows);
    expect(result.length).toBe(2);
  });
});
