import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService, API_ENDPOINTS_CONFIG } from './data.service';
import { firstValueFrom } from 'rxjs';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  const mockEndpoints = {
    anatomicalUrl: 'http://test/anatomical',
    extractionSiteUrl: 'http://test/extraction',
    datasetCellUrl: 'http://test/dataset',
    extractionSiteDetailsUrl: 'http://test/details',
  };

  // Shared mock data
  const mockData = {
    anatomical: {
      organ: { value: 'Heart' },
      as: { value: 'structure1' },
      as_label: { value: 'Structure Label' },
      sex: { value: 'Male' },
      tool: { value: 'azimuth' },
      modality: { value: 'RNA' },
      cell_id: { value: 'cell1' },
      cell_label: { value: 'Cell Type' },
      cell_count: { value: '100' },
      cell_percentage: { value: '10.5' },
      dataset_count: { value: '1' },
    },
    extractionSite: {
      organ_id: { value: 'heart1' },
      organ: { value: 'Heart' },
      extraction_site: { value: 'site1' },
      sex: { value: 'Female' },
      tool: { value: 'celltypist' },
      modality: { value: 'RNA' },
      cell_id: { value: 'cell1' },
      cell_label: { value: 'T Cell' },
      cell_count: { value: '50' },
      cell_percentage: { value: '5.0' },
    },
    dataset: {
      organ_id: { value: 'heart1' },
      organ: { value: 'Heart' },
      dataset: { value: 'dataset1' },
      sex: { value: 'Male' },
      tool: { value: 'popv' },
      modality: { value: 'RNA' },
      cell_id: { value: 'cell1' },
      cell_label: { value: 'B Cell' },
      cell_count: { value: '25' },
      cell_percentage: { value: '2.5' },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: API_ENDPOINTS_CONFIG, useValue: mockEndpoints }],
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Consolidated success tests
  it.each([
    ['anatomical', 'getAnatomicalData', mockEndpoints.anatomicalUrl, mockData.anatomical, null],
    ['extraction site', 'getExtractionSiteData', mockEndpoints.extractionSiteUrl, mockData.extractionSite, 'site1'],
    ['dataset', 'getDatasetCellData', mockEndpoints.datasetCellUrl, mockData.dataset, null],
  ])(
    'should handle %s data success',
    async (dataType, method, url, data, detailsIri) => {
      const mockResponse = { results: { bindings: [data] } };
      const dataPromise = firstValueFrom((service as any)[method]());
      httpMock.expectOne(url).flush(mockResponse);

      if (detailsIri) {
        httpMock.expectOne(`${mockEndpoints.extractionSiteDetailsUrl}?iri=${detailsIri}`).flush({});
      }

      const result = await dataPromise;
      expect(result).toHaveLength(1);
      expect((result as any)[0].organ).toBe('Heart');
    },
    10000,
  );

  // Consolidated validation error tests
  it.each([
    ['anatomical', 'getAnatomicalData', mockEndpoints.anatomicalUrl, 'Invalid anatomical data format'],
    [
      'extraction site',
      'getExtractionSiteData',
      mockEndpoints.extractionSiteUrl,
      'Invalid extraction site data format',
    ],
    ['dataset', 'getDatasetCellData', mockEndpoints.datasetCellUrl, 'Invalid dataset cell data format'],
  ])('should handle %s data validation error', async (dataType, method, url, expectedError) => {
    const invalidResponse =
      dataType === 'anatomical' ? { results: { bindings: [{ invalid: 'data' }] } } : { results: { bindings: [{}] } };

    try {
      const dataPromise = firstValueFrom((service as any)[method]());
      httpMock.expectOne(url).flush(invalidResponse);
      await dataPromise;
      fail('Should have thrown error');
    } catch (error) {
      expect((error as Error).message).toContain(expectedError);
    }
  });

  // Consolidated unknown error tests
  it.each([
    [
      'anatomical',
      'getAnatomicalData',
      mockEndpoints.anatomicalUrl,
      '../utils/models/anatomical-data.model',
      'parseAnatomical',
      mockData.anatomical,
      'String error',
    ],
    [
      'extraction site',
      'getExtractionSiteData',
      mockEndpoints.extractionSiteUrl,
      '../utils/models/extraction-site-data.model',
      'parseExtractionSite',
      mockData.extractionSite,
      Symbol('symbol error'),
    ],
    [
      'dataset',
      'getDatasetCellData',
      mockEndpoints.datasetCellUrl,
      '../utils/models/dataset-cell-data.model',
      'parseDatasetCell',
      mockData.dataset,
      null,
    ],
  ])('should handle unknown error in %s data', async (_, method, url, modulePath, parseFunction, data, errorObject) => {
    jest.spyOn(require(modulePath), parseFunction).mockImplementationOnce(() => {
      throw errorObject;
    });

    try {
      const dataPromise = firstValueFrom((service as any)[method]());
      httpMock.expectOne(url).flush({ results: { bindings: [data] } });
      await dataPromise;
      fail('Should have thrown error');
    } catch (error) {
      expect((error as Error).message).toContain('Unknown error');
    }
  });

  it('should handle empty extraction site data', async () => {
    const dataPromise = firstValueFrom(service.getExtractionSiteData());
    httpMock.expectOne(mockEndpoints.extractionSiteUrl).flush({ results: { bindings: [] } });
    const result = await dataPromise;
    expect(result).toEqual([]);
  });

  it('should handle extraction site enhancement failure', async () => {
    const dataPromise = firstValueFrom(service.getExtractionSiteData());
    httpMock.expectOne(mockEndpoints.extractionSiteUrl).flush({ results: { bindings: [mockData.extractionSite] } });
    httpMock.expectOne(`${mockEndpoints.extractionSiteDetailsUrl}?iri=site1`).error(new ErrorEvent('Network error'));
    const result = await dataPromise;
    expect(result).toHaveLength(1);
  }, 10000);

  it('should handle invalid IRI formats in extraction site label', () => {
    expect(service.getExtractionSiteLabel('invalid-iri', 'Heart')).toContain('htan-heart');
    expect(service.getExtractionSiteLabel('', 'Lung')).toContain('unknown');
  });

  it('should use cached extraction site details and format correctly', async () => {
    const mockResponse = {
      results: {
        bindings: [
          {
            organ_id: { value: 'heart1' },
            organ: { value: 'Heart' },
            extraction_site: { value: 'cached-site' },
            sex: { value: 'Male' },
            tool: { value: 'azimuth' },
            modality: { value: 'RNA' },
            cell_id: { value: 'cell1' },
            cell_label: { value: 'T Cell' },
            cell_count: { value: '50' },
            cell_percentage: { value: '5.0' },
          },
        ],
      },
    };

    // Call extraction site data which will populate cache
    const dataPromise = firstValueFrom(service.getExtractionSiteData());
    httpMock.expectOne(mockEndpoints.extractionSiteUrl).flush(mockResponse);
    httpMock.expectOne(`${mockEndpoints.extractionSiteDetailsUrl}?iri=cached-site`).flush({
      '@id': 'cached-site',
      creator_last_name: 'Smith',
      creation_date: '2023-01-15',
    });

    const result = await dataPromise;
    expect(result[0].extractionSiteLabel).toContain('smith');

    // Now test the label formatting with cached details
    const label = service.getExtractionSiteLabel('cached-site', 'Heart');
    expect(label).toMatch(/htan-heart-smith-2023-cached-site/);
  }, 10000);

  // Cover line 185: cache hit path in getExtractionSiteDetails
  it('should return cached extraction site details', async () => {
    const cachedDetails = { '@id': 'cached-site', creator_last_name: 'Smith', creation_date: '2023-01-15' };

    // First call to populate cache
    const dataPromise1 = firstValueFrom(service.getExtractionSiteData());
    httpMock.expectOne(mockEndpoints.extractionSiteUrl).flush({
      results: {
        bindings: [
          {
            organ_id: { value: 'heart1' },
            organ: { value: 'Heart' },
            extraction_site: { value: 'cached-site' },
            sex: { value: 'Male' },
            tool: { value: 'azimuth' },
            modality: { value: 'RNA' },
            cell_id: { value: 'cell1' },
            cell_label: { value: 'T Cell' },
            cell_count: { value: '50' },
            cell_percentage: { value: '5.0' },
          },
        ],
      },
    });
    httpMock.expectOne(`${mockEndpoints.extractionSiteDetailsUrl}?iri=cached-site`).flush(cachedDetails);
    await dataPromise1;

    // Second call should hit cache (line 185)
    const dataPromise2 = firstValueFrom(service.getExtractionSiteData());
    httpMock.expectOne(mockEndpoints.extractionSiteUrl).flush({
      results: {
        bindings: [
          {
            organ_id: { value: 'heart1' },
            organ: { value: 'Heart' },
            extraction_site: { value: 'cached-site' },
            sex: { value: 'Male' },
            tool: { value: 'azimuth' },
            modality: { value: 'RNA' },
            cell_id: { value: 'cell1' },
            cell_label: { value: 'T Cell' },
            cell_count: { value: '50' },
            cell_percentage: { value: '5.0' },
          },
        ],
      },
    });
    // No HTTP call for details - should use cache

    const result = await dataPromise2;
    expect(result[0].extractionSiteLabel).toContain('smith');
  }, 10000);

  it('should return original data when formatExtractionSiteLabel throws error', async () => {
    jest.spyOn(service as any, 'formatExtractionSiteLabel').mockImplementationOnce(() => {
      throw new Error('Formatting failed');
    });

    const dataPromise = firstValueFrom(service.getExtractionSiteData());
    httpMock.expectOne(mockEndpoints.extractionSiteUrl).flush({ results: { bindings: [mockData.extractionSite] } });
    httpMock.expectOne(`${mockEndpoints.extractionSiteDetailsUrl}?iri=site1`).flush({});

    const result = await dataPromise;
    expect(result).toHaveLength(1);
    expect(result[0].organ).toBe('Heart');
  }, 10000);

  it('should use default API endpoints when not provided', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    const defaultService = TestBed.inject(DataService);
    expect(defaultService).toBeTruthy();
  });
});
