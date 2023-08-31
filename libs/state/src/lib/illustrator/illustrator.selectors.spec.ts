import { IllustrationMappingItem, Url } from '@hra-ui/services';
import { IllustratorModel } from './illustrator.state';
import { IllustratorSelectors } from './illustrator.selectors';

describe('IllustratorSelectors', () => {
  const state: IllustratorModel = {
    url: 'https://www.example.com' as Url,
    selected: {
      label: ' ',
      id: ' ',
      ontologyId: ' ',
    },
    mapping: [],
  };
  it('should return the url', () => {
    const testUrl: Url = 'https://www.example.com' as Url;
    const result = IllustratorSelectors.url(state);
    expect(result).toEqual(testUrl);
  });

  it('should return the selected item', () => {
    const testSelected: IllustrationMappingItem = {
      label: ' ',
      id: ' ',
      ontologyId: ' ',
    };
    const result = IllustratorSelectors.selected(state);
    expect(result).toEqual(testSelected);
  });

  it('should return the mapping', () => {
    const testMapping: IllustrationMappingItem[] = [];
    const result = IllustratorSelectors.mapping(state);
    expect(result).toEqual(testMapping);
  });
});
