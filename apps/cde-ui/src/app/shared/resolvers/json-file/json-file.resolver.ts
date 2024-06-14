import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, ProviderToken } from '@angular/core';
import { MaybeAsync, ResolveFn } from '@angular/router';
import { from, map, Observable, of, switchMap, tap } from 'rxjs';

import { JSON_FILE_CACHE } from './json-file-cache';

/**
 * Json file resolver options
 */
export interface JsonFileResolverOptions {
  /** Uses cache if true */
  cache?: boolean;
}

/**
 * Json file resolver
 * @template T Type
 * @param url Path to json file
 * @param options Resolver options
 * @returns Function for resolving data
 */
export function jsonFileResolver<T>(
  url: string | ProviderToken<MaybeAsync<string>>,
  options?: JsonFileResolverOptions,
): ResolveFn<T> {
  let cachedUrl: string | undefined;
  options = {
    cache: false,
    ...options,
  };

  return () => {
    const cache = options.cache ? inject(JSON_FILE_CACHE) : undefined;
    if (cachedUrl && cache?.has(cachedUrl)) {
      return cache.get(cachedUrl) as T;
    }

    const url$ = getUrlSource(url);
    const location = inject(Location);
    const http = inject(HttpClient);

    return url$.pipe(
      map((file) => (file.startsWith('http') ? file : location.prepareExternalUrl(file))),
      tap((file) => (cachedUrl = file)),
      switchMap((file) => http.get<T>(file, { responseType: 'json' })),
      tap((data) => cache?.set(cachedUrl as string, data)),
    );
  };
}

/**
 * Gets url source
 * @param url Url
 * @returns Observable with url source
 */
function getUrlSource(url: string | ProviderToken<MaybeAsync<string>>): Observable<string> {
  if (typeof url === 'string') {
    return of(url);
  }

  const value = inject(url);
  return typeof value === 'string' ? of(value) : from(value);
}
