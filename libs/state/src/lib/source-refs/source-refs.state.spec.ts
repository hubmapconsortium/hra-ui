import { TestBed } from '@angular/core/testing';
import { FtuDataService, Iri } from '@hra-ui/services';
import { StateContext } from '@ngxs/store';
import { mock, MockProxy } from 'jest-mock-extended';
import { of } from 'rxjs';

import { Load } from './source-refs.actions';
import { SourceRefsModel, SourceRefsState } from './source-refs.state';

describe('SourceRefsState', () => {
  const testIri = 'https://www.example.com/test-iri' as Iri;
  const testId = 'https://www.example.com/test-id' as Iri;

  let state: SourceRefsState;
  let ctx: MockProxy<StateContext<SourceRefsModel>>;
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
      const testItem = {
        id: testId,
        link: testIri,
        authors: ['author1', 'author2'],
        year: 2000,
        title: 'title',
        doi: 'test',
        label: 'label',
      };
      const mockSourceReferences = {
        selected: [
          {
            authors: ['author1', 'author2'],
            doi: 'test',
            id: 'https://www.example.com/test-id',
            label: 'label',
            link: 'https://www.example.com/test-iri',
            title: 'title',
            year: 2000,
          },
        ],
        sources: [
          {
            authors: ['author1', 'author2'],
            doi: 'test',
            id: 'https://www.example.com/test-id',
            label: 'label',
            link: 'https://www.example.com/test-iri',
            title: 'title',
            year: 2000,
          },
        ],
      };
      dataService.getSourceReferences.mockReturnValue(of([testItem]));
      state.load(ctx, new Load(testIri)).subscribe();
      expect(dataService.getSourceReferences).toHaveBeenCalledWith(testIri);
      expect(ctx.setState).toHaveBeenCalledWith(mockSourceReferences);
    });
  });

  describe('reset', () => {
    it('should reset source references', () => {
      state.reset(ctx);
      expect(ctx.setState).toHaveBeenCalledWith({ selected: [], sources: [] });
    });
  });
});
