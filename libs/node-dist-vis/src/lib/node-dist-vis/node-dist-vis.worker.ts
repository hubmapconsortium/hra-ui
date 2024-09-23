/// <reference lib="webworker" />
import { NodeEntry } from '../models/nodes';
import { distanceEdges } from '../utils/distance-edges';

interface WorkerMessage {
  nodes: NodeEntry[];
  type_field: string;
  target_type: string;
  maxDist: number;
}

addEventListener('message', (event: MessageEvent<WorkerMessage>) => {
  const { nodes, type_field, target_type, maxDist } = event.data;
  const edges: any[] = new Array(nodes.length);
  let index = 0;
  const reportStep = Math.floor(nodes.length / 10);

  for (const edge of distanceEdges(nodes, type_field, target_type, maxDist)) {
    edges[index] = edge;
    if (index % reportStep === 0) {
      const percentage = Math.round((index / nodes.length) * 100);
      postMessage({ status: 'processing', percentage, node_index: edge[0] });
    }
    index++;
  }

  postMessage({ status: 'complete', edges: edges.slice(0, index) });
});
