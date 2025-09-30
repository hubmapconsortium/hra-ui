import { Pipe, PipeTransform, Signal, signal } from '@angular/core';
import { injectAppConfiguration } from '@hra-ui/common/injectors';
import { createInjectionToken } from 'ngxtension/create-injection-token';
import { createChainedHrefProvider, createHrefProvider } from '../util/href-provider';
import { createUrlResolverFn, createUrlResolverInjector } from '../util/url-resolver';

/**
 * Get the default application href
 */
function appHref(): Signal<string> {
  const { url = '' } = injectAppConfiguration();
  return signal(url).asReadonly();
}

/**
 * Resolve an url against the application href.
 * If the url starts with the application href it is removed,
 * otherwise the url is returned unchanged.
 *
 * @param href Application href
 * @param value Url to resolve
 * @returns The resolved url
 */
function resolveAppUrl(href: string, value: string): string {
  if (href !== '') {
    if (!href.endsWith('/')) {
      href = href + '/';
    }
    if (value.startsWith(href)) {
      return value.slice(href.length);
    }
  }

  return value;
}

/** Application href */
const APP_HREF = createInjectionToken(appHref);

/** Inject the application href */
export const injectAppHref = APP_HREF[0];
/** Provide a new application href */
export const provideAppHref = createHrefProvider(APP_HREF[1]);
/** Provide a possibly undefined href that falls back to the global application href */
export const provideChainedAppHref = createChainedHrefProvider(injectAppHref, APP_HREF[1]);
/** Inject an url resolver that resolve urls against the application href */
export const injectAppUrlResolver = createUrlResolverInjector(injectAppHref, resolveAppUrl);
/** Create a derived signal that resolves an url against the application href */
export const appUrl = createUrlResolverFn(injectAppUrlResolver);

/** Pipe that resolves urls against the application href */
@Pipe({
  name: 'appUrl',
})
export class AppUrlPipe implements PipeTransform {
  /** Resolver function */
  private readonly resolver = injectAppUrlResolver();

  /**
   * Resolve an url against the application href
   *
   * @param value Url to resolve
   * @returns Resolved url
   */
  transform(value: string): string {
    return this.resolver(value);
  }
}
