import { ChangeDetectorRef, inject } from '@angular/core';
import { StateToken, Store } from '@ngxs/store';
import { Observer, takeUntil } from 'rxjs';

import { injectOnDestroy } from '../on-destroy/on-destroy';

import type { Any, AnyFunction, SignatureOf } from '@hra-ui/utils/types';

class SnapshotObserver<T> implements Observer<T> {
  private hasError = false;
  private value?: T;
  private errorValue?: unknown;

  constructor(private readonly cdr: ChangeDetectorRef | null) {}

  get(): T {
    if (this.hasError) {
      throw this.errorValue;
    }

    return this.value as T;
  }

  next(value: T): void {
    this.value = value;
    this.cdr?.markForCheck();
  }

  error(err: unknown): void {
    this.hasError = true;
    this.errorValue = err;
  }

  complete(): void {
    // Intentionally empty
  }
}

export type SelectSnapshotSelector<T> = ((...args: Any[]) => T) | StateToken<T>;

export function selectSnapshot<T>(selector: SelectSnapshotSelector<T>): () => T {
  const store = inject(Store);
  const cdr = inject(ChangeDetectorRef, { optional: true });
  const destroy$ = injectOnDestroy();
  const data$ = store.select<T>(selector as StateToken<T>).pipe(takeUntil(destroy$));
  const observer = new SnapshotObserver<T>(cdr);

  data$.subscribe(observer);
  return observer.get.bind(observer);
}

export function selectQuerySnapshot<F extends AnyFunction>(selector: SelectSnapshotSelector<F>): SignatureOf<F> {
  const get = selectSnapshot(selector);
  return ((...args) => get()(...args)) as SignatureOf<F>;
}
