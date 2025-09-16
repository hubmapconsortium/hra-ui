import { LocationStrategy } from '@angular/common';
import { inject, Pipe, PipeTransform, signal, Signal } from '@angular/core';
import { createInjectionToken } from 'ngxtension/create-injection-token';
import { createHrefProvider } from '../util/href-provider';
import { createUrlResolverFn, createUrlResolverInjector } from '../util/url-resolver';
import { isAbsolute, joinWithSlash } from '../util/path';

function pageHref(): Signal<string> {
  const loc = inject(LocationStrategy);
  return signal(loc.getBaseHref()).asReadonly();
}

function resolvePageUrl(href: string, value: string): string {
  return isAbsolute(value) ? value : joinWithSlash(href, value);
}

const PAGE_HREF = createInjectionToken(pageHref);

export const injectPageHref = PAGE_HREF[0];
export const providePageHref = createHrefProvider(PAGE_HREF[1]);
export const injectPageUrlResolver = createUrlResolverInjector(injectPageHref, resolvePageUrl);
export const pageUrl = createUrlResolverFn(injectPageUrlResolver);

@Pipe({
  name: 'pageUrl',
})
export class PageUrlPipe implements PipeTransform {
  private readonly resolver = injectPageUrlResolver();

  transform(value: string): string {
    return this.resolver(value);
  }
}
