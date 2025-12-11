import { TestBed } from '@angular/core/testing';
import { MatSort } from '@angular/material/sort';
import { of } from 'rxjs';
import { Report } from '../../models/report.model';
import { CompareData, Row, Sheet, SheetConfig } from '../../models/sheet.model';
import { LinksASCTBData } from '../../models/tree.model';
import { TreeService } from '../../modules/tree/tree.service';
import { ReportComponent } from './report.component';
import { ReportService } from './report.service';

describe('ReportComponent', () => {
  let component: ReportComponent;
  let reportService: jest.Mocked<ReportService>;
  let treeService: jest.Mocked<TreeService>;

  const mockReport: Report = {
    anatomicalStructures: [
      { structure: 'Kidney', uberon: 'UBERON:0002113' },
      { structure: 'NoLink', uberon: 'NO_ID' },
    ],
    cellTypes: [
      { structure: 'cell1', link: 'CL:0000001' },
      { structure: 'NoLinkCell', link: 'NO_LINK' },
    ],
    biomarkers: [
      { structure: 'gene1', link: 'HGNC:1234' },
      { structure: 'NoLinkGene', link: 'NO_LINK' },
    ],
    ASWithNoLink: [{ structure: 'NoLink', uberon: 'NO_ID' }],
    CTWithNoLink: [{ structure: 'NoLinkCell', link: 'NO_LINK' }],
    BWithNoLink: [{ structure: 'NoLinkGene', link: 'NO_LINK' }],
    ASWithNoCT: [],
    CTWithNoB: [],
  } as unknown as Report;

  const mockSheet: Sheet = {
    name: 'kidney',
    display: 'Kidney',
    sheetId: '1',
    gid: '0',
  } as Sheet;

  const mockLinksData: LinksASCTBData = {
    AS_AS: 10,
    AS_CT: 20,
    CT_B: 30,
    AS_AS_organWise: { Kidney: 5 },
    AS_CT_organWise: { Kidney: 10 },
    CT_B_organWise: { Kidney: 15 },
  };

  const mockSheetConfig: SheetConfig = {
    width: 1000,
    height: 800,
  } as SheetConfig;

  const mockRow: Row = {
    anatomical_structures: [],
    cell_types: [],
    biomarkers: [],
    organName: 'Kidney',
    tableVersion: 'v1.0',
  } as unknown as Row;

  beforeEach(() => {
    reportService = {
      reportData$: of({ data: mockReport, sheet: mockSheet }),
      compareData$: of({ data: [] }),
      makeReportData: jest.fn(),
      makeCompareData: jest.fn(),
      makeAllOrganReportDataByOrgan: jest.fn().mockReturnValue({
        result: mockReport,
        biomarkersSeperateNames: [{ type: 'BG', name: 'gene' }],
      }),
      makeAllOrganReportDataCountsByOrgan: jest.fn().mockReturnValue([
        {
          organName: 'Kidney',
          anatomicalStructures: 2,
          cellTypes: 2,
          gene: 2,
        },
      ]),
    } as unknown as jest.Mocked<ReportService>;

    treeService = {
      makeTreeData: jest.fn(),
    } as unknown as jest.Mocked<TreeService>;

    TestBed.configureTestingModule({
      imports: [ReportComponent],
      providers: [
        { provide: ReportService, useValue: reportService },
        { provide: TreeService, useValue: treeService },
      ],
    });

    const fixture = TestBed.createComponent(ReportComponent);
    component = fixture.componentInstance;

    component.currentSheet = mockSheet;
    component.sheetData = [mockRow];
    component.asFullData = [mockRow];
    component.fullDataByOrgan = [[mockRow]];
    component.linksData$ = of(mockLinksData);
    component.currentSheetConfig = of(mockSheetConfig);
    component.compareData = of({ data: [], sheets: [] });
    component.sort = { active: '', direction: '' } as MatSort;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  describe('ngOnInit', () => {
    it('should subscribe to reportData$ and update reportData', () => {
      component.ngOnInit();

      expect(component.reportData).toEqual(mockReport);
    });

    it('should emit computed report', () => {
      const emitSpy = jest.spyOn(component.computedReport, 'emit');

      component.ngOnInit();

      expect(emitSpy).toHaveBeenCalledWith(mockReport);
    });

    it('should subscribe to linksData$ and update totals', () => {
      component.ngOnInit();

      expect(component.total_AS_AS).toBe(10);
      expect(component.total_AS_CT).toBe(20);
      expect(component.total_CT_B).toBe(30);
    });

    it('should subscribe to currentSheetConfig', () => {
      component.ngOnInit();

      expect(component.SheetConfig).toEqual(mockSheetConfig);
    });

    it('should make tree data for each organ', () => {
      component.ngOnInit();

      expect(treeService.makeTreeData).toHaveBeenCalledWith(mockSheet, [mockRow], component.compareData, true);
    });

    it('should call makeReportData', () => {
      component.ngOnInit();

      expect(reportService.makeReportData).toHaveBeenCalledWith(mockSheet, [mockRow], '', true);
    });

    it('should handle compare data', () => {
      const compareData = { data: [mockRow], sheets: [{ title: 'Test' } as CompareData] };
      component.compareData = of(compareData);

      component.ngOnInit();

      expect(reportService.makeCompareData).toHaveBeenCalledWith(mockReport, [mockRow], compareData.sheets);
    });
  });

  describe('makeOntologyLinksGraphData', () => {
    it('should create ontology link graph data', () => {
      const result = component.makeOntologyLinksGraphData(mockReport, [mockRow]);

      expect(result).toHaveLength(3);
      expect(result[0].label).toBe('Total Anatomical Structures');
      expect(result[1].label).toBe('Total Cell Types');
      expect(result[2].label).toBe('Total Biomarkers');
    });

    it('should calculate AS with and without Uberon links', () => {
      const result = component.makeOntologyLinksGraphData(mockReport, [mockRow]);

      expect(result[0].results).toContainEqual({ name: 'with Uberon Links', value: 1 });
      expect(result[0].results).toContainEqual({ name: 'without Uberon Links', value: 1 });
    });

    it('should calculate CT with and without CL links', () => {
      const result = component.makeOntologyLinksGraphData(mockReport, [mockRow]);

      expect(result[1].results).toContainEqual({ name: 'with CL Links', value: 1 });
      expect(result[1].results).toContainEqual({ name: 'without CL Links', value: 1 });
    });

    it('should calculate B with and without HGNC links', () => {
      const result = component.makeOntologyLinksGraphData(mockReport, [mockRow]);

      expect(result[2].results).toContainEqual({ name: 'with HGNC Links', value: 1 });
      expect(result[2].results).toContainEqual({ name: 'without HGNC Links', value: 1 });
    });
  });

  describe('getBiomarkerLabel', () => {
    it.each([
      ['Gene', 'Total Gene Biomarkers'],
      ['Protein', 'Total Protein Biomarkers'],
      ['Lipids', 'Total Lipids Biomarkers'],
      ['Metabolites', 'Total Metabolites Biomarkers'],
      ['Proteoforms', 'Total Proteoforms Biomarkers'],
      ['', 'Total Biomarkers'],
    ])('should return correct label for %s', (bmType, expected) => {
      expect(component.getBiomarkerLabel(bmType)).toBe(expected);
    });
  });

  describe('customColors', () => {
    it.each([
      ['with Uberon Links', '#E41A1C'],
      ['without Uberon Links', '#f5bcba'],
      ['with CL Links', '#377EB8'],
      ['without CL Links', '#abc9eb'],
      ['with HGNC Links', '#4DAF4A'],
      ['without HGNC Links', '#bce8be'],
    ])('should return correct color for %s', (name, color) => {
      expect(component.customColors(name)).toBe(color);
    });
  });

  describe('deleteCompareSheetReport', () => {
    it('should remove compare report and emit deleteSheet', () => {
      component.compareReport = [{ title: 'Test1' }, { title: 'Test2' }] as never[];
      const emitSpy = jest.spyOn(component.deleteSheet, 'emit');

      component.deleteCompareSheetReport(0);

      expect(component.compareReport).toHaveLength(1);
      expect(component.clickButton).toBe(true);
      expect(emitSpy).toHaveBeenCalledWith(0);
    });
  });

  describe('getTotals', () => {
    it('should calculate totals for a given key', () => {
      const data = [
        { organName: 'Kidney', anatomicalStructures: 10 },
        { organName: 'Liver', anatomicalStructures: 20 },
      ] as never[];

      const result = component.getTotals(data, 'anatomicalStructures');

      expect(result).toBe(30);
    });

    it('should handle missing values', () => {
      const data = [{ organName: 'Kidney', anatomicalStructures: 10 }, { organName: 'Liver' }] as never[];

      const result = component.getTotals(data, 'anatomicalStructures');

      expect(result).toBe(10);
    });
  });

  describe('downloadData', () => {
    it('should generate download data object', () => {
      component.reportData = mockReport;

      const result = component.downloadData();

      expect(result.sheet).toBeDefined();
      expect(result.sheetName).toBe('Kidney');
      expect(result.name).toContain('ASCT+B-Reporter_kidney_');
      expect(result.name).toContain('_Report.xlsx');
    });
  });

  describe('getBMCTAS', () => {
    it('should format BM-CT-AS pairs', () => {
      const pairs = [
        {
          AS_NAME: 'Kidney',
          AS_ID: 'UBERON:0002113',
          CT_NAME: 'cell1',
          CT_ID: 'CL:0000001',
          BM_NAME: 'gene1',
          BM_ID: 'HGNC:1234',
        },
      ] as never[];

      const download: Record<string, string>[] = [];
      const result = component.getBMCTAS(pairs, download);

      expect(result).toHaveLength(1);
      expect(result[0]['AS']).toBe('Kidney (UBERON:0002113)');
      expect(result[0]['CT']).toBe('cell1 (CL:0000001)');
      expect(result[0]['Biomarker']).toBe('gene1 (HGNC:1234)');
    });

    it('should handle duplicate pairs', () => {
      const pairs = [
        {
          AS_NAME: 'Kidney',
          AS_ID: 'UBERON:0002113',
          CT_NAME: 'cell1',
          CT_ID: 'CL:0000001',
          BM_NAME: 'gene1',
          BM_ID: 'HGNC:1234',
        },
        {
          AS_NAME: 'Kidney',
          AS_ID: 'UBERON:0002113',
          CT_NAME: 'cell1',
          CT_ID: 'CL:0000001',
          BM_NAME: 'gene1',
          BM_ID: 'HGNC:1234',
        },
      ] as never[];

      const download: Record<string, string>[] = [];
      const result = component.getBMCTAS(pairs, download);

      expect(result).toHaveLength(1);
    });
  });
});
