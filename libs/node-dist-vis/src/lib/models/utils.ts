import { inject, Signal, Type } from '@angular/core';
import { FileLoader } from '@hra-ui/common/fs';
import { derivedAsync } from 'ngxtension/derived-async';
import { filter, map } from 'rxjs';

export function isRecordObject(obj: unknown): obj is Record<PropertyKey, unknown> {
  return typeof obj === 'object' && obj !== null;
}

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

export function loadData<T, Opts>(
  input: Signal<T | string | undefined>,
  loaderService: Type<FileLoader<T, Opts>>,
  options: Opts,
): Signal<unknown> {
  const loader = inject(loaderService);
  return derivedAsync(() => {
    const data = tryParseJson(input());
    if (typeof data === 'string' || data instanceof File) {
      return loader.load(data, options).pipe(
        filter((event) => event.type === 'data'),
        map((event) => event.data),
      );
    }

    return data;
  });
}
