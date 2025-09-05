import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { DigitalObjectsJsonLd, HraKgService, OntologyTree, V1Service } from '@hra-api/ng-client';
import { catchError, map, of } from 'rxjs';

import { DigitalObjectMetadata } from '../digital-objects-metadata.schema';
import { getDocumentationUrl, getProductLabel } from './utils';

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

/**
 * Creates a resolver for ASCTB term counts
 * @returns resolver
 */
export function asctbResolver(): ResolveFn<[string, number][]> {
  return () => {
    const kg = inject(HraKgService);
    return kg.asctbTermOccurences({}).pipe(map((data) => Object.entries(data)));
  };
}

/**
 * Creates a resolver for ontology tree
 * @returns resolver
 */
export function ontologyResolver(): ResolveFn<OntologyTree> {
  return () => {
    const v1 = inject(V1Service);
    return v1.ontologyTreeModel({}).pipe(map((data) => data));
  };
}

/**
 * Creates a resolver for cell type ontology tree
 * @returns resolver
 */
export function cellTypeResolver(): ResolveFn<OntologyTree> {
  return () => {
    const v1 = inject(V1Service);
    return v1.cellTypeTreeModel({}).pipe(map((data) => data));
  };
}

/**
 * Creates a resolver for biomarkers ontology tree
 * @returns resolver
 */
export function biomarkersResolver(): ResolveFn<OntologyTree> {
  return () => {
    const v1 = inject(V1Service);
    return v1.biomarkerTreeModel({}).pipe(map((data) => data));
  };
}

export function documentationUrlResolver(): ResolveFn<string> {
  return (route: ActivatedRouteSnapshot) => {
    const type = route.params['type'];
    return getDocumentationUrl(type);
  };
}

export function productLabelResolver(): ResolveFn<string> {
  return (route: ActivatedRouteSnapshot) => {
    const type = route.params['type'];
    return getProductLabel(type);
  };
}
