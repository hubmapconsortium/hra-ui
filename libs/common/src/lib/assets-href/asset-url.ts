import { Location } from '@angular/common';
import { Signal, assertInInjectionContext, computed, inject } from '@angular/core';
import { APP_ASSETS_HREF } from './tokens';

/**
 * Utility to build an asset url from parts
 *
 * @param base Base path
 * @param path Asset path
 * @param type Asset url type
 * @returns An url
 */
export function buildAssetUrl(base: string, path: string, type?: 'css'): string {
  const url = Location.joinWithSlash(base, path);
  return type === 'css' ? `url("${url}")` : url;
}

/**
 * Resolve an asset url
 *
 * @param path Asset path
 * @param type Url type
 * @returns A signal with the asset url
 */
export function assetsUrl(path: string | (() => string), type?: 'css'): Signal<string> {
  assertInInjectionContext(assetsUrl);

  const assetsHref = inject(APP_ASSETS_HREF);
  const pathGetter = typeof path === 'function' ? path : () => path;
  return computed(() => buildAssetUrl(assetsHref(), pathGetter(), type));
}
