import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { render, screen } from '@testing-library/angular';
import { of } from 'rxjs';
import { Report } from '../../models/report.model';
import { Row, Sheet, SheetConfig } from '../../models/sheet.model';
import { LinksASCTBData } from '../../models/tree.model';
import { TreeService } from '../../modules/tree/tree.service';
import { ReportComponent } from './report.component';
import { ReportService } from './report.service';

describe('ReportComponent', () => {
  const mockReport = {
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

  const mockSheet = { name: 'kidney', display: 'Kidney', sheetId: '1', gid: '0' } as Sheet;

  const mockLinksData: LinksASCTBData = {
    AS_AS: 10,
    AS_CT: 20,
    CT_B: 30,
    AS_AS_organWise: { Kidney: 5 },
    AS_CT_organWise: { Kidney: 10 },
    CT_B_organWise: { Kidney: 15 },
  };

  const mockSheetConfig = { width: 1000, height: 800 } as SheetConfig;

  const mockRow = {
    anatomical_structures: [],
    cell_types: [],
    biomarkers: [],
    organName: 'Kidney',
    tableVersion: 'v1.0',
  } as unknown as Row;

  const createReportServiceMock = () =>
    ({
      reportData$: of({ data: mockReport, sheet: mockSheet }),
      compareData$: of({ data: [] }),
      makeReportData: jest.fn(),
      makeCompareData: jest.fn(),
      makeAllOrganReportDataByOrgan: jest.fn().mockReturnValue({
        result: mockReport,
        biomarkersSeperateNames: [{ type: 'BG', name: 'gene' }],
      }),
      makeAllOrganReportDataCountsByOrgan: jest
        .fn()
        .mockReturnValue([{ organName: 'Kidney', anatomicalStructures: 2, cellTypes: 2, gene: 2 }]),
    }) as unknown as jest.Mocked<ReportService>;

  const createTreeServiceMock = () => ({ makeTreeData: jest.fn() }) as unknown as jest.Mocked<TreeService>;

  async function setup(inputs: Partial<ReportComponent> = {}) {
    const reportService = createReportServiceMock();
    const treeService = createTreeServiceMock();

    const { fixture } = await render(ReportComponent, {
      inputs: {
        currentSheet: mockSheet,
        sheetData: [mockRow],
        asFullData: [mockRow],
        fullDataByOrgan: [[mockRow]],
        linksData$: of(mockLinksData),
        currentSheetConfig: of(mockSheetConfig),
        compareData: of({ data: [], sheets: [] }),
        ...inputs,
      },
      providers: [
        { provide: ReportService, useValue: reportService },
        { provide: TreeService, useValue: treeService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    fixture.componentInstance.sort = { active: '', direction: '' } as MatSort;
    return { component: fixture.componentInstance, reportService, treeService };
  }

  afterEach(() => jest.clearAllMocks());

  it('renders report headers and overview', async () => {
    await setup();
    expect(screen.getByText('Report for Kidney')).toBeInTheDocument();
    expect(screen.getByText('Overview')).toBeInTheDocument();
  });

  describe('ngOnInit', () => {
    it('initializes data and renders counts', async () => {
      await setup();
      expect(screen.getByText('Anatomical structures')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument(); // total_AS_AS
    });

    it('emits computed report on init', async () => {
      const { component } = await setup();
      const emitSpy = jest.spyOn(component.computedReport, 'emit');
      component.ngOnInit();
      expect(emitSpy).toHaveBeenCalledWith(mockReport);
    });

    it('calls services with correct data', async () => {
      const { treeService, reportService, component } = await setup();
      expect(treeService.makeTreeData).toHaveBeenCalledWith(mockSheet, [mockRow], component.compareData, true);
      expect(reportService.makeReportData).toHaveBeenCalledWith(mockSheet, [mockRow], '', true);
    });

    it('handles compare data', async () => {
      const compareData = { data: [mockRow], sheets: [{ title: 'Test' } as any] };
      const { reportService } = await setup({ compareData: of(compareData) });
      expect(reportService.makeCompareData).toHaveBeenCalledWith(mockReport, [mockRow], compareData.sheets);
    });
  });

  describe('makeOntologyLinksGraphData', () => {
    it('generates graph data with expected structures', async () => {
      const { component } = await setup();
      const result = component.makeOntologyLinksGraphData(mockReport, [mockRow]);

      expect(result).toEqual([
        expect.objectContaining({
          label: 'Total Anatomical Structures',
          results: expect.arrayContaining([
            { name: 'with Uberon Links', value: 1 },
            { name: 'without Uberon Links', value: 1 },
          ]),
        }),
        expect.objectContaining({ label: 'Total Cell Types' }),
        expect.objectContaining({ label: 'Total Biomarkers' }),
      ]);
    });
  });

  it.each([
    ['Gene', 'Total Gene Biomarkers'],
    ['Protein', 'Total Protein Biomarkers'],
    ['Lipids', 'Total Lipids Biomarkers'],
    ['Metabolites', 'Total Metabolites Biomarkers'],
    ['Proteoforms', 'Total Proteoforms Biomarkers'],
    ['', 'Total Biomarkers'],
  ])('getBiomarkerLabel(%s) returns %s', async (bmType, expected) => {
    const { component } = await setup();
    expect(component.getBiomarkerLabel(bmType)).toBe(expected);
  });

  it.each([
    ['with Uberon Links', '#E41A1C'],
    ['without Uberon Links', '#f5bcba'],
    ['with CL Links', '#377EB8'],
    ['without CL Links', '#abc9eb'],
    ['with HGNC Links', '#4DAF4A'],
    ['without HGNC Links', '#bce8be'],
  ])('customColors(%s) returns %s', async (name, color) => {
    const { component } = await setup();
    expect(component.customColors(name)).toBe(color);
  });

  it('deletes compare report and emits event', async () => {
    const { component } = await setup();
    component.compareReport = [{ title: 'T1' }, { title: 'T2' }] as any;
    const emitSpy = jest.spyOn(component.deleteSheet, 'emit');

    component.deleteCompareSheetReport(0);
    expect(component.compareReport).toHaveLength(1);
    expect(emitSpy).toHaveBeenCalledWith(0);
  });

  it('calculates totals with getTotals', async () => {
    const { component } = await setup();
    expect(component.getTotals([{ v: 10 }, { v: 20 }] as any, 'v')).toBe(30);
  });

  it('generates download object with downloadData', async () => {
    const { component } = await setup();
    const result = component.downloadData();
    expect(result.sheetName).toBe('Kidney');
    expect(result.name).toMatch(/ASCT\+B-Reporter_kidney_.*_Report\.xlsx/);
  });

  it('formats BM-CT-AS pairs correctly', async () => {
    const { component } = await setup();
    const pair = { AS_NAME: 'A', AS_ID: 'a', CT_NAME: 'C', CT_ID: 'c', BM_NAME: 'B', BM_ID: 'b' };
    const result = component.getBMCTAS([pair, pair] as any, []);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ '': '', AS: 'A (a)', CT: 'C (c)', Biomarker: 'B (b)' });
  });
});
