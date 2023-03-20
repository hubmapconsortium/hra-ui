import { createResourceId, ResourceRegistryModel, ResourceType } from './resource-registry.model';
import { ResourceRegistrySelectors } from './resource-registry.selectors';

describe('ResourceRegistrySelectors', () => {
  const markdownId = createResourceId('test1');
  const urlId = createResourceId('test2');
  const textId = createResourceId('test3');
  const markdownData = 'foobar';
  const textData = 'abcdef';
  const state: ResourceRegistryModel = {
    [markdownId]: {
      type: ResourceType.Markdown,
      markdown: markdownData,
    },
    [urlId]: {
      type: ResourceType.Url,
      url: 'http://google.com',
    },
    [textId]: {
      type: ResourceType.Text,
      text: textData,
    },
  };

  describe('anyText()', () => {
    it('should return markdown from id', () => {
      const anyText = ResourceRegistrySelectors.anyText(state);
      expect(anyText(markdownId)).toEqual(markdownData);
    });

    it('should return text from id', () => {
      const anyText = ResourceRegistrySelectors.anyText(state);
      expect(anyText(textId)).toEqual(textData);
    });

    it('should return undefined if no text with id exists', () => {
      const anyText = ResourceRegistrySelectors.anyText(state);
      expect(anyText(urlId)).toBeUndefined();
    });
  });

  describe('query()', () => {
    it('should return entry based on id and type', () => {
      const query = ResourceRegistrySelectors.query(state);
      const res = query(markdownId, ResourceType.Markdown);
      expect(res?.markdown).toEqual(markdownData);
    });
  });

  describe('markdown()', () => {
    it('should return markdown from id', () => {
      const markdown = ResourceRegistrySelectors.markdown(state);
      expect(markdown(markdownId)).toEqual(markdownData);
    });

    it('should return undefined if no markdown with id exists', () => {
      const markdown = ResourceRegistrySelectors.markdown(state);
      expect(markdown(urlId)).toBeUndefined();
    });
  });

  describe('text()', () => {
    it('should return text from id', () => {
      const text = ResourceRegistrySelectors.text(state);
      expect(text(textId)).toEqual(textData);
    });

    it('should return undefined if no text with id exists', () => {
      const text = ResourceRegistrySelectors.text(state);
      expect(text(urlId)).toBeUndefined();
    });
  });

  describe('url()', () => {
    it('should return url from id', () => {
      const url = ResourceRegistrySelectors.url(state);
      expect(url(urlId)).toEqual('http://google.com');
    });
    it('should return undefined if no id exists in state', () => {
      const url = ResourceRegistrySelectors.url(state);
      expect(url(createResourceId('test4'))).toBeUndefined();
    });
  });
});
