import { createLinkId, LinkRegistryModel, LinkType } from './link-registry.model';
import { LinkRegistrySelectors } from './link-registry.selectors';

describe('LinkRegistrySelectors', () => {
  const url = 'http://test.url';
  const TestId = createLinkId('Test');
  const mockState: LinkRegistryModel = {
    [TestId]: { type: LinkType.External, url },
    [createLinkId('')]: { type: LinkType.Internal, commands: [''] },
  };
  describe('query()', () => {
    it('should return a function that returns a link entry based on type', () => {
      const query = LinkRegistrySelectors.query(mockState);
      expect(query(TestId, LinkType.External)).toEqual({ url, type: LinkType.External });
    });

    it('should return undefined if type doesnt match', () => {
      const query = LinkRegistrySelectors.query(mockState);
      expect(query(TestId, LinkType.Internal)).toBeUndefined();
    });
  });
});
