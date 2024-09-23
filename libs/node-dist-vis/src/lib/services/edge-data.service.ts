import { inject, Injectable } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, distinctUntilChanged, ObservableInput, of, Subject, switchMap } from 'rxjs';
import { EdgeEntry } from '../models/edges';
import { NodeEntry, NodeTargetKey } from '../models/nodes';
import { fetchCsv } from '../utils/helper';
import { NodeDataService, NodesData } from './node-data.service';

export type EdgesInput = string | EdgeEntry[] | undefined;

export interface EdgesData {
  edges: EdgeEntry[] | undefined;
  maxEdgeDistance: number;
}

@Injectable()
export class EdgeDataService {
  readonly edgesInput = new Subject<EdgesInput>();
  private readonly loadedEdges = this.edgesInput.pipe(
    distinctUntilChanged(),
    switchMap((data) => this.loadEdges(data)),
  );

  private readonly nodeDataService = inject(NodeDataService);
  readonly edges = toSignal(
    combineLatest([toObservable(this.nodeDataService.nodesData), this.loadedEdges]).pipe(
      switchMap(([nodes, edges]) => this.computeEdges(nodes, { edges, maxEdgeDistance: 0 })),
    ),
    {
      initialValue: undefined,
    },
  );

  private loadEdges(data: EdgesInput): ObservableInput<EdgeEntry[] | undefined> {
    if (Array.isArray(data)) {
      return of(data);
    } else if (typeof data === 'string') {
      const edgesData = fetchCsv(data, { header: false });
      edgesData.then((res) => of(res));
    }
    return of([]);
  }

  private async customDistanceEdges(nodes: NodeEntry[], key: NodeTargetKey, value: string, maxEdgeDist: number) {
    if (typeof Worker !== 'undefined') {
      const worker = new Worker(new URL('../node-dist-vis/node-dist-vis.worker', import.meta.url));
      return new Promise((resolve) => {
        worker.onmessage = (e) => {
          if (e.data.status === 'processing') {
            console.log(`Computing edges; ${e.data.percentage}% complete.`);
          } else if (e.data.status === 'complete') {
            resolve(e.data.edges);
            worker.terminate();
          }
        };
        worker.postMessage({ nodes, key, value, maxEdgeDist });
      });
    } else {
      return;
      // Web workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }

  private computeEdges(nodesData: NodesData, edgesData: EdgesData): ObservableInput<EdgesData> {
    if (nodesData.nodes.length === 0) {
      return of({ edges: undefined, maxEdgeDistance: 0 });
    } else if (edgesData.edges === undefined) {
      const { nodes, key, value } = nodesData;
      const distEdges = this.customDistanceEdges(nodes, key, value, edgesData.maxEdgeDistance);
      distEdges.then((res) => of(res));
    }

    return of(edgesData);
  }
}
