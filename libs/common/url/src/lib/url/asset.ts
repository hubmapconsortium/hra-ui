import { Pipe, PipeTransform, signal, Signal } from '@angular/core';
import { getImportMetaUrl } from '@hra-ui/common/import-meta';
import { createInjectionToken } from 'ngxtension/create-injection-token';
import { createHrefProvider } from '../util/href-provider';
import { createUrlResolverFn, createUrlResolverInjector } from '../util/url-resolver';
import { isAbsolute, joinWithSlash } from '../util/path';

function assetHref(): Signal<string> {
  const metaUrl = getImportMetaUrl();
  const href = /^https?:/.test(metaUrl) ? metaUrl : '';
  return signal(href).asReadonly();
}

function resolveAssetUrl(href: string, value: string): string {
  return isAbsolute(value) ? value : joinWithSlash(href, value);
}

const ASSET_HREF = createInjectionToken(assetHref);

export const injectAssetHref = ASSET_HREF[0];
export const provideAssetHref = createHrefProvider(ASSET_HREF[1]);
export const injectAssetUrlResolver = createUrlResolverInjector(injectAssetHref, resolveAssetUrl);
export const assetUrl = createUrlResolverFn(injectAssetUrlResolver);

@Pipe({
  name: 'assetUrl',
})
export class AssetUrlPipe implements PipeTransform {
  private readonly resolver = injectAssetUrlResolver();

  transform(value: string): string {
    return this.resolver(value);
  }
}
