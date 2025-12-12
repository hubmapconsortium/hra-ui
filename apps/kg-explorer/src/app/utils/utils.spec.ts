import { getDocumentationUrl } from './utils'; // adjust path

describe('getDocumentationUrl', () => {
  it('should return the correct documentation url', () => {
    expect(getDocumentationUrl('ctann')).toBe('https://humanatlas.io/cell-type-annotations');
  });

  it('should return empty string if documentation url not found', () => {
    expect(getDocumentationUrl('foo')).toBe('');
  });
});
