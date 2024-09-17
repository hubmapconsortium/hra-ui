// import { computed, inject, Injectable } from '@angular/core';
// import { toObservable, toSignal } from '@angular/core/rxjs-interop';
// import { combineLatest, distinctUntilChanged, ObservableInput, of, Subject, switchMap } from 'rxjs';
// import { EdgeEntry } from '../models/edges';
// import { NodeDataService, NodesData } from './node-data.service';
// import { NodeEntry } from '../models/nodes';
// import { distanceEdges } from '../utils/distance-edges';
// import { fetchCsv } from '../utils/helper';

// export type EdgesInput = string | EdgeEntry[] | undefined;

// export interface EdgesData {
//   edges: EdgeEntry[] | undefined;
//   maxEdgeDistance: number;
// }

// @Injectable()
// export class EdgeDataService {
//   readonly edgesInput = new Subject<EdgesInput>();
//   private readonly loadedEdges = this.edgesInput.pipe(
//     distinctUntilChanged(),
//     switchMap((data) => this.loadEdges(data)),
//   );

//   private readonly nodeDataService = inject(NodeDataService);
//   readonly edges = toSignal(
//     combineLatest([toObservable(this.nodeDataService.nodes), this.loadedEdges]).pipe(
//       switchMap(([nodes, edges]) => this.computeEdges(nodes, edges)),
//     ),
//     {
//       initialValue: undefined,
//     },
//   );

//   private loadEdges(data: EdgesInput): ObservableInput<EdgeEntry[] | undefined> {
//     if (Array.isArray(data)) {
//       return of(data);
//     } else if (typeof data === 'string') {
//       const edgesData = fetchCsv(data, { header: false });
//       edgesData.then((res) => of(res));
//     }
//     return of([]);
//   }

//   private computeEdges(nodesData: NodesData, edgesData: EdgesData): ObservableInput<EdgesData> {
//     if (nodesData.nodes.length === 0) {
//       return of({ edges: undefined, maxEdgeDistance: 0 });
//     } else if (edgesData.edges === undefined) {
//       const { nodes, key, value } = nodesData;
//       const distEdges = distanceEdges(nodes, key, value, edgesData.maxEdgeDistance);
//       //
//     }

//     return of(edgesData);
//   }
// }
