import { StateContext } from '@ngxs/store';
import { firstValueFrom, of } from 'rxjs';
import { Load, SetIllustrationUrl } from './active-ftu.actions';
import { ActiveFtuModel, ActiveFtuState } from './active-ftu.state';
import { IllustratorActions } from '../illustrator';
import { SourceRefsActions } from '../source-refs';
import { CellSummaryActions } from '../cell-summary';
import { DownloadActions } from '../download';
import { Iri } from '@hra-ui/services';
import { MockProxy, mock } from 'jest-mock-extended';
import { LinkRegistryActions, LinkType } from '@hra-ui/cdk/state';
import { Illustration } from '../link-ids';

describe('ActiveFtuState', () => {
  const testIri = 'https://www.example.com/test-iri' as Iri;
  let state: ActiveFtuState;
  let ctx: MockProxy<StateContext<ActiveFtuModel>>;

  beforeEach(() => {
    state = new ActiveFtuState();
    ctx = mock();
    ctx.getState.mockReturnValue({ iri: undefined });
    ctx.dispatch.mockReturnValue(of(undefined));
  });

  describe('load(ctx, action)', () => {
    it('should dispatch load actions on substates', () => {
      state.load(ctx, new Load(testIri));
      expect(ctx.dispatch).toHaveBeenCalledWith([
        new CellSummaryActions.Load(testIri),
        new IllustratorActions.Load(testIri),
        new DownloadActions.Load(testIri),
        new SourceRefsActions.Load(testIri),
        new SetIllustrationUrl(testIri),
      ]);
    });

    it('should set the active iri', async () => {
      const res = state.load(ctx, new Load(testIri));
      if (!res) {
        fail('Expected load(ctx, action) to return an observable');
      }
      await firstValueFrom(res);
      expect(ctx.patchState).toHaveBeenCalledWith({ iri: testIri });
    });

    it('should do nothing if the iri is the same as the currently active iri', () => {
      ctx.getState.mockReturnValue({ iri: testIri });
      state.load(ctx, new Load(testIri));
      expect(ctx.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('setIllustrationUrl(ctx)', () => {
    it('set the illustartion url and dispatch action', () => {
      const mockurl = 'https://hubmapconsortium.github.io/ccf-releases/v1.4/docs/2d-ftu/2d-ftu-test-iri.html';
      ctx.getState.mockReturnValue({ iri: testIri });
      state.setIllustrationUrl(ctx, new SetIllustrationUrl(testIri));
      expect(ctx.dispatch).toHaveBeenCalledWith(
        new LinkRegistryActions.Add(Illustration, { type: LinkType.External, url: mockurl })
      );
    });
  });

  describe('clear(ctx)', () => {
    it('should clear the iri selection', () => {
      state.clear(ctx);
      expect(ctx.patchState).toHaveBeenCalledWith({ iri: undefined });
    });
  });

  describe('reset(ctx)', () => {
    it('should reset substates and return an observable', () => {
      state.reset(ctx);
      expect(ctx.dispatch).toHaveBeenCalledWith([
        new CellSummaryActions.Reset(),
        new IllustratorActions.Reset(),
        new SourceRefsActions.Reset(),
      ]);
    });
  });
});
