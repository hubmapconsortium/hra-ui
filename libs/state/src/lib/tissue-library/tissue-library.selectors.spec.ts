import { Iri, Tissue } from '@hra-ui/services';
import { TissueLibraryModel } from './tissue-library.model';
import { TissueLibrarySelectors } from './tissue-library.selectors';

describe('TissueLibrarySelectors', () => {
  const mockTissues: Record<Iri, Tissue> = {};

  it('should return the tissue data', () => {
    const state: TissueLibraryModel = {
      root: 'https://www.example.com/test-iri' as Iri,
      nodes: mockTissues,
    };
    const result = TissueLibrarySelectors.tissues(state);
    expect(result).toEqual(mockTissues);
  });

  it('should return empty when the state is empty', () => {
    const state: TissueLibraryModel = {
      root: '' as Iri,
      nodes: {},
    };
    const result = TissueLibrarySelectors.tissues(state);
    expect(result).toEqual({});
  });
});
