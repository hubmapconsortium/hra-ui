import { ProviderToken } from '@angular/core';
import { MaybeAsync, ResolveFn } from '@angular/router';
import { CdeVisualizationElementProps } from '@hra-ui/cde-visualization';
import { Observable, from, isObservable, map, of } from 'rxjs';
import { jsonFileResolver } from '../json-file/json-file.resolver';

/**
 * Example data resolver
 * @param url Url
 * @returns data resolver function
 */
export function exampleDataResolver(
  url: string | ProviderToken<MaybeAsync<string>>,
): ResolveFn<Partial<CdeVisualizationElementProps>> {
  const dataResolver = jsonFileResolver<Record<string, unknown>[]>(url, { cache: true });

  return (route, state) => {
    const index = +(route.paramMap.get('index') ?? '');
    const data$ = maybeAsyncToObservable(dataResolver(route, state));

    return data$.pipe(
      map((items) => items[index]),
      map((data) => normalizeData(data)),
    );
  };
}

/**
 * Maybe async to observable
 * @template T Type
 * @param source Source
 * @returns Observable
 */
function maybeAsyncToObservable<T>(source: MaybeAsync<T>): Observable<T> {
  if (isObservable(source)) {
    return source;
  } else if (source instanceof Promise) {
    return from(source);
  } else {
    return of(source);
  }
}

/**
 * Formats string as camel case
 * @param value Raw string
 * @returns Formatted string
 */
function kebabCaseToCamelCase(value: string): string {
  return value.replace(/-(\w)/gi, (_, char: string) => char.toUpperCase());
}

/**
 * Normalizes data keys to camel case
 * @param data Input data
 * @returns Formatted data
 */
function normalizeData(data: Record<string, unknown>): Partial<CdeVisualizationElementProps> {
  const result: Partial<CdeVisualizationElementProps> = {};
  for (const key in data) {
    const newKey = kebabCaseToCamelCase(key);
    result[newKey as never] = data[key] as never;
  }

  return result;
}
