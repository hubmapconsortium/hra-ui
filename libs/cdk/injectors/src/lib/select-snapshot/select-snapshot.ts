import { ChangeDetectorRef, inject } from '@angular/core';
import { StateToken, Store } from '@ngxs/store';
import { Observer, takeUntil } from 'rxjs';

import { injectOnDestroy } from '../on-destroy/on-destroy';

import type { Any, AnyFunction, SignatureOf } from '@hra-ui/utils/types';

/** Observer storing the latest value from a snapshot stream */
class SnapshotObserver<T> implements Observer<T> {
  /** Whether an error has been emitted */
  private hasError = false;
  /** The latest value */
  private value?: T = undefined;
  /** The error value if `hasError === true` */
  private errorValue?: unknown;

  /**
   * Creates a new SnapshotObserver
   * @param cdr Change detector to notify whenever a new value is emitted
   */
  constructor(private readonly cdr: ChangeDetectorRef | null) {}

  /**
   * Gets the latest value or throw on errors
   * @returns The latest value
   * @throws If an error has been emitted
   */
  get(): T {
    if (this.hasError) {
      throw this.errorValue;
    }

    return this.value as T;
  }

  /**
   * Handles value emits
   * @param value The new value
   */
  next(value: T): void {
    this.value = value;
    this.cdr?.markForCheck();
  }

  /**
   * Handles error emits
   * @param err The error value
   */
  error(err: unknown): void {
    this.hasError = true;
    this.value = undefined;
    this.errorValue = err;
  }

  /**
   * Handles completion emits
   */
  complete(): void {
    // Intentionally empty
  }
}

/** Type of `selectSnapshot` and `selectQuerySnapshot` selector argument */
export type SelectSnapshotSelector<T> = ((...args: Any[]) => T) | StateToken<T>;

/**
 * Injects a function that returns the latest snapshot value each time it is called
 * Automatically marks components, directives, or pipes for change detection whenever
 * a new value is available
 * @param selector Store data selector
 * @returns A snapshot function
 */
export function selectSnapshot<T>(selector: SelectSnapshotSelector<T>): () => T {
  const store = inject(Store);
  const cdr = inject(ChangeDetectorRef, { optional: true });
  const destroy$ = injectOnDestroy();
  const data$ = store.select<T>(selector as StateToken<T>).pipe(takeUntil(destroy$));
  const observer = new SnapshotObserver<T>(cdr);

  data$.subscribe(observer);
  return observer.get.bind(observer);
}

/**
 * Injects a function that can be called with the same arguments as the query selector
 * and returns the latest value each time
 * Automatically marks components, directives, or pipes for change detection whenever
 * a new value is available
 * @param selector Store query selector
 * @returns A snapshot function taking the same arguments as the query selector
 */
export function selectQuerySnapshot<F extends AnyFunction>(selector: SelectSnapshotSelector<F>): SignatureOf<F> {
  const get = selectSnapshot(selector);
  return ((...args) => get()(...args)) as SignatureOf<F>;
}
