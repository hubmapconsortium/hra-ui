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

export type EdgesInput = DataViewInput<EdgesView>;
export type EdgeKeysInput = KeyMappingInput<EdgeEntry>;

export interface EdgeEntry {
  'Cell ID': number;
  X1: number;
  Y1: number;
  Z1: number;
  X2: number;
  Y2: number;
  Z2: number;
}

const REQUIRED_KEYS: (keyof EdgeEntry)[] = ['Cell ID', 'X1', 'Y1', 'Z1', 'X2', 'Y2', 'Z2'];
const OPTIONAL_KEYS: (keyof EdgeEntry)[] = [];
const BaseEdgesView = createDataViewClass<EdgeEntry>([...REQUIRED_KEYS, ...OPTIONAL_KEYS]);

export class EdgesView extends BaseEdgesView {
  readonly getSourcePositionAt = (index: number, info?: AccessorContext<AnyDataEntry>) =>
    this.getSourcePositionFor(this.data[index], info);
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

  readonly getTargetPositionAt = (index: number, info?: AccessorContext<AnyDataEntry>) =>
    this.getTargetPositionFor(this.data[index], info);
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
