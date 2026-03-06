import { canParseUrl, isAbsoluteUrl, isRelativeUrl, parseUrl } from './url';

describe('URL utilties', () => {
  const HTTPS_URL = 'https://www.example.com';
  const HTTP_URL = 'http://example.com';
  const FTP_URL = 'ftp://example.com';
  const URL_WITH_PATH_QUERY_AND_HASH = 'https://example.com/path?query=string#fragment';

  const RELATIVE_PATH = '/path/to/resource';
  const RELATIVE_NO_LEADING_SLASH_PATH = 'path/to/resource';
  const RELATIVE_PARENT_PATH = '../path/to/resource';
  const RELATIVE_CURRENT_PATH = './path/to/resource';

  const INVALID_URL = 'not a url';
  const INVALID_SCHEME_URL = '://example.com';
  const EMPTY_URL = '';

  const BASE_URL = HTTPS_URL;

  describe('canParseUrl', () => {
    it('should return true for valid absolute URLs', () => {
      expect(canParseUrl(HTTPS_URL)).toBe(true);
      expect(canParseUrl(HTTP_URL)).toBe(true);
      expect(canParseUrl(FTP_URL)).toBe(true);
      expect(canParseUrl(URL_WITH_PATH_QUERY_AND_HASH)).toBe(true);
    });

    it('should return true for valid relative URLs if base is provided', () => {
      expect(canParseUrl(RELATIVE_PATH, BASE_URL)).toBe(true);
      expect(canParseUrl(RELATIVE_NO_LEADING_SLASH_PATH, BASE_URL)).toBe(true);
      expect(canParseUrl(RELATIVE_PARENT_PATH, BASE_URL)).toBe(true);
      expect(canParseUrl(RELATIVE_CURRENT_PATH, BASE_URL)).toBe(true);
    });

    it('should return false for invalid URLs and relative URLs without a base', () => {
      expect(canParseUrl(INVALID_URL)).toBe(false);
      expect(canParseUrl(INVALID_SCHEME_URL)).toBe(false);
      expect(canParseUrl(EMPTY_URL)).toBe(false);
      expect(canParseUrl(RELATIVE_PATH)).toBe(false);
      expect(canParseUrl(RELATIVE_NO_LEADING_SLASH_PATH)).toBe(false);
      expect(canParseUrl(RELATIVE_PARENT_PATH)).toBe(false);
      expect(canParseUrl(RELATIVE_CURRENT_PATH)).toBe(false);
    });
  });

  describe('parseUrl', () => {
    it('should correctly parse absolute URLs', () => {
      const url = 'https://www.example.com/path?query=string#fragment';
      const parsed = parseUrl(url);
      expect(parsed?.protocol).toBe('https:');
      expect(parsed?.hostname).toBe('www.example.com');
      expect(parsed?.pathname).toBe('/path');
      expect(parsed?.search).toBe('?query=string');
      expect(parsed?.hash).toBe('#fragment');
    });

    it('should correctly parse relative URLs with a base', () => {
      const url = '/path/to/resource?query=string#fragment';
      const parsed = parseUrl(url, BASE_URL);
      expect(parsed?.protocol).toBe('https:');
      expect(parsed?.hostname).toBe('www.example.com');
      expect(parsed?.pathname).toBe('/path/to/resource');
      expect(parsed?.search).toBe('?query=string');
      expect(parsed?.hash).toBe('#fragment');
    });

    it('should return null for invalid URLs and relative URLs without a base', () => {
      expect(parseUrl(INVALID_URL)).toBeNull();
      expect(parseUrl(INVALID_SCHEME_URL)).toBeNull();
      expect(parseUrl(EMPTY_URL)).toBeNull();
      expect(parseUrl(RELATIVE_PATH)).toBeNull();
    });
  });

  describe('isAbsoluteUrl', () => {
    it('should return true for valid absolute URLs', () => {
      expect(isAbsoluteUrl(HTTPS_URL)).toBe(true);
      expect(isAbsoluteUrl(HTTP_URL)).toBe(true);
      expect(isAbsoluteUrl(FTP_URL)).toBe(true);
      expect(isAbsoluteUrl(URL_WITH_PATH_QUERY_AND_HASH)).toBe(true);
    });

    it('should return false for relative URLs', () => {
      expect(isAbsoluteUrl(RELATIVE_PATH)).toBe(false);
      expect(isAbsoluteUrl(RELATIVE_NO_LEADING_SLASH_PATH)).toBe(false);
      expect(isAbsoluteUrl(RELATIVE_PARENT_PATH)).toBe(false);
      expect(isAbsoluteUrl(RELATIVE_CURRENT_PATH)).toBe(false);
    });
  });

  describe('isRelativeUrl', () => {
    it('should return true for relative URLs', () => {
      expect(isRelativeUrl(RELATIVE_PATH)).toBe(true);
      expect(isRelativeUrl(RELATIVE_NO_LEADING_SLASH_PATH)).toBe(true);
      expect(isRelativeUrl(RELATIVE_PARENT_PATH)).toBe(true);
      expect(isRelativeUrl(RELATIVE_CURRENT_PATH)).toBe(true);
    });

    it('should return false for absolute URLs', () => {
      expect(isRelativeUrl(HTTPS_URL)).toBe(false);
      expect(isRelativeUrl(HTTP_URL)).toBe(false);
      expect(isRelativeUrl(FTP_URL)).toBe(false);
      expect(isRelativeUrl(URL_WITH_PATH_QUERY_AND_HASH)).toBe(false);
    });
  });
});
