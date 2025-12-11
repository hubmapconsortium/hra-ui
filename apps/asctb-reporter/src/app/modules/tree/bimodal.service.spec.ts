import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { Spec, View } from 'vega';
import { ReportLog } from '../../actions/logs.actions';
import { UpdateBimodal, UpdateLinksData, UpdateVegaSpec } from '../../actions/tree.actions';
import { CloseLoading, HasError } from '../../actions/ui.actions';
import { BMNode, BimodalConfig } from '../../models/bimodal.model';
import { LOG_ICONS, LOG_TYPES } from '../../models/logs.model';
import { OmapConfig } from '../../models/omap.model';
import { PROTEIN_PRESENCE, Row, SheetConfig } from '../../models/sheet.model';
import { AS, B, CT, CT_BLUE, Degree, TNode } from '../../models/tree.model';
import { BimodalService } from './bimodal.service';
import * as treeFunctions from './tree.functions';

jest.mock('./tree.functions');

describe('BimodalService', () => {
  let service: BimodalService;
  let store: jest.Mocked<Store>;
  let mockView: jest.Mocked<View>;

  const createMockView = (): jest.Mocked<View> =>
    ({
      data: jest.fn().mockReturnThis(),
      resize: jest.fn().mockReturnThis(),
      runAsync: jest.fn().mockResolvedValue(undefined),
      _runtime: {
        signals: {
          node__click: { value: null },
          sources__click: { value: [] },
          targets__click: { value: [] },
        },
      },
    }) as unknown as jest.Mocked<View>;

  const mockSheetData: Row[] = [
    {
      anatomical_structures: ['structure1', 'id1'],
      cell_types: ['cell1', 'cellid1'],
      biomarkers: ['gene1', 'geneid1'],
      biomarkers_type: ['gene'],
      biomarkers_protein_presence: [PROTEIN_PRESENCE.POS],
    } as unknown as Row,
  ];

  const mockTreeData: TNode[] = [
    {
      name: 'AS1',
      x: 100,
      y: 200,
      children: 0,
      ontologyId: 'id1',
      color: '#000',
      pathColor: '#111',
      problem: false,
      isNew: false,
      organName: 'Kidney',
      notes: 'test note',
    } as TNode,
  ];

  const mockBimodalConfig: BimodalConfig = {
    CT: { sort: 'Alphabetically', size: 'None' },
    BM: { sort: 'Alphabetically', size: 'None', type: 'All' },
  };

  const mockSheetConfig: SheetConfig = {
    bimodal_distance_x: 150,
    bimodal_distance_y: 50,
  } as SheetConfig;

  const mockCellTypes: CT[] = [
    {
      structure: 'cell1',
      indegree: new Set([{ name: 'AS1', id: 'id1' }]),
      outdegree: new Set([{ name: 'gene1', id: 'geneid1' }]),
      nodeSize: 14,
      link: 'cellid1',
      organName: 'Kidney',
      notes: 'ct note',
      isNew: false,
      color: CT_BLUE,
      label: 1,
      references: new Set(),
    } as unknown as CT,
  ];

  const mockBiomarkers: B[] = [
    {
      structure: 'gene1',
      indegree: new Set([{ name: 'cell1', id: 'cellid1' }]),
      outdegree: new Set(),
      nodeSize: 14,
      link: 'geneid1',
      organName: 'Kidney',
      notes: 'bm note',
      bType: 'gene',
      isNew: false,
      color: '#00FF00',
      proteinPresence: PROTEIN_PRESENCE.POS,
      comparatorName: 'gene1',
    } as unknown as B,
  ];

  beforeEach(() => {
    mockView = createMockView();

    store = {
      dispatch: jest.fn().mockReturnValue(of({})),
      selectSnapshot: jest.fn().mockReturnValue(mockView),
      select: jest.fn().mockReturnValue(of({})),
    } as unknown as jest.Mocked<Store>;

    jest.mocked(treeFunctions.makeAS).mockReturnValue([
      {
        structure: 'structure1',
        uberon: 'id1',
        comparatorId: 'id1',
        comparatorName: 'AS1',
        indegree: new Set<Degree>(),
        outdegree: new Set<Degree>([{ id: 'cellid1', name: 'cell1' }]),
        label: 'AS1',
        notes: 'test',
      } as AS,
    ]);
    jest.mocked(treeFunctions.makeCellTypes).mockResolvedValue(mockCellTypes as never);
    jest.mocked(treeFunctions.makeBioMarkers).mockResolvedValue(mockBiomarkers as never);

    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([])],
      providers: [BimodalService, { provide: Store, useValue: store }],
    });

    service = TestBed.inject(BimodalService);
  });

  it('should create', () => {
    expect(service).toBeDefined();
  });

  describe('makeBimodalData', () => {
    it('should create bimodal data successfully', async () => {
      await service.makeBimodalData(mockSheetData, mockTreeData, mockBimodalConfig, false, mockSheetConfig);

      expect(treeFunctions.makeAS).toHaveBeenCalledWith(mockSheetData);
      expect(treeFunctions.makeCellTypes).toHaveBeenCalledWith(mockSheetData);
      expect(treeFunctions.makeBioMarkers).toHaveBeenCalledWith(mockSheetData);
      expect(store.dispatch).toHaveBeenCalledWith(expect.any(UpdateLinksData));
      expect(store.dispatch).toHaveBeenCalledWith(expect.any(UpdateBimodal));
    });

    it('should handle report mode', async () => {
      await service.makeBimodalData(mockSheetData, mockTreeData, mockBimodalConfig, true, mockSheetConfig);

      expect(store.dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          allOrgans: true,
        }),
      );
    });

    it('should filter proteins when omapConfig.proteinsOnly is true', async () => {
      const omapConfig: OmapConfig = { proteinsOnly: true, organsOnly: false };
      const filteredProteins = ['gene1'];

      await service.makeBimodalData(
        mockSheetData,
        mockTreeData,
        mockBimodalConfig,
        false,
        mockSheetConfig,
        omapConfig,
        filteredProteins,
      );

      expect(treeFunctions.makeBioMarkers).toHaveBeenCalled();
    });

    it.each([
      ['Alphabetically', 'CT'],
      ['Degree', 'CT'],
      ['Alphabetically', 'BM'],
      ['Degree', 'BM'],
    ])('should sort %s by %s', async (sortType, layer) => {
      const config = {
        CT: { sort: layer === 'CT' ? sortType : 'Alphabetically', size: 'None' },
        BM: { sort: layer === 'BM' ? sortType : 'Alphabetically', size: 'None', type: 'All' },
      };

      await service.makeBimodalData(mockSheetData, mockTreeData, config, false, mockSheetConfig);

      expect(store.dispatch).toHaveBeenCalled();
    });

    it.each([
      ['None', 'CT'],
      ['Degree', 'CT'],
      ['Indegree', 'CT'],
      ['Outdegree', 'CT'],
      ['None', 'BM'],
      ['Degree', 'BM'],
    ])('should size nodes by %s for %s', async (sizeType, layer) => {
      const config = {
        CT: { sort: 'Alphabetically', size: layer === 'CT' ? sizeType : 'None' },
        BM: { sort: 'Alphabetically', size: layer === 'BM' ? sizeType : 'None', type: 'All' },
      };

      await service.makeBimodalData(mockSheetData, mockTreeData, config, false, mockSheetConfig);

      expect(store.dispatch).toHaveBeenCalled();
    });

    it.each(['All', 'Gene', 'Protein', 'Lipids', 'Metabolites', 'Proteoforms'])(
      'should filter biomarkers by type: %s',
      async (type) => {
        const config = {
          CT: { sort: 'Alphabetically', size: 'None' },
          BM: { sort: 'Alphabetically', size: 'None', type },
        };

        await service.makeBimodalData(mockSheetData, mockTreeData, config, false, mockSheetConfig);

        expect(store.dispatch).toHaveBeenCalled();
      },
    );

    it('should handle errors and dispatch error actions', async () => {
      jest.mocked(treeFunctions.makeCellTypes).mockRejectedValueOnce({ status: 500, message: 'Test error' } as never);

      await service.makeBimodalData(mockSheetData, mockTreeData, mockBimodalConfig, false, mockSheetConfig);

      expect(store.dispatch).toHaveBeenCalledWith(
        new ReportLog(LOG_TYPES.MSG, 'Failed to create Tree', LOG_ICONS.error),
      );
      expect(store.dispatch).toHaveBeenCalledWith(expect.any(HasError));
    });
  });

  describe('updateBimodalData', () => {
    const createTestData = () => ({
      nodes: [] as BMNode[],
      links: [] as { s: number; t: number }[],
      spec: {
        data: [
          { name: 'nodes', values: [] },
          { name: 'edges', values: [] },
        ],
      } as Spec,
    });

    it('should update bimodal data and dispatch actions', () => {
      const { nodes, links, spec } = createTestData();

      service.updateBimodalData(mockView, spec, nodes, links);

      expect(mockView.data).toHaveBeenCalledWith('nodes', nodes);
      expect(mockView.data).toHaveBeenCalledWith('edges', links);
      expect(mockView.resize).toHaveBeenCalled();
      expect(mockView.runAsync).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(expect.any(CloseLoading));
      expect(store.dispatch).toHaveBeenCalledWith(
        new ReportLog(LOG_TYPES.MSG, 'Visualization successfully rendered', LOG_ICONS.success),
      );
    });

    it('should reset signals', () => {
      const { nodes, links, spec } = createTestData();

      service.updateBimodalData(mockView, spec, nodes, links);

      const anyView = mockView as unknown as {
        _runtime: {
          signals: {
            node__click: { value: null };
            sources__click: { value: never[] };
            targets__click: { value: never[] };
          };
        };
      };
      expect(anyView._runtime.signals.node__click.value).toBeNull();
      expect(anyView._runtime.signals.sources__click.value).toEqual([]);
      expect(anyView._runtime.signals.targets__click.value).toEqual([]);
    });
  });

  describe('updateSpec', () => {
    it('should update spec with bimodal data', () => {
      const nodes: BMNode[] = [new BMNode('node1', 1, 0, 0, 14, 'notes', 'organ', 'id1')];
      const links: { s: number; t: number }[] = [{ s: 1, t: 2 }];
      const spec: Spec = {
        data: [
          { name: 'nodes', values: [] },
          { name: 'edges', values: [] },
        ],
      };

      service.updateSpec(spec, nodes, links);

      expect(store.dispatch).toHaveBeenCalledWith(expect.any(UpdateVegaSpec));
    });
  });
});
