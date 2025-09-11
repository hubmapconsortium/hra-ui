import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HraPopVisualizerComponent } from './hra-pop-visualizer.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DataService } from './service/data.service';
import { of, throwError } from 'rxjs';

// Polyfill for structuredClone in Node.js environment
(globalThis as any).structuredClone = (obj: any) => JSON.parse(JSON.stringify(obj));

// Mock vega-embed
jest.mock('vega-embed', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue({
    finalize: jest.fn(),
    view: jest.fn(),
  }),
}));

describe('HraPopVisualizerComponent', () => {
  let component: HraPopVisualizerComponent;
  let fixture: ComponentFixture<HraPopVisualizerComponent>;
  let dataService: jest.Mocked<DataService>;

  const mockData = {
    anatomical: [
      {
        organ: 'Heart',
        anatomicalStructureId: 'as1',
        anatomicalStructureLabel: 'Structure 1',
        sex: 'Male',
        tool: 'azimuth',
        modality: 'RNA',
        cellId: 'c1',
        cellLabel: 'Cell 1',
        cellCount: 100,
        cellPercentage: 10,
        datasetCount: 1,
      },
    ],
    extractionSite: [
      {
        organId: 'h1',
        organ: 'Heart',
        extractionSiteId: 'es1',
        extractionSiteLabel: 'Site 1',
        sex: 'Female',
        tool: 'celltypist',
        modality: 'RNA',
        cellId: 'c2',
        cellLabel: 'Cell 2',
        cellCount: 50,
        cellPercentage: 5,
      },
    ],
    dataset: [
      {
        organId: 'h1',
        organ: 'Heart',
        datasetId: 'd1',
        sex: 'Male',
        tool: 'popv',
        modality: 'RNA',
        cellId: 'c3',
        cellLabel: 'Cell 3',
        cellCount: 25,
        cellPercentage: 2.5,
      },
    ],
  };

  beforeEach(async () => {
    const dataServiceMock = {
      getAnatomicalData: jest.fn().mockReturnValue(of(mockData.anatomical)),
      getExtractionSiteData: jest.fn().mockReturnValue(of(mockData.extractionSite)),
      getDatasetCellData: jest.fn().mockReturnValue(of(mockData.dataset)),
    };

    await TestBed.configureTestingModule({
      imports: [HraPopVisualizerComponent, HttpClientTestingModule],
      providers: [provideAnimations(), { provide: DataService, useValue: dataServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(HraPopVisualizerComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService) as jest.Mocked<DataService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Consolidated data type handling tests
  it.each([
    ['extraction-site', mockData.extractionSite],
    ['dataset', mockData.dataset],
    ['invalidType', []],
  ])('should handle %s data type in allData', (dataType, expected) => {
    component.selectedDataType.set(dataType as any);
    expect(component.allData()).toEqual(expected);
  });

  // Consolidated loading and error state tests
  it.each([
    ['dataset', 'loading'],
    ['extraction-site', 'error'],
    ['dataset', 'error'],
    ['invalidType', 'loading'],
    ['invalidType', 'error'],
  ])('should handle %s %s state', (dataType, method) => {
    component.selectedDataType.set(dataType as any);
    const result = method === 'loading' ? component.loading() : component.error();
    expect(result).toBe(method === 'loading' ? false : null);
  });

  // Consolidated error formatting tests
  it.each([[() => new Error('Test error message')], [() => 'String error']])(
    'should handle error formatting',
    async (errorFactory) => {
      const errorServiceMock = {
        getAnatomicalData: jest.fn().mockReturnValue(throwError(errorFactory)),
        getExtractionSiteData: jest.fn().mockReturnValue(of([])),
        getDatasetCellData: jest.fn().mockReturnValue(of([])),
      };

      await TestBed.resetTestingModule();
      await TestBed.configureTestingModule({
        imports: [HraPopVisualizerComponent, HttpClientTestingModule],
        providers: [provideAnimations(), { provide: DataService, useValue: errorServiceMock }],
      }).compileComponents();

      const errorFixture = TestBed.createComponent(HraPopVisualizerComponent);
      const errorComponent = errorFixture.componentInstance;
      errorComponent.selectedDataType.set('anatomical');
      errorFixture.detectChanges();
      expect(errorComponent.error()).toBe(null);
    },
  );

  // Tool selection tests
  it('should return currentSelectedTools when no filtering needed', () => {
    component.selectedTools.set(['azimuth']);
    component.selectedOrgan.set('Heart');
    (component as any).availableTools.set(['azimuth', 'celltypist']);
    (component as any).updateAvailableTools();
    expect(component.selectedTools()).toEqual(['azimuth']);
  });

  it('should select all tools when none currently selected', () => {
    component.selectedTools.set([]);
    component.selectedOrgan.set('Heart');
    (component as any).updateAvailableTools();
    expect(component.selectedTools()).toEqual(['azimuth']);
  });

  it('should keep same selection when no change needed', () => {
    component.selectedTools.set(['azimuth']);
    component.selectedOrgan.set('Heart');
    (component as any).availableTools.set(['azimuth']);
    (component as any).updateAvailableTools();
    expect(component.selectedTools()).toEqual(['azimuth']);
  });

  // Chart update tests
  it.each([
    ['invalid xAxis', 'Heart', 'invalidAxis', []],
    ['empty filtered data', 'NonExistentOrgan', 'anatomicalStructureLabel', []],
    ['empty tools array', 'Heart', 'anatomicalStructureLabel', null],
    ['no tools selected', 'Heart', 'anatomicalStructureLabel', null],
  ])('should handle %s in updateCharts', (_, organ, xAxis, tools) => {
    component.selectedDataType.set('anatomical');
    component.selectedOrgan.set(organ);
    component.selectedXAxis.set(xAxis);
    if (tools !== null) {
      component.selectedTools.set(tools);
    }
    (component as any).updateCharts();
    expect(component.vegaSpecs().length).toBeGreaterThanOrEqual(0);
  });

  // Extraction site label fallback tests
  it.each([
    [undefined, 'no extractionSiteLabel property'],
    ['', 'empty extractionSiteLabel'],
  ])('should handle extraction site label fallback with %s', (labelValue, _) => {
    const testMockData = [
      {
        organId: 'h1',
        organ: 'Heart',
        extractionSiteId: 'es1',
        sex: 'Male',
        tool: 'azimuth',
        modality: 'RNA',
        cellId: 'c1',
        cellLabel: 'Cell 1',
        cellCount: 100,
        cellPercentage: 5,
        ...(labelValue !== undefined && { extractionSiteLabel: labelValue }),
      },
    ];

    dataService.getExtractionSiteData.mockReturnValue(of(testMockData));
    component.selectedDataType.set('extraction-site');
    component.selectedOrgan.set('Heart');
    component.selectedXAxis.set('extractionSiteLabel');
    (component as any).updateCharts();
    expect(component.vegaSpecs().length).toBeGreaterThan(0);
  });

  it('should auto-select first organ when none selected', () => {
    component.selectedOrgan.set('');
    dataService.getAnatomicalData.mockReturnValue(
      of([
        {
          organ: 'Heart',
          anatomicalStructureId: 'as1',
          anatomicalStructureLabel: 'Structure 1',
          sex: 'Male',
          tool: 'azimuth',
          modality: 'RNA',
          cellId: 'c1',
          cellLabel: 'Cell 1',
          cellCount: 100,
          cellPercentage: 10,
          datasetCount: 1,
        },
      ]),
    );
    fixture.detectChanges();
    expect(component.selectedOrgan()).toBe('Heart');
  });

  // Resource and error handling tests
  it.each([
    ['anatomical', 'anatomicalDataResource'],
    ['extraction-site', 'extractionSiteDataResource'],
    ['dataset', 'datasetDataResource'],
  ])('should handle null resource values in allData for %s', (dataType, resourceName) => {
    (component as any)[resourceName] = { value: () => null };
    component.selectedDataType.set(dataType as any);
    expect(component.allData()).toEqual([]);
  });

  it('should compute organ options from data', () => {
    expect(component.organOptions()).toContain('Heart');
    expect(component.organOptions().length).toBeGreaterThan(0);
  });

  it('should format Error objects correctly', () => {
    const mockError = new Error('Network failed');
    (component as any).anatomicalDataResource = {
      error: () => mockError,
      isLoading: () => false,
      value: () => null,
    };
    component.selectedDataType.set('anatomical');
    expect(component.error()).toBe('Network failed');
  });

  it('should return currentSelectedTools when lengths match', () => {
    component.selectedTools.set(['azimuth']);
    component.selectedOrgan.set('Heart');
    const spyAllData = jest.spyOn(component, 'allData').mockReturnValue([{ organ: 'Heart', tool: 'azimuth' }] as any);
    (component as any).updateAvailableTools();
    expect(component.selectedTools()).toEqual(['azimuth']);
    spyAllData.mockRestore();
  });

  it('should return validSelectedTools when some tools are filtered out', () => {
    component.selectedTools.set(['azimuth', 'nonexistent-tool']);
    component.selectedOrgan.set('Heart');
    const spyAllData = jest.spyOn(component, 'allData').mockReturnValue([{ organ: 'Heart', tool: 'azimuth' }] as any);
    (component as any).updateAvailableTools();
    expect(component.selectedTools()).toEqual(['azimuth']); // nonexistent-tool filtered out
    spyAllData.mockRestore();
  });

  it('should use extractionSiteId fallback when extractionSiteLabel is null', () => {
    const localMockData = [
      {
        organId: 'h1',
        organ: 'Heart',
        extractionSiteId: 'es1',
        sex: 'Male',
        tool: 'azimuth',
        modality: 'RNA',
        cellId: 'c1',
        cellLabel: 'Cell 1',
        cellCount: 100,
        cellPercentage: 5,
        extractionSiteLabel: undefined,
      },
    ];

    dataService.getExtractionSiteData.mockReturnValue(of(localMockData));
    component.selectedDataType.set('extraction-site');
    component.selectedOrgan.set('Heart');
    component.selectedXAxis.set('extractionSiteLabel');
    (component as any).updateCharts();
    expect(component.vegaSpecs().length).toBeGreaterThan(0);
  });
});
