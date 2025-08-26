import { Injectable, Provider } from '@angular/core';
import { injectAppHref, injectAssetHref, injectBaseHref } from './href-tokens';
import { parseUrl } from './util/parse-url';
import { Location } from '@angular/common';

/** URL type enum */
export type UrlType = 'app' | 'asset' | 'page';

export function provideUrlResolver(): Provider {
  return UrlResolverService;
}

/**
 * Service for resolving URLs based on type
 */
@Injectable({
  providedIn: 'root',
})
export class UrlResolverService {
  /** App href signal */
  private readonly appHref = injectAppHref();

  /** Asset href signal */
  private readonly assetHref = injectAssetHref();

  /** Base href signal */
  private readonly baseHref = injectBaseHref();

  /**
   * Resolve a URL based on its type
   *
   * @param url The URL to resolve
   * @param type The type of URL resolution
   * @returns Resolved URL
   */
  resolveUrl(url: string, type: UrlType): string {
    if (type === 'asset' || type === 'page') {
      if (parseUrl(url) !== null) {
        return url;
      }
      const base = type === 'asset' ? this.assetHref() : this.baseHref();
      return Location.joinWithSlash(base, url);
    }

    const appHref = this.appHref();
    if (appHref !== '' && url.startsWith(appHref)) {
      return url.slice(appHref.length);
    }

    return url;
  }
}
