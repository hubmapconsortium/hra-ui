import { computed, Signal } from '@angular/core';
import { COORDINATE_SYSTEM } from '@deck.gl/core/typed';
import { DataFilterExtension, DataFilterExtensionProps } from '@deck.gl/extensions/typed';
import { LineLayer } from '@deck.gl/layers/typed';
import {
  AnyData,
  AnyDataEntry,
  ColorMapView,
  EdgesView,
  NodeFilterView,
  NodesView,
} from '@hra-ui/node-dist-vis/models';
import { createColorAccessor } from './utils/color-coding';
import { createNodeFilterAccessor2, FILTER_RANGE } from './utils/filters';
import { createScaledPositionAccessor } from './utils/position-scaling';

/** Edges layer */
export type EdgesLayer = LineLayer<AnyData, DataFilterExtensionProps<AnyData>>;

/**
 * Create a deckgl layer for rendering edges
 *
 * @param nodes Nodes data view
 * @param edges Edges data view
 * @param nodeFilter Node filter
 * @param colorMap Color map
 * @param disabled Whether to show/hide the layer
 * @returns A deckgl layer
 */
export function createEdgesLayer(
  nodes: Signal<NodesView>,
  edges: Signal<EdgesView>,
  nodeFilter: Signal<NodeFilterView>,
  colorMap: Signal<ColorMapView>,
  disabled: Signal<boolean>,
): Signal<EdgesLayer | undefined> {
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
  const sourceCellTypeAccessor = computed(() => {
    const nodeIndex = edges().getCellIDFor;
    const nodeCellType = nodes().getCellTypeAt;
    return (obj: AnyDataEntry) => nodeCellType(nodeIndex(obj));
  });
  const targetCellTypeAccessor = computed(() => {
    const nodeIndex = edges().getTargetIDFor;
    const nodeCellType = nodes().getCellTypeAt;
    return (obj: AnyDataEntry) => nodeCellType(nodeIndex(obj));
  });
  const colorAccessor = computed(() => {
    const map = colorMap().getColorMap();
    return createColorAccessor(sourceCellTypeAccessor(), map);
  });
  const filterValueAccessor = computed(() => {
    const sourceIndex = edges().getCellIDFor;
    const targetIndex = edges().getTargetIDFor;
    const filterFn = nodeFilter().includes;
    return createNodeFilterAccessor2(
      sourceCellTypeAccessor(),
      sourceIndex,
      targetCellTypeAccessor(),
      targetIndex,
      filterFn,
    );
  });

  return computed(() => {
    if (nodes().length === 0) {
      return undefined;
    }

    return new LineLayer({
      id: 'edges',
      visible: !disabled(),
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
