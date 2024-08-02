import { Brand } from './brand';
import { Rgb } from './color';

/** Type representing a key for color map types, enhanced with a branding mechanism */
export type ColorMapTypeKey = string & Brand<'ColorMapTypeKey'>;

/** Type representing a key for color map colors, enhanced with a branding mechanism */
export type ColorMapColorKey = string & Brand<'ColorMapValueKey'>;

/** Interface representing a color map entry */
export interface ColorMapEntry {
  /** Key for the type in the color map */
  [key: ColorMapTypeKey]: string;

  /** Key for the corresponding RGB color in the color map */
  [value: ColorMapColorKey]: Rgb;
}

/** Default key for the color map type */
export const DEFAULT_COLOR_MAP_KEY = 'cell_type' as ColorMapTypeKey;

/** Default key for the color map value */
export const DEFAULT_COLOR_MAP_VALUE_KEY = 'cell_color' as ColorMapColorKey;

/** Converts a color map array to a lookup map for quick access */
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
