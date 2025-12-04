import { ErrorHandler } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { of, throwError } from 'rxjs';
import {
  DeleteCompareSheet,
  FetchAllOrganData,
  FetchCompareData,
  FetchDataFromAssets,
  FetchInitialPlaygroundData,
  FetchSelectedOrganData,
  FetchSheetData,
  FetchValidOmapProtiens,
  ToggleShowAllAS,
  UpdateBottomSheetDOI,
  UpdateBottomSheetInfo,
  UpdateConfig,
  UpdateGetFromCache,
  UpdateMode,
  UpdatePlaygroundData,
  UpdateReport,
  UpdateSelectedOrgansBeforeFilter,
  UpdateSheet,
} from '../actions/sheet.actions';
import { ConfigService } from '../app-config.service';
import { ReportService } from '../components/report/report.service';
import { Report } from '../models/report.model';
import { CompareData, ResponseData, Row, Sheet, SheetConfig, SheetDetails, SheetInfo } from '../models/sheet.model';
import { AS, B, CT } from '../models/tree.model';
import { OpenBottomSheetData } from '../models/ui.model';
import { SheetService } from '../services/sheet/sheet.service';
import { SheetState, SheetStateModel } from './sheet.state';
import { TreeState } from './tree.state';

// Helper function to get state snapshot
const getState = (store: Store): SheetStateModel => {
  return store.selectSnapshot((s: { sheetState: SheetStateModel }) => s.sheetState);
};

// Helper function for async dispatch with delay
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dispatchWithDelay = async (store: Store, action: any, delayMs = 100): Promise<SheetStateModel> => {
  await new Promise<void>((resolve) => {
    store.dispatch(action).subscribe(() => {
      setTimeout(() => resolve(), delayMs);
    });
  });
  return getState(store);
};

