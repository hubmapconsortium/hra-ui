import { Signal } from '@angular/core';
import { NodesView } from '../nodes';
import { ColorMapInput, ColorMapView, EMPTY_COLOR_MAP_VIEW } from './color-map';
import { DEFAULT_PALETTE } from './palettes';

export function createColorMapGenerator(nodes: Signal<NodesView>, colorMap: Signal<ColorMapInput>): () => ColorMapView {
  return () => {
    const view = nodes();
    const input = colorMap();
    if (input instanceof ColorMapView || view.length === 0) {
      return EMPTY_COLOR_MAP_VIEW;
    }

    const counts = view.getCounts();
    const byCount = (d1: string, d2: string) => (counts.get(d2) as number) - (counts.get(d1) as number);
    const domain = Array.from(counts.keys()).sort(byCount);
    return ColorMapView.from(domain, DEFAULT_PALETTE);
  };
}
