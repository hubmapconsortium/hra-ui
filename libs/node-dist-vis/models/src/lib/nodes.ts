import { Signal } from '@angular/core';
import { AccessorContext } from '@deck.gl/core/typed';
import {
  AnyDataEntry,
  createDataView,
  createDataViewClass,
  DataViewFilter,
  DataViewInput,
  inferViewKeyMapping,
  KeyMappingInput,
  loadViewData,
  loadViewKeyMapping,
} from './data-view';
import { NodeFilterView } from './filters';
import { cachedAccessor } from './utils';

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
const REQUIRED_KEYS: (keyof NodeEntry)[] = ['Cell Type', 'X', 'Y'];
/** Optional node keys */
const OPTIONAL_KEYS: (keyof NodeEntry)[] = ['Cell Ontology ID', 'Z'];
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
   * Get the dimensions (sometimes called 'extent') of all nodes
   * across the X, Y, and Z axes
   *
   * @returns An array of [minimum, maximum] values
   */
  readonly getDimensions = cachedAccessor(this, (): [number, number] => {
    let min = Number.MAX_VALUE;
    let max = -Number.MAX_VALUE;
    for (const obj of this) {
      const x = this.getXFor(obj);
      const y = this.getYFor(obj);
      const z = this.getZFor(obj) ?? 0;
      min = Math.min(min, x, y, z);
      max = Math.max(max, x, y, z);
    }

    return [min, max];
  });

  readonly getCounts = cachedAccessor(this, () => {
    const counts: Record<string, number> = {};
    for (const obj of this) {
      const type = this.getCellTypeFor(obj);
      counts[type] ??= 0;
      counts[type] += 1;
    }

    return new Map(Object.entries(counts));
  });

  readonly createFilter = (filterView: NodeFilterView): DataViewFilter => {
    return (obj, index) => filterView.includes(this.getCellTypeFor(obj), index);
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
 * @returns A nodes view
 */
export function loadNodes(
  input: Signal<NodesInput>,
  keys: Signal<NodeKeysInput>,
  nodeTargetKey?: Signal<string | undefined>,
): Signal<NodesView> {
  const data = loadViewData(input, NodesView);
  const mapping = loadViewKeyMapping(keys, { 'Cell Type': nodeTargetKey });
  const inferred = inferViewKeyMapping(data, mapping, REQUIRED_KEYS, OPTIONAL_KEYS);
  return createDataView(NodesView, data, inferred, EMPTY_NODES_VIEW);
}
