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

export type ColorMapInput = DataViewInput<ColorMapView>;
export type ColorMapKeysInput = KeyMappingInput<ColorMapEntry>;

export interface ColorMapEntry {
  'Cell Type': string;
  'Cell Color': Color;
}

export interface ColorMap {
  domain: string[];
  range: Color[];
}

const REQUIRED_KEYS: (keyof ColorMapEntry)[] = ['Cell Type', 'Cell Color'];
const OPTIONAL_KEYS: (keyof ColorMapEntry)[] = [];
const BaseColorMapView = createDataViewClass<ColorMapEntry>([...REQUIRED_KEYS, ...OPTIONAL_KEYS]);

export class ColorMapView extends BaseColorMapView {
  readonly getColorMap = () => {
    if (this.colorMap) {
      return this.colorMap;
    }

    const domain: string[] = [];
    const range: Color[] = [];
    for (const obj of this.data) {
      domain.push(this.getCellTypeFor(obj));
      range.push(this.getCellColorFor(obj));
    }

    return (this.colorMap = { domain, range });
  };

  readonly getDomain = () => this.getColorMap().domain;
  readonly getRange = () => this.getColorMap().range;

  private colorMap?: ColorMap = undefined;
}

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
