import { LocationStrategy } from '@angular/common';
import { inject, Pipe, PipeTransform, signal, Signal } from '@angular/core';
import { createInjectionToken } from 'ngxtension/create-injection-token';
import { createHrefProvider } from '../util/href-provider';
import { createUrlResolverFn, createUrlResolverInjector } from '../util/url-resolver';
import { isAbsolute, joinWithSlash } from '../util/path';

/**
 * Get the default page href
 */
function pageHref(): Signal<string> {
  const loc = inject(LocationStrategy);
  return signal(loc.getBaseHref()).asReadonly();
}

/**
 * Resolve an url against the page href
 *
 * @param href Page href
 * @param value Url to resolve
 * @returns The resolved url
 */
function resolvePageUrl(href: string, value: string): string {
  return isAbsolute(value) ? value : joinWithSlash(href, value);
}

/** Page href */
const PAGE_HREF = createInjectionToken(pageHref);

/** Inject the page href */
export const injectPageHref = PAGE_HREF[0];
/** Provide a new page href */
export const providePageHref = createHrefProvider(PAGE_HREF[1]);
/** Inject an url resolver that resolve urls against the page href */
export const injectPageUrlResolver = createUrlResolverInjector(injectPageHref, resolvePageUrl);
/** Create a derived signal that resolves an url against the page href */
export const pageUrl = createUrlResolverFn(injectPageUrlResolver);

/** Pipe that resolves urls against the page href */
@Pipe({
  name: 'pageUrl',
})
export class PageUrlPipe implements PipeTransform {
  /** Resolver function */
  private readonly resolver = injectPageUrlResolver();

  /**
   * Resolve an url against the page href
   *
   * @param value Url to resolve
   * @returns Resolved url
   */
  transform(value: string): string {
    return this.resolver(value);
  }
}
