import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { render, waitFor } from '@testing-library/angular';
import { StateReset } from 'ngxs-reset-plugin';
import { BehaviorSubject, of } from 'rxjs';
import { ConfigService } from '../../app-config.service';
import { IndentedListService } from '../../components/indented-list/indented-list.service';
import { ReportService } from '../../components/report/report.service';
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

  const mockStore = {
    select: jest.fn((selector) => {
      const map = new Map<any, any>([
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

      return map.has(selector) ? map.get(selector) : of(null);
    }),
    dispatch: jest.fn().mockReturnValue(of({})),
  };

  const mockServices = {
    configService: {},
    dialog: {},
    indent: {},
    report: {},
    router: {},
  };

  async function setup() {
    const result = await render(RootComponent, {
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: ConfigService, useValue: mockServices.configService },
        { provide: MatDialog, useValue: mockServices.dialog },
        { provide: IndentedListService, useValue: mockServices.indent },
        { provide: ReportService, useValue: mockServices.report },
        { provide: Router, useValue: mockServices.router },
      ],
    });
    return { ...result, component: result.fixture.componentInstance };
  }

  beforeEach(() => {
    jest.clearAllMocks();
    searchStructure$.next(null);
    error$.next({ error: { hasError: false, msg: '' } });
  });

  it('should create and initialize with observables and default values', async () => {
    const { component, container } = await setup();

    expect(component).toBeTruthy();
    expect(container.querySelector('.tree-div')).toBeTruthy();
    expect(container.querySelector('.playground-dig')).toBeNull();
  });

  it('should subscribe to error observable and update error state', async () => {
    const { container } = await setup();

    error$.next({ error: { hasError: true, msg: 'Test error' } });

    await waitFor(() => expect(container.querySelector('app-error')).toBeTruthy());
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
