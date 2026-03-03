import { NgxsDataPluginModule } from '@angular-ru/ngxs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { importProvidersFrom, signal } from '@angular/core';
import { AggregateCount, SpatialEntity, SpatialSceneNode, TissueBlock, TissueBlockTypeEnum } from '@hra-api/ng-client';
import { provideDesignSystem } from '@hra-ui/design-system';
import { NgxsModule } from '@ngxs/store';
import { fireEvent, render, screen, waitFor } from '@testing-library/angular';
import { DataSourceService, GlobalConfigState } from 'ccf-shared';
import { BehaviorSubject, of } from 'rxjs';
import { AppComponent } from './app.component';
import { OrganLookupService } from './services/organ-lookup/organ-lookup.service';

global.ResizeObserver = class ResizeObserver {
  observe() {
    /* noop */
  }
  unobserve() {
    /* noop */
  }
  disconnect() {
    /* noop */
  }
};

describe('AppComponent', () => {
  const mockOrganInfo = {
    id: 'http://purl.obolibrary.org/obo/UBERON_0000948',
    name: 'Heart',
    organ: 'Heart',
    src: 'organ:heart',
    hasSex: true,
  };

  const mockOrganInfoWithSide = { ...mockOrganInfo, side: 'left' as const };
  const mockOrganInfoNoSex = { ...mockOrganInfo, hasSex: false };

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

  const mockSpatialEntityMale = { ...mockSpatialEntity, sex: 'Male' } as SpatialEntity;
  const mockSpatialEntityNoSex = { ...mockSpatialEntity, sex: undefined } as unknown as SpatialEntity;

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
      '@type': TissueBlockTypeEnum.Sample,
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
    { count: 10, label: 'Donors' } as AggregateCount,
    { count: 5, label: 'Samples' } as AggregateCount,
  ];

  const mockDataSourceService = {
    getReferenceOrgans: jest.fn().mockReturnValue(of([mockSpatialEntity])),
    getReferenceOrganScene: jest.fn().mockReturnValue(of(mockSceneNodes)),
    getAggregateResults: jest.fn().mockReturnValue(of(mockAggregateCount)),
    getTissueBlockResults: jest.fn().mockReturnValue(of(mockTissueBlocks)),
  };

  const createMockLookupService = (overrides = {}) => ({
    getOrganInfo: jest.fn().mockReturnValue(of(mockOrganInfo)),
    getOrgan: jest.fn().mockReturnValue(of(mockSpatialEntity)),
    getOrganScene: jest.fn().mockReturnValue(of(mockSceneNodes)),
    getBlocks: jest.fn().mockReturnValue(of(mockTissueBlocks)),
    getOrganStats: jest.fn().mockReturnValue(of(mockAggregateCount)),
    ...overrides,
  });

  function createMockGlobalConfigState(config: Record<string, unknown> = {}) {
    const defaultConfig = {
      organIri: mockOrganInfo.id,
      sex: 'Female',
      side: 'Left',
      highlightProviders: [],
      donorLabel: undefined,
      ...config,
    };
    return {
      config$: new BehaviorSubject<Record<string, unknown>>(defaultConfig),
      getOption() {
        return this.config$.asObservable();
      },
      getOptionSignal(key: string) {
        return signal(this.config$.value[key]);
      },
      patchConfig(patch: Record<string, unknown>) {
        this.config$.next({ ...this.config$.value, ...patch });
      },
    };
  }

  const createProviders = (
    configState: ReturnType<typeof createMockGlobalConfigState>,
    lookupService = createMockLookupService(),
  ) => [
    provideDesignSystem(),
    provideHttpClient(),
    provideHttpClientTesting(),
    importProvidersFrom(NgxsDataPluginModule.forRoot(), NgxsModule.forRoot([])),
    { provide: DataSourceService, useValue: mockDataSourceService },
    { provide: OrganLookupService, useValue: lookupService },
    { provide: GlobalConfigState, useValue: configState },
  ];

  beforeEach(() => jest.clearAllMocks());

  it('should render component with title', async () => {
    await render(AppComponent, { providers: createProviders(createMockGlobalConfigState()) });

    expect(screen.getByText('Organ Information')).toBeInTheDocument();
  });

  it('should display Loading... text initially', async () => {
    await render(AppComponent, { providers: createProviders(createMockGlobalConfigState()) });

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should display statsLabel with organ info after loading', async () => {
    await render(AppComponent, { providers: createProviders(createMockGlobalConfigState()) });

    await waitFor(() => {
      expect(screen.getByText(/Female, Heart/)).toBeInTheDocument();
    });
  });

  it('should display Unknown IRI when organInfo is undefined', async () => {
    const lookupService = createMockLookupService({ getOrganInfo: jest.fn().mockReturnValue(of(undefined)) });
    await render(AppComponent, { providers: createProviders(createMockGlobalConfigState(), lookupService) });

    await waitFor(() => {
      expect(screen.getByText(/Unknown IRI/)).toBeInTheDocument();
    });
  });

  it('should display side in statsLabel when organ has side', async () => {
    const lookupService = createMockLookupService({
      getOrganInfo: jest.fn().mockReturnValue(of(mockOrganInfoWithSide)),
    });
    await render(AppComponent, { providers: createProviders(createMockGlobalConfigState(), lookupService) });

    await waitFor(() => {
      expect(screen.getByText(/Female, Heart, Left/)).toBeInTheDocument();
    });
  });

  it('should render sex toggle buttons', async () => {
    await render(AppComponent, { providers: createProviders(createMockGlobalConfigState()) });

    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(screen.getByText('Female')).toBeInTheDocument();
  });

  it('should render side toggle buttons', async () => {
    await render(AppComponent, { providers: createProviders(createMockGlobalConfigState()) });

    expect(screen.getByText('Left')).toBeInTheDocument();
    expect(screen.getByText('Right')).toBeInTheDocument();
  });

  it('should call patchConfig when sex toggle is clicked', async () => {
    const configState = createMockGlobalConfigState();
    const patchSpy = jest.spyOn(configState, 'patchConfig');
    await render(AppComponent, { providers: createProviders(configState) });

    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

    const maleButton = screen.getByText('Male');
    fireEvent.click(maleButton);

    expect(patchSpy).toHaveBeenCalledWith({ sex: 'Male' });
  });

  it('should call patchConfig when side toggle is clicked', async () => {
    const configState = createMockGlobalConfigState();
    const patchSpy = jest.spyOn(configState, 'patchConfig');
    const lookupService = createMockLookupService({
      getOrgan: jest.fn().mockReturnValue(of({ ...mockSpatialEntity, side: 'Left' })),
    });
    await render(AppComponent, { providers: createProviders(configState, lookupService) });

    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

    const rightButton = screen.getByText('Right');
    fireEvent.click(rightButton);

    expect(patchSpy).toHaveBeenCalledWith({ side: 'Right' });
  });

  it('should render stats table with Donors label', async () => {
    await render(AppComponent, { providers: createProviders(createMockGlobalConfigState()) });

    await waitFor(() => {
      expect(screen.getByText('Donors')).toBeInTheDocument();
      expect(screen.getByText('Samples')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
    });
  });

  it('should render stats table with custom donorLabel', async () => {
    await render(AppComponent, {
      providers: createProviders(createMockGlobalConfigState({ donorLabel: 'Participants' })),
    });

    await waitFor(() => {
      expect(screen.getByText('Participants')).toBeInTheDocument();
      expect(screen.queryByText('Donors')).not.toBeInTheDocument();
    });
  });

  describe('organInfo resource', () => {
    it('should not call getOrganInfo when organIri is undefined', async () => {
      const lookupService = createMockLookupService();
      await render(AppComponent, {
        providers: createProviders(createMockGlobalConfigState({ organIri: undefined }), lookupService),
      });

      await waitFor(() => expect(lookupService.getOrganInfo).not.toHaveBeenCalled());
    });

    it('should call getOrganInfo with lowercase side', async () => {
      const lookupService = createMockLookupService();
      await render(AppComponent, {
        providers: createProviders(createMockGlobalConfigState({ side: 'Left' }), lookupService),
      });

      await waitFor(() => expect(lookupService.getOrganInfo).toHaveBeenCalledWith(mockOrganInfo.id, 'left'));
    });

    it('should call getOrganInfo with undefined side when not configured', async () => {
      const lookupService = createMockLookupService();
      await render(AppComponent, {
        providers: createProviders(createMockGlobalConfigState({ side: undefined }), lookupService),
      });

      await waitFor(() => expect(lookupService.getOrganInfo).toHaveBeenCalledWith(mockOrganInfo.id, undefined));
    });
  });

  describe('organ resource', () => {
    it('should pass sex to getOrgan when hasSex is true', async () => {
      const lookupService = createMockLookupService();
      await render(AppComponent, {
        providers: createProviders(createMockGlobalConfigState({ sex: 'Female' }), lookupService),
      });

      await waitFor(() => expect(lookupService.getOrgan).toHaveBeenCalledWith(mockOrganInfo, 'Female'));
    });

    it('should pass undefined sex to getOrgan when hasSex is false', async () => {
      const lookupService = createMockLookupService({
        getOrganInfo: jest.fn().mockReturnValue(of(mockOrganInfoNoSex)),
      });
      await render(AppComponent, {
        providers: createProviders(createMockGlobalConfigState({ sex: 'Male' }), lookupService),
      });

      await waitFor(() => expect(lookupService.getOrgan).toHaveBeenCalledWith(mockOrganInfoNoSex, undefined));
    });

    it('should not call getOrgan when organInfo is undefined', async () => {
      const lookupService = createMockLookupService({ getOrganInfo: jest.fn().mockReturnValue(of(undefined)) });
      await render(AppComponent, { providers: createProviders(createMockGlobalConfigState(), lookupService) });

      await waitFor(() => expect(lookupService.getOrgan).not.toHaveBeenCalled());
    });
  });

  describe('scene resource', () => {
    it('should call getOrganScene with Female sex', async () => {
      const lookupService = createMockLookupService();
      await render(AppComponent, { providers: createProviders(createMockGlobalConfigState(), lookupService) });

      await waitFor(() => expect(lookupService.getOrganScene).toHaveBeenCalledWith(mockOrganInfo, 'Female'));
    });

    it('should call getOrganScene with Male sex', async () => {
      const lookupService = createMockLookupService({ getOrgan: jest.fn().mockReturnValue(of(mockSpatialEntityMale)) });
      await render(AppComponent, {
        providers: createProviders(createMockGlobalConfigState({ sex: 'Male' }), lookupService),
      });

      await waitFor(() => expect(lookupService.getOrganScene).toHaveBeenCalledWith(mockOrganInfo, 'Male'));
    });

    it('should call getOrganScene with undefined sex when organ has no sex', async () => {
      const lookupService = createMockLookupService({
        getOrgan: jest.fn().mockReturnValue(of(mockSpatialEntityNoSex)),
      });
      await render(AppComponent, { providers: createProviders(createMockGlobalConfigState(), lookupService) });

      await waitFor(() => expect(lookupService.getOrganScene).toHaveBeenCalledWith(mockOrganInfo, undefined));
    });

    it('should not call getOrganScene when organ is undefined', async () => {
      const lookupService = createMockLookupService({ getOrgan: jest.fn().mockReturnValue(of(undefined)) });
      await render(AppComponent, { providers: createProviders(createMockGlobalConfigState(), lookupService) });

      await waitFor(() => expect(lookupService.getOrganScene).not.toHaveBeenCalled());
    });
  });

  describe('blocks resource', () => {
    it('should call getBlocks with organ sex', async () => {
      const lookupService = createMockLookupService();
      await render(AppComponent, { providers: createProviders(createMockGlobalConfigState(), lookupService) });

      await waitFor(() => expect(lookupService.getBlocks).toHaveBeenCalledWith(mockOrganInfo, 'Female'));
    });

    it('should not call getBlocks when organ is undefined', async () => {
      const lookupService = createMockLookupService({ getOrgan: jest.fn().mockReturnValue(of(undefined)) });
      await render(AppComponent, { providers: createProviders(createMockGlobalConfigState(), lookupService) });

      await waitFor(() => expect(lookupService.getBlocks).not.toHaveBeenCalled());
    });
  });

  describe('stats resource', () => {
    it('should call getOrganStats with organ sex', async () => {
      const lookupService = createMockLookupService();
      await render(AppComponent, { providers: createProviders(createMockGlobalConfigState(), lookupService) });

      await waitFor(() => expect(lookupService.getOrganStats).toHaveBeenCalledWith(mockOrganInfo, 'Female'));
    });

    it('should not call getOrganStats when organ is undefined', async () => {
      const lookupService = createMockLookupService({ getOrgan: jest.fn().mockReturnValue(of(undefined)) });
      await render(AppComponent, { providers: createProviders(createMockGlobalConfigState(), lookupService) });

      await waitFor(() => expect(lookupService.getOrganStats).not.toHaveBeenCalled());
    });
  });

  describe('filter', () => {
    it('should pass filter to organ component with empty providers', async () => {
      const lookupService = createMockLookupService();
      await render(AppComponent, {
        providers: createProviders(createMockGlobalConfigState({ highlightProviders: null }), lookupService),
      });

      await waitFor(() => expect(lookupService.getOrganInfo).toHaveBeenCalled());
    });

    it('should pass filter to organ component with defined providers', async () => {
      const lookupService = createMockLookupService();
      await render(AppComponent, {
        providers: createProviders(createMockGlobalConfigState({ highlightProviders: ['Provider A'] }), lookupService),
      });

      await waitFor(() => expect(lookupService.getOrganInfo).toHaveBeenCalled());
    });
  });
});
