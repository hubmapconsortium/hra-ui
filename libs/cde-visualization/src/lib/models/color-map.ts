import { Brand } from './brand';
import { Rgb } from './color';

export type ColorMapTypeKey = string & Brand<'ColorMapTypeKey'>;
export type ColorMapColorKey = string & Brand<'ColorMapValueKey'>;

export interface ColorMapEntry {
  [key: ColorMapTypeKey]: string;
  [value: ColorMapColorKey]: Rgb;
}

export const DEFAULT_COLOR_MAP_KEY = 'cell_type' as ColorMapTypeKey;
export const DEFAULT_COLOR_MAP_VALUE_KEY = 'cell_color' as ColorMapColorKey;

export function colorMapToLookup(
  colorMap: ColorMapEntry[],
  typeKey: ColorMapTypeKey,
  colorKey: ColorMapColorKey,
): Map<string, Rgb> {
  const lookup = new Map<string, Rgb>();
  for (const entry of colorMap) {
    lookup.set(entry[typeKey], entry[colorKey]);
  }

  return lookup;
}
