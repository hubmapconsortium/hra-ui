import { ErrorHandler, inject, Signal, Type } from '@angular/core';
import { Color } from '@deck.gl/core/typed';
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

export function isColor(obj: unknown): obj is Color {
  return (
    (Array.isArray(obj) || obj instanceof Uint8Array || obj instanceof Uint8ClampedArray) &&
    (obj.length === 3 || obj.length === 4)
  );
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

const cachedColors = new Map<string, Color>();
let cachedCtx: CanvasRenderingContext2D | null = null;

function getParseColorContext(): CanvasRenderingContext2D | null {
  if (cachedCtx === null) {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    cachedCtx = canvas.getContext('2d', { willReadFrequently: true });
  }

  return cachedCtx;
}

/**
 * Tries to parse a value as a color.
 * Adapted from https://stackoverflow.com/a/19366389
 *
 * @param value Value to parse
 * @returns A color if parsing was successful, otherwise undefined
 */
export function tryParseColor(value: unknown): Color | undefined {
  const parsed = tryParseJson(value);
  if (isColor(parsed)) {
    return parsed;
  } else if (typeof parsed !== 'string') {
    return undefined;
  }

  const trimmed = parsed.trim();
  if (cachedColors.has(trimmed)) {
    return cachedColors.get(trimmed);
  }

  const ctx = getParseColorContext();
  if (ctx === null) {
    return undefined;
  }

  ctx.fillStyle = '#000';
  ctx.fillStyle = trimmed;
  const computed1 = ctx.fillStyle;
  ctx.fillStyle = '#fff';
  ctx.fillStyle = trimmed;
  const computed2 = ctx.fillStyle;
  if (computed1 !== computed2) {
    return undefined;
  }

  ctx.fillRect(0, 0, 1, 1);
  const color = [...ctx.getImageData(0, 0, 1, 1).data].slice(0, 3) as Color;
  cachedColors.set(trimmed, color);
  return color;
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
