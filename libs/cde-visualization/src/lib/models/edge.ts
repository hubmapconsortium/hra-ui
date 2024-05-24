export type EdgeEntry = [sourceNode: number, x0: number, y0: number, z0: number, x1: number, y1: number, z1: number];

export enum EdgeIndex {
  SourceNode = 0,
  x0,
  y0,
  z0,
  x1,
  y1,
  z1,
}

export const DEFAULT_MAX_EDGE_DISTANCE = 1000;

export function edgeDistance(edge: EdgeEntry): number {
  const xDiff = edge[EdgeIndex.x0] - edge[EdgeIndex.x1];
  const yDiff = edge[EdgeIndex.y0] - edge[EdgeIndex.y1];
  const zDiff = edge[EdgeIndex.z0] - edge[EdgeIndex.z1];
  return Math.hypot(xDiff, yDiff, zDiff);
}
