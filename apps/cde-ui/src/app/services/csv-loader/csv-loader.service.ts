import { Injectable, WritableSignal, signal } from '@angular/core';
import { LocalChunkSize, ParseLocalConfig, parse } from 'papaparse';
import { FileLoader, FileLoaderOptions } from '../../components/file-upload/file-upload.component';

type ReservedParseOptions = 'worker' | 'chunk' | 'complete' | 'error';
export type CsvLoaderOptions = Omit<ParseLocalConfig, ReservedParseOptions>;

@Injectable({
  providedIn: 'root',
})
export class CsvLoaderService {
  createLoader<T>(options?: CsvLoaderOptions): FileLoader<T[]> {
    return (file, opts) => {
      const progress = signal(0);
      return {
        progress,
        result: this.load(file, progress, { ...options, ...opts }),
      };
    };
  }

  load<T>(file: File, progress: WritableSignal<number>, options: CsvLoaderOptions & FileLoaderOptions): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const chunkSize = options.chunkSize ?? LocalChunkSize;
      const size = file.size;
      const abortSignal = options.signal;
      const result: T[] = [];
      let current = 0;

      // Remove signal since it cannot be copied to a worker
      delete (options as Partial<FileLoaderOptions>).signal;

      parse<T>(file, {
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
            result.push(item);
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
