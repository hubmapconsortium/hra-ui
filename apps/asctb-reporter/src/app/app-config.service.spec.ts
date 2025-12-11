import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../environments/environment';
import { ConfigService } from './app-config.service';
import { SheetDetails } from './models/sheet.model';

describe('ConfigService', () => {
  let service: ConfigService;
  let httpMock: HttpTestingController;

  const mockVersion = (viewValue: string, isDraft = false) => ({
    value: 'v1',
    viewValue: isDraft ? `${viewValue} (DRAFT)` : viewValue,
  });

  const mockSheet = (name: string, versions: ReturnType<typeof mockVersion>[]) =>
    ({
      name,
      display: name,
      title: name,
      config: { bimodal_distance_x: 50, bimodal_distance_y: 50, width: 800, height: 600 },
      version: versions,
    }) as SheetDetails;

  const mockSheetData = [
    mockSheet('heart', [mockVersion('V1'), mockVersion('V2', true)]),
    mockSheet('liver', [mockVersion('Draft', true)]),
    mockSheet('some', []),
  ];

  const mockOMAPData = [
    mockSheet('omap1', [mockVersion('V1'), mockVersion('V2', true)]),
    mockSheet('omap2', [mockVersion('Draft', true)]),
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ConfigService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('HTTP observables', () => {
    it.each([
      ['allSheetConfigurations$', environment.sheetConfigUrl, mockSheetData],
      ['allOMAPSheetConfigurations$', environment.omapSheetConfigUrl, mockOMAPData],
      ['config$', 'assets/configuration.json', { key: 'value' }],
    ])('should fetch and cache %s', (observable, url, mockData) => {
      let callCount = 0;
      const obs$ = service[observable as keyof typeof service] as typeof service.config$;
      obs$.subscribe(() => callCount++);
      obs$.subscribe((data: unknown) => {
        expect(data).toEqual(mockData);
        expect(callCount).toBe(1);
      });
      httpMock.expectOne(url).flush(mockData);
    });

    it('should complete observables after one emission', (done) => {
      let emissionCount = 0;
      service.allSheetConfigurations$.subscribe({
        next: () => emissionCount++,
        complete: () => {
          expect(emissionCount).toBe(1);
          done();
        },
      });
      httpMock.expectOne(environment.sheetConfigUrl).flush(mockSheetData);
    });
  });

  describe('sheetConfiguration$', () => {
    it('should filter DRAFT versions and empty sheets, but keep "some"', (done) => {
      service.sheetConfiguration$.subscribe((data) => {
        const heart = data.find((s) => s.name === 'heart');
        expect(heart?.version?.length).toBe(1);
        expect(heart?.version?.every((v) => !v.viewValue.includes('DRAFT'))).toBe(true);
        expect(data.some((s) => s.name === 'liver')).toBe(false);
        expect(data.some((s) => s.name === 'some')).toBe(true);
        done();
      });
      httpMock.expectOne(environment.sheetConfigUrl).flush(mockSheetData);
    });

    it('should handle undefined versions', (done) => {
      service.sheetConfiguration$.subscribe((data) => {
        expect(data.length).toBe(0);
        done();
      });
      httpMock.expectOne(environment.sheetConfigUrl).flush([{ ...mockSheet('test', []), version: undefined }]);
    });
  });

  describe('omapsheetConfiguration$', () => {
    it('should filter DRAFT versions and empty sheets', (done) => {
      service.omapsheetConfiguration$.subscribe((data) => {
        expect(data.length).toBe(1);
        expect(data[0].name).toBe('omap1');
        expect(data[0].version?.length).toBe(1);
        done();
      });
      httpMock.expectOne(environment.omapSheetConfigUrl).flush(mockOMAPData);
    });
  });

  describe('Error handling', () => {
    it.each([
      ['allSheetConfigurations$', environment.sheetConfigUrl, 404],
      ['allOMAPSheetConfigurations$', environment.omapSheetConfigUrl, 500],
      ['config$', 'assets/configuration.json', 403],
    ])('should handle errors for %s', (observable, url, status) => {
      const obs$ = service[observable as keyof typeof service] as typeof service.config$;
      obs$.subscribe({
        next: () => fail('should have errored'),
        error: (error: { status: number }) => expect(error.status).toBe(status),
      });
      httpMock.expectOne(url).flush('Error', { status, statusText: 'Error' });
    });
  });
});
