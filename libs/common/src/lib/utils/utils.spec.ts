describe('Utils', () => {
  describe('parseUrl', () => {
    it('should work with native URL.parse implementation', () => {
      const mockURLParse = jest.fn().mockReturnValue(new URL('https://example.com/native'));
      Object.defineProperty(URL, 'parse', { value: mockURLParse });

      jest.resetModules();
      const { parseUrl } = require('./url');

      const result = parseUrl('https://example.com/native');
      expect(mockURLParse).toHaveBeenCalledWith('https://example.com/native');
      expect(result?.href).toBe('https://example.com/native');
    });

    it('should work with ponyfill implementation', () => {
      Object.defineProperty(URL, 'parse', { value: null });

      jest.resetModules();
      const { parseUrl } = require('./url');

      const validResult = parseUrl('https://example.com/ponyfill');
      expect(validResult).toBeInstanceOf(URL);
      expect(validResult?.href).toBe('https://example.com/ponyfill');

      const invalidResult = parseUrl('invalid-url');
      expect(invalidResult).toBeNull();
    });
  });
});
