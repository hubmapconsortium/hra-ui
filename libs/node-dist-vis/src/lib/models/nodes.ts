declare const BRAND: unique symbol;
export type Brand<T extends string | number | symbol> = { [BRAND]: { [P in T]: true } };
export type NodeTargetKey = string & Brand<'NodeTargetKey'>;

export interface NodeEntry {
  /** X-coordinate of the node */
  x: number;
  /** Y-coordinate of the node */
  y: number;
  /** Optional Z-coordinate of the node */
  z?: number;
  position?: [number, number, number];
  /** Dynamic property for node target values */
  [target: NodeTargetKey]: string;
}
