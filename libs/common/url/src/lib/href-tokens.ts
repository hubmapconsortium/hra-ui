import { inject, InjectionToken, isSignal, Provider, signal, Signal } from '@angular/core';
import { getDefaultAssetsHref } from './util/assets-href';
import { getDefaultBaseHref } from './util/base-href';

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

export function provideAppHref(href: HrefProvider): Provider {
  return provideHref(APP_HREF, href);
}

export function provideAssetHref(href: HrefProvider): Provider {
  return provideHref(ASSET_HREF, href);
}

export function provideBaseHref(href: HrefProvider): Provider {
  return provideHref(BASE_HREF, href);
}

function provideHref(token: InjectionToken<Signal<string>>, href: HrefProvider): Provider {
  return {
    provide: token,
    useFactory: () => {
      const value = typeof href === 'function' && !isSignal(href) ? href() : href;
      return typeof value === 'string' ? signal(value) : value;
    },
  };
}

export function injectAppHref(): Signal<string> {
  return inject(APP_HREF);
}

export function injectAssetHref(): Signal<string> {
  return inject(ASSET_HREF);
}

export function injectBaseHref(): Signal<string> {
  return inject(BASE_HREF);
}
