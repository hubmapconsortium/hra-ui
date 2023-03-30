import { ChangeDetectorRef, ElementRef, inject, NgModuleRef, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { DestroyHostComponent } from './destroy-host.component';
import { DestructorScope, isDestructorScopeLike, ScopedDestructorSubject } from './destructor-subject';

/** Cached destructor observables */
const DESTRUCTOR_CACHE = new WeakMap<object, Observable<void>>();

/**
 * Get the first defined value returned by a generator
 *
 * @param genFn Generator function taking no arguments
 * @returns The first non-null value
 * @throws If the generator doesn't yield any non-null values
 */
function firstDefinedValue<T>(genFn: () => Generator<T | null | undefined>): T {
  for (const value of genFn()) {
    if (value != null) {
      return value;
    }
  }

  throw new Error('Unreachable');
}

/**
 * Finds a stable object in the current injection context to be
 * used as a key in the destructor cache
 *
 * @returns An object
 */
function findStableKeyObject(): object {
  return firstDefinedValue(function* () {
    yield inject(ElementRef, { optional: true })?.nativeElement;
    yield inject(ViewContainerRef, { optional: true });
    yield inject(NgModuleRef);
  });
}

/**
 * Finds the nearest destructor scope object in the current injection context
 *
 * @returns The scope on which cleanup can be attached
 */
function findDestructorScope(): DestructorScope {
  return firstDefinedValue(function* () {
    const vcr = inject(ViewContainerRef, { optional: true });
    yield vcr && DestroyHostComponent.create(vcr);

    yield inject(NgModuleRef);
  });
}

/**
 * Inject an observable that emits and completes at the same time as the component, directive, pipe, or service
 * it is injected into. It can be used to control the lifetime of other observables using
 * the `takeUntil` pipe, and to build other complex injection functions.
 *
 * Caveats:
 * - There are NO guarantees about whether the returned observable will emit and complete
 *   before or after the regular ngOnDestroy lifecycle hook
 * - For root and module level services the observable may never complete unless
 *   the containing module is explicitly destroyed, so don't rely on it for important operations
 * - Components, directives, pipe, and services that manipulate the `ViewContainerRef` MUST
 *   take care to maintain the view controlling the lifecycle of the observable. Failure
 *   to do so may result in early emit and completion of the returned observable
 *
 * Based on comment on https://github.com/angular/angular/issues/10185
 * Mostly https://github.com/angular/angular/issues/10185#issuecomment-1165545544 and
 * https://github.com/angular/angular/issues/10185#issuecomment-1199063426
 *
 * @returns An observable that emits and completes when the component/directive/etc. is destroyed
 */
export function injectDestroy$(): Observable<void> {
  const key = findStableKeyObject();
  let destructor = DESTRUCTOR_CACHE.get(key);
  if (!destructor) {
    const scope = findDestructorScope();
    destructor = new ScopedDestructorSubject(scope).asObservable();
    DESTRUCTOR_CACHE.set(key, destructor);
  }

  return destructor;
}
