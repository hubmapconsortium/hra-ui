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

export function selectNodeTargetValue(nodes: NodeEntry[], targetKey: NodeTargetKey): string {
  const hasDefault = nodes.some((node) => node[targetKey] === DEFAULT_NODE_TARGET_VALUE);
  if (nodes.length === 0 || hasDefault) {
    return DEFAULT_NODE_TARGET_VALUE;
  }

  return nodes[0][targetKey];
}
