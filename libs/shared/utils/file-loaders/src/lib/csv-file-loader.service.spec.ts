import { TestBed } from '@angular/core/testing';
import { mock } from 'jest-mock-extended';
import { ParseError, ParseLocalConfig, ParseMeta, ParseResult, Parser, parse } from 'papaparse';
import { Observable, firstValueFrom, toArray } from 'rxjs';
import { CsvFileLoaderService } from './csv-file-loader.service';
import { FileLoaderEvent } from './file-loader';

jest.mock('papaparse', () => ({
  parse: jest.fn(),
  LocalChunkSize: 100,
  RemoteChunkSize: 200,
}));

describe('CsvFileLoaderService', () => {
  const url = 'https://example.com';
  const data = [
    { a: 1, b: 2 },
    { a: 2, b: 3 },
  ];
  const meta: ParseMeta = {
    aborted: false,
    cursor: 0,
    delimiter: ',',
    linebreak: '\n',
    truncated: false,
  };
  const chunkResult: ParseResult<unknown> = {
    data,
    meta,
    errors: [],
  };
  const completeResult: ParseResult<unknown> = {
    data: [],
    errors: [],
    meta,
  };
  const dataEvent: FileLoaderEvent<unknown> = {
    type: 'data',
    data: data,
  };
  const parser = mock<Parser>();
  let service: CsvFileLoaderService<unknown>;

  async function getEvents<T>(source: Observable<FileLoaderEvent<T>>): Promise<FileLoaderEvent<T>[]> {
    return firstValueFrom(source.pipe(toArray()));
  }

  function getConfig(): ParseLocalConfig {
    return jest.mocked(parse).mock.calls[0][1] as ParseLocalConfig;
  }

  beforeEach(() => {
    service = TestBed.inject(CsvFileLoaderService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('loads a local file', async () => {
    const file = { size: 20 } as File;
    const result$ = service.load(file, {});
    const eventsPromise = getEvents(result$);
    expect(parse).toHaveBeenCalledWith(file, expect.anything());

    const config = getConfig();
    config.chunk?.(chunkResult, parser);
    config.complete?.(completeResult, undefined);

    expect(await eventsPromise).toEqual([
      {
        type: 'progress',
        loaded: 20,
        total: 20,
      },
      dataEvent,
    ]);
  });

  it('loads a remote file', async () => {
    const result$ = service.load(url, {});
    const eventsPromise = getEvents(result$);
    expect(parse).toHaveBeenCalledWith(url, expect.anything());

    const config = getConfig();
    config.chunk?.(chunkResult, parser);
    config.complete?.(completeResult, undefined);

    expect(await eventsPromise).toEqual([
      {
        type: 'progress',
        loaded: 200,
      },
      dataEvent,
    ]);
  });

  it('emits multiple data events when not in collect mode', async () => {
    const result$ = service.load(url, { collect: false });
    const eventsPromise = getEvents(result$);
    expect(parse).toHaveBeenCalledWith(url, expect.anything());

    const config = getConfig();
    config.chunk?.(chunkResult, parser);
    config.chunk?.(chunkResult, parser);
    config.complete?.(completeResult, undefined);

    expect(await eventsPromise).toEqual([
      {
        type: 'progress',
        loaded: 200,
      },
      dataEvent,
      {
        type: 'progress',
        loaded: 400,
      },
      dataEvent,
    ]);
  });

  it('aborts the loading when there are no observers', async () => {
    const result$ = service.load(url, {});
    result$.subscribe().unsubscribe();

    const config = getConfig();
    config.chunk?.(chunkResult, parser);
    expect(parser.abort).toHaveBeenCalled();
  });

  it('aborts the loading when there are too many errors', async () => {
    const errors: ParseError[] = [{ code: 'TooFewFields', message: '', type: 'FieldMismatch' }];
    const result$ = service.load(url, { errorTolerance: 0 });
    const eventsPromise = getEvents(result$);

    const config = getConfig();
    config.chunk?.(
      {
        data,
        errors,
        meta,
      },
      parser,
    );

    expect(parser.abort).toHaveBeenCalled();
    expect(eventsPromise).rejects.toEqual(errors);
  });

  it('forwards other errors to the subscriber', async () => {
    const error = new Error('some other error');
    const result$ = service.load(url, { errorTolerance: 0 });
    const eventsPromise = getEvents(result$);

    const config = getConfig();
    config.error?.(error, undefined);

    expect(eventsPromise).rejects.toEqual(error);
  });
});
