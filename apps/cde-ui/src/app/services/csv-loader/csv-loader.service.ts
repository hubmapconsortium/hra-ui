import { Injectable, WritableSignal, signal } from '@angular/core';
import { LocalChunkSize, ParseLocalConfig, parse } from 'papaparse';
import { FileLoader, FileLoaderOptions } from '../../components/file-upload/file-upload.component';

/** Csv row object */
export type CsvObject = Record<string, string | number | boolean>;
/** Non-overridable options always provided by the service */
type ReservedParseOptions = 'worker' | 'chunk' | 'complete' | 'error' | 'transform';

/** Factory options */
export type CsvLoaderOptions<T> = Omit<ParseLocalConfig, ReservedParseOptions> & {
  transformItem?: (item: CsvObject) => T;
};

/** Factory service for creating csv loaders */
@Injectable({
  providedIn: 'root',
})
export class CsvLoaderService {
  /**
   * Creates a new csv file loader
   *
   * @param options Loader options
   * @returns A function for loading csv files
   */
  createLoader<T>(options?: CsvLoaderOptions<T>): FileLoader<T[]> {
    return (file, opts) => {
      const progress = signal(0);
      return {
        progress,
        result: this.load(file, progress, options ?? {}, opts),
      };
    };
  }

  /**
   * Loads a csv file
   *
   * @param file File to load
   * @param progress Progress events signal
   * @param options Loader options
   * @param opts File loader options
   * @returns A promise that resolves to the loaded file data
   */
  load<T>(
    file: File,
    progress: WritableSignal<number>,
    options: CsvLoaderOptions<T>,
    opts: FileLoaderOptions,
  ): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const chunkSize = options.chunkSize ?? LocalChunkSize;
      const size = file.size;
      const abortSignal = opts.signal;
      const transformItem = options.transformItem;
      const result: T[] = [];
      let current = 0;

      delete options.transformItem;

      parse<CsvObject>(file, {
        header: true,
        skipEmptyLines: 'greedy',
        ...options,
        worker: true,
        chunk({ data, errors }, parser) {
          if (errors.length > 0 || abortSignal.aborted) {
            reject(errors);
            parser.abort();
            return;
          }

          for (const item of data) {
            result.push(transformItem ? transformItem(item) : (item as T));
          }

          current += chunkSize;
          progress.set(Math.min(current, size) / size);
        },
        complete() {
          resolve(result);
        },
        error(error) {
          reject(error);
        },
      });
    });
  }
}
