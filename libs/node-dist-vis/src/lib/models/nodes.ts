import { AnyDataEntry, createDataViewClass } from './data-view';

export interface NodeEntry {
  'Cell Type': string;
  'Cell Ontology ID'?: string;
  X: number;
  Y: number;
  Z?: number;
}

const NODE_KEYS: (keyof NodeEntry)[] = ['Cell Type', 'Cell Ontology ID', 'X', 'Y', 'Z'];
const BaseNodesView = createDataViewClass<NodeEntry>(NODE_KEYS);

export class NodesView extends BaseNodesView {
  readonly getPositionAt = (index: number) => this.getPositionFor(this.data[index]);
  readonly getPositionFor = (obj: AnyDataEntry): [number, number, number] => [
    this.getXFor(obj),
    this.getYFor(obj),
    this.getZFor(obj) ?? 0,
  ];

  readonly getDimensions = (): [number, number] => {
    if (this._dimensions) {
      return this._dimensions;
    }

    let min = Number.MAX_VALUE;
    let max = -Number.MAX_VALUE;
    for (const obj of this.data) {
      const x = this.getXFor(obj);
      const y = this.getYFor(obj);
      const z = this.getZFor(obj) ?? 0;
      min = Math.min(min, x, y, z);
      max = Math.max(max, x, y, z);
    }

    return (this._dimensions = [min, max]);
  };

  private _dimensions?: [number, number] = undefined;
}
