/// <reference lib="webworker" />
import { NodesView } from '../nodes';
import { EdgeEntry } from './edges';
import { generateEdges, InitializeMessage, ProgressMessage, ResultMessage } from './generator';

function createProgressMessage(processed: number, total: number): ProgressMessage {
  return {
    type: 'progress',
    processed,
    total,
    timestamp: Date.now(),
  };
}

function createResultMessage(edges: EdgeEntry[]): ResultMessage {
  return {
    type: 'result',
    edges: {
      data: edges,
      keyMapping: {
        'Cell ID': 'Cell ID',
        'Target ID': 'Target ID',
        X1: 'X1',
        Y1: 'Y1',
        Z1: 'Z1',
        X2: 'X2',
        Y2: 'Y2',
        Z2: 'Z2',
      },
      offset: 0,
    },
  };
}

addEventListener('message', (msg: MessageEvent<InitializeMessage>) => {
  const {
    nodes: { data, keyMapping, offset },
    targetSelector,
    maxDistance,
    reportStep = Math.floor(data.length / 20),
  } = msg.data;
  const view = new NodesView(data, keyMapping, offset);
  const { length } = view;
  const edges: EdgeEntry[] = [];

  postMessage(createProgressMessage(0, length));
  for (const edge of generateEdges(view, targetSelector, maxDistance)) {
    edges.push(edge);
    if (edges.length % reportStep === 0) {
      postMessage(createProgressMessage(edges.length, length));
    }
  }

  postMessage(createProgressMessage(length, length));
  postMessage(createResultMessage(edges));
});
