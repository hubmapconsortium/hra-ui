import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { render } from '@testing-library/angular';
import { StateReset } from 'ngxs-reset-plugin';
import { BehaviorSubject, of } from 'rxjs';
import { ConfigService } from '../../app-config.service';
import { IndentedListService } from '../../components/indented-list/indented-list.service';
import { ReportService } from '../../components/report/report.service';
import { SheetState } from '../../store/sheet.state';
import { TreeState } from '../../store/tree.state';
import { UIState } from '../../store/ui.state';
import { RootComponent } from './root.component';

describe('RootComponent', () => {
  const searchStructure$ = new BehaviorSubject<any>(null);
  const error$ = new BehaviorSubject({ error: { hasError: false, msg: '' } });

  const mockStore = {
    select: jest.fn((selector) => {
      if (selector === TreeState.getLatestSearchStructure) {
        return searchStructure$.asObservable();
      }
      if (selector === UIState.getError) {
        return error$.asObservable();
      }
      if (selector === SheetState.getCompareData) {
        return of([]);
      }
      if (selector === SheetState.getDataFromCache) {
        return of(false);
      }
      if (selector === TreeState.getTreeData) {
        return of([]);
      }
      if (selector === TreeState.getBottomSheetData) {
        return of({});
      }
      if (selector === TreeState.getBimodal) {
        return of({});
      }
      if (selector === UIState.getControlPaneState) {
        return of(false);
      }
      if (selector === UIState.getLoadingText) {
        return of('Loading...');
      }
      if (selector === UIState.getReport) {
        return of(false);
      }
      if (selector === SheetState.getMode) {
        return of('vis');
      }
      return of(null);
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
    return result.fixture.componentInstance;
  }

  beforeEach(() => {
    jest.clearAllMocks();
    searchStructure$.next(null);
    error$.next({ error: { hasError: false, msg: '' } });
  });

  it('should create and initialize with observables and default values', async () => {
    const component = await setup();

    expect(component).toBeTruthy();
    expect(component.loading).toBe(true);
    expect(component.hasError).toBe(false);
    expect(component.isControlPaneOpen).toBe(false);
    expect(component.mode).toBe('vis');
    expect(component.compareData$).toBeDefined();
    expect(component.treeData$).toBeDefined();
  });

  it('should subscribe to error observable and update error state', async () => {
    const component = await setup();

    error$.next({ error: { hasError: true, msg: 'Test error' } });

    expect(component.error).toEqual({ hasError: true, msg: 'Test error' });
  });

  it('should handle search structure scrolling when structure is provided', async () => {
    const component = await setup();
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
    } as any;

    searchStructure$.next({ x: 1000, y: 700 });
    expect(component.verticalScrollEntity.treeElementRef.nativeElement.scrollTo).toHaveBeenCalledTimes(2);

    component.verticalScrollEntity.treeElementRef.nativeElement.scrollTo.mockClear();
    searchStructure$.next({ x: 100, y: 150 });
    expect(component.verticalScrollEntity.treeElementRef.nativeElement.scrollTo).not.toHaveBeenCalled();
  });

  it('should dispatch StateReset on destroy', async () => {
    const component = await setup();

    component.ngOnDestroy();

    expect(mockStore.dispatch).toHaveBeenCalledWith(new StateReset(SheetState));
  });
});
