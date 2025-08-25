import {
  EnvironmentProviders,
  inject,
  InjectionToken,
  makeEnvironmentProviders,
  Signal,
  computed,
  signal,
  Injectable,
} from '@angular/core';
import { Location, LocationStrategy } from '@angular/common';
import { parseUrl } from './utils';
import { getImportMetaUrl } from '@hra-ui/common/import-meta';

/** URL type enum */
export type UrlType = 'app' | 'asset' | 'page';

/** URL configuration */
export interface UrlConfiguration {
  /** Asset base URL */
  assetHref?: string;
  /** App base URL */
  appHref?: string;
  /** Page base URL */
  baseHref?: string;
}

/** Injection token for the application wide base url for all asset links */
const ASSET_HREF = new InjectionToken<Signal<string>>('AssetHref', {
  providedIn: 'root',
  factory: () => signal(getDefaultAssetsHref()),
});

/** Injection token for the application base href */
const APP_HREF = new InjectionToken<Signal<string>>('AppHref', {
  providedIn: 'root',
  factory: () => signal(''),
});

/** Injection token for the page base href */
const BASE_HREF = new InjectionToken<Signal<string>>('BaseHref', {
  providedIn: 'root',
  factory: () => signal(getDefaultBaseHref()),
});

/** URL configuration token */
const URL_CONFIGURATION = new InjectionToken<UrlConfiguration>('UrlConfiguration', {
  providedIn: 'root',
  factory: () => ({
    assetHref: getDefaultAssetsHref(),
    appHref: '',
    baseHref: getDefaultBaseHref(),
  }),
});

/**
 * Inject the global URL configuration
 *
 * @returns The URL configuration
 */
export function injectUrlConfiguration(): UrlConfiguration {
  return inject(URL_CONFIGURATION);
}

/**
 * Set the URL configuration
 *
 * @param config New configuration
 * @returns An environment provider
 */
export function provideUrlConfiguration(config: UrlConfiguration): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: URL_CONFIGURATION,
      useValue: config,
    },
  ]);
}

/**
 * Service for resolving URLs based on type
 */
@Injectable({
  providedIn: 'root',
})
export class UrlResolverService {
  /** Asset href signal */
  private readonly assetHref = inject(ASSET_HREF);

  /** App href signal */
  private readonly appHref = inject(APP_HREF);

  /** Base href signal */
  private readonly baseHref = inject(BASE_HREF);

  /**
   * Resolve a URL based on its type
   *
   * @param url The URL to resolve
   * @param type The type of URL resolution
   * @returns Resolved URL
   */
  resolveUrl(url: string, type: UrlType): string {
    if (type === 'asset') {
      if (isAbsolute(url)) {
        return url;
      }
      return Location.joinWithSlash(this.assetHref(), url);
    }

    if (type === 'page') {
      if (isAbsolute(url)) {
        return url;
      }
      return Location.joinWithSlash(this.baseHref(), url);
    }

    if (type === 'app') {
      const appHrefValue = this.appHref();
      if (appHrefValue !== '' && url.startsWith(appHrefValue)) {
        return removePrefix(url, appHrefValue);
      }
    }

    return url;
  }
}

/**
 * Resolve a URL based on its type
 *
 * @param url The URL to resolve
 * @param type The type of URL resolution
 * @returns Resolved URL
 */
export function resolveUrl(url: string, type: UrlType): string {
  const config = injectUrlConfiguration();

  if (type === 'asset') {
    if (isAbsolute(url)) {
      return url;
    }
    return Location.joinWithSlash(config.assetHref || '', url);
  }

  if (type === 'page') {
    if (isAbsolute(url)) {
      return url;
    }
    return Location.joinWithSlash(config.baseHref || '', url);
  }

  if (type === 'app') {
    const appHref = config.appHref || '';
    if (appHref !== '' && url.startsWith(appHref)) {
      return removePrefix(url, appHref);
    }
  }

  return url;
}

/**
 * Resolve a URL based on type (reactive version)
 *
 * @param url URL string or function returning URL string
 * @param type URL type
 * @returns Signal with resolved URL
 */
export function resolveUrlSignal(url: string | (() => string), type: UrlType): Signal<string> {
  const urlGetter = typeof url === 'function' ? url : () => url;

  return computed(() => resolveUrl(urlGetter(), type));
}

/**
 * Resolve an asset URL
 *
 * @param url URL string or function returning URL string
 * @returns Signal with resolved asset URL
 */
export function assetUrl(url: string | (() => string)): Signal<string> {
  return resolveUrlSignal(url, 'asset');
}

/**
 * Resolve an app URL
 *
 * @param url URL string or function returning URL string
 * @returns Signal with resolved app URL
 */
