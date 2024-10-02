import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ColorMapEntry } from '../../models/color-map';
import { CsvFileLoaderOptions, CsvFileLoaderService } from '../file-loader/csv-file-loader.service';
import { FileLoader, FileLoaderEvent } from '../file-loader/file-loader';

/** Service to load color map entries from CSV files */
@Injectable({
  providedIn: 'root',
})
export class ColorMapFileLoaderService implements FileLoader<ColorMapEntry[], CsvFileLoaderOptions> {
  /** CSV loader service for handling CSV file loading */
  private readonly csvLoader = inject<CsvFileLoaderService<Record<string, string>>>(CsvFileLoaderService);

  /** Loads a color map file and returns an observable of the loading events */
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

  /** Parses the raw CSV data into an array of ColorMapEntry objects */
  private parseColorMapEntries(data: Record<string, string>[]): ColorMapEntry[] {
    if (data.length === 0) {
      return [];
    }

    let colorKey: string | undefined;
    for (const [key, value] of Object.entries(data[0])) {
      if (/^\[[\d\s,]+\]$/.test(value.trim())) {
        // Checks for r g b array
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
