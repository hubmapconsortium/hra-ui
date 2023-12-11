import { BaseHrefSelectors } from './base-href.selectors';

describe('BaseHrefSelectors', () => {
  describe('baseHref()', () => {
    it('should return the state value for the href', () => {
      const href = 'test';
      expect(BaseHrefSelectors.baseHref(href)).toEqual(href);
    });
  });
});
