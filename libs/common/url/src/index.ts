export type { UrlType, UrlConfiguration } from './lib/url-configuration';

export { injectUrlConfiguration, provideUrlConfiguration, getDefaultAssetsHref } from './lib/url-configuration';

export { resolveUrl, resolveUrlSignal, assetUrl, appUrl, pageUrl, cssUrl } from './lib/url-configuration';

export {
  UrlResolverService,
  provideUrlResolver,
  provideAssetHref,
  provideAppHref,
  providePageHref,
} from './lib/url-configuration';

export { ResolveUrlPipe, AssetUrlPipe, AppUrlPipe, PageUrlPipe, CssUrlPipe } from './lib/url-pipes';

export { parseUrl } from './lib/utils';
