import { ChangeDetectorRef, inject } from '@angular/core';
import { Any } from '@hra-ui/utils/types';
import { StateToken, Store } from '@ngxs/store';
import { MonoTypeOperatorFunction, Observable, takeUntil, tap } from 'rxjs';
import { injectDestroy$ } from '../on-destroy/on-destroy';

/** Selector type for select style functions */
export type StateSelector<T> = ((...args: Any[]) => T) | StateToken<T>;

/** `select$` configuration options */
export interface SelectOptions {
  /** Whether to mark the containing view for change detection on emits. Defaults to true. */
  notifyOnChange?: boolean;
}

/**
 * Marks a view for change detection whenever a new value is emitted
 * @param options Options to explicitly disable marking
 * @returns A rxjs operator
 */
function markForCheck<T>(options?: SelectOptions): MonoTypeOperatorFunction<T> {
  const notifyOnChange = options?.notifyOnChange ?? true;
  const cdr = inject(ChangeDetectorRef, { optional: true });
  if (notifyOnChange && cdr) {
    const markFn = () => cdr.markForCheck();
    return tap({ next: markFn, error: markFn, complete: markFn });
  }

  return (source) => source;
}

/**
 * Creates an observable emitting parts of the state. The observable's lifetime
 * is automatically tied to the injection context where this is called.
 * @param selector State selection function or token
 * @param options Additional select options
 * @returns An observable of the selected state
 */
export function select$<T>(selector: StateSelector<T>, options?: SelectOptions): Observable<T> {
  return inject(Store)
    .select(selector as StateToken<T>)
    .pipe(takeUntil(injectDestroy$()), markForCheck(options));
}
