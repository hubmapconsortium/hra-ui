import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, concatMap, defer, filter, from, map, of, startWith } from 'rxjs';
import { FileLoader, FileLoaderEvent, FileLoaderProgressEvent } from './file-loader';

/** Options for loading JSON files */
export type JsonFileLoaderOptions = Record<string, never>;

/** Service for loading JSON files, either locally or remotely */
@Injectable({
  providedIn: 'root',
})
export class JsonFileLoaderService<DataT> implements FileLoader<DataT, JsonFileLoaderOptions> {
  /** Reference to the HTTP client */
  private readonly http = inject(HttpClient, { optional: true });

  /** Loads a JSON file and returns an observable of file loader events */
  load(file: string | File, options: JsonFileLoaderOptions): Observable<FileLoaderEvent<DataT>> {
    return defer(() => this.loadImpl(file, options));
  }

  /** Implementation of the load method, handling local and remote files */
  private loadImpl(file: string | File, _options: JsonFileLoaderOptions): Observable<FileLoaderEvent<DataT>> {
    if (typeof file === 'object') {
      return this.loadLocalFile(file);
    } else {
      return this.loadRemoteFile(file);
    }
  }

  /** Loads a local JSON file and emits progress and data events */
  private loadLocalFile(file: File): Observable<FileLoaderEvent<DataT>> {
    const fileSize = file.size;
    const progressStart: FileLoaderProgressEvent = {
      type: 'progress',
      loaded: 0,
      total: fileSize,
    };
    const progressEnd: FileLoaderProgressEvent = {
      type: 'progress',
      loaded: fileSize,
      total: fileSize,
    };

    return from(file.text()).pipe(
      map((text): FileLoaderEvent<DataT> => ({ type: 'data', data: JSON.parse(text) })),
      concatMap((dataEvent) => of(progressEnd, dataEvent)),
      startWith(progressStart),
    );
  }

  /** Loads a remote JSON file and emits progress and data events */
  private loadRemoteFile(file: string): Observable<FileLoaderEvent<DataT>> {
    const { http } = this;
    if (!http) {
      throw new Error('HttpClient is required to load remote json files');
    }

    const event$ = http.get<DataT>(file, {
      responseType: 'json',
      observe: 'events',
    });

    return event$.pipe(
      map((event) => this.httpEventToFileLoaderEvent(event)),
      filter((event): event is FileLoaderEvent<DataT> => event !== undefined),
    );
  }

  /** Converts HTTP events to file loader events */
  private httpEventToFileLoaderEvent(event: HttpEvent<DataT>): FileLoaderEvent<DataT> | undefined {
    switch (event.type) {
      case HttpEventType.Sent:
        return { type: 'progress', loaded: 0 };

      case HttpEventType.DownloadProgress:
        return { type: 'progress', loaded: event.loaded, total: event.total };

      case HttpEventType.Response:
        if (!event.body) {
          throw new Error('Could not parse response as json');
        }
        return { type: 'data', data: event.body };

      default:
        return undefined;
    }
  }
}
