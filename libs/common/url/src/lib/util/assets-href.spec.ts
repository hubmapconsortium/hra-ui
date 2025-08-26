import { getDefaultAssetsHref } from './assets-href';

describe('Assets Href Utilities', () => {
  describe('getDefaultAssetsHref', () => {
    it('should return empty string when no valid candidates are found', () => {
      const emptyCandidates: string[] = [];
      const result = getDefaultAssetsHref(emptyCandidates);
      expect(result).toBe('');
    });

    it('should return empty string for invalid URLs', () => {
      const invalidCandidates = ['not-a-url', 'invalid://url'];
      const result = getDefaultAssetsHref(invalidCandidates);
      expect(result).toBe('');
    });

    it('should return the first valid HTTPS URL found', () => {
      const candidates = ['https://example.com/app.js'];
      const result = getDefaultAssetsHref(candidates);
      expect(result).toBe('https://example.com/');
    });

    it('should return the first valid HTTP URL found', () => {
      const candidates = ['http://example.com/app.js'];
      const result = getDefaultAssetsHref(candidates);
      expect(result).toBe('http://example.com/');
    });

    it('should skip non-HTTP protocols and return first valid HTTP URL', () => {
      const candidates = ['file:///local/app.js', 'ftp://example.com/app.js', 'https://example.com/app.js'];
      const result = getDefaultAssetsHref(candidates);
      expect(result).toBe('https://example.com/');
    });

    it('should handle undefined candidates gracefully', () => {
      const candidates = [undefined, 'https://example.com/app.js'];
      const result = getDefaultAssetsHref(candidates);
      expect(result).toBe('https://example.com/');
    });

    it('should use default candidate paths when no custom candidates provided', () => {
      const result = getDefaultAssetsHref();
      expect(typeof result).toBe('string');
    });
  });
});
