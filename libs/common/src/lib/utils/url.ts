/**
 * Ponyfill for `URL.parse`
 *
 * @param url A URL string to parse
 * @param base An optional base URL to resolve relative URLs against
 * @returns An instance of URL if the string is a valid URL, otherwise null
 */
function URLParsePonyfill(url: string, base?: string): URL | null {
  try {
    return new URL(url, base);
  } catch {
    return null;
  }
}

export const parseUrl = typeof URL.parse === 'function' ? URL.parse : URLParsePonyfill;
