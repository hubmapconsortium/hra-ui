import { Pipe, PipeTransform, signal, Signal } from '@angular/core';
import { getImportMetaUrl } from '@hra-ui/common/import-meta';
import { createInjectionToken } from 'ngxtension/create-injection-token';
import { createHrefProvider } from '../util/href-provider';
import { createUrlResolverFn, createUrlResolverInjector } from '../util/url-resolver';
import { isAbsolute, joinWithSlash } from '../util/path';

/**
 * Get the default asset href
 */
function assetHref(): Signal<string> {
  const metaUrl = getImportMetaUrl();
  const href = /^https?:/.test(metaUrl) ? metaUrl : '';
  return signal(href).asReadonly();
}

/**
 * Resolve an url against the asset href
 *
 * @param href Asset href
 * @param value Url to resolve
 * @returns The resolved url
 */
function resolveAssetUrl(href: string, value: string): string {
  return isAbsolute(value) ? value : joinWithSlash(href, value);
}

/** Asset href */
const ASSET_HREF = createInjectionToken(assetHref);

/** Inject the asset href */
export const injectAssetHref = ASSET_HREF[0];
/** Provide a new asset href */
export const provideAssetHref = createHrefProvider(ASSET_HREF[1]);
/** Inject an url resolver that resolve urls against the asset href */
export const injectAssetUrlResolver = createUrlResolverInjector(injectAssetHref, resolveAssetUrl);
/** Create a derived signal that resolves an url against the asset href */
export const assetUrl = createUrlResolverFn(injectAssetUrlResolver);

/** Pipe that resolves urls against the asset href */
@Pipe({
  name: 'assetUrl',
})
export class AssetUrlPipe implements PipeTransform {
  /** Resolver function */
  private readonly resolver = injectAssetUrlResolver();

  /**
   * Resolve an url against the asset href
   *
   * @param value Url to resolve
   * @returns Resolved url
   */
  transform(value: string): string {
    return this.resolver(value);
  }
}
