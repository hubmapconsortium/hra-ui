import { BehaviorSubject, combineLatest, distinctUntilChanged, map, Observer, switchMap } from 'rxjs';

export class LoadingManager {
  private readonly observers$ = new BehaviorSubject<BehaviorSubject<boolean>[]>([]);
  readonly isLoading$ = this.observers$.pipe(
    switchMap((sources) => combineLatest(sources)),
    map((values) => values.some((value) => value)),
    distinctUntilChanged(),
  );

  createObserver(): Observer<boolean> {
    const observers = this.observers$.getValue();
    const observer = new BehaviorSubject(false);
    this.observers$.next([...observers, observer]);
    return observer;
  }
}
