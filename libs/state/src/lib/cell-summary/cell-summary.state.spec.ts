import { TestBed } from '@angular/core/testing';
import { FtuDataService, Iri } from '@hra-ui/services';
import { MockProxy, mock } from 'jest-mock-extended';
import { CellSummaryState } from './cell-summary.state';
import { of } from 'rxjs';
import { StateContext } from '@ngxs/store';
import { CellSummaryModel } from './cell-summary.model';
import { Load } from './cell-summary.actions';

describe('CellSummaryState', () => {
  const testIri = 'https://www.example.com/test-iri' as Iri;
  let state: CellSummaryState;
  let ctx: MockProxy<StateContext<CellSummaryModel>>;
  let dataService: MockProxy<FtuDataService>;

  beforeEach(() => {
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
      expect(dataService.getCellSummaries).toHaveBeenCalledWith(testIri);
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

  describe('reset', () => {
    it('should reset summaries and aggregates', () => {
      state.reset(ctx);
      expect(ctx.patchState).toHaveBeenCalledWith({ aggregates: [], summaries: [] });
    });
  });
});
