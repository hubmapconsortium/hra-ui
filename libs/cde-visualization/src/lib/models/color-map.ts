import { Brand } from './brand';
import { Rgb } from './color';

export type ColorMapKey = string & Brand<'ColorMapKey'>;
export type ColorMapValueKey = string & Brand<'ColorMapValueKey'>;

export interface ColorMapEntry {
  [key: ColorMapKey]: string;
  [value: ColorMapValueKey]: Rgb;
}

export const DEFAULT_COLOR_MAP_KEY = 'cell_type' as ColorMapKey;
export const DEFAULT_COLOR_MAP_VALUE_KEY = 'cell_color' as ColorMapValueKey;
