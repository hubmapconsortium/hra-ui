import { Signal } from '@angular/core';
import { AccessorContext } from '@deck.gl/core/typed';
import {
  AnyDataEntry,
  createDataView,
  createDataViewClass,
  DataViewInput,
  inferViewKeyMapping,
  KeyMappingInput,
  loadViewData,
  loadViewKeyMapping,
} from './data-view';

/** Edges input */
export type EdgesInput = DataViewInput<EdgesView>;
/** Edges key mapping input */
export type EdgeKeysInput = KeyMappingInput<EdgeEntry>;

/** Edge entry */
export interface EdgeEntry {
  /** Source node index */
  'Cell ID': number;
  /** Source X coordinate */
  X1: number;
  /** Source Y coordinate */
  Y1: number;
  /** Source Z coordinate */
  Z1: number;
  /** Target X coordinate */
  X2: number;
  /** Target Y coordinate */
  Y2: number;
  /** Target Z coordinate */
  Z2: number;
}

/** Required edge keys */
const REQUIRED_KEYS: (keyof EdgeEntry)[] = ['Cell ID', 'X1', 'Y1', 'Z1', 'X2', 'Y2', 'Z2'];
/** Optional edge keys */
const OPTIONAL_KEYS: (keyof EdgeEntry)[] = [];
/** Base data view class for edges */
const BaseEdgesView = createDataViewClass<EdgeEntry>([...REQUIRED_KEYS, ...OPTIONAL_KEYS]);

/** Edges view */
export class EdgesView extends BaseEdgesView {
  /**
   * Get the source position of an edge.
   * If an accessor context is provided the preallocated target
   * array will be filled out and returned instead of a new array.
   *
   * @param index Index of data entry
   * @param info Optional accessor context
   * @returns The source position in format [x, y, z]
   */
  readonly getSourcePositionAt = (index: number, info?: AccessorContext<AnyDataEntry>) =>
    this.getSourcePositionFor(this.data[index], info);

  /**
   * Get the source position of an edge.
   * If an accessor context is provided the preallocated target
   * array will be filled out and returned instead of a new array.
   *
   * @param obj Raw edge data entry
   * @param info Optional accessor context
   * @returns The source position in format [x, y, z]
   */
  readonly getSourcePositionFor = (
    obj: AnyDataEntry,
    info?: AccessorContext<AnyDataEntry>,
  ): [number, number, number] => {
    const position = (info?.target ?? new Array(3)) as [number, number, number];
    position[0] = this.getX1For(obj);
    position[1] = this.getY1For(obj);
    position[2] = this.getZ1For(obj);
    return position;
  };

  /**
   * Get the target position of an edge.
   * If an accessor context is provided the preallocated target
   * array will be filled out and returned instead of a new array.
   *
   * @param index Index of data entry
   * @param info Optional accessor context
   * @returns The target position in format [x, y, z]
   */
  readonly getTargetPositionAt = (index: number, info?: AccessorContext<AnyDataEntry>) =>
    this.getTargetPositionFor(this.data[index], info);

  /**
   * Get the target position of an edge.
   * If an accessor context is provided the preallocated target
   * array will be filled out and returned instead of a new array.
   *
   * @param obj Raw edge data entry
   * @param info Optional accessor context
   * @returns The target position in format [x, y, z]
   */
  readonly getTargetPositionFor = (
    obj: AnyDataEntry,
    info?: AccessorContext<AnyDataEntry>,
  ): [number, number, number] => {
    const position = (info?.target ?? new Array(3)) as [number, number, number];
    position[0] = this.getX2For(obj);
    position[1] = this.getY2For(obj);
    position[2] = this.getZ2For(obj);
    return position;
  };
}

/**
 * Load edges
 *
 * @param input Raw edges input
 * @param keys Raw edges key mapping input
 * @returns A edges view
 */
export function loadEdges(input: Signal<EdgesInput>, keys: Signal<EdgeKeysInput>): Signal<EdgesView> {
  const data = loadViewData(input, EdgesView);
  const mapping = loadViewKeyMapping(keys);
  const inferred = inferViewKeyMapping(data, mapping, REQUIRED_KEYS, OPTIONAL_KEYS);
  const emptyView = new EdgesView([], {
    'Cell ID': 0,
    X1: 1,
    Y1: 2,
    Z1: 3,
    X2: 4,
    Y2: 5,
    Z2: 6,
  });

  return createDataView(EdgesView, data, inferred, emptyView);
}
