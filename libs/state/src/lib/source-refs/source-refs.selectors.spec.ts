import { SourceReference } from '@hra-ui/services';
import { SourceRefsSelectors } from './source-refs.selectors';

describe('SourceRefsSelectors', () => {
  it('should return the source references', () => {
    const mockSourceReferences: SourceReference[] = [];

    const result = SourceRefsSelectors.sourceReferences(mockSourceReferences);
    expect(result).toEqual(mockSourceReferences);
  });
});
