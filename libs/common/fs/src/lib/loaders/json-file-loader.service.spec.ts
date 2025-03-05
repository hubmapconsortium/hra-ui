import { HttpEventType, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { mock } from 'jest-mock-extended';
import { Observable, firstValueFrom, toArray } from 'rxjs';
import { FileLoaderEvent } from './file-loader';
import { JsonFileLoaderService } from './json-file-loader.service';

describe('JsonFileLoaderService', () => {
  const url = 'https://example.com';
  const data = { a: 1, b: 2 };
  const serializedData = JSON.stringify(data);
  const size = serializedData.length;

  async function getEvents<T>(source: Observable<FileLoaderEvent<T>>): Promise<FileLoaderEvent<T>[]> {
    return firstValueFrom(source.pipe(toArray()));
  }

  it('loads a local file', async () => {
    const file = mock<File>({
      size: serializedData.length,
      text: () => Promise.resolve(serializedData),
    });
    const service = TestBed.inject(JsonFileLoaderService);
    const result$ = service.load(file, {});
    const events = await getEvents(result$);

    expect(events).toEqual([
      {
        type: 'progress',
        loaded: 0,
        total: file.size,
      },
      {
        type: 'progress',
        loaded: file.size,
        total: file.size,
      },
      {
        type: 'data',
        data: data,
      },
    ]);
  });

  it('loads from an url', async () => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    const service = TestBed.inject(JsonFileLoaderService);
    const result$ = service.load(url, {});
    const eventsPromise = getEvents(result$);
    const http = TestBed.inject(HttpTestingController);
    const request = http.expectOne(url);

    request.event({
      type: HttpEventType.DownloadProgress,
      loaded: size,
      total: size,
    });
    request.event({
      type: HttpEventType.User,
    });
    request.flush(data);

    expect(await eventsPromise).toEqual([
      {
        type: 'progress',
        loaded: 0,
      },
      {
        type: 'progress',
        loaded: size,
        total: size,
      },
      {
        type: 'data',
        data: data,
      },
    ]);
  });

  it('throws an error if HttpClient in not available', async () => {
    const service = TestBed.inject(JsonFileLoaderService);
    const result$ = service.load(url, {});
    expect(getEvents(result$)).rejects.toThrow(/HttpClient/);
  });

  it("throws if the response can't be parsed", async () => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    const service = TestBed.inject(JsonFileLoaderService);
    const result$ = service.load(url, {});
    const eventsPromise = getEvents(result$);
    const http = TestBed.inject(HttpTestingController);
    const request = http.expectOne(url);

    request.flush(null);
    expect(eventsPromise).rejects.toThrow(/parse/);
  });
});
