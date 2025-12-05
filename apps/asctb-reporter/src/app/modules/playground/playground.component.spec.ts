import { CUSTOM_ELEMENTS_SCHEMA, Directive, ElementRef } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { NgxsModule, Store } from '@ngxs/store';
import { render } from '@testing-library/angular';
import jexcel from 'jspreadsheet-ce';
import { of } from 'rxjs';
import { UpdatePlaygroundData } from '../../actions/sheet.actions';
import { SheetState } from '../../store/sheet.state';
import { PlaygroundComponent } from './playground.component';

jest.mock('jspreadsheet-ce', () => jest.fn(() => ({ destroy: jest.fn() })));

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: '[hraClickEvent]', standalone: true, exportAs: 'hraClickEvent' })
class MockClickEventDirective {}

interface ContextMenuItem {
  title?: string;
  type?: string;
  shortcut?: string;
  onclick?: () => void;
}

interface MockJexcelObject {
  options: {
    allowInsertColumn?: boolean;
    allowDeleteColumn?: boolean;
    allowRenameColumn?: boolean;
    allowInsertRow?: boolean;
    allowDeleteRow?: boolean;
    allowComments?: boolean;
    columnSorting?: boolean;
    allowExport?: boolean;
    text?: Record<string, string>;
  };
  insertColumn?: jest.Mock;
  deleteColumn?: jest.Mock;
  setHeader?: jest.Mock;
  orderBy?: jest.Mock;
  download?: jest.Mock;
  insertRow?: jest.Mock;
  deleteRow?: jest.Mock;
  setComments?: jest.Mock;
  getSelectedColumns?: jest.Mock;
  getSelectedRows?: jest.Mock;
  records?: Record<number, Record<number, { getAttribute: (attr: string) => string }>>;
}

