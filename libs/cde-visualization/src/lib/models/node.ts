import { Brand } from './brand';

/** Type representing a key for node targets, enhanced with branding for type safety */
export type NodeTargetKey = string & Brand<'NodeTargetKey'>;

/** Interface representing a node entry with spatial coordinates and dynamic target properties */
export interface NodeEntry {
  /** X-coordinate of the node */
  x: number;
  /** Y-coordinate of the node */
  y: number;
  /** Optional Z-coordinate of the node */
  z?: number;
  /** Dynamic property for node target values */
  [target: NodeTargetKey]: string;
}

/** Default key for node targets */
export const DEFAULT_NODE_TARGET_KEY = 'Cell Type' as NodeTargetKey;

/** Default value for node targets */
export const DEFAULT_NODE_TARGET_VALUE = 'Endothelial';

/** Selects the target value for nodes based on the specified target key */
export function selectNodeTargetValue(nodes: NodeEntry[], targetKey: NodeTargetKey): string {
  const hasDefault = nodes.some((node) => node[targetKey] === DEFAULT_NODE_TARGET_VALUE);
  if (nodes.length === 0 || hasDefault) {
    return DEFAULT_NODE_TARGET_VALUE;
  }

  return nodes[0][targetKey];
}
