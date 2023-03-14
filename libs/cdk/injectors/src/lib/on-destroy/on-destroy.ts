import { Component, ElementRef, inject, NgModuleRef, ViewContainerRef, ViewRef } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

/** Object on which cleanup callbacks can be registered */
interface DestructorScope {
  /**
   * Register a callback to perform cleanup during scope destruction
   * @param cb Cleanup callback
   */
  onDestroy(cb: () => void): void;
}

/**
 * Subject that automatically registers a cleanup function on a scope
 * During cleanup the subject will emit a single void value and then complete
 */
class ScopedDestroySubject extends ReplaySubject<void> {
  /**
   * Create a new subject that automatically registers cleanup
   * @param scope Scope which to link the new subject
   */
  constructor(scope: DestructorScope) {
    super(1);

    scope.onDestroy(() => {
      this.next();
      this.complete();
    });
  }
}

/** Empty host component */
@Component({
  selector: 'hra-on-destroy-host',
  standalone: true,
  template: '',
  styles: [':host { display: block; }'],
})
class OnDestroyHostComponent {
  /** Creates a new component instance that immediately removes its own DOM element */
  constructor() {
    const el = inject(ElementRef).nativeElement as HTMLElement | null;
    el?.remove();
  }
}

/** OnDestroy observables index by their owning scope */
const scopedSubjects = new WeakMap<DestructorScope, Observable<void>>();

/**
 * Tries to find and return an existing observable associated with a scope
 * @param scope Owning scope
 * @returns The observable if found, else undefined
 */
function findScopedSubject(scope: DestructorScope): Observable<void> | undefined {
  return scopedSubjects.get(scope);
}

/**
 * Tries to find an existing observable for the scope
 * If not found a new observable is created and associated with the scope
 * @param scope Owning scope
 * @returns The existing or new observable
 */
function findOrCreateScopedSubject(scope: DestructorScope): Observable<void> {
  let result = scopedSubjects.get(scope);
  if (!result) {
    result = new ScopedDestroySubject(scope).asObservable();
    scopedSubjects.set(scope, result);
  }

  return result;
}

/**
 * Tries to find an existing observable associated with a view container by searching all owned views
 * @param ref View container to search
 * @returns An observable if found, else undefined
 */
function findScopedSubjectInView(ref: ViewContainerRef): Observable<void> | undefined {
  for (let index = 0, length = ref.length; index < length; index++) {
    const result = findScopedSubject(ref.get(index) as ViewRef);
    if (result) {
      return result;
    }
  }

  return undefined;
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
export function injectOnDestroy(): Observable<void> {
  const ref = inject(ViewContainerRef, { optional: true });
  if (!ref) {
    return findOrCreateScopedSubject(inject(NgModuleRef));
  }

  const result = findScopedSubjectInView(ref);
  if (result) {
    return result;
  }

  const component = ref.createComponent(OnDestroyHostComponent);
  return findOrCreateScopedSubject(component.hostView);
}
