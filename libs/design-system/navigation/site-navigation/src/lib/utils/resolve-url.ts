import { Location } from '@angular/common';
import { Router, UrlTree } from '@angular/router';

/**
 * Resolves an url against the baseUrl
 * @param url Raw url
 * @param router Router service
 * @param rawBaseUrl Base url
 * @returns Whether the url is absolute along with the resolved url
 */
export function resolveUrl(
  url: string,
  router?: Router,
  rawBaseUrl = '',
): { isAbsolute: boolean; value: string | UrlTree } {
  const baseUrl = Location.stripTrailingSlash(rawBaseUrl) + '/';
  let isAbsolute = url.startsWith('http');
  if (baseUrl && url.startsWith(baseUrl)) {
    isAbsolute = false;
    url = url.slice(baseUrl.length);
  }

  let value: string | UrlTree = url;
  if (!isAbsolute && router) {
    value = router.parseUrl(Location.stripTrailingSlash(url));
  }

  return { isAbsolute, value };
}
