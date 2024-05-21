import { Brand } from './brand';

export type NodeTargetKey = string & Brand<'NodeTargetKey'>;

export interface NodeEntry {
  x: number;
  y: number;
  z?: number;
  [target: NodeTargetKey]: string;
}

export const DEFAULT_NODE_TARGET_KEY = 'Cell Type' as NodeTargetKey;
export const DEFAULT_NODE_TARGET_VALUE = 'Endothelial';
