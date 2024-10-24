import { computed, Signal } from '@angular/core';
import { AccessorContext, COORDINATE_SYSTEM } from '@deck.gl/core/typed';
import { DataFilterExtension, DataFilterExtensionProps } from '@deck.gl/extensions/typed';
import { PointCloudLayer } from '@deck.gl/layers/typed';
import { ColorMapView } from '../models/color-map';
import { AnyData } from '../models/data-view';
import { NodeFilterView } from '../models/filters';
import { NodesView } from '../models/nodes';
import { ViewMode } from '../models/view-mode';
import { createColorAccessor } from './utils/color-coding';
import { createNodeFilterAccessor, FILTER_RANGE } from './utils/filters';
import { createScaledPositionAccessor } from './utils/position-scaling';

/** Nodes layer */
export type NodesLayer = PointCloudLayer<AnyData, DataFilterExtensionProps<AnyData>>;

/** Default/initial node size */
const DEFAULT_NODE_SIZE = 1.5;
/** Node size in the 'inspect' view mode */
const INSPECT_NODE_SIZE = 3;

/**
 * Get the node size based on the view mode
 *
 * @param mode Current view mode
 * @returns The node size
 */
function getNodeSize(mode: ViewMode): number {
  return mode === 'inspect' ? INSPECT_NODE_SIZE : DEFAULT_NODE_SIZE;
}

/**
 * Accessor for getting a node's index
 *
 * @param _obj Raw node data object
 * @param info Accessor context
 * @returns The index of the node
 */
function getIndex(_obj: unknown, info: AccessorContext<unknown>): number {
  return info.index;
}

/**
 * Create a deckgl for rendering nodes
 *
 * @param mode View mode
 * @param nodes Nodes view
 * @param nodeFilter Nodes filter
 * @param colorMap Color map
 * @returns A deckgl layer
 */
export function createNodesLayer(
  mode: Signal<ViewMode>,
  nodes: Signal<NodesView>,
  nodeFilter: Signal<NodeFilterView>,
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
    const filterFn = nodeFilter().includes;
    return createNodeFilterAccessor(accessor, getIndex, filterFn);
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
      filterEnabled: !nodeFilter().isEmpty(),
      extensions: [new DataFilterExtension()],
      updateTriggers: {
        getColor: colorMap().getRange(),
        getFilterValue: nodeFilter(),
      },
    });
  });
}
