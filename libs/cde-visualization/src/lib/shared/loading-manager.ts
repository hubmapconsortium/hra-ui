import { BehaviorSubject, combineLatest, distinctUntilChanged, map, Observer, switchMap } from 'rxjs';

/**
 * Manages loading states across multiple asynchronous operations.
 */
export class LoadingManager {
  /** A BehaviorSubject holding an array of BehaviorSubjects representing individual loading states */
  private readonly observers$ = new BehaviorSubject<BehaviorSubject<boolean>[]>([]);

  /** An observable that emits a boolean indicating if any of the observers are in a loading state */
  readonly isLoading$ = this.observers$.pipe(
    switchMap((sources) => combineLatest(sources)),
    map((values) => values.some((value) => value)),
    distinctUntilChanged(),
  );

  /**
   * Creates a new observer for tracking the loading state of an asynchronous operation.
   * @returns An Observer<boolean> that can be used to update the loading state.
   */
  createObserver(): Observer<boolean> {
    const observers = this.observers$.getValue();
    const observer = new BehaviorSubject(false);
    this.observers$.next([...observers, observer]);
    return observer;
  }
}
