import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ColorMapEntry } from '../../models/color-map';
import { CsvFileLoaderOptions, CsvFileLoaderService } from '../file-loader/csv-file-loader';
import { FileLoader, FileLoaderEvent } from '../file-loader/file-loader';

@Injectable({
  providedIn: 'root',
})
export class ColorMapFileLoaderService implements FileLoader<ColorMapEntry[], CsvFileLoaderOptions> {
  private readonly csvLoader = inject<CsvFileLoaderService<Record<string, string>>>(CsvFileLoaderService);

  load(file: string | File, options: CsvFileLoaderOptions): Observable<FileLoaderEvent<ColorMapEntry[]>> {
    return this.csvLoader.load(file, options).pipe(
      map((event) => {
        if (event.type !== 'data') {
          return event;
        }

        return { type: 'data', data: this.parseColorMapEntries(event.data) };
      }),
    );
  }

  private parseColorMapEntries(data: Record<string, string>[]): ColorMapEntry[] {
    if (data.length === 0) {
      return [];
    }

    let colorKey: string | undefined;
    for (const [key, value] of Object.entries(data[0])) {
      if (/^\[[\d\s,]+\]$/.test(value.trim())) {
        colorKey = key;
        break;
      }
    }

    if (colorKey === undefined) {
      throw new Error('Could not parse color map');
    }

    return data.map((item) => ({ ...item, [colorKey]: JSON.parse(item[colorKey]) }));
  }
}
