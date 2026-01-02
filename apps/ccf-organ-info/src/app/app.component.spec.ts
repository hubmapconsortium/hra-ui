import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { importProvidersFrom, signal } from '@angular/core';
import { AggregateCount, SpatialEntity, SpatialSceneNode, TissueBlock } from '@hra-api/ng-client';
import { NgxsDataPluginModule } from '@angular-ru/ngxs';
import { NgxsModule } from '@ngxs/store';
import { DataSourceService, GlobalConfigState } from 'ccf-shared';
import { BehaviorSubject, of } from 'rxjs';
import { AppComponent } from './app.component';
import { OrganLookupService } from './services/organ-lookup/organ-lookup.service';

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {
    // do nothing
  }
  unobserve() {
    // do nothing
  }
  disconnect() {
    // do nothing
  }
};

describe('AppComponent - Direct Tests', () => {
  const mockOrganInfo = {
    id: 'http://purl.obolibrary.org/obo/UBERON_0000948',
    name: 'Heart',
    organ: 'Heart',
    src: 'assets/organs/heart.svg',
    hasSex: true,
  };

  const mockSpatialEntity: SpatialEntity = {
    '@id': 'http://example.com/organ1',
    '@type': 'SpatialEntity',
    label: 'Heart',
    representation_of: 'http://purl.obolibrary.org/obo/UBERON_0000948',
    sex: 'Female',
    x_dimension: 100000,
    y_dimension: 200000,
    z_dimension: 150000,
    dimension_units: 'millimeter',
  } as SpatialEntity;

  const mockSceneNodes: SpatialSceneNode[] = [
    {
      '@id': 'node1',
      '@type': 'SpatialSceneNode',
      entityId: 'block1',
      color: [255, 255, 255, 255],
    } as SpatialSceneNode,
  ];

  const mockTissueBlocks: TissueBlock[] = [
    {
      '@id': 'block1',
      '@type': 'TissueBlock',
      label: 'Block 1',
      sampleType: 'Tissue Block',
      link: 'http://example.com/block1',
      datasets: [],
      donor: {
        '@id': 'donor1',
        '@type': 'Donor',
        label: 'Donor 1',
        link: 'http://example.com/donor1',
        providerName: 'Provider A',
      },
    } as TissueBlock,
  ];

  const mockAggregateCount: AggregateCount[] = [
    {
      count: 10,
      label: 'Donors',
    } as AggregateCount,
  ];

  const mockDataSourceService = {
    getReferenceOrgans: jest.fn().mockReturnValue(of([mockSpatialEntity])),
    getReferenceOrganScene: jest.fn().mockReturnValue(of(mockSceneNodes)),
    getAggregateResults: jest.fn().mockReturnValue(of(mockAggregateCount)),
    getTissueBlockResults: jest.fn().mockReturnValue(of(mockTissueBlocks)),
  };

  const mockOrganLookupService = {
    getOrganInfo: jest.fn().mockReturnValue(of(mockOrganInfo)),
    getOrgan: jest.fn().mockReturnValue(of(mockSpatialEntity)),
    getOrganScene: jest.fn().mockReturnValue(of(mockSceneNodes)),
    getBlocks: jest.fn().mockReturnValue(of(mockTissueBlocks)),
    getOrganStats: jest.fn().mockReturnValue(of(mockAggregateCount)),
  };

  // Create a mock GlobalConfigState that emits synchronously
  class MockGlobalConfigState {
    private config$ = new BehaviorSubject<any>({
      organIri: mockOrganInfo.id,
      sex: 'Female',
      side: 'Left',
      highlightProviders: [],
      donorLabel: undefined,
    });

    getOption(key: string) {
      return this.config$.asObservable();
    }

    getOptionSignal(key: string) {
      return signal(this.config$.value[key]);
    }

    patchConfig(patch: any) {
      this.config$.next({ ...this.config$.value, ...patch });
    }
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call updateInput method and update configuration', () => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        importProvidersFrom(NgxsDataPluginModule.forRoot(), NgxsModule.forRoot([])),
        {
          provide: GlobalConfigState,
          useClass: MockGlobalConfigState,
        },
        {
          provide: DataSourceService,
          useValue: mockDataSourceService,
        },
        {
          provide: OrganLookupService,
          useValue: mockOrganLookupService,
        },
      ],
    });

    const component = TestBed.createComponent(AppComponent).componentInstance;
    const configState = TestBed.inject(GlobalConfigState);
    const patchSpy = jest.spyOn(configState, 'patchConfig');

    component.updateInput('sex', 'Male');

    expect(patchSpy).toHaveBeenCalledWith({ sex: 'Male' });
  });

  it('should test without donorLabel to cover normalizeStatLabels undefined branch', () => {
    const mockConfigWithoutLabel = new MockGlobalConfigState();
    (mockConfigWithoutLabel as any).config$.next({
      organIri: mockOrganInfo.id,
      sex: 'Female',
      side: 'Left',
      highlightProviders: [],
      donorLabel: undefined, // Explicitly undefined to hit the branch
    });

    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        importProvidersFrom(NgxsDataPluginModule.forRoot(), NgxsModule.forRoot([])),
        {
          provide: GlobalConfigState,
          useValue: mockConfigWithoutLabel,
        },
        {
          provide: DataSourceService,
          useValue: mockDataSourceService,
        },
        {
          provide: OrganLookupService,
          useValue: mockOrganLookupService,
        },
      ],
    });

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // Trigger change detection
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should test with donorLabel to cover normalizeStatLabels defined branch', () => {
    const mockConfigWithLabel = new MockGlobalConfigState();
    (mockConfigWithLabel as any).config$.next({
      organIri: mockOrganInfo.id,
      sex: 'Female',
      side: 'Left',
      highlightProviders: [],
      donorLabel: 'Participants', // Explicitly defined to hit the other branch
    });

    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        importProvidersFrom(NgxsDataPluginModule.forRoot(), NgxsModule.forRoot([])),
        {
          provide: GlobalConfigState,
          useValue: mockConfigWithLabel,
        },
        {
          provide: DataSourceService,
          useValue: mockDataSourceService,
        },
        {
          provide: OrganLookupService,
          useValue: mockOrganLookupService,
        },
      ],
    });

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // Trigger change detection
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should test makeStatsLabel with undefined organIri', () => {
    const mockConfigNoIri = new MockGlobalConfigState();
    (mockConfigNoIri as any).config$.next({
      organIri: undefined, // Test with undefined IRI
      sex: 'Female',
      side: 'Left',
      highlightProviders: [],
      donorLabel: undefined,
    });

    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        importProvidersFrom(NgxsDataPluginModule.forRoot(), NgxsModule.forRoot([])),
        {
          provide: GlobalConfigState,
          useValue: mockConfigNoIri,
        },
        {
          provide: DataSourceService,
          useValue: mockDataSourceService,
        },
        {
          provide: OrganLookupService,
          useValue: mockOrganLookupService,
        },
      ],
    });

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // Trigger change detection
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should test makeStatsLabel with organ that has side property', () => {
    const organInfoWithSide = { ...mockOrganInfo, side: 'left' };
    const mockOrganLookupWithSide = {
      ...mockOrganLookupService,
      getOrganInfo: jest.fn().mockReturnValue(of(organInfoWithSide)),
    };

    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        importProvidersFrom(NgxsDataPluginModule.forRoot(), NgxsModule.forRoot([])),
        {
          provide: GlobalConfigState,
          useClass: MockGlobalConfigState,
        },
        {
          provide: DataSourceService,
          useValue: mockDataSourceService,
        },
        {
          provide: OrganLookupService,
          useValue: mockOrganLookupWithSide,
        },
      ],
    });

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // Trigger change detection
    expect(fixture.componentInstance).toBeTruthy();
  });
});
