import { Location } from '@angular/common';
import { Router, UrlTree } from '@angular/router';
import { isAbsolute as isAbsoluteUrl } from '@hra-ui/common/url';

/**
 * Resolves an url against the baseUrl
 *
 * @param url Raw url
 * @returns Whether the url is absolute along with the resolved url
 */
export function resolveUrl(
  url: string,
  forceExternal = false,
  router: Router | null,
  base?: string,
): { isAbsolute: boolean; value: string | UrlTree } {
  const baseUrl = Location.stripTrailingSlash(base ?? '') + '/';
  let isAbsolute = forceExternal || isAbsoluteUrl(url);
  if (!forceExternal && baseUrl && url.startsWith(baseUrl)) {
    isAbsolute = false;
    url = url.slice(baseUrl.length);
  }

  let value: string | UrlTree = url;
  if (!isAbsolute && router) {
    value = router.parseUrl(Location.stripTrailingSlash(url));
  }

  return { isAbsolute, value };
}
