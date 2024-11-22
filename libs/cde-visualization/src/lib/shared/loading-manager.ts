import { BehaviorSubject, combineLatest, distinctUntilChanged, map, Observer, switchMap } from 'rxjs';

export class LoadingManager {
  private readonly sources$ = new BehaviorSubject<BehaviorSubject<boolean>[]>([]);
  readonly isLoading$ = this.sources$.pipe(
    switchMap((sources) => combineLatest(sources)),
    map((values) => values.some((value) => value)),
    distinctUntilChanged(),
  );

  createSource(): Observer<boolean> {
    const sources = this.sources$.getValue();
    const source = new BehaviorSubject(false);
    this.sources$.next([...sources, source]);
    return source;
  }
}
