import { parseUrl } from '../utils';

describe('URL Utils', () => {
  describe('parseUrl', () => {
    it('should parse valid URLs', () => {
      const result = parseUrl('https://example.com/path');
      expect(result).toBeTruthy();
      expect(result?.href).toBe('https://example.com/path');
    });

    it('should parse relative URLs with base', () => {
      const result = parseUrl('path', 'https://example.com/');
      expect(result).toBeTruthy();
      expect(result?.href).toBe('https://example.com/path');
    });

    it('should return null for invalid URLs', () => {
      const result = parseUrl('invalid-url');
      expect(result).toBeNull();
    });

    it('should handle empty string', () => {
      const result = parseUrl('');
      expect(result).toBeNull();
    });
  });
});
