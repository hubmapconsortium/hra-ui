import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Store } from '@ngxs/store';
import { render, screen, waitFor } from '@testing-library/angular';
import { mock } from 'jest-mock-extended';
import { StateReset } from 'ngxs-reset-plugin';
import { BehaviorSubject, of } from 'rxjs';
import { SearchStructure } from '../../models/tree.model';
import { SheetState } from '../../store/sheet.state';
import { TreeState } from '../../store/tree.state';
import { UIState } from '../../store/ui.state';
import { TreeComponent } from '../tree/tree.component';
import { RootComponent } from './root.component';

describe('RootComponent', () => {
  const searchStructure$ = new BehaviorSubject<SearchStructure | null>(null);
  const error$ = new BehaviorSubject<{ error: { hasError: boolean; msg: string } }>({
    error: { hasError: false, msg: '' },
  });

  const mockStore = mock<Store>();
  const selectorMap = new Map<Parameters<Store['select']>[0], ReturnType<Store['select']>>([
    [TreeState.getLatestSearchStructure, searchStructure$.asObservable()],
    [UIState.getError, error$.asObservable()],
    [SheetState.getCompareData, of([])],
    [SheetState.getDataFromCache, of(false)],
    [TreeState.getTreeData, of([])],
    [TreeState.getBottomSheetData, of({})],
    [TreeState.getBimodal, of({})],
    [UIState.getControlPaneState, of(false)],
    [UIState.getLoadingText, of('Loading...')],
    [UIState.getReport, of(false)],
    [SheetState.getMode, of('vis')],
  ]);
  mockStore.select.mockImplementation((selector) => selectorMap.get(selector) ?? of(null));
  mockStore.dispatch.mockReturnValue(of());

  async function setup() {
    const result = await render(RootComponent, {
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: Store, useValue: mockStore }],
    });
    return { ...result, component: result.fixture.componentInstance };
  }

  beforeEach(() => {
    jest.clearAllMocks();
    searchStructure$.next(null);
    error$.next({ error: { hasError: false, msg: '' } });
  });

  it('should create and initialize with observables and default values', async () => {
    const { component } = await setup();

    expect(component).toBeTruthy();
    expect(screen.getByTestId('view-tree')).toBeTruthy();
    expect(screen.queryByTestId('view-playground')).toBeNull();
  });

  it('should subscribe to error observable and update error state', async () => {
    await setup();

    error$.next({ error: { hasError: true, msg: 'Test error' } });

    await waitFor(() => expect(screen.getByTestId('view-error')).toBeTruthy());
  });

  it('should handle search structure scrolling when structure is provided', async () => {
    const { component } = await setup();
    component.verticalScrollEntity = {
      treeElementRef: {
        nativeElement: {
          offsetHeight: 500,
          offsetWidth: 800,
          scrollTop: 100,
          scrollLeft: 50,
          scrollTo: jest.fn(),
        },
      },
    } as unknown as TreeComponent;

    searchStructure$.next({ id: 1, name: 'Node 1', groupName: 'Group', x: 1000, y: 700 });
    expect(component.verticalScrollEntity.treeElementRef.nativeElement.scrollTo).toHaveBeenCalledTimes(2);

    component.verticalScrollEntity.treeElementRef.nativeElement.scrollTo.mockClear();
    searchStructure$.next({ id: 2, name: 'Node 2', groupName: 'Group', x: 100, y: 150 });
    expect(component.verticalScrollEntity.treeElementRef.nativeElement.scrollTo).not.toHaveBeenCalled();
  });

  it('should dispatch StateReset on destroy', async () => {
    const { component } = await setup();

    component.ngOnDestroy();

    expect(mockStore.dispatch).toHaveBeenCalledWith(new StateReset(SheetState));
  });
});
