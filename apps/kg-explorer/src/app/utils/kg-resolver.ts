import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { createJsonSpecResolver } from '@hra-ui/design-system/content-templates/resolvers';
import { catchError, map, of } from 'rxjs';
import * as z from 'zod';
import { DigitalObjectMetadata } from '../digital-objects-metadata.schema';
import { injectMirrorUrl } from './endpoints';
import { getDocumentationUrl, getProductLabel } from './utils';

/**
 * Creates a resolver for fetching and validating JSON data from the given url using the provided zod schema
 * @param url URL to fetch data from
 * @param spec Zod schema to validate the data against
 * @returns Resolver function that can be used in Angular routes
 */
export function kgJsonResolver<T extends z.ZodTypeAny>(url: string, spec: T): ResolveFn<z.infer<T>> {
  return (route, state) => {
    const mirrorUrl = injectMirrorUrl();
    return createJsonSpecResolver(`${mirrorUrl()}${url}`, spec)(route, state);
  };
}

/**
 * Creates a resolver for digital object metadata from the current route
 * @returns Resolver function for digital object metadata
 */
export function doMetadataResolver(): ResolveFn<DigitalObjectMetadata> {
  return (route) => {
    const type = route.paramMap.get('type') || '';
    const name = route.paramMap.get('name') || '';
    const version = route.paramMap.get('version') || '';
    const http = inject(HttpClient);
    const mirrorUrl = injectMirrorUrl();
    return http
      .get(`${mirrorUrl()}/${type}/${name}/${version}/metadata.json`, { responseType: 'json' })
      .pipe(catchError(() => of(undefined)))
      .pipe(map((data) => data as DigitalObjectMetadata));
  };
}

/**
 * Creates documentation url resolver from the route
 * @returns url resolver
 */
export function documentationUrlResolver(): ResolveFn<string> {
  return (route) => {
    const type = route.params['type'];
    return getDocumentationUrl(type);
  };
}

/**
 * Creates product label resolver from the route
 * @returns product label resolver
 */
export function productLabelResolver(): ResolveFn<string> {
  return (route) => {
    const type = route.params['type'];
    return getProductLabel(type);
  };
}
