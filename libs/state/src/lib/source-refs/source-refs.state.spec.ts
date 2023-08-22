import { TestBed } from '@angular/core/testing';
import { FtuDataService, Iri, SourceReference } from '@hra-ui/services';
import { MockProxy, mock } from 'jest-mock-extended';
import { of } from 'rxjs';
import { SourceRefsState } from './source-refs.state';
import { StateContext } from '@ngxs/store';
import { Load } from './source-refs.actions';

describe('SourceRefsState', () => {
  const testIri = 'https://www.example.com/test-iri' as Iri;

  let state: SourceRefsState;
  let ctx: MockProxy<StateContext<SourceReference[]>>;
  let dataService: MockProxy<FtuDataService>;

  beforeEach(() => {
    TestBed.overrideProvider(FtuDataService, {
      useValue: (dataService = mock()),
    });

    state = TestBed.runInInjectionContext(() => new SourceRefsState());
    ctx = mock();
    dataService.getSourceReferences.mockReturnValue(of([]));
  });

  describe('load(ctx, action)', () => {
    it('should load source references', () => {
      const mockSourceReferences = [{ title: '', label: '', link: '' }];
      dataService.getSourceReferences.mockReturnValue(of(mockSourceReferences));

      state.load(ctx, new Load(testIri)).subscribe();
      expect(dataService.getSourceReferences).toHaveBeenCalledWith(testIri);
      expect(ctx.setState).toHaveBeenCalledWith(mockSourceReferences);
    });
  });

  describe('reset', () => {
    it('should reset source references', () => {
      state.reset(ctx);
      expect(ctx.setState).toHaveBeenCalledWith([]);
    });
  });
});
