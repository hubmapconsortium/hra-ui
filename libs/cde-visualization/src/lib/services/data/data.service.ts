import { Location } from '@angular/common';
import { Injectable, Injector, Signal, Type, inject, runInInjectionContext } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Observable, filter, map, of, switchAll, takeLast } from 'rxjs';
import { FileLoader, FileLoaderDataEvent, FileLoaderOptions } from '../file-loader/file-loader';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly location = inject(Location);

  load<T, const LoaderT extends Type<FileLoader<T, unknown>>>(
    source: Signal<string | T | undefined>,
    initialValue: T,
    loaderToken: LoaderT,
    loaderOptions: FileLoaderOptions<InstanceType<LoaderT>>,
    options?: { injector?: Injector; rejectErrors?: boolean },
  ): Signal<T> {
    const injector = options?.injector ?? inject(Injector, { optional: true });
    if (!injector) {
      throw new Error('loadData must be run in an injection context');
    }

    return runInInjectionContext(injector, () => {
      const loader = inject<InstanceType<LoaderT>>(loaderToken);
      const load = (sourceValue: string | T | undefined): Observable<T> => {
        if (typeof sourceValue !== 'string') {
          return of(sourceValue ?? initialValue);
        }

        if (!sourceValue.startsWith('http')) {
          sourceValue = this.location.prepareExternalUrl(sourceValue);
        }

        return loader.load(sourceValue, loaderOptions).pipe(
          filter((event): event is FileLoaderDataEvent<T> => event.type === 'data'),
          takeLast(1),
          map((event) => event.data),
        );
      };

      const source$ = toObservable(source);
      const data$ = source$.pipe(map(load), switchAll());
      return toSignal(data$, { initialValue, rejectErrors: options?.rejectErrors ?? true });
    });
  }
}
