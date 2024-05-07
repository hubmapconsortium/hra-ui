import { Injectable, WritableSignal, signal } from '@angular/core';
import { LocalChunkSize, ParseLocalConfig, parse } from 'papaparse';
import { FileLoader, FileLoaderOptions } from '../../components/file-upload/file-upload.component';

export type CsvObject = Record<string, string | number | boolean>;
type ReservedParseOptions = 'worker' | 'chunk' | 'complete' | 'error' | 'transform';
export type CsvLoaderOptions<T> = Omit<ParseLocalConfig, ReservedParseOptions> & {
  transformItem?: (item: CsvObject) => T;
};

@Injectable({
  providedIn: 'root',
})
export class CsvLoaderService {
  createLoader<T>(options?: CsvLoaderOptions<T>): FileLoader<T[]> {
    return (file, opts) => {
      const progress = signal(0);
      return {
        progress,
        result: this.load(file, progress, options ?? {}, opts),
      };
    };
  }

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
