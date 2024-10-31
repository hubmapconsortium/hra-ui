import { ErrorHandler, inject, Signal, Type } from '@angular/core';
import { FileLoader } from '@hra-ui/common/fs';
import { derivedAsync } from 'ngxtension/derived-async';
import { catchError, EMPTY, filter, map } from 'rxjs';

/** Accepted data input types */
export type DataInput<T> = T | File | URL | string | undefined;

/**
 * Tests whether a value is a plain object
 *
 * @param obj Object to test
 * @returns True if `obj` is a plain object, otherwise false
 */
export function isRecordObject(obj: unknown): obj is Record<PropertyKey, unknown> {
  return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
}

/**
 * Caches the result of a no-argument accessor method returning the cached value on future calls.
 *
 * @param instance Instance to cache the result on
 * @param accessor Original accessor method
 * @returns A caching accessor method
 */
export function cachedAccessor<Res>(instance: object, accessor: () => Res): () => Res {
  const cacheKey = Symbol();
  const obj = instance as Record<symbol, Res>;

  return () => {
    obj[cacheKey] ??= accessor();
    return obj[cacheKey];
  };
}

/**
 * Tries to parse a value as json
 *
 * @param value Value to parse
 * @returns Parsed json value if possible, otherwise the original value
 */
export function tryParseJson(value: unknown): unknown {
  try {
    if (typeof value === 'string') {
      return JSON.parse(value);
    }
  } catch {
    // Ignore errors
  }

  return value;
}

/**
 * Loads data from either an url, file, json encoded string, or passed directly.
 * The resulting signal value is undefined until data has has been sucessfully loaded.
 *
 * @param input Raw input
 * @param loaderService Service to load urls and files
 * @param options File loader options
 * @returns Loaded data
 */
export function loadData<T, Opts>(
  input: Signal<DataInput<T>>,
  loaderService: Type<FileLoader<T, Opts>>,
  options: Opts,
): Signal<unknown> {
  const loader = inject(loaderService);
  const errorHandler = inject(ErrorHandler);

  return derivedAsync(() => {
    const data = tryParseJson(input());
    if (typeof data === 'string' || data instanceof File || data instanceof URL) {
      const source = data instanceof URL ? data.toString() : data;
      return loader.load(source, options).pipe(
        filter((event) => event.type === 'data'),
        map((event) => event.data),
        catchError((error) => {
          errorHandler.handleError(error);
          return EMPTY;
        }),
      );
    }

    return data;
  });
}
