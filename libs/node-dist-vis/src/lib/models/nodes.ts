import { Signal } from '@angular/core';
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
import { AccessorContext } from '@deck.gl/core/typed';

export type NodesInput = DataViewInput<NodesView>;
export type NodeKeysInput = KeyMappingInput<NodeEntry>;

export interface NodeEntry {
  'Cell Type': string;
  'Cell Ontology ID'?: string;
  X: number;
  Y: number;
  Z?: number;
}

const REQUIRED_KEYS: (keyof NodeEntry)[] = ['Cell Type', 'X', 'Y'];
const OPTIONAL_KEYS: (keyof NodeEntry)[] = ['Cell Ontology ID', 'Z'];
const BaseNodesView = createDataViewClass<NodeEntry>([...REQUIRED_KEYS, ...OPTIONAL_KEYS]);

export class NodesView extends BaseNodesView {
  readonly getPositionAt = (index: number, info?: AccessorContext<AnyDataEntry>) =>
    this.getPositionFor(this.data[index], info);
  readonly getPositionFor = (obj: AnyDataEntry, info?: AccessorContext<AnyDataEntry>): [number, number, number] => {
    const position = (info?.target ?? new Array(3)) as [number, number, number];
    position[0] = this.getXFor(obj);
    position[1] = this.getYFor(obj);
    position[2] = this.getZFor(obj) ?? 0;
    return position;
  };

  readonly getDimensions = (): [number, number] => {
    if (this.dimensions) {
      return this.dimensions;
    }

    let min = Number.MAX_VALUE;
    let max = -Number.MAX_VALUE;
    for (const obj of this) {
      const x = this.getXFor(obj);
      const y = this.getYFor(obj);
      const z = this.getZFor(obj) ?? 0;
      min = Math.min(min, x, y, z);
      max = Math.max(max, x, y, z);
    }

    this.dimensions = [min, max];
    return this.dimensions;
  };

  private dimensions?: [number, number] = undefined;
}

export function loadNodes(
  input: Signal<NodesInput>,
  keys: Signal<NodeKeysInput>,
  nodeTargetKey?: Signal<string | undefined>,
): Signal<NodesView> {
  const data = loadViewData(input, NodesView);
  const mapping = loadViewKeyMapping(keys, { 'Cell Type': nodeTargetKey });
  const inferred = inferViewKeyMapping(data, mapping, REQUIRED_KEYS, OPTIONAL_KEYS);
  const emptyView = new NodesView([], {
    'Cell Type': 0,
    X: 1,
    Y: 2,
  });

  return createDataView(NodesView, data, inferred, emptyView);
}
