import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { EMPTY } from 'rxjs';
import { ValuesData } from 'vega';
import { ReportLog } from '../../actions/logs.actions';
import { UpdateLinksData, UpdateVegaSpec } from '../../actions/tree.actions';
import { HasError } from '../../actions/ui.actions';
import { LOG_ICONS, LOG_TYPES } from '../../models/logs.model';
import { Row, Sheet, SheetConfig } from '../../models/sheet.model';
import { TNode } from '../../models/tree.model';
import { BimodalService } from './bimodal.service';
import { TreeService } from './tree.service';
import { VegaService } from './vega.service';

describe('TreeService', () => {
  let service: TreeService;
  let store: jest.Mocked<Store>;
  let vegaService: jest.Mocked<VegaService>;
  let bimodalService: jest.Mocked<BimodalService>;

  const mockSheetConfig = { width: 1000, height: 800 } as SheetConfig;
  const mockSheet = { name: 'Test', config: mockSheetConfig } as Sheet;
  const mockRow = {
    anatomical_structures: [
      { name: 'Body', id: 'UBERON:0000001', rdfs_label: 'body', notes: 'Body notes' },
      { name: 'Heart', id: 'UBERON:0000948', rdfs_label: 'heart', notes: 'Heart notes' },
    ],
    organName: 'Heart',
  } as unknown as Row;

  beforeEach(() => {
    store = {
      dispatch: jest.fn(),
      selectSnapshot: jest.fn().mockReturnValue(mockSheetConfig),
      select: jest.fn().mockReturnValue(EMPTY),
    } as unknown as jest.Mocked<Store>;

    vegaService = {
      makeVegaConfig: jest.fn().mockReturnValue({ data: [{ name: 'tree', values: [] }] }),
      renderGraph: jest.fn(),
    } as unknown as jest.Mocked<VegaService>;

    bimodalService = {
      makeBimodalData: jest.fn(),
    } as unknown as jest.Mocked<BimodalService>;

    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([])],
      providers: [
        TreeService,
        { provide: Store, useValue: store },
        { provide: VegaService, useValue: vegaService },
        { provide: BimodalService, useValue: bimodalService },
      ],
    });

    service = TestBed.inject(TreeService);
    service.sheetConfig = mockSheetConfig;
  });

  describe('makeTreeData', () => {
    it('should return early when data is empty', () => {
      service.makeTreeData(mockSheet, []);
      expect(vegaService.makeVegaConfig).not.toHaveBeenCalled();
    });

    it('should create tree and render graph', () => {
      service.makeTreeData(mockSheet, [mockRow]);

      expect(vegaService.makeVegaConfig).toHaveBeenCalled();
      expect(vegaService.renderGraph).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(expect.any(UpdateLinksData));
      expect(store.dispatch).toHaveBeenCalledWith(expect.any(UpdateVegaSpec));
    });

    it.each([
      [
        'isNew property',
        [
          {
            ...mockRow,
            anatomical_structures: [
              { name: 'Body', id: 'UBERON:0000001' },
              { name: 'New', id: 'UBERON:9999', isNew: true, color: '#F00' },
            ],
          },
        ],
      ],
      [
        'without id',
        [{ ...mockRow, anatomical_structures: [{ name: 'Body', id: 'UBERON:0000001' }, { name: 'No ID' }] }],
      ],
      ['duplicates', [mockRow, mockRow]],
    ])('should handle structures with %s', (_desc, rows) => {
      service.makeTreeData(mockSheet, rows as unknown as Row[]);
      expect(vegaService.makeVegaConfig).toHaveBeenCalled();
    });

    it('should handle report mode and call bimodal service', () => {
      vegaService.makeVegaConfig.mockReturnValue({
        data: [{ name: 'tree', values: [{ id: 1 }, { id: 2 }] } as ValuesData],
      } as never);

      service.makeTreeData(mockSheet, [mockRow], undefined, true);

      expect(store.dispatch).toHaveBeenCalledWith(expect.any(UpdateLinksData));
      expect(bimodalService.makeBimodalData).toHaveBeenCalled();
      expect(vegaService.renderGraph).not.toHaveBeenCalled();
    });

    it('should handle report mode with organName filtering', () => {
      const rows = [
        { ...mockRow, organName: 'Heart' },
        {
          ...mockRow,
          organName: 'Lung',
          anatomical_structures: [
            { name: 'Body', id: 'UBERON:0000001' },
            { name: 'Lung', id: 'UBERON:0002048' },
          ],
        },
      ] as unknown as Row[];

      service.makeTreeData(mockSheet, rows, undefined, true);
      expect(bimodalService.makeBimodalData).toHaveBeenCalled();
    });

    it('should handle errors and dispatch error actions', () => {
      vegaService.makeVegaConfig.mockImplementation(() => {
        throw new Error('TestError');
      });

      service.makeTreeData(mockSheet, [mockRow]);

      expect(store.dispatch).toHaveBeenCalledWith(
        new ReportLog(LOG_TYPES.MSG, 'Failed to create Tree', LOG_ICONS.error),
      );
      expect(store.dispatch).toHaveBeenCalledWith(
        new HasError({ msg: 'Error (Status: undefined)', status: undefined, hasError: true }),
      );
    });

    it('should create correct root node structure', () => {
      const capturedNodes: TNode[] = [];
      vegaService.makeVegaConfig.mockImplementation((_sheet, nodes) => {
        capturedNodes.push(...nodes);
        return { data: [{ name: 'tree', values: nodes }] } as never;
      });

      service.makeTreeData(mockSheet, [mockRow]);

      expect(capturedNodes.length).toBeGreaterThan(0);
      expect(capturedNodes.some((n) => n.name === 'Body' && n.ontologyId === 'UBERON:0000001')).toBe(true);
    });
  });
});
