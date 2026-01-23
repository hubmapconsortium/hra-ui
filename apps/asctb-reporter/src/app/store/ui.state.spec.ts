import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import {
  CloseBottomSheet,
  CloseBottomSheetDOI,
  CloseCompare,
  CloseLoading,
  CloseRightSideNav,
  CloseSearch,
  CloseSnackbar,
  HasError,
  OpenBottomSheet,
  OpenBottomSheetDOI,
  OpenCompare,
  OpenLoading,
  OpenSearch,
  OpenSnackbar,
  ToggleControlPane,
  ToggleDebugLogs,
  ToggleIndentList,
  ToggleReport,
  UpdateLoadingText,
} from '../actions/ui.actions';
import { Error, SnackbarType } from '../models/response.model';
import { DOI } from '../models/sheet.model';
import { OpenBottomSheetData } from '../models/ui.model';
import { TreeState } from './tree.state';
import { UIState, UIStateModel } from './ui.state';

const getState = (store: Store): UIStateModel => store.selectSnapshot((s: { uiState: UIStateModel }) => s.uiState);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dispatchWithDelay = async (store: Store, action: any, delayMs = 100): Promise<UIStateModel> => {
  await new Promise<void>((resolve) => {
    store.dispatch(action).subscribe(() => setTimeout(() => resolve(), delayMs));
  });
  return getState(store);
};