describe('PlaygroundComponent', () => {
  const mockSheet = {
    name: 'test-sheet',
    gid: '0',
    sheetId: '123',
    csvUrl: '',
    config: { height: 1400 },
  };

  const mockData = [
    ['A1', 'B1', 'C1'],
    ['A2', 'B2', 'C2'],
  ];

  const mockStore = {
    select: jest.fn((selector) => {
      if (selector === SheetState.getParsedData) {
        return of(mockData);
      }
      if (selector === SheetState.getSheet) {
        return of(mockSheet);
      }
      return of(null);
    }),
    selectSignal: jest.fn(() => () => ({ error: { hasError: false, msg: '' } })),
    dispatch: jest.fn().mockReturnValue(of({})),
  };

  async function setup() {
    const result = await render(PlaygroundComponent, {
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [NgxsModule.forRoot([]), MockClickEventDirective],
      providers: [{ provide: Store, useValue: mockStore }],
    });
    return result.fixture.componentInstance;
  }

  function getJexcelConfig() {
    return jest.mocked(jexcel).mock.calls[0]?.[1];
  }

  function setupInitTable(component: PlaygroundComponent, data = [['A']]) {
    jest.mocked(jexcel).mockClear();
    component.spreadsheet = { nativeElement: document.createElement('div') } as ElementRef;
    component.initTable(data);
    return getJexcelConfig();
  }

  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(jexcel).mockClear();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(jexcel).mockClear();
  });

  describe('Component Initialization', () => {
    it('should create and initialize with sheet subscription', async () => {
      const component = await setup();

      expect(component).toBeTruthy();
      expect(component.currentSheet).toEqual(mockSheet);
      expect(component.prevTab).toBe(0);
      expect(component.linkFormControl).toBeDefined();
    });

    it('should initialize table after view init', async () => {
      const component = await setup();
      component.spreadsheet = { nativeElement: document.createElement('div') } as ElementRef;

      component.ngAfterViewInit();

      expect(component.spreadSheetData).toEqual(mockData);
    });
  });

  describe('Data Operations', () => {
    it('should generate columns with specified length', async () => {
      const component = await setup();

      const columns = component.generateColumns(5);

      expect(columns).toHaveLength(5);
      expect(columns[0]).toEqual({ type: 'text', width: 125 });
    });

    it('should handle tab change and filter empty rows', async () => {
      const component = await setup();
      component.prevTab = 1;
      component.spreadSheetData = [
        ['A', 'B'],
        ['', ''],
        ['C', '\u0000'],
      ];

      component.tabChange({ index: 0 } as MatTabChangeEvent);

      expect(component.prevTab).toBe(0);
      expect(mockStore.dispatch).toHaveBeenCalledWith(
        new UpdatePlaygroundData([
          ['A', 'B'],
          ['C', '\u0000'],
        ]),
      );
    });

    it('should parse Google Sheets URL', async () => {
      const component = await setup();

      const result = component.checkLinkFormat('https://docs.google.com/spreadsheets/d/123/edit#gid=456');

      expect(result).toEqual({ sheetID: '123', gid: '456', csvUrl: '' });
    });

    it('should handle CSV URL format', async () => {
      const component = await setup();

      const result = component.checkLinkFormat('https://example.com/data.csv');

      expect(result).toEqual({ sheetID: '0', gid: '0', csvUrl: 'https://example.com/data.csv' });
    });

    it('should upload data and dispatch action', async () => {
      const component = await setup();
      const uploadData = {
        link: 'https://example.com/sheet',
        sheetId: '789',
        gid: '0',
        csvUrl: '',
        formData: new FormData(),
      };

      component.upload(uploadData);

      expect(component.tabIndex).toBe(0);
      expect(mockStore.dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ sheet: expect.objectContaining({ sheetId: '789', gid: '0' }) }),
      );
    });
  });

  describe('Jexcel Integration', () => {
    it('should initialize table with correct configuration', async () => {
      const component = await setup();
      const config = setupInitTable(component, [
        ['A', 'B'],
        ['C', 'D'],
      ]);

      expect(jexcel).toHaveBeenCalled();
      expect(config?.data).toEqual([
        ['A', 'B'],
        ['C', 'D'],
      ]);
      expect(config?.minDimensions).toEqual([50, 50]);
      expect(config?.onchange).toBeDefined();
      expect(config?.contextMenu).toBeDefined();
      expect(config?.columns).toHaveLength(2);
      expect(component.table).toBeDefined();
    });

    it('should update spreadSheetData on change', async () => {
      const component = await setup();
      const testData = [['X', 'Y']];
      const config = setupInitTable(component, testData);

      (config?.onchange as unknown as () => void)?.();

      expect(component.spreadSheetData).toEqual(testData);
    });
  });

  describe('Context Menu - Column Operations', () => {
    function createColumnMenuMock(): MockJexcelObject {
      return {
        options: {
          allowInsertColumn: true,
          allowDeleteColumn: true,
          allowRenameColumn: true,
          columnSorting: true,
          allowExport: true,
          text: {
            insertANewColumnBefore: 'Insert before',
            insertANewColumnAfter: 'Insert after',
            deleteSelectedColumns: 'Delete',
            renameThisColumn: 'Rename',
            orderAscending: 'Asc',
            orderDescending: 'Desc',
            saveAs: 'Save',
          },
        },
        insertColumn: jest.fn(),
        deleteColumn: jest.fn(),
        setHeader: jest.fn(),
        orderBy: jest.fn(),
        download: jest.fn(),
        getSelectedColumns: jest.fn(() => []),
      };
    }

    it('should generate column context menu', async () => {
      const component = await setup();
      const config = setupInitTable(component);
      const mockObj = createColumnMenuMock();

      const contextMenuFn = config?.contextMenu as unknown as (
        obj: MockJexcelObject,
        x: string,
        y: null,
        event: unknown,
      ) => ContextMenuItem[];
      const items = contextMenuFn?.(mockObj, '0', null, {});

      expect(items).toBeDefined();
      expect(items?.length).toBeGreaterThan(0);
      expect(items?.some((item) => item.title === 'Insert before')).toBe(true);
    });

    it('should execute column menu callbacks', async () => {
      const component = await setup();
      const config = setupInitTable(component);
      const mockObj = createColumnMenuMock();

      const contextMenuFn = config?.contextMenu as unknown as (
        obj: MockJexcelObject,
        x: string,
        y: null,
        event: unknown,
      ) => ContextMenuItem[];
      const items = contextMenuFn?.(mockObj, '1', null, {});
      items?.forEach((item) => item.onclick?.());

      expect(mockObj.insertColumn).toHaveBeenCalled();
      expect(mockObj.deleteColumn).toHaveBeenCalled();
      expect(mockObj.setHeader).toHaveBeenCalled();
      expect(mockObj.orderBy).toHaveBeenCalled();
      expect(mockObj.download).toHaveBeenCalled();
    });

    it('should handle deleteColumn with selected columns', async () => {
      const component = await setup();
      const config = setupInitTable(component);
      const mockObj: MockJexcelObject = {
        options: { allowDeleteColumn: true, text: { deleteSelectedColumns: 'Delete' } },
        deleteColumn: jest.fn(),
        getSelectedColumns: jest.fn(() => ['1', '2']),
      };

      const contextMenuFn = config?.contextMenu as unknown as (
        obj: MockJexcelObject,
        x: string,
        y: null,
        event: unknown,
      ) => ContextMenuItem[];
      const items = contextMenuFn?.(mockObj, '1', null, {});
      items?.find((item) => item.title === 'Delete')?.onclick?.();

      expect(mockObj.deleteColumn).toHaveBeenCalledWith(undefined);
    });
  });

  describe('Context Menu - Row Operations', () => {
    function createRowMenuMock(hasComment = false): MockJexcelObject {
      return {
        options: {
          allowInsertRow: true,
          allowDeleteRow: true,
          allowComments: true,
          allowExport: true,
          text: {
            insertANewRowBefore: 'Insert row before',
            insertANewRowAfter: 'Insert row after',
            deleteSelectedRows: 'Delete rows',
            addComments: 'Add comment',
            editComments: 'Edit comment',
            comments: 'Comment',
            saveAs: 'Save',
          },
        },
        insertRow: jest.fn(),
        deleteRow: jest.fn(),
        setComments: jest.fn(),
        download: jest.fn(),
        getSelectedRows: jest.fn(() => []),
        records: { 0: { 0: { getAttribute: () => (hasComment ? 'existing' : '') } } },
      };
    }

    it('should generate row context menu', async () => {
      const component = await setup();
      const config = setupInitTable(component);
      const mockObj = createRowMenuMock();

      const contextMenuFn = config?.contextMenu as unknown as (
        obj: MockJexcelObject,
        x: string,
        y: string,
        event: unknown,
      ) => ContextMenuItem[];
      const items = contextMenuFn?.(mockObj, '0', '0', {});

      expect(items).toBeDefined();
      expect(items?.some((item) => item.title === 'Insert row before')).toBe(true);
    });

    it('should execute row menu callbacks', async () => {
      const component = await setup();
      const config = setupInitTable(component);
      const mockObj: MockJexcelObject = {
        ...createRowMenuMock(true),
        records: { 1: { 0: { getAttribute: () => 'comment' } } },
      };

      global.prompt = jest.fn(() => 'test');
      const contextMenuFn = config?.contextMenu as unknown as (
        obj: MockJexcelObject,
        x: string,
        y: string,
        event: unknown,
      ) => ContextMenuItem[];
      const items = contextMenuFn?.(mockObj, '0', '1', {});
      items?.forEach((item) => item.onclick?.());

      expect(mockObj.insertRow).toHaveBeenCalled();
      expect(mockObj.deleteRow).toHaveBeenCalled();
      expect(mockObj.setComments).toHaveBeenCalled();
      expect(mockObj.download).toHaveBeenCalled();
    });

    it('should add comment when none exists', async () => {
      const component = await setup();
      const config = setupInitTable(component);
      const mockObj = createRowMenuMock(false);

      global.prompt = jest.fn(() => 'new comment');
      const contextMenuFn = config?.contextMenu as unknown as (
        obj: MockJexcelObject,
        x: string,
        y: string,
        event: unknown,
      ) => ContextMenuItem[];
      const items = contextMenuFn?.(mockObj, '0', '0', {});
      items?.find((item) => item.title === 'Add comment')?.onclick?.();

      expect(mockObj.setComments).toHaveBeenCalledWith([0, 0], 'new comment', '');
    });

    it('should handle deleteRow with selected rows', async () => {
      const component = await setup();
      const config = setupInitTable(component);
      const mockObj: MockJexcelObject = {
        options: { allowDeleteRow: true, text: { deleteSelectedRows: 'Delete' } },
        deleteRow: jest.fn(),
        getSelectedRows: jest.fn(() => ['1', '2']),
        records: {},
      };

      const contextMenuFn = config?.contextMenu as unknown as (
        obj: MockJexcelObject,
        x: null,
        y: string,
        event: unknown,
      ) => ContextMenuItem[];
      const items = contextMenuFn?.(mockObj, null, '1', {});
      items?.find((item) => item.title === 'Delete')?.onclick?.();

      expect(mockObj.deleteRow).toHaveBeenCalledWith(undefined);
    });
  });
});
