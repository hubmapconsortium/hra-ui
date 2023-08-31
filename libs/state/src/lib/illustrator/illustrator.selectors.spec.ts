import { IllustrationMappingItem, Url } from '@hra-ui/services';
import { IllustratorModel } from './illustrator.state';
import { IllustratorSelectors } from './illustrator.selectors';

describe('IllustratorSelectors', () => {
  const state: IllustratorModel = {
    url: 'https://www.example.com' as Url,
    selectedOnHover: {
      label: ' ',
      id: ' ',
      ontologyId: ' ',
    },
    selectedOnClick: {
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

  it('should return the selected item on hover', () => {
    const testSelectedOnHover: IllustrationMappingItem = {
      label: ' ',
      id: ' ',
      ontologyId: ' ',
    };
    const result = IllustratorSelectors.selectedOnHovered(state);
    expect(result).toEqual(testSelectedOnHover);
  });

  it('should return the selected item on click', () => {
    const testSelectedOnClick: IllustrationMappingItem = {
      label: ' ',
      id: ' ',
      ontologyId: ' ',
    };
    const result = IllustratorSelectors.selectedOnClicked(state);
    expect(result).toEqual(testSelectedOnClick);
  });

  it('should return the mapping', () => {
    const testMapping: IllustrationMappingItem[] = [];
    const result = IllustratorSelectors.mapping(state);
    expect(result).toEqual(testMapping);
  });
});
