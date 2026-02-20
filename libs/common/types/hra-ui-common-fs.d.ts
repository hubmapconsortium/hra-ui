import { ParseLocalConfig, ParseRemoteConfig } from 'papaparse';
import { Observable } from 'rxjs';
import * as i0 from '@angular/core';

/** Event type for data loading, containing the loaded data */
interface FileLoaderDataEvent<DataT> {
    /** Indicates this is a data event */
    type: 'data';
    /** The loaded data of type DataT */
    data: DataT;
}
/** Event type for progress updates during file loading */
interface FileLoaderProgressEvent {
    /** Indicates this is a progress event */
    type: 'progress';
    /** Number of bytes loaded */
    loaded: number;
    /** Total number of bytes */
    total?: number;
}
/** Union type for file loader events, can be either data or progress */
type FileLoaderEvent<DataT> = FileLoaderDataEvent<DataT> | FileLoaderProgressEvent;
/** Extracts options type from a FileLoader based on the provided LoaderT */
type FileLoaderOptions<LoaderT> = LoaderT extends FileLoader<unknown, infer OptionsT> ? OptionsT : never;
/** Interface for file loader that defines the load method */
interface FileLoader<DataT, OptionsT> {
    /** Loads a file and returns an observable of file loader events */
    load(file: string | File, options: OptionsT): Observable<FileLoaderEvent<DataT>>;
}

/** Any function type */
type AnyFunction = (...args: any[]) => any;
/** Configuration keys that are either overridden or functions that can't be sent to a worker */
type ReservedPapaparseConfigKeys = 'transformHeader' | 'transform' | 'dynamicTyping' | 'worker' | 'download' | 'beforeFirstChunk' | 'step' | 'chunk' | 'complete' | 'error';
/** Properties picked from remote configuration */
type RemoteRequestKeys = 'downloadRequestHeaders' | 'downloadRequestBody' | 'withCredentials';
/** Dynamic typing option but without the ability to pass a function */
type DynamicTyping = {
    dynamicTyping?: Exclude<ParseLocalConfig['dynamicTyping'], AnyFunction>;
};
/** Additional options for loading from URLs */
type RemoteRequest = Pick<ParseRemoteConfig, RemoteRequestKeys>;
/** Accepted papaparse configuration subset */
type PapaparseConfig = Omit<ParseLocalConfig, ReservedPapaparseConfigKeys> & DynamicTyping & RemoteRequest;
/** Csv file loader options */
interface CsvFileLoaderOptions {
    /** Whether to collect the results into a single data event or emit multiple events */
    collect?: boolean;
    /** Number of parsing errors that can happen before the load aborts */
    errorTolerance?: false | number;
    /** Additional papaparse configuration */
    papaparse?: PapaparseConfig;
}
/** Service for loading CSV files */
declare class CsvFileLoaderService<DataT> implements FileLoader<DataT[], CsvFileLoaderOptions> {
    /** Loads a CSV file and returns an observable of the loader events */
    load(file: string | File, options: CsvFileLoaderOptions): Observable<FileLoaderEvent<DataT[]>>;
    /** Implementation of the CSV file loading logic */
    private loadImpl;
    static ɵfac: i0.ɵɵFactoryDeclaration<CsvFileLoaderService<any>, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CsvFileLoaderService<any>>;
}

/** Options for loading JSON files */
type JsonFileLoaderOptions = Record<string, never>;
/** Service for loading JSON files, either locally or remotely */
declare class JsonFileLoaderService<DataT> implements FileLoader<DataT, JsonFileLoaderOptions> {
    /** Reference to the HTTP client */
    private readonly http;
    /** Loads a JSON file and returns an observable of file loader events */
    load(file: string | File): Observable<FileLoaderEvent<DataT>>;
    /** Implementation of the load method, handling local and remote files */
    private loadImpl;
    /** Loads a local JSON file and emits progress and data events */
    private loadLocalFile;
    /** Loads a remote JSON file and emits progress and data events */
    private loadRemoteFile;
    /** Converts HTTP events to file loader events */
    private httpEventToFileLoaderEvent;
    static ɵfac: i0.ɵɵFactoryDeclaration<JsonFileLoaderService<any>, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<JsonFileLoaderService<any>>;
}

/** Service for downloading the files using fetch */
declare class FileDownloadService {
    private readonly document;
    private readonly errorHandler;
    /** Creates a file like object and downloads it */
    download(url: string, filename?: string): Promise<void>;
    /** Returns the file name from the URL */
    private getFilename;
    /** Constructs an anchor element to download the file */
    private createDownloadEl;
    static ɵfac: i0.ɵɵFactoryDeclaration<FileDownloadService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FileDownloadService>;
}

export { CsvFileLoaderService, FileDownloadService, JsonFileLoaderService };
export type { CsvFileLoaderOptions, FileLoader, FileLoaderDataEvent, FileLoaderEvent, FileLoaderOptions, FileLoaderProgressEvent, JsonFileLoaderOptions, PapaparseConfig };
