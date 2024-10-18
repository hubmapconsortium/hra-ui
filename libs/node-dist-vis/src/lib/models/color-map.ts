import { Color } from '@deck.gl/core/typed';
import { createDataViewClass } from './data-view';

export interface ColorMapEntry {
  // TODO verify key names
  'Cell Type': string;
  'Cell Color': Color;
}

export interface ColorMap {
  domain: string[];
  range: Color[];
}

const COLOR_MAP_KEYS: (keyof ColorMapEntry)[] = ['Cell Type', 'Cell Color'];
const BaseColorMapView = createDataViewClass<ColorMapEntry>(COLOR_MAP_KEYS);

export class ColorMapView extends BaseColorMapView {
  readonly getColorMap = () => {
    if (this._colorMap) {
      return this._colorMap;
    }

    const domain: string[] = [];
    const range: Color[] = [];
    for (const obj of this.data) {
      domain.push(this.getCellTypeFor(obj));
      range.push(this.getCellColorFor(obj));
    }

    return (this._colorMap = { domain, range });
  };

  readonly getDomain = () => this.getColorMap().domain;
  readonly getRange = () => this.getColorMap().range;

  private _colorMap?: ColorMap = undefined;
}
