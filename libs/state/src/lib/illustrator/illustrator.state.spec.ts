import { TestBed } from '@angular/core/testing';
import {
  FTU_DATA_IMPL_ENDPOINTS,
  FtuDataService,
  IllustrationMappingItem,
  Iri,
  RawCellEntry,
  Url,
} from '@hra-ui/services';
import { StateContext } from '@ngxs/store';
import { MockProxy, mock } from 'jest-mock-extended';
import { firstValueFrom, of } from 'rxjs';
import { HighlightCellType, Load, SetClicked, SetHover } from './illustrator.actions';
import { IllustratorModel, IllustratorState } from './illustrator.state';

describe('IllustratorState', () => {
  const testUrl = 'https://www.example.com' as Url;
  const testIri = 'https://www.example.com/test-iri' as Iri;
  const testItem: IllustrationMappingItem = {
    label: 'Mock Label',
    id: 'Mock Name',
    groupId: 'Mock Group',
    ontologyId: 'Mock id',
    source: {} as RawCellEntry,
  };
  let state: IllustratorState;
  let dataService: MockProxy<FtuDataService>;
  let ctx: MockProxy<StateContext<IllustratorModel>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: FTU_DATA_IMPL_ENDPOINTS,
          useValue: {
            datasets: '',
            illustrations: '',
            summaries: '',
            baseHref: '',
          },
        },
      ],
    });

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
      state.setHover(ctx, new SetHover(testItem));
      expect(ctx.patchState).toHaveBeenCalledWith({ selectedOnHover: testItem });
    });
  });

  describe('setClicked(ctx, action)', () => {
    it('should set selected item on clicked', async () => {
      state.setClicked(ctx, new SetClicked(testItem));
      expect(ctx.patchState).toHaveBeenCalledWith({ selectedOnClick: testItem });
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

  describe('highlightCellType', () => {
    it('should set hoveredCellTypeId', () => {
      ctx.getState.mockReturnValue({ mapping: [testItem] });
      state.highlightCellType(ctx, new HighlightCellType(testItem.ontologyId));
      expect(ctx.patchState).toHaveBeenCalledWith({ hoveredCellTypeId: testItem.ontologyId });
    });
  });
});
