import { MockProxy, mock } from 'jest-mock-extended';
import { IllustratorModel, IllustratorState } from './illustrator.state';
import { StateContext } from '@ngxs/store';
import { FtuDataService, IllustrationMappingItem, Iri, Url } from '@hra-ui/services';
import { Load, SetClicked, SetHover } from './illustrator.actions';
import { firstValueFrom, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';

describe('IllustratorState', () => {
  const testUrl = 'https://www.example.com' as Url;
  const testIri = 'https://www.example.com/test-iri' as Iri;
  let state: IllustratorState;
  let dataService: MockProxy<FtuDataService>;
  let ctx: MockProxy<StateContext<IllustratorModel>>;

  beforeEach(() => {
    TestBed.overrideProvider(FtuDataService, {
      useValue: (dataService = mock()),
    });

    state = TestBed.runInInjectionContext(() => new IllustratorState());
    ctx = mock();

    dataService.getIllustrationUrl.mockReturnValue(of(testUrl));
    dataService.getIllustrationMapping.mockReturnValue(of([]));
    ctx.dispatch.mockReturnValue(of(undefined));
  });

  describe('load(ctx, action)', () => {
    it('should load illustration data', async () => {
      const result = state.load(ctx, new Load(testIri));
      expect(dataService.getIllustrationUrl).toHaveBeenCalledWith(testIri);
      expect(dataService.getIllustrationMapping).toHaveBeenCalledWith(testIri);

      if (!result) {
        fail('Expected load(ctx, action) to return an observable');
      }
      await firstValueFrom(result);
      expect(ctx.patchState).toHaveBeenCalledWith({ url: testUrl, mapping: [], selected: undefined });
    });
  });

  describe('setHover(ctx, action)', () => {
    it('should set selected item on hovered', async () => {
      const mockSelected: IllustrationMappingItem = {
        label: 'Mock Label',
        id: 'Mock Name',
        ontologyId: 'Mock id',
      };
      state.SetHover(ctx, new SetHover(mockSelected));
      expect(ctx.patchState).toHaveBeenCalledWith({ selectedOnHover: mockSelected });
    });
  });

  describe('seClicked(ctx, action)', () => {
    it('should set selected item on clicked', async () => {
      const mockSelected: IllustrationMappingItem = {
        label: 'Mock Label',
        id: 'Mock Name',
      };
      state.SetClicked(ctx, new SetClicked(mockSelected));
      expect(ctx.patchState).toHaveBeenCalledWith({ selectedOnClick: mockSelected });
    });
  });

  describe('clearSelection(ctx)', () => {
    it('should clear selected item', () => {
      state.clearSelection(ctx);
      expect(ctx.patchState).toHaveBeenCalledWith({ selected: undefined });
    });
  });

  describe('reset(ctx)', () => {
    it('should reset the mapping', () => {
      state.reset(ctx);
      expect(ctx.setState).toHaveBeenCalledWith({ mapping: [] });
    });
  });
});
