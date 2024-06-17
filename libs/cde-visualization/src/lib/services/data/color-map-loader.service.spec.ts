import { TestBed } from '@angular/core/testing';
import { mock, MockProxy } from 'jest-mock-extended';
import { firstValueFrom, of } from 'rxjs';

import { ColorMapEntry } from '../../models/color-map';
import { CsvFileLoaderService } from '../file-loader/csv-file-loader.service';
import { FileLoaderEvent } from '../file-loader/file-loader';
import { ColorMapFileLoaderService } from './color-map-loader.service';

describe('ColorMapLoaderService', () => {
  const sampleColorMap = [
    { cell_id: '0', cell_type: 'a', cell_color: '[0,0,0]' },
    { cell_id: '1', cell_type: 'b', cell_color: '[0,0,1]' },
    { cell_id: '2', cell_type: 'c', cell_color: '[0,0,2]' },
  ];

  const invalidColorMap = [
    { cell_id: '0', cell_type: 'a', cell_color: '' },
    { cell_id: '1', cell_type: 'b', cell_color: '' },
    { cell_id: '2', cell_type: 'c', cell_color: '' },
  ];

  const parsedColorMap = [
    { cell_id: '0', cell_type: 'a', cell_color: [0, 0, 0] },
    { cell_id: '1', cell_type: 'b', cell_color: [0, 0, 1] },
    { cell_id: '2', cell_type: 'c', cell_color: [0, 0, 2] },
  ];

  const progressEvent: FileLoaderEvent<ColorMapEntry[]> = {
    type: 'progress',
    loaded: 50,
    total: 100,
  };
  const colorMapEvent: FileLoaderEvent<ColorMapEntry[]> = {
    type: 'data',
    data: sampleColorMap,
  };
  const invalidColorMapEvent: FileLoaderEvent<ColorMapEntry[]> = {
    type: 'data',
    data: invalidColorMap,
  };
  const parsedColorMapEvent: FileLoaderEvent<ColorMapEntry[]> = {
    type: 'data',
    data: parsedColorMap,
  };
  const emptyDataEvent: FileLoaderEvent<ColorMapEntry[]> = {
    type: 'data',
    data: [],
  };

  let csvLoader: MockProxy<CsvFileLoaderService<ColorMapEntry>>;
  let service: ColorMapFileLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CsvFileLoaderService,
          useValue: (csvLoader = mock()),
        },
      ],
    });

    service = TestBed.inject(ColorMapFileLoaderService);
    csvLoader.load.mockReturnValue(of());
  });

  it('forwards progress events', async () => {
    csvLoader.load.mockReturnValue(of(progressEvent));
    const result$ = service.load('a/file.csv', {});
    const firstEvent = await firstValueFrom(result$);
    expect(firstEvent).toEqual(progressEvent);
  });

  it('returns data event with parsed color map entries', async () => {
    csvLoader.load.mockReturnValue(of(colorMapEvent));
    const result$ = service.load('a/file.csv', {});
    const firstEvent = await firstValueFrom(result$);
    expect(firstEvent).toEqual(parsedColorMapEvent);
  });

  it('returns error if invalid color map', async () => {
    csvLoader.load.mockReturnValue(of(invalidColorMapEvent));
    const result$ = service.load('a/file.csv', {});
    const firstEvent = firstValueFrom(result$);
    expect(firstEvent).rejects.toMatch(/parse/);
  });

  it('returns an empty color map if event contains no data', async () => {
    csvLoader.load.mockReturnValue(of(emptyDataEvent));
    const result$ = service.load('a/file.csv', {});
    const firstEvent = await firstValueFrom(result$);
    expect(firstEvent).toEqual(emptyDataEvent);
  });
});
