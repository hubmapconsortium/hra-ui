import { computed, Signal } from '@angular/core';
import { Layer } from '@deck.gl/core/typed';
import { NodesView } from '@hra-ui/node-dist-vis/models';
import { ScaleBarLayer as ScaleBarLayerConstructor } from '@vivjs/layers';

/** Scale bar layer props. Not exported by `@vivjs/layers` */
type ScaleBarLayerProps = ConstructorParameters<typeof ScaleBarLayerConstructor>[0];
/** Scale bar layer */
export type ScaleBarLayer = Layer<ScaleBarLayerProps>;

/**
 * Create a deckgl for rendering a scale bar
 *
 * @param nodes Nodes view
 * @param viewSize Size of view element
 * @param viewState Current state of deckgl
 * @returns A deckgl layer
 */
export function createScaleBarLayer(
  nodes: Signal<NodesView>,
  viewSize: Signal<{ width: number; height: number }>,
  viewState: Signal<object>,
): Signal<ScaleBarLayer | undefined> {
  const size = computed(() => {
    const [min, max] = nodes().getDimensions();
    const result = (max - min) / (1 - min);
    return Number.isFinite(result) ? result : 1;
  });
  const state = computed(() => {
    const { width, height } = viewSize();
    return {
      ...viewState(),
      width: width - 136,
      height: height - 32,
    };
  });

  return computed(() => {
    if (nodes().length === 0) {
      return undefined;
    }

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
