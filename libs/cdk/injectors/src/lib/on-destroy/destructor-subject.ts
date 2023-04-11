import { ReplaySubject } from 'rxjs';

/** Object on which cleanup functions can be registered */
export interface DestructorScope {
  /**
   * Register a cleanup function
   * @param cb Cleanup callback function
   */
  onDestroy(cb: () => void): void;
}

/**
 * Determines whether an object is destructor scope like
 * @param obj Value to test
 * @returns true if the object seems to be a destructor scope, otherwise false
 */
export function isDestructorScopeLike(obj: unknown): obj is DestructorScope {
  const isObject = typeof obj === 'object' && obj !== null;
  return isObject && 'onDestroy' in obj && typeof obj.onDestroy === 'function';
}

/**
 * A subject type that is associated with a destructor scope.
 * When the cleanup function is run the subject emits a single
 * undefined value and immediately completes
 */
export class ScopedDestructorSubject extends ReplaySubject<void> {
  /**
   * Creates a new subject and attaches cleanup to the destructor scope
   * @param scope Associated scope
   */
  constructor(scope: DestructorScope) {
    super(1);

    scope.onDestroy(() => {
      this.next();
      this.complete();
    });
  }
}
