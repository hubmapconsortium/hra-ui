// import { computed, Injectable } from '@angular/core';
// import { toSignal } from '@angular/core/rxjs-interop';
// import { distinctUntilChanged, map, ObservableInput, of, Subject, switchMap, zip } from 'rxjs';
// import { NodeEntry, NodeTargetKey } from '../models/nodes';
// import { fetchCsv } from '../utils/helper';

// export type NodesInput = string | NodeEntry[] | undefined;

// export interface NodesData {
//   nodes: NodeEntry[];
//   key: NodeTargetKey;
//   value: string;
// }

// const EMPTY_DATA: NodesData = {
//   nodes: [],
//   key: '' as NodeTargetKey,
//   value: '',
// };

// // function compareNodesInput(prev: NodesInput, curr: NodesInput): boolean {
// //   return (
// //     (prev.input === curr.input ||
// //       (Array.isArray(prev.input) && prev.input.length === 0 && Array.isArray(curr.input) && curr.input.length === 0)) &&
// //     prev.key === curr.key &&
// //     prev.value === prev.value
// //   );
// // }

// @Injectable()
// export class NodeDataService {
//   private readonly nodesInput$ = new Subject<NodesInput>();
//   private readonly nodesKey$ = new Subject<NodeTargetKey>();
//   private readonly nodesValue$ = new Subject<string>();
//   private readonly nodes$ = this.nodesInput$.pipe(
//     distinctUntilChanged(),
//     switchMap((data) => this.loadNodes(data)),
//     map((nodes) => this.setPositions(nodes)),
//   );

//   readonly nodesData = toSignal(
//     zip(this.nodes$, this.nodesKey$, this.nodesValue$).pipe(
//       map(([nodes, key, value]): NodesData => ({ nodes, key, value })),
//     ),
//     { initialValue: EMPTY_DATA },
//   );
//   readonly nodes = computed(() => this.nodesData().nodes);

//   setInput(input: NodesInput, key: NodeTargetKey, value: string): void {
//     this.nodesInput$.next(input);
//     this.nodesKey$.next(key);
//     this.nodesValue$.next(value);
//   }

//   private loadNodes(data: NodesInput): ObservableInput<NodeEntry[]> {
//     if (Array.isArray(data)) {
//       return of(data);
//     } else if (typeof data === 'string') {
//       const nodeData = this.loadNodesFromCsv(data);
//       nodeData.then((response)=>of(response))
//     }
//     return of([])
//   }

//   private async loadNodesFromCsv(url: string): Promise<NodeEntry[]> {
//     const nodeData = await fetchCsv(url);
//     return nodeData;
//   }

//   private setPositions(nodes: NodeEntry[]): NodeEntry[] {
//     for (const node of nodes) {
//       node.position = [node.x ?? 0, node.y ?? 0, node.z ?? 0];
//     }

//     return nodes;
//   }
// }
