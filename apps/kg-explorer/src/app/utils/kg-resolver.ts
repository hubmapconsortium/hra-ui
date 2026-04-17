import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { DigitalObjectMetadata } from '../digital-objects-metadata.schema';
import { injectMirrorUrl } from './endpoints';
import { getDocumentationUrl, getProductLabel } from './utils';

/**
 * Creates a resolver for digital object metadata from the current route
 * @returns Resolver
 */
export function doMetadataResolver(): ResolveFn<DigitalObjectMetadata> {
  return (route: ActivatedRouteSnapshot) => {
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
  return (route: ActivatedRouteSnapshot) => {
    const type = route.params['type'];
    return getDocumentationUrl(type);
  };
}

/**
 * Creates product label resolver from the route
 * @returns product label resolver
 */
export function productLabelResolver(): ResolveFn<string> {
  return (route: ActivatedRouteSnapshot) => {
    const type = route.params['type'];
    return getProductLabel(type);
  };
}
