import { Signal } from '@angular/core';
import { Color } from '@deck.gl/core/typed';
import {
  AnyDataEntry,
  createDataView,
  createDataViewClass,
  DataViewInput,
  inferViewKeyMapping,
  KeyMappingInput,
  loadViewData,
  loadViewKeyMapping,
} from '../data-view';
import { cachedAccessor, tryParseColor } from '../utils';

/** Color map input */
export type ColorMapInput = DataViewInput<ColorMapView>;
/** Color map key mapping input */
export type ColorMapKeysInput = KeyMappingInput<ColorMapEntry>;

/** Color map entry */
export interface ColorMapEntry {
  /** Cell type */
  'Cell Type': string;
  /** Cell color */
  'Cell Color': unknown;
}

/** Color map */
export interface ColorMap {
  /** Unique cell types */
  domain: string[];
  /** Associated cell type colors */
  range: Color[];
}

/** Default color (Surface N-98, Hra Blue 5) */
const DEFAULT_CELL_COLOR: Color = [239, 242, 245];
/** Required color map keys */
const REQUIRED_KEYS: (keyof ColorMapEntry)[] = ['Cell Type', 'Cell Color'];
/** Optional color map keys */
const OPTIONAL_KEYS: (keyof ColorMapEntry)[] = [];
/** Base data view class for color map */
const BaseColorMapView = createDataViewClass<ColorMapEntry>([...REQUIRED_KEYS, ...OPTIONAL_KEYS]);

/** Color map view */
export class ColorMapView extends BaseColorMapView {
  static from(domain: string[], range: unknown[], defaultColor = DEFAULT_CELL_COLOR): ColorMapView {
    const data = domain.map((value, index) => [value, range[index] ?? defaultColor]);
    return new ColorMapView(data, EMPTY_COLOR_MAP_VIEW.keyMapping);
  }

  readonly getParsedCellColorAt = (index: number, defaultColor = DEFAULT_CELL_COLOR) =>
    this.getParsedCellColorFor(this.at(index), defaultColor);
  readonly getParsedCellColorFor = (obj: AnyDataEntry, defaultColor = DEFAULT_CELL_COLOR) =>
    tryParseColor(this.getCellColorFor(obj)) ?? defaultColor;

  /**
   * Get the `ColorMap` for this view
   *
   * @returns A `ColorMap`
   */
  readonly getColorMap = cachedAccessor(this, (): ColorMap => {
    const domain: string[] = [];
    const range: Color[] = [];
    for (const obj of this) {
      domain.push(this.getCellTypeFor(obj));
      range.push(this.getParsedCellColorFor(obj));
    }

    return { domain, range };
  });

  /**
   * Get the domain of the color map
   *
   * @returns An array of unique domain values
   */
  readonly getDomain = () => this.getColorMap().domain;
  /**
   * Get the range of the color map
   *
   * @returns An array of colors associated with the domain values
   */
  readonly getRange = () => this.getColorMap().range;

  /**
   * Get a mapping from type to color
   *
   * @returns A `Map`
   */
  readonly getColorLookup = cachedAccessor(this, () => {
    const { domain, range } = this.getColorMap();
    const lookup = new Map<string, Color>();
    for (let index = 0; index < domain.length; index++) {
      lookup.set(domain[index], range[index]);
    }

    return lookup;
  });
}

/** Empty color map view */
export const EMPTY_COLOR_MAP_VIEW = new ColorMapView([], {
  'Cell Type': 0,
  'Cell Color': 1,
});

/**
 * Load a color map
 *
 * @param input Raw color map input
 * @param keys Raw color mak key mapping input
 * @param colorMapKey Backwards compatable 'Cell Type' key mapping
 * @param colorMapValue Backwards compatable 'Cell Color' key mapping
 * @returns A color map view
 */
export function loadColorMap(
  input: Signal<ColorMapInput>,
  keys: Signal<ColorMapKeysInput>,
  colorMapKey?: Signal<string | undefined>,
  colorMapValue?: Signal<string | undefined>,
): Signal<ColorMapView> {
  const data = loadViewData(input, ColorMapView);
  const mapping = loadViewKeyMapping(keys, {
    'Cell Type': colorMapKey,
    'Cell Color': colorMapValue,
  });
  const inferred = inferViewKeyMapping(data, mapping, REQUIRED_KEYS, OPTIONAL_KEYS);
  return createDataView(ColorMapView, data, inferred, EMPTY_COLOR_MAP_VIEW);
}
