import { TestBed } from '@angular/core/testing';
import { PROTEIN_PRESENCE, Row, Sheet, Structure } from '../../models/sheet.model';
import { AS, B, CT } from '../../models/tree.model';
import * as treeFunctions from '../../modules/tree/tree.functions';
import { ReportService } from './report.service';

jest.mock('../../modules/tree/tree.functions');

describe('ReportService', () => {
  let service: ReportService;

  const mockSheet: Sheet = {
    name: 'kidney',
    display: 'Kidney',
    sheetId: '1',
    gid: '0',
    config: {},
  } as Sheet;

  const mockRow: Row = {
    anatomical_structures: [
      { name: 'Body', id: 'UBERON:0000468' } as Structure,
      { name: 'Kidney', id: 'UBERON:0002113' } as Structure,
    ],
    cell_types: [{ name: 'cell1', id: 'CL:0000001' } as Structure],
    biomarkers: [{ name: 'gene1', id: 'HGNC:1234' } as Structure],
    biomarkers_type: ['gene'],
    biomarkers_protein_presence: [PROTEIN_PRESENCE.POS],
    organName: 'Kidney',
  } as unknown as Row;

  const mockAS: AS[] = [
    {
      structure: 'Kidney',
      uberon: 'UBERON:0002113',
      comparatorId: 'UBERON:0002113',
      comparatorName: 'Kidney',
      organName: 'Kidney',
      notes: '',
      isNew: false,
    } as AS,
    {
      structure: 'NoLink',
      uberon: 'NO_LINK',
      comparatorId: 'NO_LINK',
      comparatorName: 'NoLink',
      organName: 'Kidney',
      notes: '',
      isNew: false,
    } as AS,
  ];

  const mockCT: CT[] = [
    {
      structure: 'cell1',
      link: 'CL:0000001',
      comparatorId: 'CL:0000001',
      comparatorName: 'cell1',
      organName: 'Kidney',
      notes: '',
      isNew: false,
      color: '#000',
    } as CT,
    {
      structure: 'NoLinkCell',
      link: 'NO_LINK',
      comparatorId: 'NO_LINK',
      comparatorName: 'NoLinkCell',
      organName: 'Kidney',
      notes: '',
      isNew: false,
      color: '#000',
    } as CT,
  ];

  const mockB: B[] = [
    {
      structure: 'gene1',
      link: 'HGNC:1234',
      comparatorId: 'HGNC:1234',
      comparatorName: 'gene1',
      organName: 'Kidney',
      notes: '',
      bType: 'gene',
      isNew: false,
      color: '#000',
    } as B,
    {
      structure: 'NoLinkGene',
      link: 'NO_LINK',
      comparatorId: 'NO_LINK',
      comparatorName: 'NoLinkGene',
      organName: 'Kidney',
      notes: '',
      bType: 'gene',
      isNew: false,
      color: '#000',
    } as B,
  ];

  beforeEach(() => {
    jest.mocked(treeFunctions.makeAS).mockReturnValue(mockAS as never);
    jest.mocked(treeFunctions.makeCellTypes).mockReturnValue(mockCT as never);
    jest.mocked(treeFunctions.makeBioMarkers).mockReturnValue(mockB as never);

    TestBed.configureTestingModule({
      providers: [ReportService],
    });

    service = TestBed.inject(ReportService);
  });

  it('should create', () => {
    expect(service).toBeDefined();
  });

  describe('makeReportData', () => {
    it('should create report data and emit it', (done) => {
      service.reportData$.subscribe((result) => {
        expect(result.data).toBeDefined();
        expect(result.data?.anatomicalStructures).toEqual(mockAS);
        expect(result.data?.cellTypes).toEqual(mockCT);
        expect(result.data?.biomarkers).toEqual(mockB);
        expect(result.sheet).toEqual(mockSheet);
        done();
      });

      service.makeReportData(mockSheet, [mockRow]);
    });

    it('should identify AS with no link', (done) => {
      service.reportData$.subscribe((result) => {
        expect(result.data?.ASWithNoLink).toHaveLength(1);
        expect(result.data?.ASWithNoLink[0].structure).toBe('NoLink');
        done();
      });

      service.makeReportData(mockSheet, [mockRow]);
    });

    it('should identify CT with no link', (done) => {
      service.reportData$.subscribe((result) => {
        expect(result.data?.CTWithNoLink).toHaveLength(1);
        expect(result.data?.CTWithNoLink[0].structure).toBe('NoLinkCell');
        done();
      });

      service.makeReportData(mockSheet, [mockRow]);
    });

    it('should identify B with no link', (done) => {
      service.reportData$.subscribe((result) => {
        expect(result.data?.BWithNoLink).toHaveLength(1);
        expect(result.data?.BWithNoLink[0].structure).toBe('NoLinkGene');
        done();
      });

      service.makeReportData(mockSheet, [mockRow]);
    });
  });

  describe('countsGA', () => {
    it('should return counts of AS, CT, and B', () => {
      const result = service.countsGA([mockRow]);

      expect(result.AS).toBe(2);
      expect(result.CT).toBe(2);
      expect(result.B).toBe(2);
      expect(treeFunctions.makeAS).toHaveBeenCalledWith([mockRow], true);
      expect(treeFunctions.makeCellTypes).toHaveBeenCalledWith([mockRow], true);
      expect(treeFunctions.makeBioMarkers).toHaveBeenCalledWith([mockRow]);
    });
  });

  describe('countOrganWise', () => {
    it('should count items by organ', () => {
      const acc: { organName: string; AS?: number }[] = [];
      const curr = { organName: 'Kidney' };

      const result = service.countOrganWise(acc, curr, 'AS');

      expect(result).toHaveLength(1);
      expect(result[0].organName).toBe('Kidney');
      expect(result[0].AS).toBe(1);
    });

    it('should increment count for existing organ', () => {
      const acc = [{ organName: 'Kidney', AS: 1 }];
      const curr = { organName: 'Kidney' };

      const result = service.countOrganWise(acc, curr, 'AS');

      expect(result).toHaveLength(1);
      expect(result[0].AS).toBe(2);
    });
  });

  describe('countSeperateBiomarkers', () => {
    it('should group biomarkers by type', () => {
      const biomarkers: B[] = [
        { ...mockB[0], bType: 'gene' },
        { ...mockB[1], bType: 'protein' },
        { ...mockB[0], bType: 'gene' },
      ] as B[];

      const result = service.countSeperateBiomarkers(biomarkers);

      expect(result['gene']).toHaveLength(2);
      expect(result['protein']).toHaveLength(1);
    });

    it('should handle biomarkers without type', () => {
      const biomarkers: B[] = [{ ...mockB[0], bType: undefined }] as B[];

      const result = service.countSeperateBiomarkers(biomarkers);

      expect(Object.keys(result)).toHaveLength(0);
    });
  });

  describe('getASWithNoLink', () => {
    it('should filter AS without UBERON/FMAID links', () => {
      const result = service.getASWithNoLink(mockAS);

      expect(result).toHaveLength(1);
      expect(result[0].structure).toBe('NoLink');
    });
  });

  describe('getCTWithNoLink', () => {
    it('should filter CT without CL links', () => {
      const result = service.getCTWithNoLink(mockCT);

      expect(result).toHaveLength(1);
      expect(result[0].structure).toBe('NoLinkCell');
    });
  });

  describe('getBMWithNoLink', () => {
    it('should filter BM without HGNC links', () => {
      const result = service.getBMWithNoLink(mockB);

      expect(result).toHaveLength(1);
      expect(result[0].structure).toBe('NoLinkGene');
    });
  });

  describe('getASWithNoCT', () => {
    it('should identify AS with no CT and CT with no B', () => {
      const rowWithNoCT: Row = {
        ...mockRow,
        cell_types: [],
        biomarkers: [{ name: 'gene1', id: 'HGNC:1234' } as Structure],
      } as Row;

      const rowWithNoB: Row = {
        ...mockRow,
        biomarkers: [],
      } as Row;

      const { asWithNoCT, ctWithNoB } = service.getASWithNoCT([rowWithNoCT, rowWithNoB]);

      expect(asWithNoCT).toHaveLength(1);
      expect(asWithNoCT[0].structure).toBe('Kidney');
      expect(ctWithNoB).toHaveLength(1);
      expect(ctWithNoB[0].structure).toBe('cell1');
    });

    it('should handle rows with both CT and B', () => {
      const { asWithNoCT, ctWithNoB } = service.getASWithNoCT([mockRow]);

      expect(asWithNoCT).toHaveLength(0);
      expect(ctWithNoB).toHaveLength(0);
    });

    it('should throw error on invalid data', () => {
      const invalidRow = null as unknown as Row;

      expect(() => service.getASWithNoCT([invalidRow])).toThrow('Could not process Sheet Data');
    });
  });

  describe('compareASData', () => {
    it('should identify identical and new AS', () => {
      const reportData = {
        anatomicalStructures: [{ structure: 'Kidney', isNew: false }] as AS[],
        cellTypes: [],
        biomarkers: [],
      } as never;

      const compareAS = [
        { structure: 'Kidney', isNew: true },
        { structure: 'Liver', isNew: true },
      ] as AS[];

      jest.mocked(treeFunctions.makeAS).mockReturnValueOnce(compareAS as never);

      const { identicalStructuresAS, newStructuresAS } = service.compareASData(reportData, [mockRow]);

      expect(identicalStructuresAS).toContain('Kidney');
      expect(newStructuresAS).toContain('Liver');
    });

    it('should handle errors gracefully', (done) => {
      const reportData = {} as never;
      jest.mocked(treeFunctions.makeAS).mockImplementationOnce(() => {
        throw new Error('Test error');
      });

      service.reportData$.subscribe((result) => {
        expect(result.data).toBeNull();
        done();
      });

      const { identicalStructuresAS, newStructuresAS } = service.compareASData(reportData, [mockRow]);

      expect(identicalStructuresAS).toEqual([]);
      expect(newStructuresAS).toEqual([]);
    });
  });

  describe('compareCTData', () => {
    it('should identify identical and new CT', () => {
      const reportData = {
        anatomicalStructures: [],
        cellTypes: [{ structure: 'cell1', isNew: false }] as CT[],
        biomarkers: [],
      } as never;

      const compareCT = [
        { structure: 'cell1', isNew: true },
        { structure: 'cell2', isNew: true },
      ] as CT[];

      jest.mocked(treeFunctions.makeCellTypes).mockReturnValueOnce(compareCT as never);

      const { identicalStructuresCT, newStructuresCT } = service.compareCTData(reportData, [mockRow]);

      expect(identicalStructuresCT).toContain('cell1');
      expect(newStructuresCT).toContain('cell2');
    });

    it('should handle errors gracefully', (done) => {
      const reportData = {} as never;
      jest.mocked(treeFunctions.makeCellTypes).mockImplementationOnce(() => {
        throw new Error('Test error');
      });

      service.reportData$.subscribe((result) => {
        expect(result.data).toBeNull();
        done();
      });

      const { identicalStructuresCT, newStructuresCT } = service.compareCTData(reportData, [mockRow]);

      expect(identicalStructuresCT).toEqual([]);
      expect(newStructuresCT).toEqual([]);
    });
  });

  describe('compareBData', () => {
    it('should identify identical and new B', () => {
      const reportData = {
        anatomicalStructures: [],
        cellTypes: [],
        biomarkers: [{ structure: 'gene1', isNew: false, comparatorId: 'HGNC:1234', indegree: new Set() }] as B[],
      } as never;

      const compareB = [
        { structure: 'gene1', isNew: true, comparatorId: 'HGNC:1234', indegree: new Set() },
        { structure: 'gene2', isNew: true, comparatorId: 'HGNC:5678', indegree: new Set() },
      ] as B[];

      jest.mocked(treeFunctions.makeBioMarkers).mockReturnValueOnce(compareB as never);

      const { identicalStructuresB, newStructuresB } = service.compareBData(reportData, [mockRow]);

      expect(identicalStructuresB).toContain('gene1');
      expect(newStructuresB).toContain('gene2');
    });

    it('should handle errors gracefully', (done) => {
      const reportData = {} as never;
      jest.mocked(treeFunctions.makeBioMarkers).mockImplementationOnce(() => {
        throw new Error('Test error');
      });

      service.reportData$.subscribe((result) => {
        expect(result.data).toBeNull();
        done();
      });

      const { identicalStructuresB, newStructuresB } = service.compareBData(reportData, [mockRow]);

      expect(identicalStructuresB).toEqual([]);
      expect(newStructuresB).toEqual([]);
    });
  });

  describe('findIdenticalBmCtLinks', () => {
    it('should find identical BM-CT links', () => {
      const compareB: B = {
        structure: 'gene1',
        comparatorId: 'HGNC:1234',
        comparatorName: 'gene1',
        indegree: new Set([{ id: 'CL:0000001', name: 'cell1' }]),
      } as B;

      const mainBData: B[] = [
        {
          structure: 'gene1',
          comparatorId: 'HGNC:1234',
          comparatorName: 'gene1',
          indegree: new Set([{ id: 'CL:0000001', name: 'cell1' }]),
        } as B,
      ];

      const reportData = {
        cellTypes: [
          {
            comparatorId: 'CL:0000001',
            indegree: new Set([{ id: 'UBERON:0002113', name: 'Kidney' }]),
          },
        ] as CT[],
      } as never;

      const result = service.findIdenticalBmCtLinks(compareB, mainBData, reportData);

      expect(result.size).toBeGreaterThan(0);
    });
  });
});
