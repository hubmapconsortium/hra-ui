import { Injectable, Injector, Signal, Type, inject, runInInjectionContext } from '@angular/core';
import { ToSignalOptions, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Observable, filter, map, of, switchAll, takeLast } from 'rxjs';
import { createAbsoluteUrl } from '../../shared/url-normalization';
import { FileLoader, FileLoaderDataEvent, FileLoaderOptions } from '../file-loader/file-loader';

/** Service for loading data using specified loaders */
@Injectable({
  providedIn: 'root',
})
export class DataLoaderService {
  /**
   * Loads data from a source using a specified loader
   * @param source - Signal containing the source URL or data
   * @param initialValue - The initial value to use if the source is undefined
   * @param loaderToken - The token for the loader to use
   * @param loaderOptions - Options to configure the loader
   * @param options - Additional options for signal creation
   * @returns A signal containing the loaded data
   */
  load<T, const LoaderT extends Type<FileLoader<T, unknown>>>(
    source: Signal<string | T | undefined>,
    initialValue: T,
    loaderToken: LoaderT,
    loaderOptions: FileLoaderOptions<InstanceType<LoaderT>>,
    options?: Omit<ToSignalOptions<T>, 'initialValue'>,
  ): Signal<T> {
    const injector = options?.injector ?? inject(Injector);
    return runInInjectionContext(injector, () => {
      const loader = inject<InstanceType<LoaderT>>(loaderToken);
      const load = (sourceValue: string | T | undefined): Observable<T> => {
        try {
          if (typeof sourceValue === 'string') {
            sourceValue = JSON.parse(sourceValue);
          }
        } catch {
          // Ignore errors
        }

        if (typeof sourceValue !== 'string') {
          return of(sourceValue ?? initialValue);
        }

        return loader.load(createAbsoluteUrl(sourceValue, { injector }), loaderOptions).pipe(
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