export function appUrl(url: string | (() => string)): Signal<string> {
  return resolveUrlSignal(url, 'app');
}

/**
 * Resolve a page URL
 *
 * @param url URL string or function returning URL string
 * @returns Signal with resolved page URL
 */
export function pageUrl(url: string | (() => string)): Signal<string> {
  return resolveUrlSignal(url, 'page');
}

/**
 * Wrap URL in CSS url() function
 *
 * @param url URL string or function returning URL string
 * @returns Signal with CSS url() wrapped URL
 */
export function cssUrl(url: string | (() => string)): Signal<string> {
  const urlGetter = typeof url === 'function' ? url : () => url;

  return computed(() => `url("${urlGetter()}")`);
}

/**
 * Provide URL resolver functionality
 *
 * @returns Environment providers
 */
export function provideUrlResolver(): EnvironmentProviders {
  return makeEnvironmentProviders([UrlResolverService]);
}

/**
 * Provide asset href configuration
 *
 * @param href Asset href value, signal, or function returning either
 * @returns Environment providers
 */
export function provideAssetHref(
  href: string | Signal<string> | (() => string | Signal<string>),
): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: ASSET_HREF,
      useFactory: () => {
        if (typeof href === 'string') {
          return signal(href);
        }
        if (typeof href === 'function') {
          const result = href();
          return typeof result === 'string' ? signal(result) : result;
        }
        return href;
      },
    },
  ]);
}

/**
 * Provide app href configuration
 *
 * @param href App href value, signal, or function returning either
 * @returns Environment providers
 */
export function provideAppHref(href: string | Signal<string> | (() => string | Signal<string>)): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: APP_HREF,
      useFactory: () => {
        if (typeof href === 'string') {
          return signal(href);
        }
        if (typeof href === 'function') {
          const result = href();
          return typeof result === 'string' ? signal(result) : result;
        }
        return href;
      },
    },
  ]);
}

/**
 * Provide page href configuration
 *
 * @param href Page href value, signal, or function returning either
 * @returns Environment providers
 */
export function providePageHref(href: string | Signal<string> | (() => string | Signal<string>)): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: BASE_HREF,
      useFactory: () => {
        if (typeof href === 'string') {
          return signal(href);
        }
        if (typeof href === 'function') {
          const result = href();
          return typeof result === 'string' ? signal(result) : result;
        }
        return href;
      },
    },
  ]);
}

/**
 * Check if a URL is absolute
 *
 * @param url URL to check
 * @returns True if absolute, false otherwise
 */
function isAbsolute(url: string): boolean {
  return parseUrl(url) !== null;
}

/**
 * Remove prefix from URL
 *
 * @param url URL to process
 * @param prefix Prefix to remove
 * @returns URL without prefix
 */
function removePrefix(url: string, prefix: string): string {
  return url.startsWith(prefix) ? url.slice(prefix.length) : url;
}

/**
 * Currently executing script's element.
 */
const SCRIPT_EL = typeof document === 'object' ? document.currentScript : null;

/**
 * Get the current script's path from a script element.
 *
 * @param el Executing script element
 * @returns A path if available
 */
function getCurrentScriptFromElement(el = SCRIPT_EL): string | undefined {
  return el && 'src' in el ? el.src : undefined;
}

/**
 * Try to find the current script's path using a stack trace.
 * @returns A path if found
 */
function getCurrentScriptFromStackTrace(): string | undefined {
  try {
    throw new Error();
  } catch (error) {
    const { stack } = error as Error;
    const match = stack?.match(/(https?:\/\/.+):\d+:\d+/);
    return match?.[1];
  }
}

/**
 * Get the default assets href
 *
 * @param candidates Candidate paths
 * @returns A base url for assets or the empty string
 */
export function getDefaultAssetsHref(candidates: Iterable<string | undefined> = getAssetsHrefCandidatePaths()): string {
  for (const path of candidates) {
    const url = parseUrl('./', path);
    if (url && ['http:', 'https:'].includes(url.protocol)) {
      return url.href;
    }
  }

  return '';
}

/**
 * Get candidate paths for assets href
 */
function* getAssetsHrefCandidatePaths(): Generator<string | undefined> {
  yield getImportMetaUrl();
  yield getCurrentScriptFromElement();
  yield getCurrentScriptFromStackTrace();
}

/**
 * Get the default base href
 *
 * @returns Base href from LocationStrategy or empty string
 */
function getDefaultBaseHref(): string {
  try {
    const locationStrategy = inject(LocationStrategy, { optional: true });
    return locationStrategy?.getBaseHref() ?? '';
  } catch {
    return '';
  }
}

export { ResolveUrlPipe, AssetUrlPipe, AppUrlPipe, PageUrlPipe, CssUrlPipe } from './url-pipes';
