import {
  BuiltinResourceType,
  createCustomType,
  createResourceId,
  payload,
  ResourceRegistryModel,
} from './resource-registry.model';
import { ResourceRegistrySelectors } from './resource-registry.selectors';

describe('ResourceRegistrySelectors', () => {
  const nonExistingId = createResourceId('non-existing');
  const markdownId = createResourceId('test1');
  const urlId = createResourceId('test2');
  const textId = createResourceId('test3');
  const customId = createResourceId('test4');
  const customType = createCustomType('test', payload<{ data: string }>());
  const markdownData = 'foobar';
  const textData = 'abcdef';
  const customData = '123456';
  const state: ResourceRegistryModel = {
    [markdownId]: {
      type: BuiltinResourceType.Markdown,
      markdown: markdownData,
    },
    [urlId]: {
      type: BuiltinResourceType.Url,
      url: 'http://google.com',
    },
    [textId]: {
      type: BuiltinResourceType.Text,
      text: textData,
    },
    [customId]: {
      type: customType,
      data: customData,
    },
  };

  describe('entry()', () => {
    const entry = ResourceRegistrySelectors.entry(state);

    it('should return the entry if it exists', () => {
      expect(entry(markdownId, BuiltinResourceType.Markdown)).toBeDefined();
    });

    it('should return undefined if the entry has the incorrect type', () => {
      expect(entry(markdownId, BuiltinResourceType.Text)).toBeUndefined();
    });

    it('should return undefined if the entry does not exist', () => {
      expect(entry(nonExistingId, BuiltinResourceType.Markdown)).toBeUndefined();
    });
  });

  describe('anyEntry()', () => {
    const anyEntry = ResourceRegistrySelectors.anyEntry(state);

    it('should return the entry without checking the type', () => {
      expect(anyEntry(markdownId)).toBeDefined();
    });

    it('should return undefined if the entry does not exist', () => {
      expect(anyEntry(nonExistingId)).toBeUndefined();
    });
  });

  describe('field()', () => {
    const field = ResourceRegistrySelectors.field(state);

    it('should return the field value of the entry', () => {
      expect(field(customId, customType, 'data')).toEqual(customData);
    });

    it('should return the default value if the entry does not exist', () => {
      const defaultValue = 'missing';
      expect(field(nonExistingId, BuiltinResourceType.Markdown, 'markdown', defaultValue)).toEqual(defaultValue);
    });
  });

  describe('anyText()', () => {
    const anyText = ResourceRegistrySelectors.anyText(state);

    it('should return markdown from id', () => {
      expect(anyText(markdownId)).toEqual(markdownData);
    });

    it('should return text from id', () => {
      expect(anyText(textId)).toEqual(textData);
    });

    it('should return undefined if no text with id exists', () => {
      expect(anyText(urlId)).toBeUndefined();
    });
  });

  describe('markdown()', () => {
    const field = ResourceRegistrySelectors.field(state);
    const markdown = ResourceRegistrySelectors.markdown(field);

    it('should return markdown from id', () => {
      expect(markdown(markdownId)).toEqual(markdownData);
    });

    it('should return undefined if no markdown with id exists', () => {
      expect(markdown(urlId)).toBeUndefined();
    });
  });

  describe('text()', () => {
    const field = ResourceRegistrySelectors.field(state);
    const text = ResourceRegistrySelectors.text(field);

    it('should return text from id', () => {
      expect(text(textId)).toEqual(textData);
    });

    it('should return undefined if no text with id exists', () => {
      expect(text(urlId)).toBeUndefined();
    });
  });

  describe('url()', () => {
    const field = ResourceRegistrySelectors.field(state);
    const url = ResourceRegistrySelectors.url(field);

    it('should return url from id', () => {
      expect(url(urlId)).toEqual('http://google.com');
    });
    it('should return undefined if no id exists in state', () => {
      expect(url(createResourceId('test4'))).toBeUndefined();
    });
  });
});
