import { MaybeAsync } from '@angular/router';
import { Observable, from, isObservable, of } from 'rxjs';

/** Converts different types of inputs into an observable */
export function maybeAsyncToObservable<T>(source: MaybeAsync<T>): Observable<T> {
  if (isObservable(source)) {
    return source;
  } else if (source instanceof Promise) {
    return from(source);
  }
  return of(source);
}
