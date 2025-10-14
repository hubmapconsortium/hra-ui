import * as i0 from '@angular/core';
import { Injectable, inject, ErrorHandler } from '@angular/core';
import { LocalChunkSize, RemoteChunkSize, parse } from 'papaparse';
import { defer, Subject, from, map, concatMap, of, startWith, filter } from 'rxjs';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

/** Appends items to an array */
function arrayAppend(array, items) {
    for (const item of items) {
        array.push(item);
    }
}
/** Service for loading CSV files */
class CsvFileLoaderService {
    /** Loads a CSV file and returns an observable of the loader events */
    load(file, options) {
        return defer(() => this.loadImpl(file, options));
    }
    /** Implementation of the CSV file loading logic */
    loadImpl(file, options) {
        const isLocalFile = typeof file === 'object';
        const fileSize = isLocalFile ? file.size : undefined;
        const defaultChunkSize = isLocalFile ? LocalChunkSize : RemoteChunkSize;
        const { collect = true, errorTolerance = false, papaparse = {} } = options;
        const { chunkSize = defaultChunkSize } = papaparse;
        const data = [];
        const errors = [];
        const subject = new Subject();
        let chunkProcessed = 0;
        parse(file, {
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
                }
                else {
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
        });
        return subject;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: CsvFileLoaderService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: CsvFileLoaderService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: CsvFileLoaderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

/** Service for loading JSON files, either locally or remotely */
class JsonFileLoaderService {
    /** Reference to the HTTP client */
    http = inject(HttpClient, { optional: true });
    /** Loads a JSON file and returns an observable of file loader events */
    load(file) {
        return defer(() => this.loadImpl(file));
    }
    /** Implementation of the load method, handling local and remote files */
    loadImpl(file) {
        if (typeof file === 'object') {
            return this.loadLocalFile(file);
        }
        return this.loadRemoteFile(file);
    }
    /** Loads a local JSON file and emits progress and data events */
    loadLocalFile(file) {
        const fileSize = file.size;
        const progressStart = {
            type: 'progress',
            loaded: 0,
            total: fileSize,
        };
        const progressEnd = {
            type: 'progress',
            loaded: fileSize,
            total: fileSize,
        };
        return from(file.text()).pipe(map((text) => ({ type: 'data', data: JSON.parse(text) })), concatMap((dataEvent) => of(progressEnd, dataEvent)), startWith(progressStart));
    }
    /** Loads a remote JSON file and emits progress and data events */
    loadRemoteFile(file) {
        const { http } = this;
        if (!http) {
            throw new Error('HttpClient is required to load remote json files');
        }
        const event$ = http.get(file, {
            responseType: 'json',
            observe: 'events',
        });
        return event$.pipe(map((event) => this.httpEventToFileLoaderEvent(event)), filter((event) => event !== undefined));
    }
    /** Converts HTTP events to file loader events */
    httpEventToFileLoaderEvent(event) {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: JsonFileLoaderService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: JsonFileLoaderService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: JsonFileLoaderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

/** Service for downloading the files using fetch */
class FileDownloadService {
    document = inject(DOCUMENT);
    errorHandler = inject(ErrorHandler);
    /** Creates a file like object and downloads it */
    async download(url, filename = this.getFilename(url)) {
        let blobUrl;
        try {
            const response = await fetch(url, {
                headers: new Headers({
                    Origin: location.origin,
                }),
                mode: 'cors',
            });
            const data = await response.blob();
            blobUrl = URL.createObjectURL(data);
            this.createDownloadEl(blobUrl, filename);
        }
        catch (error) {
            this.errorHandler.handleError(error);
        }
        finally {
            if (blobUrl) {
                URL.revokeObjectURL(blobUrl);
            }
        }
    }
    /** Returns the file name from the URL */
    getFilename(url) {
        return url.split('\\').pop()?.split('/').pop() ?? '';
    }
    /** Constructs an anchor element to download the file */
    createDownloadEl(blobUrl, filename) {
        const el = this.document.createElement('a');
        el.href = blobUrl;
        el.download = filename;
        this.document.body.appendChild(el);
        el.click();
        el.remove();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: FileDownloadService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: FileDownloadService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: FileDownloadService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { CsvFileLoaderService, FileDownloadService, JsonFileLoaderService };
//# sourceMappingURL=hra-ui-common-fs.mjs.map
