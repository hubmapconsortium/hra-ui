import { createResourceId, ResourceRegistryModel, ResourceType } from './resource-registry.model';
import { ResourceRegistrySelectors } from './resource-registry.selectors';

describe('ResourceRegistrySelectors', () => {
  const test1 = createResourceId('test1');
  const test2 = createResourceId('test2');
  const state: ResourceRegistryModel = {
    [test1]: {
      type: ResourceType.Markdown,
      markdown: 'foobar',
    },
    [test2]: {
      type: ResourceType.Url,
      url: 'http://google.com',
    },
  };

  describe('query()', () => {
    it('should return entry based on id and type', () => {
      const query = ResourceRegistrySelectors.query(state);
      const res = query(test1, ResourceType.Markdown);
      expect(res?.markdown).toEqual('foobar');
    });
  });

  describe('markdown()', () => {
    it('shoudl return markdown from id', () => {
      const markdown = ResourceRegistrySelectors.markdown(state);
      expect(markdown(test1)).toEqual('foobar');
    });

    it('should return undefined if no markdown with id exists', () => {
      const markdown = ResourceRegistrySelectors.markdown(state);
      expect(markdown(test2)).toBeUndefined();
    });
  });

  describe('url()', () => {
    it('should return url from id', () => {
      const url = ResourceRegistrySelectors.url(state);
      expect(url(test2)).toEqual('http://google.com');
    });
    it('should return undefined if no id exists in state', () => {
      const url = ResourceRegistrySelectors.url(state);
      expect(url(createResourceId('test4'))).toBeUndefined();
    });
  });
});
