import { assertInInjectionContext, computed, inject, Signal } from '@angular/core';
import { UrlResolverService, UrlType } from './url-resolver.service';

/**
 * Resolve a URL based on type (reactive version)
 *
 * @param url URL string or function returning URL string
 * @param type URL type
 * @returns Signal with resolved URL
 */
export function resolveUrl(url: string | (() => string), type: UrlType): Signal<string> {
  assertInInjectionContext(resolveUrl);
  const resolver = inject(UrlResolverService);
  const getter = typeof url === 'function' ? url : () => url;
  return computed(() => resolver.resolveUrl(getter(), type));
}

/**
 * Resolve an app URL
 *
 * @param url URL string or function returning URL string
 * @returns Signal with resolved app URL
 */
export function appUrl(url: string | (() => string)): Signal<string> {
  assertInInjectionContext(appUrl);
  return resolveUrl(url, 'app');
}

/**
 * Resolve an asset URL
 *
 * @param url URL string or function returning URL string
 * @returns Signal with resolved asset URL
 */
export function assetUrl(url: string | (() => string)): Signal<string> {
  assertInInjectionContext(assetUrl);
  return resolveUrl(url, 'asset');
}

/**
 * Resolve a page URL
 *
 * @param url URL string or function returning URL string
 * @returns Signal with resolved page URL
 */
export function pageUrl(url: string | (() => string)): Signal<string> {
  assertInInjectionContext(pageUrl);
  return resolveUrl(url, 'page');
}

/**
 * Wrap URL in CSS url() function
 *
 * @param url URL string or function returning URL string
 * @returns Signal with CSS url() wrapped URL
 */
export function cssUrl(url: string | (() => string)): Signal<string> {
  const getter = typeof url === 'function' ? url : () => url;
  return computed(() => `url("${getter()}")`);
}
