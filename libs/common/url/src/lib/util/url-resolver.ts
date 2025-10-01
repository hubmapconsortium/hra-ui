import { computed, Signal } from '@angular/core';
import { InjectHrefFn, UrlResolverImplFn, InjectUrlResolverFn } from './types';

/**
 * Create a new injection function that returns an url resolver.
 * The resulting injection function must be called in an injection context.
 *
 * @param injectHref Injection function for the href signal
 * @param resolve Resolver implementation
 * @returns An injection function for getting the resolver
 */
export function createUrlResolverInjector(injectHref: InjectHrefFn, resolve: UrlResolverImplFn): InjectUrlResolverFn {
  const cache = new WeakMap<Signal<string>, (value: string) => string>();
  return () => {
    const href = injectHref();
    let resolver = cache.get(href);
    if (!resolver) {
      resolver = (value) => resolve(href(), value);
      cache.set(href, resolver);
    }
    return resolver;
  };
}

/**
 * Create a function that produces resolved url signals
 *
 * @param injectResolver Injection function for the resolver
 * @returns A function to create resolved url signals
 */
export function createUrlResolverFn(
  injectResolver: InjectUrlResolverFn,
): (value: string | (() => string)) => Signal<string> {
  return (value) => {
    const resolver = injectResolver();
    const source = typeof value === 'string' ? () => value : value;
    return computed(() => resolver(source()));
  };
}
