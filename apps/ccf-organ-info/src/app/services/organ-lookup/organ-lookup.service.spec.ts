import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AggregateCount, FilterSexEnum, SpatialEntity, SpatialSceneNode, TissueBlock } from '@hra-api/ng-client';
import { DataSourceService, OrganInfo } from 'ccf-shared';
import { of } from 'rxjs';
import { OrganLookupService } from './organ-lookup.service';

describe('OrganLookupService', () => {
  let service: OrganLookupService;
  let dataSourceService: jest.Mocked<DataSourceService>;

  const mockOrganInfo: OrganInfo = {
    id: 'http://purl.org/sig/ont/fma/fma7088',
    name: 'Heart',
    organ: 'heart',
    src: 'assets/organs/heart.svg',
  } as OrganInfo;

  const mockSpatialEntity: SpatialEntity = {
    '@id': 'http://example.com/organ1',
    '@type': 'SpatialEntity',
    label: 'Heart',
    representation_of: 'http://purl.org/sig/ont/fma/fma7088',
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
    } as SpatialSceneNode,
  ];

  const mockAggregateCount: AggregateCount[] = [
    {
      count: 10,
    } as AggregateCount,
  ];

  const mockTissueBlocks: TissueBlock[] = [
    {
      '@id': 'block1',
      '@type': 'TissueBlock',
      label: 'Block 1',
      sampleType: 'Tissue Block',
      link: 'http://example.com/block1',
      datasets: [],
    } as TissueBlock,
  ];

  beforeEach(() => {
    const mockDataSource = {
      getReferenceOrgans: jest.fn(),
      getReferenceOrganScene: jest.fn(),
      getAggregateResults: jest.fn(),
      getTissueBlockResults: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        OrganLookupService,
        {
          provide: DataSourceService,
          useValue: mockDataSource,
        },
      ],
    });

    service = TestBed.inject(OrganLookupService);
    dataSourceService = TestBed.inject(DataSourceService) as jest.Mocked<DataSourceService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getOrganInfo', () => {
    it('should return organ info for valid iri', (done) => {
      const iri = 'http://purl.obolibrary.org/obo/UBERON_0000948'; // Heart

      service.getOrganInfo(iri).subscribe((info) => {
        expect(info).toBeDefined();
        expect(info?.organ).toBe('Heart');
        done();
      });
    });

    it('should return undefined for invalid iri', (done) => {
      const invalidIri = 'http://invalid.com/organ';

      service.getOrganInfo(invalidIri).subscribe((info) => {
        expect(info).toBeUndefined();
        done();
      });
    });

    it('should find alternative when organ is disabled', (done) => {
      const disabledIri = 'http://purl.obolibrary.org/obo/UBERON_0000970'; // Disabled Eye, L

      service.getOrganInfo(disabledIri).subscribe((info) => {
        expect(info).toBeDefined();
        expect(info?.disabled).not.toBe(true);
        expect(info?.organ).toBe('Eye');
        done();
      });
    });

    it('should match organ by side when provided', (done) => {
      const iri = 'http://purl.obolibrary.org/obo/UBERON_0004548'; // Eye, L
      const side = 'left';

      service.getOrganInfo(iri, side).subscribe((info) => {
        expect(info).toBeDefined();
        expect(info?.side).toBe('left');
        done();
      });
    });

    it('should find alternative when side does not match', (done) => {
      const iri = 'http://purl.obolibrary.org/obo/UBERON_0004548'; // Eye, L
      const side = 'right'; // Requesting right side for a left eye organ

      service.getOrganInfo(iri, side).subscribe((info) => {
        expect(info).toBeDefined();
        // Should find an alternative that matches the side
        done();
      });
    });
  });

  describe('getOrgan', () => {
    it('should return spatial entity for organ info', (done) => {
      dataSourceService.getReferenceOrgans.mockReturnValue(of([mockSpatialEntity]));

      service.getOrgan(mockOrganInfo).subscribe((entity) => {
        expect(entity).toBeDefined();
        expect(entity?.representation_of).toBe(mockOrganInfo.id);
        expect(dataSourceService.getReferenceOrgans).toHaveBeenCalled();
        done();
      });
    });

    it('should filter by sex when provided', (done) => {
      dataSourceService.getReferenceOrgans.mockReturnValue(of([mockSpatialEntity]));

      service.getOrgan(mockOrganInfo, FilterSexEnum.Female).subscribe((entity) => {
        expect(entity).toBeDefined();
        done();
      });
    });

    it('should return undefined when no matching entity found', (done) => {
      dataSourceService.getReferenceOrgans.mockReturnValue(of([]));

      service.getOrgan(mockOrganInfo).subscribe((entity) => {
        expect(entity).toBeUndefined();
        done();
      });
    });
  });

  describe('getOrganScene', () => {
    it('should return scene nodes for organ info', (done) => {
      dataSourceService.getReferenceOrganScene.mockReturnValue(of(mockSceneNodes));

      service.getOrganScene(mockOrganInfo).subscribe((nodes) => {
        expect(nodes).toBeDefined();
        expect(nodes.length).toBeGreaterThan(0);
        expect(dataSourceService.getReferenceOrganScene).toHaveBeenCalledWith(
          mockOrganInfo.id,
          expect.objectContaining({
            ontologyTerms: [mockOrganInfo.id],
            sex: FilterSexEnum.Female,
          }),
        );
        done();
      });
    });

    it('should return empty array when organ info has no id', (done) => {
      const infoWithoutId = { ...mockOrganInfo, id: '' };

      service.getOrganScene(infoWithoutId).subscribe((nodes) => {
        expect(nodes).toEqual([]);
        done();
      });
    });

    it('should pass sex parameter to filter', (done) => {
      dataSourceService.getReferenceOrganScene.mockReturnValue(of(mockSceneNodes));

      service.getOrganScene(mockOrganInfo, FilterSexEnum.Male).subscribe(() => {
        expect(dataSourceService.getReferenceOrganScene).toHaveBeenCalledWith(
          mockOrganInfo.id,
          expect.objectContaining({
            sex: FilterSexEnum.Male,
          }),
        );
        done();
      });
    });
  });

  describe('getOrganStats', () => {
    it('should return aggregate counts for organ info', (done) => {
      dataSourceService.getAggregateResults.mockReturnValue(of(mockAggregateCount));

      service.getOrganStats(mockOrganInfo).subscribe((counts) => {
        expect(counts).toBeDefined();
        expect(counts.length).toBeGreaterThan(0);
        expect(dataSourceService.getAggregateResults).toHaveBeenCalledWith(
          expect.objectContaining({
            ontologyTerms: [mockOrganInfo.id],
            sex: FilterSexEnum.Female,
          }),
        );
        done();
      });
    });

    it('should return empty array when organ info has no id', (done) => {
      const infoWithoutId = { ...mockOrganInfo, id: '' };

      service.getOrganStats(infoWithoutId).subscribe((counts) => {
        expect(counts).toEqual([]);
        done();
      });
    });

    it('should pass sex parameter to filter', (done) => {
      dataSourceService.getAggregateResults.mockReturnValue(of(mockAggregateCount));

      service.getOrganStats(mockOrganInfo, FilterSexEnum.Male).subscribe(() => {
        expect(dataSourceService.getAggregateResults).toHaveBeenCalledWith(
          expect.objectContaining({
            sex: FilterSexEnum.Male,
          }),
        );
        done();
      });
    });
  });

  describe('getBlocks', () => {
    it('should return tissue blocks for organ info', (done) => {
      dataSourceService.getTissueBlockResults.mockReturnValue(of(mockTissueBlocks));

      service.getBlocks(mockOrganInfo).subscribe((blocks) => {
        expect(blocks).toBeDefined();
        expect(blocks.length).toBeGreaterThan(0);
        expect(dataSourceService.getTissueBlockResults).toHaveBeenCalledWith(
          expect.objectContaining({
            ontologyTerms: [mockOrganInfo.id],
            sex: FilterSexEnum.Female,
          }),
        );
        done();
      });
    });

    it('should return empty array when organ info has no id', (done) => {
      const infoWithoutId = { ...mockOrganInfo, id: '' };

      service.getBlocks(infoWithoutId).subscribe((blocks) => {
        expect(blocks).toEqual([]);
        done();
      });
    });

    it('should pass sex parameter to filter', (done) => {
      dataSourceService.getTissueBlockResults.mockReturnValue(of(mockTissueBlocks));

      service.getBlocks(mockOrganInfo, FilterSexEnum.Male).subscribe(() => {
        expect(dataSourceService.getTissueBlockResults).toHaveBeenCalledWith(
          expect.objectContaining({
            sex: FilterSexEnum.Male,
          }),
        );
        done();
      });
    });
  });
});
