import { Provider, Signal } from '@angular/core';
import { CreateInjectionTokenReturn } from 'ngxtension/create-injection-token';

/** A value or a factory function */
export type ValueOrFactory<T> = T | (() => T);

/** Href inject function */
export type InjectHrefFn = CreateInjectionTokenReturn<Signal<string>>[0];

/** Raw href provide function */
export type RawProvideHrefFn = CreateInjectionTokenReturn<Signal<string>>[1];

/** Href provide function */
export type ProvideHrefFn = (valueOrFactory: ValueOrFactory<string | Signal<string>>) => Provider;

/** Chained href provide function */
export type ProvideChainedHrefFn = (valueOrFactory: ValueOrFactory<Signal<string | undefined>>) => Provider;

/** Url resolver function */
export type UrlResolverFn = (value: string) => string;

/** Url resolver implementation */
export type UrlResolverImplFn = (base: string, value: string) => string;

/** Url resolver inject function */
export type InjectUrlResolverFn = () => UrlResolverFn;
