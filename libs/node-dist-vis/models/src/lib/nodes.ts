import { Signal } from '@angular/core';
import { AccessorContext, Position } from '@deck.gl/core/typed';
import { NextObserver } from 'rxjs';
import {
  AnyDataEntry,
  createDataView,
  createDataViewClass,
  DataViewEntryFilter,
  DataViewInput,
  inferViewKeyMapping,
  KeyMappingInput,
  loadViewData,
  loadViewKeyMapping,
} from './data-view';
import { NodeFilterView } from './filters';
import { batch, cachedAccessor, Dimensions, inplaceMinMax, LoadingState } from './utils';

/** Node view input */
export type NodesInput = DataViewInput<NodesView>;
/** Node view key mapping input */
export type NodeKeysInput = KeyMappingInput<NodeEntry>;

/** Node entry */
export interface NodeEntry {
  /** Cell type */
  'Cell Type': string;
  /** Optional cell ontology id */
  'Cell Ontology ID'?: string;
  /** X coordinate */
  X: number;
  /** Y coordinate */
  Y: number;
  /** Optional Z coordinate */
  Z?: number;
}

/** Required node keys */
export const REQUIRED_KEYS: (keyof NodeEntry)[] = ['Cell Type', 'X', 'Y'];
/** Optional node keys */
export const OPTIONAL_KEYS: (keyof NodeEntry)[] = ['Cell Ontology ID', 'Z'];
/** Base nodes view class */
const BaseNodesView = createDataViewClass<NodeEntry>([...REQUIRED_KEYS, ...OPTIONAL_KEYS]);

/** Nodes view */
export class NodesView extends BaseNodesView {
  /**
   * Get the position of a node.
   * If an accessor context is provided the preallocated target
   * array will be filled out and returned instead of a new array.
   *
   * @param index Index of data entry
   * @param info Optional accessor context
   * @returns The position in format [x, y, z]
   */
  readonly getPositionAt = (index: number, info?: AccessorContext<AnyDataEntry>) =>
    this.getPositionFor(this.at(index), info);

  /**
   * Get the position of a node.
   * If an accessor context is provided the preallocated target
   * array will be filled out and returned instead of a new array.
   *
   * @param obj Raw node data entry
   * @param info Optional accessor context
   * @returns The position in format [x, y, z]
   */
  readonly getPositionFor = (obj: AnyDataEntry, info?: AccessorContext<AnyDataEntry>): [number, number, number] => {
    const position = (info?.target ?? new Array(3)) as [number, number, number];
    position[0] = this.getXFor(obj);
    position[1] = this.getYFor(obj);
    position[2] = this.getZFor(obj) ?? 0;
    return position;
  };

  /**
   * Get the dimensions of all nodes **for each** of the X, Y, and Z axes
   *
   * @returns An array of [minimum, maximum] pairs for each axis
   */
  readonly getDimensions3D = cachedAccessor(this, (): [Dimensions, Dimensions, Dimensions] => {
    const xDims: Dimensions = [Number.MAX_VALUE, -Number.MAX_VALUE];
    const yDims: Dimensions = [Number.MAX_VALUE, -Number.MAX_VALUE];
    const zDims: Dimensions = [Number.MAX_VALUE, -Number.MAX_VALUE];
    for (const obj of this) {
      inplaceMinMax(xDims, this.getXFor(obj));
      inplaceMinMax(yDims, this.getYFor(obj));
      inplaceMinMax(zDims, this.getZFor(obj) ?? 0);
    }

    return [xDims, yDims, zDims];
  });

  /**
   * Get the dimensions of all nodes **across** the X, Y, and Z axes
   *
   * @returns A [minimum, maximum] pair
   */
  readonly getDimensions = cachedAccessor(this, (): Dimensions => {
    const [[minX, maxX], [minY, maxY], [minZ, maxZ]] = this.getDimensions3D();
    return [Math.min(minX, minY, minZ), Math.max(maxX, maxY, maxZ)];
  });

  /**
   * Get the scale **for each** of the X, Y, and Z axes
   *
   * @returns A tuple of [X-scale, Y-scale, Z-scale]
   */
  readonly getScale3D = cachedAccessor(this, (): [number, number, number] => {
    const [[minX, maxX], [minY, maxY], [minZ, maxZ]] = this.getDimensions3D();
    return [maxX - minX, maxY - minY, maxZ - minZ];
  });

  /**
   * Get the scale of all nodes **across** the X, Y, and Z axes.
   * This can also be viewed as the radius of the bounding sphere containing all nodes.
   *
   * @returns The scale/radius
   */
  readonly getScale = cachedAccessor(this, (): number => {
    const [min, max] = this.getDimensions();
    return max - min;
  });

  /**
   * Get center of all nodes. This is the same as the center of the bounding box/sphere.
   *
   * @returns The center point
   */
  readonly getCenter = cachedAccessor(this, (): Position => {
    const [[minX, maxX], [minY, maxY], [minZ, maxZ]] = this.getDimensions3D();
    return [(minX + maxX) / 2, (minY + maxY) / 2, (minZ + maxZ) / 2];
  });

  /**
   * Get node counts for each cell type.
   *
   * @returns A mapping from cell type to the number of nodes
   */
  readonly getCounts = cachedAccessor(this, () => {
    const counts: Record<string, number> = {};
    for (const obj of this) {
      const type = this.getCellTypeFor(obj);
      counts[type] ??= 0;
      counts[type] += 1;
    }

    return new Map(Object.entries(counts));
  });

  /**
   * Create a filtering function from a filter view using node accessors from this view.
   *
   * @param filterView Filter view
   * @returns A function for testing whether a node is included in the filter
   */
  readonly createFilter = (filterView: NodeFilterView): DataViewEntryFilter => {
    return (obj, index) => filterView.includes(this.getCellTypeFor(obj), index);
  };

  /**
   * Create a new index for nodes included in a filter.
   * Only indices for nodes included by the filter should be used.
   *
   * @param filterView Filter view
   * @returns A new index
   */
  readonly createReindexer = async (filterView: NodeFilterView) => {
    const BATCH_SIZE = 20000;
    const result: number[] = [];
    let acc = -1;

    await batch(this, BATCH_SIZE, (obj, index) => {
      const included = filterView.includes(this.getCellTypeFor(obj), index);
      acc += Number(included);
      result.push(acc);
    });
    return result;
  };
}

/** Empty nodes view */
export const EMPTY_NODES_VIEW = new NodesView([], {
  'Cell Type': 0,
  X: 1,
  Y: 2,
});

/**
 * Load nodes
 *
 * @param input Raw nodes input
 * @param keys Raw nodes key mapping input
 * @param nodeTargetKey Backwards compatable 'Cell Type' key mapping
 * @param loading Observer notified when data is loading
 * @returns A nodes view
 */
export function loadNodes(
  input: Signal<NodesInput>,
  keys: Signal<NodeKeysInput>,
  nodeTargetKey?: Signal<string | undefined>,
  loading?: NextObserver<boolean>,
): Signal<NodesView> {
  const loadingState = new LoadingState(loading);
  const data = loadViewData(input, NodesView, loadingState.createObserver());
  const mapping = loadViewKeyMapping(keys, { 'Cell Type': nodeTargetKey }, loadingState.createObserver());
  const inferred = inferViewKeyMapping(data, mapping, REQUIRED_KEYS, OPTIONAL_KEYS);
  return createDataView(NodesView, data, inferred, EMPTY_NODES_VIEW);
}
