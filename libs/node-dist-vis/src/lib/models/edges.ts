import { AnyDataEntry, createDataViewClass } from './data-view';

export interface EdgeEntry {
  'Cell ID': number;
  X1: number;
  Y1: number;
  Z1: number;
  X2: number;
  Y2: number;
  Z2: number;
}

const EDGE_KEYS: (keyof EdgeEntry)[] = ['Cell ID', 'X1', 'Y1', 'Z1', 'X2', 'Y2', 'Z2'];
const BaseEdgesView = createDataViewClass<EdgeEntry>(EDGE_KEYS);

export class EdgesView extends BaseEdgesView {
  readonly getSourcePositionAt = (index: number) => this.getSourcePositionFor(this.data[index]);
  readonly getSourcePositionFor = (obj: AnyDataEntry): [number, number, number] => [
    this.getX1For(obj),
    this.getY1For(obj),
    this.getZ1For(obj),
  ];

  readonly getTargetPositionAt = (index: number) => this.getTargetPositionFor(this.data[index]);
  readonly getTargetPositionFor = (obj: AnyDataEntry): [number, number, number] => [
    this.getX2For(obj),
    this.getY2For(obj),
    this.getZ2For(obj),
  ];
}
