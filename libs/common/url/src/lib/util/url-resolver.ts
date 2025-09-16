import { computed, Signal } from '@angular/core';

export function createUrlResolverInjector(
  injectHref: () => Signal<string>,
  resolve: (href: string, value: string) => string,
): () => (value: string) => string {
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

export function createUrlResolverFn(
  injectResolver: () => (value: string) => string,
): (value: string | (() => string)) => Signal<string> {
  return (value) => {
    const resolver = injectResolver();
    const source = typeof value === 'string' ? () => value : value;
    return computed(() => resolver(source()));
  };
}
