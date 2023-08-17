import { StateContext } from '@ngxs/store';
import { firstValueFrom, of } from 'rxjs';
import { Load } from './active-ftu.actions';
import { ActiveFtuModel, ActiveFtuState } from './active-ftu.state';
import { IllustratorActions } from '../illustrator';
import { SourceRefsActions } from '../source-refs';
import { CellSummaryActions } from '../cell-summary';
import { DownloadActions } from '../download';
import { Iri } from '@hra-ui/services';
import { MockProxy, mock } from 'jest-mock-extended';

describe('ActiveFtuState', () => {
  const testIri = 'https://www.example.com/test-iri' as Iri;
  // creating variables to hold instances of the below classes and dependencies
  let state: ActiveFtuState;
  let ctx: MockProxy<StateContext<ActiveFtuModel>>;

  beforeEach(() => {
    // creating instances below
    state = new ActiveFtuState();
    ctx = mock();
    // configuring return values
    ctx.getState.mockReturnValue({ iri: undefined });
    ctx.dispatch.mockReturnValue(of(undefined));
  });

  describe('load(ctx, action)', () => {
    it('should dispatch load actions on substates', () => {
      // calling the load method
      state.load(ctx, new Load(testIri));
      expect(ctx.dispatch).toHaveBeenCalledWith([
        new CellSummaryActions.Load(testIri),
        new IllustratorActions.Load(testIri),
        new DownloadActions.Load(testIri),
        new SourceRefsActions.Load(testIri),
      ]);
    });

    it('should set the active iri', async () => {
      const res = state.load(ctx, new Load(testIri));
      if (!res) {
        fail('Expected load(ctx, action) to return an observable');
      }
      // expecting patchState to update ctx with the current iri
      await firstValueFrom(res);
      expect(ctx.patchState).toHaveBeenCalledWith({ iri: testIri });
    });

    it('should do nothing if the iri is the same as the currently active iri', () => {
      ctx.getState.mockReturnValue({ iri: testIri });
      state.load(ctx, new Load(testIri));
      // expecting to not have been called as the iri is the same
      expect(ctx.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('clear(ctx)', () => {
    it('should clear the iri selection', () => {
      state.clear(ctx);
      // expecting patchState to set the ctx with no iri
      expect(ctx.patchState).toHaveBeenCalledWith({ iri: undefined });
    });
  });

  describe('reset(ctx)', () => {
    it('should reset substates and return an observable', () => {
      // calling the reset method
      state.reset(ctx);
      expect(ctx.dispatch).toHaveBeenCalledWith([
        new CellSummaryActions.Reset(),
        new IllustratorActions.Reset(),
        new SourceRefsActions.Reset(),
      ]);
    });
  });
});
