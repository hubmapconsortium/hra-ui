import { Location } from '@angular/common';

/**
 * Resolves an url against the baseUrl
 * @param url Raw url
 * @param rawBaseUrl Base url
 * @returns Whether the url is external along with the resolved url
 */
export function resolveUrl(url: string, rawBaseUrl = ''): { isExternal: boolean; value: string } {
  const baseUrl = Location.stripTrailingSlash(rawBaseUrl) + '/';
  let isExternal = url.startsWith('http');
  if (baseUrl && url.startsWith(baseUrl)) {
    isExternal = false;
    url = url.slice(baseUrl.length);
  }

  return { isExternal, value: Location.stripTrailingSlash(url) };
}
