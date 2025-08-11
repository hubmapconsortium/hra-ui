import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { DigitalObjectsJsonLd } from '@hra-api/ng-client';
import { map } from 'rxjs';

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
