import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { injectAssetHref } from '@hra-ui/common/url';
import { load } from 'js-yaml';
import { map } from 'rxjs';
import { z } from 'zod';

/**
 * Creates a resolver function that loads and validates json data
 *
 * @param url Json url path
 * @param spec Zod schema to validate the spec
 * @returns A resolver function
 */
export function createJsonSpecResolver<T extends z.ZodTypeAny>(url: string, spec: T): ResolveFn<z.infer<T>> {
  return () => {
    const http = inject(HttpClient);
    return http.get(resolveUrl(url), { responseType: 'json' }).pipe(map((data) => spec.parse(data)));
  };
}

/**
 * Creates a resolver function that loads and validates yaml data
 *
 * @param file Yaml url path
 * @param spec Zod schema to validate the spec
 * @returns A resolver function
 */
export function createYamlSpecResolver<T extends z.ZodTypeAny>(url: string, spec: T): ResolveFn<z.infer<T>> {
  return () => {
    const http = inject(HttpClient);
    return http.get(resolveUrl(url), { responseType: 'text' }).pipe(
      map((data) => load(data, { filename: url })),
      map((data) => spec.parse(data)),
    );
  };
}

/**
 * Helper for resolving urls
 *
 * @param url Absolute or relative url
 * @returns An resolved url
 */
function resolveUrl(url: string): string {
  if (url.startsWith('http')) {
    return url;
  }

  return Location.joinWithSlash(injectAssetHref()(), url);
}
