import { ErrorHandler } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngxs/store';
import { parse, View } from 'vega';
import { ReportLog } from '../../actions/logs.actions';
import { UpdateLinksData, UpdateVegaView } from '../../actions/tree.actions';
import { CloseLoading, HasError, OpenBottomSheet, OpenBottomSheetDOI } from '../../actions/ui.actions';
import { LOG_ICONS, LOG_TYPES } from '../../models/logs.model';
import { DOI, Sheet, SheetConfig } from '../../models/sheet.model';
import { TNode } from '../../models/tree.model';
import { OpenBottomSheetData } from '../../models/ui.model';
import { BimodalService } from './bimodal.service';
import { Data } from './spec/data';
import { Legends } from './spec/legends';
import { Marks } from './spec/marks';
import { Scales } from './spec/scales';
import { Signals } from './spec/signals';
import { VegaService } from './vega.service';

jest.mock('vega', () => ({ parse: jest.fn(), View: jest.fn() }));
jest.mock('./spec/data');
jest.mock('./spec/legends');
jest.mock('./spec/marks');
jest.mock('./spec/scales');
jest.mock('./spec/signals');

describe('VegaService', () => {
  let service: VegaService;
  let store: jest.Mocked<Store>;
  let bimodalService: jest.Mocked<BimodalService>;
  let errorHandler: jest.Mocked<ErrorHandler>;
  let mockView: jest.Mocked<View>;
  let logEvent: jest.Mock;

  const mockSheet = { name: 'Test', config: {} } as Sheet;
  const mockTreeData = [{ name: 'Node1' }] as unknown as TNode[];
  const mockSheetConfig = { width: 1000, height: 800 } as SheetConfig;

  beforeEach(() => {
    logEvent = jest.fn();
    mockView = {
      renderer: jest.fn().mockReturnThis(),
      initialize: jest.fn().mockReturnThis(),
      hover: jest.fn().mockReturnThis(),
      runAsync: jest.fn().mockResolvedValue(undefined),
      data: jest.fn().mockReturnValue([]),
      addSignalListener: jest.fn(),
    } as unknown as jest.Mocked<View>;

    (parse as jest.Mock).mockReturnValue({});
    (View as unknown as jest.Mock).mockReturnValue(mockView);

    store = {
      dispatch: jest.fn().mockReturnValue({ subscribe: jest.fn((cb: () => void) => cb()) }),
      selectSnapshot: jest.fn(),
    } as unknown as jest.Mocked<Store>;

    bimodalService = { makeBimodalData: jest.fn() } as unknown as jest.Mocked<BimodalService>;
    errorHandler = { handleError: jest.fn() } as jest.Mocked<ErrorHandler>;

    TestBed.configureTestingModule({
      providers: [
        VegaService,
        { provide: Store, useValue: store },
        { provide: BimodalService, useValue: bimodalService },
        { provide: ErrorHandler, useValue: errorHandler },
      ],
    });

    service = TestBed.inject(VegaService);
    (service as unknown as { logEvent: jest.Mock }).logEvent = logEvent;

    [Data.create, Legends.create, Marks.create, Scales.create, Signals.create].forEach((fn) =>
      (fn as jest.Mock).mockReturnValue([]),
    );
  });

  describe('renderGraph', () => {
    it('should render graph successfully', async () => {
      await service.renderGraph({ $schema: 'test' });

      expect(parse).toHaveBeenCalled();
      expect(mockView.renderer).toHaveBeenCalledWith('svg');
      expect(mockView.initialize).toHaveBeenCalledWith('#vis');
      expect(mockView.addSignalListener).toHaveBeenCalledTimes(3);
      expect(store.dispatch).toHaveBeenCalledWith(expect.any(CloseLoading));
      expect(store.dispatch).toHaveBeenCalledWith(expect.any(UpdateLinksData));
    });

    it('should handle rendering errors', async () => {
      const error = { name: 'Error', status: 500 };
      (parse as jest.Mock).mockImplementation(() => {
        throw error;
      });

      await service.renderGraph({});

      expect(errorHandler.handleError).toHaveBeenCalledWith(error);
      expect(store.dispatch).toHaveBeenCalledWith(
        new ReportLog(LOG_TYPES.MSG, 'Failed to create Tree', LOG_ICONS.error),
      );
      expect(store.dispatch).toHaveBeenCalledWith(
        new HasError({ msg: 'Error (Status: 500)', status: 500, hasError: true }),
      );
    });
  });

  describe('addSignalListeners', () => {
    it.each([
      [
        'bimodal_text__click with node',
        'bimodal_text__click',
        { name: 'Node' } as OpenBottomSheetData,
        OpenBottomSheet,
        { node: 'Node' },
      ],
      ['bimodal_text__click empty', 'bimodal_text__click', {}, null, null],
      ['node__click selected', 'node__click', 'id', null, { message: 'Selected a node' }],
      ['node__click deselected', 'node__click', null, null, { message: 'Deselected a node' }],
      ['path__click with DOI', 'path__click', [{ doi: '10.1' }] as DOI[], OpenBottomSheetDOI, null],
      ['path__click empty', 'path__click', [], null, null],
    ])('should handle %s', (_desc, signal, data, Action, eventData) => {
      service.addSignalListeners(mockView);
      const listener = mockView.addSignalListener.mock.calls.find((call) => call[0] === signal)?.[1];
      listener?.('signal', data);

      if (Action) {
        expect(store.dispatch).toHaveBeenCalledWith(expect.any(Action));
      }
      if (eventData) {
        expect(logEvent).toHaveBeenCalledWith(expect.anything(), expect.objectContaining(eventData));
      }
    });
  });

  describe('makeBimodal', () => {
    it('should create bimodal with data', () => {
      const mockData = [{ row: 'data' }];
      store.selectSnapshot
        .mockReturnValueOnce(mockData)
        .mockReturnValueOnce(mockTreeData)
        .mockReturnValueOnce({ config: 'test' })
        .mockReturnValueOnce(mockSheetConfig)
        .mockReturnValueOnce({})
        .mockReturnValueOnce([]);

      service.makeBimodal(mockView);

      expect(store.dispatch).toHaveBeenCalledWith(expect.any(UpdateVegaView));
      expect(bimodalService.makeBimodalData).toHaveBeenCalled();
    });

    it('should skip bimodal when no data', () => {
      store.selectSnapshot.mockReturnValue([]);
      service.makeBimodal(mockView);
      expect(bimodalService.makeBimodalData).not.toHaveBeenCalled();
    });
  });

  describe('makeVegaConfig', () => {
    it('should create vega spec', () => {
      const result = service.makeVegaConfig(mockSheet, mockTreeData, mockSheetConfig);

      expect(result).toMatchObject({
        $schema: 'https://vega.github.io/schema/vega/v5.json',
        autosize: 'pad',
        padding: { right: 0, top: 20, bottom: 20, left: 30 },
      });
      expect(Data.create).toHaveBeenCalledWith(mockSheet, mockTreeData, mockSheetConfig);
      expect(Signals.create).toHaveBeenCalledWith(mockSheetConfig);
      [Scales.create, Legends.create, Marks.create].forEach((fn) => expect(fn).toHaveBeenCalled());
    });
  });
});
