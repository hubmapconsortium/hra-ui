import { Signal, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CsvFileLoaderService, FileLoaderEvent } from '@hra-ui/common/fs';
import { MockProxy, mock } from 'jest-mock-extended';
import { of } from 'rxjs';
import { DataLoaderService } from './data-loader.service';

describe('DataLoaderService', () => {
  const initialValue = [{ test: 'initial' }];
  const data = [{ test: 'value' }];
  const loaderData = [{ test: 'from loader' }];
  const dataEvent: FileLoaderEvent<unknown[]> = {
    type: 'data',
    data: loaderData,
  };
  let csvLoader: MockProxy<CsvFileLoaderService<unknown>>;
  let service: DataLoaderService;

  function nextTick(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve));
  }

  function load<T>(value: T[] | string | undefined): Signal<T[]> {
    return TestBed.runInInjectionContext(() =>
      service.load(signal(value), initialValue as T[], CsvFileLoaderService, {}),
    );
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CsvFileLoaderService,
          useValue: (csvLoader = mock()),
        },
      ],
    });

    csvLoader.load.mockReturnValue(of(dataEvent));
    service = TestBed.inject(DataLoaderService);
  });

  it('returns the data if it is not a string', async () => {
    const result = load(data);
    await nextTick();
    expect(result()).toEqual(data);
  });

  it('returns the initial value when the signal contains undefined', async () => {
    const result = load(undefined);
    await nextTick();
    expect(result()).toEqual(initialValue);
  });

  it('loads the data from an url when a string', async () => {
    const result = load('test/url');
    await nextTick();
    expect(result()).toEqual(loaderData);
  });
});
