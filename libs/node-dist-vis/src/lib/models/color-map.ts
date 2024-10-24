import { Signal } from '@angular/core';
import { Color } from '@deck.gl/core/typed';
import {
  createDataView,
  createDataViewClass,
  DataViewInput,
  inferViewKeyMapping,
  KeyMappingInput,
  loadViewData,
  loadViewKeyMapping,
} from './data-view';

/** Color map input */
export type ColorMapInput = DataViewInput<ColorMapView>;
/** Color map key mapping input */
export type ColorMapKeysInput = KeyMappingInput<ColorMapEntry>;

/** Color map entry */
export interface ColorMapEntry {
  /** Cell type */
  'Cell Type': string;
  /** Cell color */
  'Cell Color': Color;
}

/** Color map */
export interface ColorMap {
  /** Unique cell types */
  domain: string[];
  /** Associated cell type colors */
  range: Color[];
}

/** Required color map keys */
const REQUIRED_KEYS: (keyof ColorMapEntry)[] = ['Cell Type', 'Cell Color'];
/** Optional color map keys */
const OPTIONAL_KEYS: (keyof ColorMapEntry)[] = [];
/** Base data view class for color map */
const BaseColorMapView = createDataViewClass<ColorMapEntry>([...REQUIRED_KEYS, ...OPTIONAL_KEYS]);

/** Color map view */
export class ColorMapView extends BaseColorMapView {
  /**
   * Get the `ColorMap` for this view
   *
   * @returns A `ColorMap`
   */
  readonly getColorMap = () => {
    if (this.colorMap) {
      return this.colorMap;
    }

    const domain: string[] = [];
    const range: Color[] = [];
    for (const obj of this) {
      domain.push(this.getCellTypeFor(obj));
      range.push(this.getCellColorFor(obj));
    }

    this.colorMap = { domain, range };
    return this.colorMap;
  };

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

  /** Cached color map object */
  private colorMap?: ColorMap = undefined;
}

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
  const emptyView = new ColorMapView([], {
    'Cell Type': 0,
    'Cell Color': 1,
  });

  return createDataView(ColorMapView, data, inferred, emptyView);
}
