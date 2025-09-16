import { Pipe, PipeTransform, Signal, signal } from '@angular/core';
import { injectAppConfiguration } from '@hra-ui/common/injectors';
import { createInjectionToken } from 'ngxtension/create-injection-token';
import { createHrefProvider } from '../util/href-provider';
import { createUrlResolverFn, createUrlResolverInjector } from '../util/url-resolver';

function appHref(): Signal<string> {
  const { url = '' } = injectAppConfiguration();
  return signal(url).asReadonly();
}

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

const APP_HREF = createInjectionToken(appHref);

export const injectAppHref = APP_HREF[0];
export const provideAppHref = createHrefProvider(APP_HREF[1]);
export const injectAppUrlResolver = createUrlResolverInjector(injectAppHref, resolveAppUrl);
export const appUrl = createUrlResolverFn(injectAppUrlResolver);

@Pipe({
  name: 'appUrl',
})
export class AppUrlPipe implements PipeTransform {
  private readonly resolver = injectAppUrlResolver();

  transform(value: string): string {
    return this.resolver(value);
  }
}
