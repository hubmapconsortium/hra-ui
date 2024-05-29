import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, concatMap, defer, filter, from, map, of, startWith } from 'rxjs';
import { FileLoader, FileLoaderEvent, FileLoaderProgressEvent } from './file-loader';

export type JsonFileLoaderOptions = Record<string, never>;

@Injectable({
  providedIn: 'root',
})
export class JsonFileLoaderService<DataT> implements FileLoader<DataT, JsonFileLoaderOptions> {
  private readonly http = inject(HttpClient, { optional: true });

  load(file: string | File, options: JsonFileLoaderOptions): Observable<FileLoaderEvent<DataT>> {
    return defer(() => this.loadImpl(file, options));
  }

  private loadImpl(file: string | File, _options: JsonFileLoaderOptions): Observable<FileLoaderEvent<DataT>> {
    if (typeof file === 'object') {
      return this.loadLocalFile(file);
    } else {
      return this.loadRemoteFile(file);
    }
  }

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
