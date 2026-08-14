import { inject, Injectable } from '@angular/core';
import { CsvFileLoaderOptions, CsvFileLoaderService, FileLoader, FileLoaderEvent } from '@hra-ui/common/fs';
import { map, Observable } from 'rxjs';
import { ColorMapEntry } from '../../models/color-map';

const HEX_COLOR_REGEX = /^#([0-9a-f]{3}){1,2}$/i;
const RGBA_COLOR_REGEX = /^\[(\s*\d+\s*,){2}\s*\d+\s*\]$/;

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

    const colorKeys = new Map<string, 'hex' | 'rgb'>();
    for (const [key, value] of Object.entries(data[0])) {
      const trimmedValue = value.trim();
      if (HEX_COLOR_REGEX.test(trimmedValue)) {
        colorKeys.set(key, 'hex');
      } else if (RGBA_COLOR_REGEX.test(trimmedValue)) {
        colorKeys.set(key, 'rgb');
      }
    }

    if (colorKeys.size === 0) {
      throw new Error('Could not parse color map');
    }

    const result: ColorMapEntry[] = [];
    for (const item of data) {
      const entry: Record<string, unknown> = { ...item };
      for (const [key, type] of colorKeys.entries()) {
        entry[key] = this.parseColorValue(item[key], type);
      }

      result.push(entry as ColorMapEntry);
    }

    return result;
  }

  private parseColorValue(value: string, type: 'hex' | 'rgb'): number[] | string {
    value = value.trim();

    if (type === 'hex') {
      value = value.slice(1);

      const step = value.length === 3 ? 1 : 2;
      const rgb = [];
      for (let index = 0; index < 3; index++) {
        const start = index * step;
        const hexValue = value.slice(start, start + step);
        let parsedValue = parseInt(hexValue, 16);
        if (step === 1) {
          parsedValue = (parsedValue << 4) | parsedValue;
        }

        rgb.push(parsedValue);
      }

      return rgb;
    } else if (type === 'rgb') {
      const rgb = JSON.parse(value);
      if (Array.isArray(rgb) && rgb.length === 3) {
        return rgb;
      }
    }

    return value;
  }
}
