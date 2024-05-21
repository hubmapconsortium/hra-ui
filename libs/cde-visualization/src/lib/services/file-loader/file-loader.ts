import { Observable } from 'rxjs';

export interface FileLoaderDataEvent<DataT> {
  type: 'data';
  data: DataT;
}

export interface FileLoaderProgressEvent {
  type: 'progress';
  loaded: number;
  total?: number;
}

export type FileLoaderEvent<DataT> = FileLoaderDataEvent<DataT> | FileLoaderProgressEvent;

export type FileLoaderOptions<LoaderT> = LoaderT extends FileLoader<unknown, infer OptionsT> ? OptionsT : never;

export interface FileLoader<DataT, OptionsT> {
  load(file: string | File, options: OptionsT): Observable<FileLoaderEvent<DataT>>;
}
