import { TestBed } from '@angular/core/testing';
import { BaseHrefState } from './base-href.state';
import { mock, MockProxy } from 'jest-mock-extended';
import { StateContext } from '@ngxs/store';
import { Set } from './base-href.actions';

describe('BaseHrefState', () => {
  let context: MockProxy<StateContext<string>>;
  let state: BaseHrefState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseHrefState],
    });

    context = mock();
    state = TestBed.inject(BaseHrefState);
  });

  describe('setBaseHref(ctx, action)', () => {
    it('sets the base href', () => {
      const base = 'abc/';
      state.setBaseHref(context, new Set(base));
      expect(context.setState).toHaveBeenCalledWith(base);
    });

    it('adds a trailing slash to base hrefs', () => {
      const base = 'abc';
      state.setBaseHref(context, new Set(base));
      expect(context.setState).toHaveBeenCalledWith(base + '/');
    });

    it('does not add a trailing slash for empty base hrefs', () => {
      const base = '';
      state.setBaseHref(context, new Set(base));
      expect(context.setState).toHaveBeenCalledWith(base);
    });
  });
});
