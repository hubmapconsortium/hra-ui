import { Iri } from '@hra-ui/services';

import { SourceRefsSelectors } from './source-refs.selectors';
import { SourceRefsModel } from './source-refs.state';

describe('SourceRefsSelectors', () => {
  it('should return the source references', () => {
    const mockSourceReferences: SourceRefsModel = {
      selected: [
        {
          authors: ['author1', 'author2'],
          doi: 'test',
          id: 'https://www.example.com/test-id' as Iri,
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
          id: 'https://www.example.com/test-id' as Iri,
          label: 'label',
          link: 'https://www.example.com/test-iri',
          title: 'title',
          year: 2000,
        },
      ],
    };

    const result = SourceRefsSelectors.sourceReferences(mockSourceReferences);
    expect(result).toEqual(mockSourceReferences.sources);
  });
});
