import { computed, Signal } from '@angular/core';
import { COORDINATE_SYSTEM } from '@deck.gl/core/typed';
import { DataFilterExtension, DataFilterExtensionProps } from '@deck.gl/extensions/typed';
import { PointCloudLayer } from '@deck.gl/layers/typed';
import { ColorMapView } from '../models/color-map';
import { AnyData } from '../models/data-view';
import { getNodeSize, Mode } from '../models/mode';
import { NodesView } from '../models/nodes';
import { createColorAccessor } from './utils/color-coding';
import { createScaledPositionAccessor } from './utils/position-scaling';
import { createSelectionFilterAccessor, FILTER_RANGE } from './utils/selection-filter';

export type NodesLayer = PointCloudLayer<AnyData, DataFilterExtensionProps<AnyData>>;

export function createNodesLayer(
  mode: Signal<Mode>,
  nodes: Signal<NodesView>,
  selection: Signal<string[] | undefined>,
  colorMap: Signal<ColorMapView>,
): Signal<NodesLayer> {
  const positionAccessor = computed(() => {
    const accessor = nodes().getPositionFor;
    const dimensions = nodes().getDimensions();
    return createScaledPositionAccessor(accessor, dimensions);
  });
  const colorAccessor = computed(() => {
    const accessor = nodes().getCellTypeFor;
    const map = colorMap().getColorMap();
    return createColorAccessor(accessor, map);
  });
  const filterValueAccessor = computed(() => {
    const accessor = nodes().getCellTypeFor;
    return createSelectionFilterAccessor(accessor, selection());
  });

  return computed(() => {
    return new PointCloudLayer({
      id: 'nodes',
      data: nodes(),
      getPosition: positionAccessor(),
      getColor: colorAccessor(),
      pickable: true,
      coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
      pointSize: getNodeSize(mode()),
      getFilterValue: filterValueAccessor(),
      filterRange: FILTER_RANGE,
      filterEnabled: selection() !== undefined,
      extensions: [new DataFilterExtension()],
      updateTriggers: {
        getColor: colorMap().getRange(),
        getFilterValue: selection(),
      },
    });
  });
}
