import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { DigitalObjectsJsonLd } from '@hra-api/ng-client';
import { catchError, map, of } from 'rxjs';

import { DigitalObjectMetadata } from '../digital-objects-metadata.schema';

/**
 * Creates a resolver that fetches the digital object data from a url
 * @param url Digital object url
 * @returns Resolver
 */
export function kgResolver(url: string): ResolveFn<DigitalObjectsJsonLd> {
  return () => {
    const http = inject(HttpClient);
    return http.get(url, { responseType: 'json' }).pipe(map((data) => data));
  };
}

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
    return http
      .get(`https://lod.humanatlas.io/${type}/${name}/${version}`, { responseType: 'json' })
      .pipe(catchError(() => of(undefined)))
      .pipe(map((data) => data as DigitalObjectMetadata));
  };
}
