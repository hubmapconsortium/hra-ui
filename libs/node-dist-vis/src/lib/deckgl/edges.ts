import { computed, Signal } from '@angular/core';
import { COORDINATE_SYSTEM } from '@deck.gl/core/typed';
import { DataFilterExtension, DataFilterExtensionProps } from '@deck.gl/extensions/typed';
import { LineLayer } from '@deck.gl/layers/typed';
import { ColorMapView } from '../models/color-map';
import { AnyData, AnyDataEntry } from '../models/data-view';
import { EdgesView } from '../models/edges';
import { NodeFilterView } from '../models/filters';
import { NodesView } from '../models/nodes';
import { createColorAccessor } from './utils/color-coding';
import { createNodeFilterAccessor, FILTER_RANGE } from './utils/filters';
import { createScaledPositionAccessor } from './utils/position-scaling';

export type EdgesLayer = LineLayer<AnyData, DataFilterExtensionProps<AnyData>>;

export function createEdgesLayer(
  nodes: Signal<NodesView>,
  edges: Signal<EdgesView>,
  nodeFilter: Signal<NodeFilterView>,
  colorMap: Signal<ColorMapView>,
): Signal<EdgesLayer> {
  const sourcePositionAccessor = computed(() => {
    const accessor = edges().getSourcePositionFor;
    const dimensions = nodes().getDimensions();
    return createScaledPositionAccessor(accessor, dimensions);
  });
  const targetPositionAccessor = computed(() => {
    const accessor = edges().getTargetPositionFor;
    const dimensions = nodes().getDimensions();
    return createScaledPositionAccessor(accessor, dimensions);
  });
  const cellTypeAccessor = computed(() => {
    const nodeIndex = edges().getCellIDFor;
    const nodeCellType = nodes().getCellTypeAt;
    return (obj: AnyDataEntry) => nodeCellType(nodeIndex(obj));
  });
  const colorAccessor = computed(() => {
    const map = colorMap().getColorMap();
    return createColorAccessor(cellTypeAccessor(), map);
  });
  const filterValueAccessor = computed(() => {
    const nodeIndex = edges().getCellIDFor;
    const filterFn = nodeFilter().includes;
    return createNodeFilterAccessor(cellTypeAccessor(), nodeIndex, filterFn);
  });

  return computed(() => {
    return new LineLayer({
      id: 'edges',
      data: edges(),
      getSourcePosition: sourcePositionAccessor(),
      getTargetPosition: targetPositionAccessor(),
      getColor: colorAccessor(),
      pickable: false,
      coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
      getWidth: 1,
      getFilterValue: filterValueAccessor(),
      filterRange: FILTER_RANGE,
      filterEnabled: !nodeFilter().isEmpty(),
      extensions: [new DataFilterExtension()],
      updateTriggers: {
        getColor: colorMap().getRange(),
        getFilterValue: nodeFilter(),
      },
    });
  });
}
