/**
 * Polyfill for `URL.canParse` for older devices and browsers.
 */
const canParseUrlPolyfill: typeof URL.canParse = (url, base) => {
  try {
    new URL(url, base);
    return true;
  } catch {
    return false;
  }
};

/**
 * Test whether a URL string can be parsed as a valid URL, using the built-in `URL.canParse` if available, or a polyfill otherwise.
 *
 * @param url URL string to test
 * @param base Optional base URL to resolve against
 * @returns true if the URL can be parsed, false otherwise
 */
export const canParseUrl = 'canParse' in URL && typeof URL.canParse === 'function' ? URL.canParse : canParseUrlPolyfill;

/**
 * Polyfill for `URL.parse` for older devices and browsers.
 */
const parseUrlPolyfill: typeof URL.parse = (url, base) => {
  try {
    return new URL(url, base);
  } catch {
    return null;
  }
};

/**
 * Parse a URL string into a URL object, using the built-in `URL.parse` if available, or a polyfill otherwise.
 *
 * @param url URL string to parse
 * @param base Optional base URL to resolve against
 * @returns A URL object if parsing was successful, or null if the URL was invalid
 */
export const parseUrl = 'parse' in URL && typeof URL.parse === 'function' ? URL.parse : parseUrlPolyfill;

/**
 * Test whether a URL string is an absolute URL.
 *
 * @param url URL string to test
 * @returns true if the URL is an absolute URL, false otherwise
 */
export function isAbsoluteUrl(url: string | URL): boolean {
  return canParseUrl(url);
}

/**
 * Test whether a URL string is a relative URL (i.e. not an absolute URL).
 *
 * @param url URL string to test
 * @returns true if the URL is a relative URL, false otherwise
 */
export function isRelativeUrl(url: string | URL): boolean {
  const base = 'https://relative.url';
  const parsed = parseUrl(url, base);
  return parsed !== null && parsed.origin === base;
}
