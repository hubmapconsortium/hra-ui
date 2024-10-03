import { Observable } from 'rxjs';

/** Event type for data loading, containing the loaded data */
export interface FileLoaderDataEvent<DataT> {
  /** Indicates this is a data event */
  type: 'data';
  /** The loaded data of type DataT */
  data: DataT;
}

/** Event type for progress updates during file loading */
export interface FileLoaderProgressEvent {
  /** Indicates this is a progress event */
  type: 'progress';
  /** Number of bytes loaded */
  loaded: number;
  /** Total number of bytes */
  total?: number;
}

/** Union type for file loader events, can be either data or progress */
export type FileLoaderEvent<DataT> = FileLoaderDataEvent<DataT> | FileLoaderProgressEvent;

/** Extracts options type from a FileLoader based on the provided LoaderT */
export type FileLoaderOptions<LoaderT> = LoaderT extends FileLoader<unknown, infer OptionsT> ? OptionsT : never;

/** Interface for file loader that defines the load method */
export interface FileLoader<DataT, OptionsT> {
  /** Loads a file and returns an observable of file loader events */
  load(file: string | File, options: OptionsT): Observable<FileLoaderEvent<DataT>>;
}
