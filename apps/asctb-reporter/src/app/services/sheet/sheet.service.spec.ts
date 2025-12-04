import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SheetService } from './sheet.service';

describe('SheetService', () => {
  let service: SheetService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SheetService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(SheetService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch sheet data with basic parameters', () => {
    const mockResponse = { data: 'test' };

    service.fetchSheetData('sheet1', 'gid1').subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne((request) => request.url.includes('/v2/sheet1/gid1'));
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch data from CSV URL', () => {
    const mockResponse = { data: 'csv-data' };

    service.fetchSheetData('sheet1', 'gid1', 'http://test.csv').subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne((request) => request.url.includes('/v2/csv'));
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should post form data', () => {
    const formData = new FormData();
    const mockResponse = { data: 'form-data' };

    service.fetchSheetData('sheet1', 'gid1', undefined, formData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne((request) => request.url.includes('/v2/csv'));
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(formData);
    req.flush(mockResponse);
  });

  it('should fetch graph data', () => {
    const mockResponse = { nodes: [], edges: [] };

    service.fetchSheetData('sheet1', 'gid1', undefined, undefined, 'graph').subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne((request) => request.url.includes('/v2/sheet1/gid1/graph'));
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch jsonld data', () => {
    const mockResponse = { '@context': 'test' };

    service.fetchSheetData('sheet1', 'gid1', undefined, undefined, 'jsonld').subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne((request) => request.url.includes('/v2/csv'));
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch bottom sheet data for valid ID', () => {
    const mockApiResponse = {
      description: 'Test description',
      link: 'http://test-link.com',
      label: 'Test Label',
    };

    service.fetchBottomSheetData('UBERON:0000001', 'Test').subscribe((response) => {
      expect(response.name).toBe('Test');
      expect(response.hasError).toBe(false);
    });

    const req = httpMock.expectOne((request) => request.url.includes('/lookup/UBERON/0000001'));
    req.flush(mockApiResponse);
  });

  it('should normalize FMA ID formats correctly', () => {
    const mockApiResponse = { description: 'Test', link: 'http://test.com', label: 'Test' };

    // Test fma12345 format
    service.fetchBottomSheetData('fma12345', 'Test').subscribe();
    let req = httpMock.expectOne((request) => request.url.includes('/lookup/FMA/12345'));
    req.flush(mockApiResponse);

    // Test FMA:12345 format (colon)
    service.fetchBottomSheetData('FMA:12345', 'Test').subscribe();
    req = httpMock.expectOne((request) => request.url.includes('/lookup/FMA/12345'));
    req.flush(mockApiResponse);
  });

  it('should handle invalid ID format', () => {
    service.fetchBottomSheetData('INVALID_ID', 'Test').subscribe({
      error: (error) => {
        expect(error).toBe('Invalid ID format');
      },
    });
  });

  it('should handle empty term ID', () => {
    service.fetchBottomSheetData('UBERON:', 'Test').subscribe({
      error: (error) => {
        expect(error).toBe('Invalid ID format');
      },
    });
  });

  it('should add body structure to data', () => {
    const testData = [
      {
        anatomical_structures: [{ name: 'Test', id: 'TEST:001', rdfs_label: 'test' }],
        cell_types: [],
        biomarkers: [],
        biomarkers_gene: [],
        biomarkers_protein: [],
        biomarkers_lipids: [],
        biomarkers_meta: [],
        biomarkers_prot: [],
        references: [],
        organName: '',
        tableVersion: '1.0',
      },
    ];

    const result = service.getDataWithBody(testData, 'heart');

    expect(result[0].anatomical_structures).toHaveLength(2);
    expect(result[0].anatomical_structures[0].name).toBe('Body');
    expect(result[0].organName).toBe('heart');
  });

  it('should form correct Google Sheets URL', () => {
    const result = service.formURL('sheet123', 'gid456');

    expect(result).toBe('https://docs.google.com/spreadsheets/d/sheet123/export?format=csv&gid=gid456');
  });

  it('should log data in testCallback', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    const testData = { test: 'data' } as unknown as JSON;

    const result = service.testCallback(testData);

    expect(consoleSpy).toHaveBeenCalledWith(testData);
    expect(result).toBe(testData);
    consoleSpy.mockRestore();
  });

  it('should fetch data from assets', () => {
    const mockSheet = {
      name: 'test-sheet',
      display: 'Test Sheet',
      config: { width: 800, height: 600, bimodal_distance_x: 10, bimodal_distance_y: 20 },
      title: 'Test Title',
    };
    const mockResponse = 'csv-data';

    service.fetchDataFromAssets('1.0', mockSheet).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/data/1.0/test-sheet.csv');
    expect(req.request.method).toBe('GET');
    expect(req.request.responseType).toBe('text');
    req.flush(mockResponse);
  });

  it('should fetch playground data', () => {
    const mockResponse = { data: 'playground-data' };

    service.fetchPlaygroundData().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('https://apps.humanatlas.io/asctb-api/v2/playground');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should update playground data', () => {
    const testData = [
      ['row1', 'col1'],
      ['row2', 'col2'],
    ];
    const mockResponse = { success: true };

    service.updatePlaygroundData(testData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('https://apps.humanatlas.io/asctb-api/v2/playground');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ data: testData });
    req.flush(mockResponse);
  });
});
