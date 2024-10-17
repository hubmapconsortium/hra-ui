import { computed, Signal } from '@angular/core';
import { Layer } from '@deck.gl/core/typed';
import { ScaleBarLayer as ScaleBarLayerConstructor } from '@vivjs/layers';
import { NodesView } from '../../models/nodes';

type ScaleBarLayerProps = ConstructorParameters<typeof ScaleBarLayerConstructor>[0];
export type ScaleBarLayer = Layer<ScaleBarLayerProps>;

export function createScaleBarLayer(
  nodes: Signal<NodesView>,
  viewSize: Signal<[number, number]>,
  viewState: Signal<object>,
): Signal<ScaleBarLayer> {
  const size = computed(() => {
    const [min, max] = nodes().getDimensions();
    return (max - min) / (1 - min);
  });
  const state = computed(() => {
    const [width, height] = viewSize();
    return {
      ...viewState(),
      width: width - 136,
      height: height - 32,
    };
  });

  return computed(() => {
    return new ScaleBarLayerConstructor({
      id: 'scalebar',
      unit: 'µm',
      position: 'top-right',
      length: 0.1,
      snap: true,
      size: size(),
      viewState: state(),
    } as ScaleBarLayerProps);
  });
}
