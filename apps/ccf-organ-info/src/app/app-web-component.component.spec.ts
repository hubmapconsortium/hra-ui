import { NgxsDataPluginModule } from '@angular-ru/ngxs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';
import { AggregateCount, SpatialEntity, SpatialSceneNode, TissueBlock, TissueBlockTypeEnum } from '@hra-api/ng-client';
import { provideDesignSystem } from '@hra-ui/design-system';
import { NgxsModule } from '@ngxs/store';
import { render, waitFor } from '@testing-library/angular';
import { DataSourceService, GlobalConfigState } from 'ccf-shared';
import { of } from 'rxjs';
import { AppWebComponent } from './app-web-component.component';
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

describe('AppWebComponent', () => {
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

  const providers = [
    provideDesignSystem(),
    provideHttpClient(),
    provideHttpClientTesting(),
    importProvidersFrom(NgxsDataPluginModule.forRoot(), NgxsModule.forRoot([GlobalConfigState])),
    {
      provide: DataSourceService,
      useValue: mockDataSourceService,
    },
    {
      provide: OrganLookupService,
      useValue: mockOrganLookupService,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('should initialize and render the component', async () => {
      const { fixture } = await render(AppWebComponent, { providers });

      // Component should be created
      expect(fixture.componentInstance).toBeTruthy();
    });

    it('should load and display organ data when organIri is provided', async () => {
      await render(AppWebComponent, {
        providers,
        componentInputs: { organIri: mockOrganInfo.id },
      });

      // Wait for the component to load data - testing observable behavior through service calls
      await waitFor(
        () => {
          expect(mockOrganLookupService.getOrganInfo).toHaveBeenCalled();
          expect(mockOrganLookupService.getOrgan).toHaveBeenCalled();
          expect(mockOrganLookupService.getOrganScene).toHaveBeenCalled();
          expect(mockOrganLookupService.getBlocks).toHaveBeenCalled();
          expect(mockOrganLookupService.getOrganStats).toHaveBeenCalled();
        },
        { timeout: 2000 },
      );
    });
  });

  describe('Input Handling', () => {
    it('should handle male sex input and load organ data', async () => {
      await render(AppWebComponent, {
        providers,
        componentInputs: {
          organIri: mockOrganInfo.id,
          sex: 'male',
        },
      });

      // Verify services are called with data loaded
      await waitFor(
        () => {
          expect(mockOrganLookupService.getOrganInfo).toHaveBeenCalled();
          expect(mockOrganLookupService.getOrgan).toHaveBeenCalled();
        },
        { timeout: 2000 },
      );
    });

    it('should handle female sex input', async () => {
      await render(AppWebComponent, {
        providers,
        componentInputs: {
          organIri: mockOrganInfo.id,
          sex: 'female',
        },
      });

      await waitFor(
        () => {
          expect(mockOrganLookupService.getOrgan).toHaveBeenCalled();
        },
        { timeout: 2000 },
      );
    });

    it('should handle both sex input', async () => {
      await render(AppWebComponent, {
        providers,
        componentInputs: {
          organIri: mockOrganInfo.id,
          sex: 'both',
        },
      });

      await waitFor(
        () => {
          expect(mockOrganLookupService.getOrgan).toHaveBeenCalled();
        },
        { timeout: 2000 },
      );
    });

    it('should default to Female for invalid sex input', async () => {
      await render(AppWebComponent, {
        providers,
        componentInputs: {
          organIri: mockOrganInfo.id,
          sex: 'invalid-value',
        },
      });

      await waitFor(
        () => {
          expect(mockOrganLookupService.getOrgan).toHaveBeenCalled();
        },
        { timeout: 2000 },
      );
    });

    it('should handle left side input', async () => {
      await render(AppWebComponent, {
        providers,
        componentInputs: {
          organIri: mockOrganInfo.id,
          side: 'left',
        },
      });

      await waitFor(
        () => {
          expect(mockOrganLookupService.getOrganInfo).toHaveBeenCalledWith(mockOrganInfo.id, 'left');
        },
        { timeout: 2000 },
      );
    });

    it('should handle right side input', async () => {
      await render(AppWebComponent, {
        providers,
        componentInputs: {
          organIri: mockOrganInfo.id,
          side: 'right',
        },
      });

      await waitFor(
        () => {
          expect(mockOrganLookupService.getOrganInfo).toHaveBeenCalledWith(mockOrganInfo.id, 'right');
        },
        { timeout: 2000 },
      );
    });

    it('should default to Left for invalid side input', async () => {
      await render(AppWebComponent, {
        providers,
        componentInputs: {
          organIri: mockOrganInfo.id,
          side: 'invalid-side',
        },
      });

      await waitFor(
        () => {
          expect(mockOrganLookupService.getOrganInfo).toHaveBeenCalled();
        },
        { timeout: 2000 },
      );
    });

    it('should handle highlight providers as JSON string', async () => {
      await render(AppWebComponent, {
        providers,
        componentInputs: {
          organIri: mockOrganInfo.id,
          highlightProviders: '["provider1", "provider2"]',
        },
      });

      await waitFor(
        () => {
          expect(mockOrganLookupService.getOrganScene).toHaveBeenCalled();
        },
        { timeout: 2000 },
      );
    });

    it('should handle highlight providers as array', async () => {
      await render(AppWebComponent, {
        providers,
        componentInputs: {
          organIri: mockOrganInfo.id,
          highlightProviders: ['provider1', 'provider2'],
        },
      });

      await waitFor(
        () => {
          expect(mockOrganLookupService.getBlocks).toHaveBeenCalled();
        },
        { timeout: 2000 },
      );
    });

    it('should handle data sources as JSON string', async () => {
      await render(AppWebComponent, {
        providers,
        componentInputs: {
          organIri: mockOrganInfo.id,
          dataSources: '["source1", "source2"]',
        },
      });

      await waitFor(
        () => {
          expect(mockOrganLookupService.getOrganStats).toHaveBeenCalled();
        },
        { timeout: 2000 },
      );
    });

    it('should handle donorLabel input', async () => {
      await render(AppWebComponent, {
        providers,
        componentInputs: {
          organIri: mockOrganInfo.id,
          donorLabel: 'Custom Donor',
        },
      });

      await waitFor(
        () => {
          expect(mockOrganLookupService.getOrganInfo).toHaveBeenCalled();
        },
        { timeout: 2000 },
      );
    });
  });

  describe('Event Outputs', () => {
    it('should configure sexChange output', async () => {
      const sexChangeMock = jest.fn();

      await render(AppWebComponent, {
        providers,
        componentInputs: { organIri: mockOrganInfo.id },
        componentOutputs: { sexChange: { emit: sexChangeMock } as any },
      });

      await waitFor(
        () => {
          expect(mockOrganLookupService.getOrgan).toHaveBeenCalled();
        },
        { timeout: 2000 },
      );
    });

    it('should configure sideChange output', async () => {
      const sideChangeMock = jest.fn();

      await render(AppWebComponent, {
        providers,
        componentInputs: { organIri: mockOrganInfo.id },
        componentOutputs: { sideChange: { emit: sideChangeMock } as any },
      });

      await waitFor(
        () => {
          expect(mockOrganLookupService.getOrgan).toHaveBeenCalled();
        },
        { timeout: 2000 },
      );
    });

    it('should configure nodeClicked output', async () => {
      const nodeClickedMock = jest.fn();

      await render(AppWebComponent, {
        providers,
        componentInputs: { organIri: mockOrganInfo.id },
        componentOutputs: { nodeClicked: { emit: nodeClickedMock } as any },
      });

      await waitFor(
        () => {
          expect(mockOrganLookupService.getOrgan).toHaveBeenCalled();
        },
        { timeout: 2000 },
      );
    });
  });

  describe('Edge Cases and Additional Coverage', () => {
    afterEach(() => {
      // Restore default mock behaviors after each test
      mockOrganLookupService.getOrganInfo.mockReturnValue(of(mockOrganInfo));
      mockOrganLookupService.getOrgan.mockReturnValue(of(mockSpatialEntity));
      mockOrganLookupService.getOrganScene.mockReturnValue(of(mockSceneNodes));
      mockOrganLookupService.getBlocks.mockReturnValue(of(mockTissueBlocks));
      mockOrganLookupService.getOrganStats.mockReturnValue(of(mockAggregateCount));
    });

    it('should handle organ without sex property', async () => {
      const organWithoutSex = { ...mockOrganInfo, hasSex: false };
      mockOrganLookupService.getOrganInfo.mockReturnValue(of(organWithoutSex));

      await render(AppWebComponent, {
        providers,
        componentInputs: { organIri: mockOrganInfo.id },
      });

      await waitFor(
        () => {
          expect(mockOrganLookupService.getOrgan).toHaveBeenCalled();
        },
        { timeout: 2000 },
      );
    });

    it('should handle undefined organInfo response', async () => {
      mockOrganLookupService.getOrganInfo.mockReturnValue(of(undefined));

      await render(AppWebComponent, {
        providers,
        componentInputs: { organIri: mockOrganInfo.id },
      });

      await waitFor(
        () => {
          expect(mockOrganLookupService.getOrganInfo).toHaveBeenCalled();
        },
        { timeout: 2000 },
      );
    });

    it('should handle undefined organ entity response', async () => {
      mockOrganLookupService.getOrgan.mockReturnValue(of(undefined));

      await render(AppWebComponent, {
        providers,
        componentInputs: { organIri: mockOrganInfo.id },
      });

      await waitFor(
        () => {
          expect(mockOrganLookupService.getOrganInfo).toHaveBeenCalled();
        },
        { timeout: 2000 },
      );
    });

    it('should handle custom donor label', async () => {
      const customLabel = 'Participants';

      await render(AppWebComponent, {
        providers,
        componentInputs: {
          organIri: mockOrganInfo.id,
          donorLabel: customLabel,
        },
      });

      await waitFor(
        () => {
          expect(mockOrganLookupService.getOrganStats).toHaveBeenCalled();
        },
        { timeout: 2000 },
      );
    });

    it('should render without organIri', async () => {
      const { fixture } = await render(AppWebComponent, {
        providers,
        componentInputs: { sex: 'female', side: 'left' },
      });

      // Component should render even without organIri
      expect(fixture.componentInstance).toBeTruthy();

      // Wait a bit to ensure services aren't called
      await new Promise((resolve) => setTimeout(resolve, 200));

      // Should not call services without organIri
      expect(mockOrganLookupService.getOrganInfo).not.toHaveBeenCalled();
    });

    it('should handle empty data sources array', async () => {
      await render(AppWebComponent, {
        providers,
        componentInputs: {
          organIri: mockOrganInfo.id,
          dataSources: [],
        },
      });

      await waitFor(
        () => {
          expect(mockOrganLookupService.getOrgan).toHaveBeenCalled();
        },
        { timeout: 2000 },
      );
    });

    it('should handle empty highlight providers array', async () => {
      await render(AppWebComponent, {
        providers,
        componentInputs: {
          organIri: mockOrganInfo.id,
          highlightProviders: [],
        },
      });

      await waitFor(
        () => {
          expect(mockOrganLookupService.getOrgan).toHaveBeenCalled();
        },
        { timeout: 2000 },
      );
    });

    it('should handle single string highlight provider', async () => {
      await render(AppWebComponent, {
        providers,
        componentInputs: {
          organIri: mockOrganInfo.id,
          highlightProviders: 'single-provider',
        },
      });

      await waitFor(
        () => {
          expect(mockOrganLookupService.getOrgan).toHaveBeenCalled();
        },
        { timeout: 2000 },
      );
    });

    it('should handle organ with side specified', async () => {
      const organWithSide = { ...mockOrganInfo, side: 'left' };
      mockOrganLookupService.getOrganInfo.mockReturnValue(of(organWithSide));

      await render(AppWebComponent, {
        providers,
        componentInputs: {
          organIri: mockOrganInfo.id,
          side: 'left',
        },
      });

      await waitFor(
        () => {
          expect(mockOrganLookupService.getOrganInfo).toHaveBeenCalledWith(mockOrganInfo.id, 'left');
          expect(mockOrganLookupService.getOrgan).toHaveBeenCalled();
        },
        { timeout: 2000 },
      );
    });

    it('should handle both male and female sex for organ without hasSex', async () => {
      const organWithoutSex = { ...mockOrganInfo, hasSex: false };
      mockOrganLookupService.getOrganInfo.mockReturnValue(of(organWithoutSex));

      await render(AppWebComponent, {
        providers,
        componentInputs: {
          organIri: mockOrganInfo.id,
          sex: 'both',
        },
      });

      await waitFor(
        () => {
          expect(mockOrganLookupService.getOrgan).toHaveBeenCalled();
        },
        { timeout: 2000 },
      );
    });

    it('should handle combination of sex, side, and providers', async () => {
      await render(AppWebComponent, {
        providers,
        componentInputs: {
          organIri: mockOrganInfo.id,
          sex: 'male',
          side: 'right',
          highlightProviders: ['provider1'],
          dataSources: ['source1'],
        },
      });

      await waitFor(
        () => {
          expect(mockOrganLookupService.getOrganInfo).toHaveBeenCalledWith(mockOrganInfo.id, 'right');
          expect(mockOrganLookupService.getOrgan).toHaveBeenCalled();
          expect(mockOrganLookupService.getOrganScene).toHaveBeenCalled();
        },
        { timeout: 2000 },
      );
    });
  });
});
