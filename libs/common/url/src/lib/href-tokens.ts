import { inject, InjectionToken, isSignal, Provider, signal, Signal } from '@angular/core';
import { getDefaultAssetsHref } from './util/assets-href';
import { getDefaultBaseHref } from './util/base-href';

/** Type for href provider */
export type HrefProvider = string | Signal<string> | (() => string | Signal<string>);

/** Injection token for the application base href */
const APP_HREF = new InjectionToken<Signal<string>>('AppHref', {
  providedIn: 'root',
  factory: () => signal(''),
});

/** Injection token for the application wide base url for all asset links */
const ASSET_HREF = new InjectionToken<Signal<string>>('AssetHref', {
  providedIn: 'root',
  factory: () => signal(getDefaultAssetsHref()),
});

/** Injection token for the page base href */
const BASE_HREF = new InjectionToken<Signal<string>>('BaseHref', {
  providedIn: 'root',
  factory: () => signal(getDefaultBaseHref()),
});

/** Providers for the App href tokens */
export function provideAppHref(href: HrefProvider): Provider {
  return provideHref(APP_HREF, href);
}

/** Providers for the Asset href tokens */
export function provideAssetHref(href: HrefProvider): Provider {
  return provideHref(ASSET_HREF, href);
}

/** Providers for the Base href tokens */
export function provideBaseHref(href: HrefProvider): Provider {
  return provideHref(BASE_HREF, href);
}

/** Helper function to create href providers */
function provideHref(token: InjectionToken<Signal<string>>, href: HrefProvider): Provider {
  return {
    provide: token,
    useFactory: () => {
      const value = typeof href === 'function' && !isSignal(href) ? href() : href;
      return typeof value === 'string' ? signal(value) : value;
    },
  };
}

/** Helper function to inject the App href */
export function injectAppHref(): Signal<string> {
  return inject(APP_HREF);
}

/** Helper function to inject the Asset href */
export function injectAssetHref(): Signal<string> {
  return inject(ASSET_HREF);
}

/** Helper function to inject the Base href */
export function injectBaseHref(): Signal<string> {
  return inject(BASE_HREF);
}
