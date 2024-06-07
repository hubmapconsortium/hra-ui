import { Injectable } from '@angular/core';
import { LocalChunkSize, ParseError, ParseLocalConfig, ParseRemoteConfig, RemoteChunkSize, parse } from 'papaparse';
import { Observable, Subject, defer } from 'rxjs';
import { FileLoader, FileLoaderEvent } from './file-loader';

/** Any function type */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any;

/** Configuration keys that are either overridden or functions that can't be sent to a worker */
type ReservedPapaparseConfigKeys =
  | 'transformHeader'
  | 'transform'
  | 'dynamicTyping'
  | 'worker'
  | 'download'
  | 'beforeFirstChunk'
  | 'step'
  | 'chunk'
  | 'complete'
  | 'error';

/** Properties picked from remote configuration */
type RemoteRequestKeys = 'downloadRequestHeaders' | 'downloadRequestBody' | 'withCredentials';

/** Dynamic typing option but without the ability to pass a function */
type DynamicTyping = { dynamicTyping?: Exclude<ParseLocalConfig['dynamicTyping'], AnyFunction> };

/** Additional options for loading from urls */
type RemoteRequest = Pick<ParseRemoteConfig, RemoteRequestKeys>;

/** Accepted papaparse configuration subset */
export type PapaparseConfig = Omit<ParseLocalConfig, ReservedPapaparseConfigKeys> & DynamicTyping & RemoteRequest;

/** Csv file loader options */
export interface CsvFileLoaderOptions {
  /** Whether to collect the results into a single data event or emit multiple events */
  collect?: boolean;
  /** Number of parsing errors that can happend before the load aborts */
  errorTolerance?: false | number;
  /** Additional papaparse configuration */
  papaparse?: PapaparseConfig;
}

function arrayAppend<T>(array: T[], items: T[]): void {
  for (const item of items) {
    array.push(item);
  }
}

@Injectable({
  providedIn: 'root',
})
export class CsvFileLoaderService<DataT> implements FileLoader<DataT[], CsvFileLoaderOptions> {
  load(file: string | File, options: CsvFileLoaderOptions): Observable<FileLoaderEvent<DataT[]>> {
    return defer(() => this.loadImpl(file, options));
  }

  private loadImpl(file: string | File, options: CsvFileLoaderOptions): Observable<FileLoaderEvent<DataT[]>> {
    const isLocalFile = typeof file === 'object';
    const fileSize = isLocalFile ? file.size : undefined;
    const defaultChunkSize = isLocalFile ? LocalChunkSize : RemoteChunkSize;
    const { collect = true, errorTolerance = false, papaparse = {} } = options;
    const { chunkSize = defaultChunkSize } = papaparse;
    const data: DataT[] = [];
    const errors: ParseError[] = [];
    const subject = new Subject<FileLoaderEvent<DataT[]>>();
    let chunkProcessed = 0;

    parse(
      file as never,
      {
        skipEmptyLines: 'greedy',
        ...papaparse,
        worker: true,
        download: !isLocalFile,
        chunk(results, parser) {
          if (!subject.observed) {
            parser.abort();
            return;
          }

          if (errorTolerance !== false) {
            arrayAppend(errors, results.errors);
            if (errors.length > errorTolerance) {
              subject.error(errors);
              parser.abort();
              return;
            }
          }

          chunkProcessed += 1;
          subject.next({
            type: 'progress',
            loaded: Math.min(chunkProcessed * chunkSize, fileSize ?? Infinity),
            total: fileSize,
          });

          if (collect) {
            arrayAppend(data, results.data);
          } else {
            subject.next({ type: 'data', data: results.data });
          }
        },
        complete() {
          if (collect) {
            subject.next({ type: 'data', data });
          }
          subject.complete();
        },
        error(error) {
          subject.error(error);
        },
      } as ParseLocalConfig<DataT>,
    );

    return subject;
  }
}
