import { ErrorObserver, NextObserver } from 'rxjs';

/** Object indicating that no error has been emitted */
const NO_ERROR_SENTINEL_OBJ = {};

/** Observer storing the latest value from a snapshot stream */
export class SnapshotObserver<T> implements NextObserver<T>, ErrorObserver<T> {
  /** The latest value */
  private value?: T = undefined;
  /** An error value if not equal to `NO_ERROR_SENTINEL` */
  private errorValue: unknown = NO_ERROR_SENTINEL_OBJ;

  /**
   * Gets the latest value or throw on errors
   * @returns The latest value
   * @throws If an error has been emitted
   */
  get(): T {
    if (this.errorValue !== NO_ERROR_SENTINEL_OBJ) {
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
  }

  /**
   * Handles error emits
   * @param err The error value
   */
  error(err: unknown): void {
    this.value = undefined;
    this.errorValue = err;
  }
}