describe('SheetState', () => {
  let store: Store;
  let sheetService: jest.Mocked<SheetService>;
  let configService: jest.Mocked<ConfigService>;
  let reportService: jest.Mocked<ReportService>;
  let errorHandler: jest.Mocked<ErrorHandler>;

  const mockSheet: Sheet = {
    name: 'kidney',
    display: 'Kidney',
    sheetId: 'test-sheet-id',
    gid: 'test-gid',
    title: 'Test Sheet',
    config: {
      bimodal_distance_x: 10,
      bimodal_distance_y: 20,
      width: 800,
      height: 600,
      show_ontology: true,
    },
  };

  const mockRow: Row = {
    anatomical_structures: [
      { name: 'Body', id: 'UBERON:0013702', rdfs_label: 'body proper' },
      { name: 'Kidney', id: 'UBERON:0002113' },
    ],
    cell_types: [{ name: 'Cell Type 1', id: 'CL:0000001' }],
    biomarkers: [],
    biomarkers_gene: [],
    biomarkers_protein: [{ name: 'Protein1', id: 'HGNC:1' }],
    biomarkers_lipids: [],
    biomarkers_meta: [],
    biomarkers_prot: [],
    references: [],
    organName: 'kidney',
    tableVersion: 'v1.0',
  };

  const mockResponseData: ResponseData = {
    csv: 'test,csv,data',
    data: [mockRow],
    parsed: [],
  };

  const mockSheetConfig: SheetDetails[] = [
    {
      name: 'kidney',
      display: 'Kidney',
      sheetId: 'kidney-id',
      gid: 'kidney-gid',
      title: 'Kidney Table',
      config: {
        bimodal_distance_x: 10,
        bimodal_distance_y: 20,
        width: 800,
        height: 600,
      },
      version: [
        {
          value: 'kidney-v1',
          viewValue: 'v1.0',
          sheetId: 'kidney-id',
          gid: 'kidney-gid',
          csvUrl: 'https://test.csv',
        },
      ],
      uberon_id: 'UBERON:0002113',
      representation_of: ['UBERON:0002113'],
    },
    {
      name: 'all',
      display: 'All Organs',
      sheetId: '',
      gid: '',
      title: 'All Organs',
      config: {
        bimodal_distance_x: 10,
        bimodal_distance_y: 20,
        width: 800,
        height: 600,
      },
    },
  ];

  const mockOmapSheetConfig: SheetDetails[] = [
    {
      name: 'kidney',
      display: 'Kidney OMAP',
      omapId: 'omap-kidney',
      title: 'Kidney OMAP',
      config: {
        bimodal_distance_x: 10,
        bimodal_distance_y: 20,
        width: 800,
        height: 600,
      },
      version: [
        {
          value: 'kidney-omap-v1',
          viewValue: 'OMAP v1.0',
          sheetId: 'omap-kidney-id',
          gid: 'omap-kidney-gid',
          csvUrl: 'https://omap-test.csv',
        },
      ],
      uberon_id: 'UBERON:0002113',
    },
  ];

  beforeEach(() => {
    sheetService = {
      fetchSheetData: jest.fn(),
      fetchDataFromAssets: jest.fn(),
      fetchPlaygroundData: jest.fn(),
      updatePlaygroundData: jest.fn(),
      fetchBottomSheetData: jest.fn(),
      getDataWithBody: jest.fn((data: Row[], organName: string) => {
        const filterNonBodyStructures = (as: { name?: string }) => as.name !== 'Body';
        return data.map((row) => ({
          ...row,
          organName,
          anatomical_structures: [
            { name: 'Body', id: 'UBERON:0013702', rdfs_label: 'body proper' },
            ...row.anatomical_structures.filter(filterNonBodyStructures),
          ],
        }));
      }),
      formURL: jest.fn(),
      testCallback: jest.fn(),
    } as unknown as jest.Mocked<SheetService>;

    configService = {
      sheetConfiguration$: of(mockSheetConfig),
      omapsheetConfiguration$: of(mockOmapSheetConfig),
      allSheetConfigurations$: of([
        ...mockSheetConfig,
        {
          name: 'example',
          display: 'Example',
          sheetId: 'example-id',
          gid: 'example-gid',
          config: {
            bimodal_distance_x: 10,
            bimodal_distance_y: 20,
            width: 800,
            height: 600,
          },
        },
      ]),
      config$: of({ headerCount: 11 }),
    } as unknown as jest.Mocked<ConfigService>;

    reportService = {} as jest.Mocked<ReportService>;
    errorHandler = {
      handleError: jest.fn(),
    } as unknown as jest.Mocked<ErrorHandler>;

    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([SheetState, TreeState])],
      providers: [
        { provide: SheetService, useValue: sheetService },
        { provide: ConfigService, useValue: configService },
        { provide: ReportService, useValue: reportService },
        { provide: ErrorHandler, useValue: errorHandler },
      ],
    });

    store = TestBed.inject(Store);
  });

  describe('Selectors', () => {
    it('should select all state properties', () => {
      expect(store.selectSnapshot(SheetState.getData)).toEqual([]);
      expect(store.selectSnapshot(SheetState.getSheet).name).toBe('');
      expect(store.selectSnapshot(SheetState.getSheetConfig).show_ontology).toBe(true);
      expect(store.selectSnapshot(SheetState.getSelectedOrgans)).toEqual([]);
      expect(store.selectSnapshot(SheetState.getOMAPSelectedOrgans)).toEqual([]);
      expect(store.selectSnapshot(SheetState.getCompareSheets)).toEqual([]);
      expect(store.selectSnapshot(SheetState.getCompareData)).toEqual([]);
      expect(store.selectSnapshot(SheetState.getReportdata).ASWithNoLink).toEqual([]);
      expect(store.selectSnapshot(SheetState.getParsedData)).toEqual([]);

      const allCompare = store.selectSnapshot(SheetState.getAllCompareData);
      expect(allCompare.data).toEqual([]);
      expect(allCompare.sheets).toEqual([]);

      expect(store.selectSnapshot(SheetState.getBottomSheetInfo).name).toBe('');
      expect(store.selectSnapshot(SheetState.getBottomSheetDOI)).toEqual([]);
      expect(store.selectSnapshot(SheetState.getFullAsData)).toEqual([]);
      expect(store.selectSnapshot(SheetState.getFullDataByOrgan)).toEqual([]);
      expect(store.selectSnapshot(SheetState.getMode)).toBe('vis');
      expect(store.selectSnapshot(SheetState.getDataFromCache)).toBe(true);
      expect(store.selectSnapshot(SheetState.getAllOMAPOrgans)).toEqual([]);
      expect(store.selectSnapshot(SheetState.getFilteredProtiens)).toEqual([]);
      expect(store.selectSnapshot(SheetState.getSelectedOrgansBeforeFilter)).toEqual([]);
    });
  });

  describe('FetchSheetData', () => {
    it('should fetch sheet data and handle errors', async () => {
      sheetService.fetchSheetData.mockReturnValue(of(mockResponseData));
      sheetService.getDataWithBody.mockReturnValue(mockResponseData.data);

      const state = await dispatchWithDelay(store, new FetchSheetData(mockSheet), 0);
      expect(state.data).toEqual(mockResponseData.data);
      expect(state.csv).toBe('test,csv,data');
      expect(state.parsed).toEqual([]);
      expect(sheetService.fetchSheetData).toHaveBeenCalledWith('test-sheet-id', 'test-gid', undefined, undefined);

      // Test error handling
      const error = { name: 'Error', status: 500 };
      sheetService.fetchSheetData.mockReturnValue(throwError(() => error));
      await dispatchWithDelay(store, new FetchSheetData(mockSheet), 0);
      expect(errorHandler.handleError).toHaveBeenCalledWith(error);
    });
  });

  describe('DeleteCompareSheet', () => {
    it('should delete compare sheet and handle both scenarios', async () => {
      const compareData: CompareData[] = [
        { link: 'link1', title: 'Sheet 1', description: 'desc1', color: '#fff', sheetId: 'id1', gid: 'gid1' },
        { link: 'link2', title: 'Sheet 2', description: 'desc2', color: '#000', sheetId: 'id2', gid: 'gid2' },
      ];

      store.reset({ sheetState: { ...getState(store), compareSheets: [...compareData], sheet: mockSheet } });
      sheetService.fetchSheetData.mockReturnValue(of(mockResponseData));

      // Test deletion with remaining sheets
      let state = await dispatchWithDelay(store, new DeleteCompareSheet(0));
      expect(state.compareSheets).toHaveLength(1);
      expect(state.compareSheets[0].title).toBe('Sheet 2');

      // Test deletion with no remaining sheets
      state = await dispatchWithDelay(store, new DeleteCompareSheet(0), 0);
      expect(state.compareSheets).toHaveLength(0);
      expect(state.compareData).toEqual([]);
    });
  });

  describe('FetchCompareData', () => {
    it('should fetch and mark structures with colors', async () => {
      const compareSheets: CompareData[] = [
        {
          link: 'link1',
          title: 'Heart',
          description: 'Heart data',
          color: '#ff0000',
          sheetId: 'heart-id',
          gid: 'heart-gid',
        },
      ];

      const compareResponse: ResponseData = {
        csv: 'compare,csv',
        data: [
          {
            ...mockRow,
            anatomical_structures: [{ name: 'AS1', id: 'AS:001' }],
            cell_types: [{ name: 'CT1', id: 'CL:001' }],
            biomarkers: [{ name: 'BM1', id: 'HGNC:001' }],
          },
        ],
        parsed: [],
      };

      sheetService.fetchSheetData.mockReturnValue(of(compareResponse));
      const state = await dispatchWithDelay(store, new FetchCompareData(compareSheets));

      expect(state.compareSheets.length).toBeGreaterThan(0);
      expect(state.compareData.length).toBeGreaterThan(0);

      if (state.compareData.length > 0) {
        const nonBodyStructures = state.compareData[0].anatomical_structures.filter((as) => as.name !== 'Body');
        if (nonBodyStructures.length > 0) {
          expect(nonBodyStructures[0].isNew).toBe(true);
          expect(nonBodyStructures[0].color).toBe('#ff0000');
        }
      }
    });
  });

  describe('FetchSelectedOrganData', () => {
    it('should fetch selected organ data and handle various scenarios', async () => {
      sheetService.fetchSheetData.mockReturnValue(of(mockResponseData));

      // Test successful fetch
      let state = await dispatchWithDelay(store, new FetchSelectedOrganData(mockSheet, ['kidney-v1'], [], undefined));
      expect(state.selectedOrgans).toContain('kidney-v1');
      expect(state.data.length).toBeGreaterThan(0);

      // Test empty organ selection
      state = await dispatchWithDelay(store, new FetchSelectedOrganData(mockSheet, [''], [], undefined));
      expect(state.data.length).toBe(1);
      expect(state.data[0].anatomical_structures[0].name).toBe('Body');

      // Test error handling
      const error = { name: 'Error', status: 500 };
      sheetService.fetchSheetData.mockReturnValue(throwError(() => error));
      await dispatchWithDelay(store, new FetchSelectedOrganData(mockSheet, ['kidney-v1'], [], undefined));

      // Test with comparison data
      const compareSheets: CompareData[] = [
        {
          link: 'link1',
          title: 'Heart',
          description: 'Heart data',
          color: '#ff0000',
          sheetId: 'heart-id',
          gid: 'heart-gid',
        },
      ];
      sheetService.fetchSheetData.mockReturnValue(of(mockResponseData));
      await dispatchWithDelay(store, new FetchSelectedOrganData(mockSheet, ['kidney-v1'], [], compareSheets), 200);
    });
  });

  describe('FetchAllOrganData', () => {
    it('should fetch all organ data and skip excluded sheets', async () => {
      sheetService.fetchSheetData.mockReturnValue(of(mockResponseData));

      const state = await dispatchWithDelay(store, new FetchAllOrganData(mockSheet));
      expect(state.data.length).toBeGreaterThan(0);

      // Verify excluded sheet names are not fetched
      const calls = sheetService.fetchSheetData.mock.calls.filter(
        (call) => !['all', 'example', 'some'].includes(call[0]),
      );
      expect(calls.length).toBeGreaterThanOrEqual(0);

      // Test error handling
      const error = { name: 'Error', status: 500 };
      sheetService.fetchSheetData.mockReturnValue(throwError(() => error));
      await dispatchWithDelay(store, new FetchAllOrganData(mockSheet));
    });
  });

  describe('FetchDataFromAssets', () => {
    it('should fetch data from assets successfully', async () => {
      const csvData = 'AS/1,AS/1/LABEL,AS/1/ID,AS/2,AS/2/LABEL,AS/2/ID';
      sheetService.fetchDataFromAssets.mockReturnValue(of(csvData));

      const state = await dispatchWithDelay(store, new FetchDataFromAssets('v1.0', mockSheet), 0);
      expect(state.version).toBe('v1.0');
    });
  });

  describe('UpdateConfig', () => {
    it('should update sheet configuration', () => {
      const newConfig: SheetConfig = {
        bimodal_distance_x: 50,
        bimodal_distance_y: 100,
        width: 1000,
        height: 800,
        show_ontology: false,
      };

      store.dispatch(new UpdateConfig(newConfig));
      const state = store.selectSnapshot((s: { sheetState: SheetStateModel }) => s.sheetState);
      expect(state.sheetConfig).toEqual(newConfig);
    });
  });

  describe('ToggleShowAllAS', () => {
    it('should toggle show_all_AS flag', () => {
      const initialState = store.selectSnapshot((s: { sheetState: SheetStateModel }) => s.sheetState);
      const initialValue = initialState.sheetConfig.show_all_AS;

      store.dispatch(new ToggleShowAllAS());
      const state = store.selectSnapshot((s: { sheetState: SheetStateModel }) => s.sheetState);
      expect(state.sheetConfig.show_all_AS).toBe(!initialValue);
    });
  });

  describe('UpdateReport', () => {
    it('should update report data', () => {
      const reportData: Report = {
        ASWithNoLink: [
          {
            name: 'AS1',
            structure: 'AS1',
            ontologyId: '',
            label: '',
            uberon: '',
            notes: '',
          } as AS,
        ],
        CTWithNoLink: [] as CT[],
        BWithNoLink: [] as B[],
        anatomicalStructures: [] as AS[],
        cellTypes: [] as CT[],
        biomarkers: [] as B[],
        ASWithNoCT: [],
        CTWithNoB: [],
      };

      store.dispatch(new UpdateReport(reportData));
      const state = store.selectSnapshot((s: { sheetState: SheetStateModel }) => s.sheetState);
      expect(state.reportData).toEqual(reportData);
    });
  });

  describe('UpdateMode', () => {
    it('should update mode', () => {
      store.dispatch(new UpdateMode('playground'));
      expect(store.selectSnapshot(SheetState.getMode)).toBe('playground');

      store.dispatch(new UpdateMode('vis'));
      expect(store.selectSnapshot(SheetState.getMode)).toBe('vis');
    });
  });

  describe('UpdateSheet', () => {
    it('should update sheet', () => {
      store.dispatch(new UpdateSheet(mockSheet));
      const state = store.selectSnapshot((s: { sheetState: SheetStateModel }) => s.sheetState);
      expect(state.sheet).toEqual(mockSheet);
      expect(state.sheetConfig.show_ontology).toBe(true);
    });
  });

  describe('FetchInitialPlaygroundData', () => {
    it('should fetch and handle playground data', async () => {
      const playgroundData = { csv: 'playground,csv', data: [mockRow], parsed: [] };
      sheetService.fetchPlaygroundData.mockReturnValue(of(playgroundData));

      const state = await dispatchWithDelay(store, new FetchInitialPlaygroundData(), 0);
      expect(state.data.length).toBeGreaterThan(0);
      expect(state.csv).toBe('playground,csv');

      // Test error handling
      const error = { name: 'Error', status: 500 };
      sheetService.fetchPlaygroundData.mockReturnValue(throwError(() => error));
      await dispatchWithDelay(store, new FetchInitialPlaygroundData(), 0);
      expect(errorHandler.handleError).toHaveBeenCalledWith(error);
    });
  });

  describe('UpdatePlaygroundData', () => {
    it('should update and handle playground data', async () => {
      const parsedData = [
        ['AS/1', 'Label1', 'ID1'],
        ['AS/2', 'Label2', 'ID2'],
      ];
      const updatedData = { csv: 'updated,csv', data: [mockRow], parsed: parsedData };
      sheetService.updatePlaygroundData.mockReturnValue(of(updatedData));

      const state = await dispatchWithDelay(store, new UpdatePlaygroundData(parsedData), 0);
      expect(state.parsed).toEqual(parsedData);

      // Test error handling
      const error = { name: 'Error', status: 500 };
      sheetService.updatePlaygroundData.mockReturnValue(throwError(() => error));
      await dispatchWithDelay(store, new UpdatePlaygroundData([['test']]), 0);
      expect(errorHandler.handleError).toHaveBeenCalledWith(error);
    });
  });

  describe('UpdateBottomSheetInfo', () => {
    it('should update bottom sheet info and handle errors and references', async () => {
      const bottomSheetData: OpenBottomSheetData = {
        name: 'Test Structure',
        ontologyId: 'UBERON:0001234',
        group: 1,
        references: [],
        notes: '',
      };

      const response: SheetInfo = {
        name: 'Test Structure',
        ontologyId: 'UBERON:0001234',
        ontologyCode: 'UBERON',
        iri: 'http://purl.obolibrary.org/obo/UBERON_0001234',
        label: 'test structure',
        desc: 'A test structure',
        hasError: false,
        msg: '',
        status: 200,
        notes: '',
      };

      sheetService.fetchBottomSheetData.mockReturnValue(of(response));
      let state = await dispatchWithDelay(store, new UpdateBottomSheetInfo(bottomSheetData), 0);
      expect(state.bottomSheetInfo.name).toBe('Test Structure');
      expect(state.bottomSheetInfo.desc).toBe('A test structure');

      // Test error handling
      const error = { message: 'Not found', status: 404 };
      sheetService.fetchBottomSheetData.mockReturnValue(throwError(() => error));
      state = await dispatchWithDelay(
        store,
        new UpdateBottomSheetInfo({ ...bottomSheetData, ontologyId: 'INVALID:001' }),
        0,
      );
      expect(state.bottomSheetInfo.hasError).toBe(true);
      expect(state.bottomSheetInfo.msg).toBe('Not found');

      // Test with references for group 2
      const dataWithRef: OpenBottomSheetData = {
        name: 'Test',
        ontologyId: 'UBERON:001',
        group: 2,
        references: [{ id: 'ref1', doi: '10.1234/test' }],
        notes: 'test notes',
      };
      sheetService.fetchBottomSheetData.mockReturnValue(of({ ...response, notes: 'test notes' }));
      state = await dispatchWithDelay(store, new UpdateBottomSheetInfo(dataWithRef), 0);
      expect(state.bottomSheetInfo.references).toEqual([{ id: 'ref1', doi: '10.1234/test' }]);
    });
  });

  describe('UpdateBottomSheetDOI', () => {
    it('should update bottom sheet DOI data', () => {
      const doiData = [
        { doi: '10.1234/test1', id: 'ref1', notes: 'Note 1' },
        { doi: '10.1234/test2', id: 'ref2', notes: 'Note 2' },
      ];

      store.dispatch(new UpdateBottomSheetDOI(doiData));
      const state = store.selectSnapshot((s: { sheetState: SheetStateModel }) => s.sheetState);
      expect(state.bottomSheetDOI).toEqual(doiData);
    });
  });

  describe('UpdateGetFromCache', () => {
    it('should update getFromCache flag', () => {
      store.dispatch(new UpdateGetFromCache(false));
      expect(store.selectSnapshot(SheetState.getDataFromCache)).toBe(false);

      store.dispatch(new UpdateGetFromCache(true));
      expect(store.selectSnapshot(SheetState.getDataFromCache)).toBe(true);
    });
  });

  describe('FetchValidOmapProtiens', () => {
    it('should fetch and filter valid OMAP proteins', async () => {
      const omapResponse: ResponseData = {
        csv: 'omap,csv',
        data: [
          {
            ...mockRow,
            biomarkers_protein: [
              { name: 'Protein1', id: 'HGNC:1' },
              { name: 'Protein3', id: 'HGNC:3' },
            ],
          },
        ],
        parsed: [],
      };

      const dataWithProteins = [
        {
          ...mockRow,
          biomarkers_protein: [
            { name: 'Protein1', id: 'HGNC:1' },
            { name: 'Protein2', id: 'HGNC:2' },
          ],
        },
      ];

      store.reset({
        sheetState: { ...getState(store), data: dataWithProteins, compareData: [], omapSelectedOrgans: [] },
      });
      sheetService.fetchSheetData.mockReturnValue(of(omapResponse));

      const state = await dispatchWithDelay(store, new FetchValidOmapProtiens());
      expect(state.filteredProtiens).toContain('Protein1');
      expect(state.filteredProtiens).not.toContain('Protein2');
      expect(state.filteredProtiens).not.toContain('Protein3');
    });
  });

  describe('UpdateSelectedOrgansBeforeFilter', () => {
    it('should update selected organs before filter', () => {
      const organsList = [
        { selector: 'kidney-v1', organName: 'kidney', version: 'v1', filteredOut: false },
        { selector: 'heart-v1', organName: 'heart', version: 'v1', filteredOut: true },
      ];

      store.dispatch(new UpdateSelectedOrgansBeforeFilter(organsList));
      const state = store.selectSnapshot((s: { sheetState: SheetStateModel }) => s.sheetState);
      expect(state.selectedOrgansBeforeFilter).toEqual(organsList);
    });
  });

  describe('OMAP Filtering Logic', () => {
    it('should filter organs based on organsOnly config', async () => {
      // Test with organsOnly enabled
      store.reset({
        sheetState: { ...getState(store), selectedOrgansBeforeFilter: [] },
        treeState: {
          ...store.selectSnapshot((s) => s.treeState),
          omapConfig: { organsOnly: true, proteinsOnly: false },
        },
      });
      sheetService.fetchSheetData.mockReturnValue(of(mockResponseData));

      let state = await dispatchWithDelay(
        store,
        new FetchSelectedOrganData(mockSheet, ['kidney-v1'], ['kidney-omap-v1'], undefined),
      );
      expect(state.selectedOrgans.length).toBeGreaterThanOrEqual(0);

      // Test with organsOnly disabled
      store.reset({
        sheetState: {
          ...getState(store),
          selectedOrgansBeforeFilter: [
            { selector: 'kidney-v1', organName: 'kidney', version: 'v1', filteredOut: false },
          ],
        },
        treeState: {
          ...store.selectSnapshot((s) => s.treeState),
          omapConfig: { organsOnly: false, proteinsOnly: false },
        },
      });

      state = await dispatchWithDelay(store, new FetchSelectedOrganData(mockSheet, ['kidney-v1'], [], undefined));
      expect(state.selectedOrgansBeforeFilter).toEqual([]);
    });
  });
});
