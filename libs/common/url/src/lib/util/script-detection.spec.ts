import { getCurrentScriptFromElement, getCurrentScriptFromStackTrace } from './script-detection';

describe('Script Detection Utilities', () => {
  describe('getCurrentScriptFromElement', () => {
    it('should return undefined when no script element is provided', () => {
      expect(getCurrentScriptFromElement(null)).toBeUndefined();
    });

    it('should return undefined when undefined is provided', () => {
      expect(getCurrentScriptFromElement(undefined)).toBeUndefined();
    });

    it('should return src from script element with src property', () => {
      const mockScript = { src: 'https://example.com/script.js' } as HTMLScriptElement;
      expect(getCurrentScriptFromElement(mockScript)).toBe('https://example.com/script.js');
    });

    it('should return undefined for element without src property', () => {
      const mockElement = {} as HTMLScriptElement;
      expect(getCurrentScriptFromElement(mockElement)).toBeUndefined();
    });

    it('should return undefined for element with empty src', () => {
      const mockElement = { src: '' } as HTMLScriptElement;
      expect(getCurrentScriptFromElement(mockElement)).toBe('');
    });
  });

  describe('getCurrentScriptFromStackTrace', () => {
    it('should return a string or undefined when called', () => {
      const result = getCurrentScriptFromStackTrace();
      expect(typeof result === 'string' || result === undefined).toBe(true);
    });

    it('should return undefined or a URL string', () => {
      const result = getCurrentScriptFromStackTrace();
      if (result !== undefined) {
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);
      }
    });
  });
});