describe('UIState', () => {
  let store: Store;

  const mockBottomSheetData: OpenBottomSheetData = {
    name: 'Test Structure',
    ontologyId: 'UBERON:0000001',
    group: 1,
    references: [],
    notes: 'Test notes',
  };

  const mockDOIData: DOI[] = [{ doi: '10.1234/test.doi', id: 'test-id', notes: 'Test notes' }];
  const mockError: Error = { hasError: true, msg: 'Test error message', status: 500 };

  const createInitialState = (treeView = {}) => ({
    uiState: {
      rightSideNavOpen: false,
      controlPaneOpen: true,
      loading: true,
      loadingText: '',
      error: {},
      snackbar: { opened: false, text: '', type: SnackbarType.success },
      indentListOpen: false,
      reportOpen: false,
      debugLogOpen: false,
      bottomSheetOpen: false,
      compareOpen: false,
      searchOpen: false,
    },
    treeState: {
      spec: {},
      treeData: [],
      view: treeView,
      width: 0,
      height: 0,
      bimodal: { nodes: [], links: [], config: {} },
      search: [],
      lastSearch: { id: '', name: '', groupName: '', ontologyId: '' },
      bottomSheetData: {},
      links: { AS_CT: 0, CT_B: 0, AS_AS: 0, AS_CT_organWise: {}, CT_B_organWise: {}, AS_AS_organWise: {} },
      discrepencyLabel: [],
      discrepencyId: [],
    },
  });

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [NgxsModule.forRoot([UIState, TreeState])] });
    store = TestBed.inject(Store);
    store.reset(createInitialState());
  });

  it('should select all UI state properties correctly', () => {
    const state = getState(store);
    expect(UIState.getSnackbar(state)).toEqual({ opened: false, text: '', type: SnackbarType.success });
    expect(UIState.getLoading(state)).toBe(true);
    expect(UIState.getLoadingText(state)).toBe('');
    expect(UIState.getControlPaneState(state)).toBe(true);
    expect(UIState.getError(state)).toEqual({ error: {} });
    expect(UIState.getIndentList(state)).toBe(false);
    expect(UIState.getReport(state)).toBe(false);
    expect(UIState.getRightSideNav(state)).toBe(false);
    expect(UIState.getDebugLog(state)).toBe(false);
    expect(UIState.getBottomSheet(state)).toBe(false);
    expect(UIState.getCompareState(state)).toBe(false);
    expect(UIState.getSearchState(state)).toBe(false);
  });

  it('should handle snackbar lifecycle (open success/error, close)', async () => {
    let state = await dispatchWithDelay(store, new OpenSnackbar('Success message', SnackbarType.success));
    expect(state.snackbar).toEqual({ opened: true, text: 'Success message', type: SnackbarType.success });

    state = await dispatchWithDelay(store, new OpenSnackbar('Error message', SnackbarType.error));
    expect(state.snackbar).toEqual({ opened: true, text: 'Error message', type: SnackbarType.error });

    state = await dispatchWithDelay(store, new CloseSnackbar());
    expect(state.snackbar).toEqual({ opened: false, text: '', type: SnackbarType.success });
  });

  it('should handle loading lifecycle (open, update text, close with/without message)', async () => {
    await dispatchWithDelay(store, new HasError(mockError));
    let state = await dispatchWithDelay(store, new OpenLoading('Loading data...'));
    expect(state.loading).toBe(true);
    expect(state.loadingText).toBe('Loading data...');
    expect(state.error).toEqual({});

    state = await dispatchWithDelay(store, new UpdateLoadingText('Updated text'));
    expect(state.loadingText).toBe('Updated text');

    state = await dispatchWithDelay(store, new CloseLoading('Operation completed'));
    expect(state.loading).toBe(false);
    expect(state.loadingText).toBe('');
    expect(state.snackbar).toEqual({ opened: true, text: 'Operation completed', type: SnackbarType.success });

    await dispatchWithDelay(store, new OpenLoading('Loading...'));
    state = await dispatchWithDelay(store, new CloseLoading());
    expect(state.loading).toBe(false);
    expect(state.snackbar.text).toBe('');
  });

  it('should handle errors with and without messages', async () => {
    let state = await dispatchWithDelay(store, new HasError(mockError));
    expect(state.error).toEqual(mockError);
    expect(state.loading).toBe(false);
    expect(state.loadingText).toBe('');
    expect(state.snackbar).toEqual({ opened: true, text: 'Test error message', type: SnackbarType.error });

    state = await dispatchWithDelay(store, new HasError({ hasError: true, status: 404 }));
    expect(state.snackbar.text).toBe('');
  });

  it('should toggle control pane bidirectionally', async () => {
    let state = await dispatchWithDelay(store, new ToggleControlPane());
    expect(state.controlPaneOpen).toBe(false);

    state = await dispatchWithDelay(store, new ToggleControlPane());
    expect(state.controlPaneOpen).toBe(true);
  });

  it('should toggle all sidebar panels and close them via CloseRightSideNav', async () => {
    let state = await dispatchWithDelay(store, new ToggleIndentList());
    expect(state.indentListOpen).toBe(true);
    state = await dispatchWithDelay(store, new ToggleIndentList());
    expect(state.indentListOpen).toBe(false);

    state = await dispatchWithDelay(store, new ToggleReport());
    expect(state.reportOpen).toBe(true);
    state = await dispatchWithDelay(store, new ToggleReport());
    expect(state.reportOpen).toBe(false);

    state = await dispatchWithDelay(store, new ToggleDebugLogs());
    expect(state.debugLogOpen).toBe(true);
    state = await dispatchWithDelay(store, new ToggleDebugLogs());
    expect(state.debugLogOpen).toBe(false);

    await dispatchWithDelay(store, new ToggleIndentList());
    await dispatchWithDelay(store, new ToggleReport());
    await dispatchWithDelay(store, new ToggleDebugLogs());
    await dispatchWithDelay(store, new OpenCompare());
    state = await dispatchWithDelay(store, new CloseRightSideNav());
    expect(state.indentListOpen).toBe(false);
    expect(state.reportOpen).toBe(false);
    expect(state.debugLogOpen).toBe(false);
    expect(state.compareOpen).toBe(false);
  });

  it('should handle bottom sheet lifecycle (open, open DOI, close DOI, close)', async () => {
    await dispatchWithDelay(store, new OpenBottomSheet(mockBottomSheetData), 200);
    let state = getState(store);
    expect(state.bottomSheetOpen).toBe(true);

    await dispatchWithDelay(store, new OpenBottomSheetDOI(mockDOIData));
    await dispatchWithDelay(store, new CloseBottomSheetDOI());

    state = await dispatchWithDelay(store, new CloseBottomSheet());
    expect(state.bottomSheetOpen).toBe(false);
  });

  it('should signal vega view when closing bottom sheet if view is available', async () => {
    const mockView = { signal: jest.fn() };
    store.reset(createInitialState(mockView));
    await dispatchWithDelay(store, new OpenBottomSheet(mockBottomSheetData), 200);
    await dispatchWithDelay(store, new CloseBottomSheet());
    expect(mockView.signal).toHaveBeenCalledWith('bimodal_text__click', {});
  });

  it('should handle compare panel lifecycle (open, close)', async () => {
    let state = await dispatchWithDelay(store, new OpenCompare());
    expect(state.compareOpen).toBe(true);

    state = await dispatchWithDelay(store, new CloseCompare());
    expect(state.compareOpen).toBe(false);
  });

  it('should handle search panel lifecycle (open, close)', async () => {
    let state = await dispatchWithDelay(store, new OpenSearch());
    expect(state.searchOpen).toBe(true);

    state = await dispatchWithDelay(store, new CloseSearch());
    expect(state.searchOpen).toBe(false);
  });

  it('should handle multiple concurrent state changes', async () => {
    await dispatchWithDelay(store, new OpenLoading('Loading...'));
    await dispatchWithDelay(store, new ToggleIndentList());
    await dispatchWithDelay(store, new ToggleReport());
    await dispatchWithDelay(store, new OpenCompare());
    const state = getState(store);
    expect(state.loading).toBe(true);
    expect(state.loadingText).toBe('Loading...');
    expect(state.indentListOpen).toBe(true);
    expect(state.reportOpen).toBe(true);
    expect(state.compareOpen).toBe(true);
  });

  it('should maintain state independence across UI elements', async () => {
    await dispatchWithDelay(store, new OpenSnackbar('Message', SnackbarType.success));
    await dispatchWithDelay(store, new ToggleControlPane());
    await dispatchWithDelay(store, new OpenSearch());
    const state = getState(store);
    expect(state.snackbar.opened).toBe(true);
    expect(state.controlPaneOpen).toBe(false);
    expect(state.searchOpen).toBe(true);
    expect(state.bottomSheetOpen).toBe(false);
    expect(state.compareOpen).toBe(false);
  });
});
