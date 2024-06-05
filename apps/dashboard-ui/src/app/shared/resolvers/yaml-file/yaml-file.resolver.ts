import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ProviderToken, inject } from '@angular/core';
import { MaybeAsync, ResolveFn } from '@angular/router';
import { load } from 'js-yaml';
import { Observable, from, map, of, switchMap, tap } from 'rxjs';
import { YAML_FILE_CACHE } from './yaml-file-cache';

export interface YamlFileResolverOptions {
  cache?: boolean;
}

export function yamlFileResolver<T = unknown>(
  url: string | ProviderToken<MaybeAsync<string>>,
  options?: YamlFileResolverOptions,
): ResolveFn<T> {
  let cachedUrl: string | undefined;
  options = {
    cache: false,
    ...options,
  };

  return () => {
    const cache = options.cache ? inject(YAML_FILE_CACHE) : undefined;
    if (cachedUrl && cache?.has(cachedUrl)) {
      return cache.get(cachedUrl) as T;
    }

    const url$ = getUrlSource(url);
    const location = inject(Location);
    const http = inject(HttpClient);

    return url$.pipe(
      map((file) => (file.startsWith('http') ? file : location.prepareExternalUrl(file))),
      tap((file) => (cachedUrl = file)),
      switchMap((file) => http.get(file, { responseType: 'text' })),
      map((text) => load(text) as T),
      tap((data) => cache?.set(cachedUrl as string, data)),
    );
  };
}

function getUrlSource(url: string | ProviderToken<MaybeAsync<string>>): Observable<string> {
  if (typeof url === 'string') {
    return of(url);
  }

  const value = inject(url);
  return typeof value === 'string' ? of(value) : from(value);
}
