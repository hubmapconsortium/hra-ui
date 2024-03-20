import { TestBed } from '@angular/core/testing';
import { FtuDataService, Iri } from '@hra-ui/services';
import { MockProxy, calledWithFn, mock } from 'jest-mock-extended';
import { CellSummaryState } from './cell-summary.state';
import { of } from 'rxjs';
import { StateContext } from '@ngxs/store';
import { CellSummaryModel } from './cell-summary.model';
import { Load, UpdateSummaries } from './cell-summary.actions';
import { dispatch, selectSnapshot } from '@hra-ui/cdk/injectors';
import { ActiveFtuSelectors } from '../active-ftu';

jest.mock('@hra-ui/cdk/injectors');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

describe('CellSummaryState', () => {
  const testIri = 'https://www.example.com/test-iri' as Iri;
  let state: CellSummaryState;
  let ctx: MockProxy<StateContext<CellSummaryModel>>;
  let dataService: MockProxy<FtuDataService>;

  const selectSnapshotSpy = calledWithFn<Any, Any[]>({ fallbackMockImplementation: () => () => [] });
  const iriSpy = jest.fn((): string | undefined => 'test');

  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(selectSnapshot).mockImplementation(selectSnapshotSpy);
    jest.mocked(dispatch).mockReturnValue(jest.fn());

    selectSnapshotSpy.calledWith(ActiveFtuSelectors.iri).mockReturnValue(iriSpy);
    selectSnapshotSpy.calledWith(ActiveFtuSelectors.sources).mockReturnValue(() => []);

    TestBed.overrideProvider(FtuDataService, {
      useValue: (dataService = mock()),
    });
    state = TestBed.runInInjectionContext(() => new CellSummaryState());
    dataService.getCellSummaries.mockReturnValue(of([]));
    ctx = mock();

    ctx.getState.mockReturnValue({ summaries: [], aggregates: [] });
  });

  describe('load(ctx, action)', () => {
    it('should load the correct iri', () => {
      state.load(ctx, new Load(testIri));
      expect(dataService.getCellSummaries).toHaveBeenCalledWith(testIri, []);
    });

    it('should load the cell summaries', () => {
      const summaries: never[] = [];
      dataService.getCellSummaries.mockReturnValue(of(summaries));
      state.load(ctx, new Load(testIri)).subscribe();
      expect(ctx.patchState).toHaveBeenCalledWith({ summaries: summaries, aggregates: [] });
    });
  });

  describe('computeAggregates', () => {
    it('should compute aggregrate data and update state', () => {
      ctx.getState.mockReturnValue({ summaries: [], aggregates: [] });
      state.computeAggregates(ctx);
      expect(ctx.patchState).toHaveBeenCalledWith({ aggregates: [] });
    });
  });

  describe('updateSummaries', () => {
    it('should update summaries and update state', () => {
      ctx.getState.mockReturnValue({ summaries: [], aggregates: [] });
      state.updateSummaries(ctx, new UpdateSummaries([]));
      expect(ctx.patchState).toHaveBeenCalledWith({ aggregates: [] });
    });
  });

  describe('reset', () => {
    it('should reset summaries and aggregates', () => {
      state.reset(ctx);
      expect(ctx.patchState).toHaveBeenCalledWith({ aggregates: [], summaries: [] });
    });
  });
});
