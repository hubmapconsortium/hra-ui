// import { CommonModule } from '@angular/common';
// import {
//   ChangeDetectionStrategy,
//   Component,
//   effect,
//   EffectRef,
//   ElementRef,
//   inject,
//   input,
//   Input,
//   OnChanges,
//   OnDestroy,
//   OnInit,
//   output,
//   untracked,
//   ViewChild,
// } from '@angular/core';
// import { Deck, OrbitView } from '@deck.gl/core';
// import Papa from 'papaparse';
// import { EdgeEntry } from '../models/edges';
// import { NodeEntry } from '../models/nodes';
// import { EdgeDataService } from '../services/edge-data.service';
// import { NodeDataService } from '../services/node-data.service';

// @Component({
//   selector: 'hra-node-dist-vis',
//   standalone: true,
//   imports: [CommonModule],
//   providers: [NodeDataService, EdgeDataService],
//   templateUrl: './node-dist-vis.component.html',
//   styleUrl: './node-dist-vis.component.scss',
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class NodeDistVisComponent implements OnInit, OnDestroy, OnChanges {
//   readonly nodes = input<string | NodeEntry[]>();
//   readonly edges = input<string | EdgeEntry[]>();

//   nodesUrl = input<string>();
//   nodesData = input<NodeEntry[]>();
//   edgesUrl = input<string>();
//   edgesData = input<EdgeEntry[]>();
//   colorMapUrl = input<string>();
//   colorMapKey = input<string>('cell_type');
//   colorMapValue = input<string>('cell_color');
//   nodeTargetKey = input<string>();
//   nodeTargetValue = input<string>();
//   maxEdgeDistance = input<number>();
//   dispatchEvent = output<Event>();
//   @Input() selection?: any[];
//   @ViewChild('visCanvas', { static: true }) visCanvas!: ElementRef<HTMLCanvasElement>;

//   toDispose: EffectRef[] = [];
//   initialized = false;
//   edgesVersion = 0;

//   private readonly nodeDataService = inject(NodeDataService);
//   private readonly edgeDataService = inject(EdgeDataService);

//   constructor() {
//     effect(() => {
//       this.nodeDataService.nodesInput.next(this.nodes());
//       this.edgeDataService.edgesInput.next(untracked(this.edges));
//     });

//     effect(() => {
//       this.edgeDataService.edgesInput.next(this.edges());
//     });
//   }

//   private deck!: Deck;
//   // private nodes: NodeEntry[] | undefined = [];
//   private colorCoding: any;

//   static readonly observedAttributes = [
//     'nodes',
//     'edges',
//     'color-map',
//     'color-map-key',
//     'color-map-value',
//     'node-target-key',
//     'node-target-value',
//     'max-edge-distance',
//     'selection',
//   ];

//   private async loadData() {
//     if (this.nodesData) {
//       this.nodes = this.nodesData();
//     } else {
//       this.nodes = await this.fetchCsv(this.nodesUrl() ?? '');
//     }

//     if (this.edgesData) {
//       this.edges = this.edgesData();
//     } else {
//       this.edges = await this.fetchCsv(this.edgesUrl() ?? '');
//     }
//     this.colorCoding = await this.loadColorCoding();
//     this.updateLayers();
//   }

//   private changedCallback(name: string, newValue: string | number) {
//     if (this.initialized) {
//       if (name === 'max-edge-distance' && typeof newValue === 'string') {
//         newValue = parseFloat(newValue);
//       } else if (name === 'selection' && typeof newValue === 'string') {
//         newValue = this.parseSelectionValue(newValue);
//       }
//       this.attributesLookup[name].value = newValue;
//     }
//   }

//   ngOnInit() {
//     this.loadData();
//     this.initializeDeck();
//   }

//   ngOnChanges(): void {
//     this.changedCallback();
//   }
//   ngOnDestroy() {
//     this.toDispose.forEach((dispose) => dispose());
//     this.toDispose = [];
//     this.deck.finalize();
//   }

//   private initializeDeck() {
//     let isHovering = false;
//     let hoveredObject = undefined;
//     this.deck = new Deck({
//       canvas: this.visCanvas.nativeElement,
//       controller: true,
//       views: [new OrbitView({ id: 'orbit', orbitAxis: 'Y' })],
//       initialViewState: this.getInitialViewState(),
//       onClick: (e: Event) => (e.picked ? this.dispatch('nodeClicked', e.object) : undefined),
//       onViewStateChange: ({ viewState }) => (this.viewState.value = viewState),
//       onLoad: () => (this.viewState.value = this.deck.viewState),
//       onHover: (e) => {
//         isHovering = e.picked;
//         if (isHovering) {
//           if (hoveredObject !== e.object) {
//             this.dispatch('nodeHovering', e.object);
//             hoveredObject = e.object;
//           }
//         } else {
//           if (hoveredObject) {
//             this.dispatch('nodeHovering', undefined);
//             hoveredObject = undefined;
//           }
//         }
//       },
//       getCursor: (e) => (isHovering ? 'pointer' : e.isDragging ? 'grabbing' : 'grab'),
//       layers: [],
//     });

//     this.trackDisposal(
//       effect(() => {
//         const layers = [this.nodesLayer.value, this.edgesLayer.value, this.scaleBarLayer.value].filter((l) => !!l);
//         this.deck.setProps({ layers });
//       }),
//     );

//     this.trackDisposal(
//       effect(async () => {
//         this.nodes.value = [];
//         this.nodes.value = await this.nodes$.value;
//         this.dispatch('nodes', this.nodes.value);
//       }),
//     );

//     this.trackDisposal(
//       effect(async () => {
//         this.edges.value = [];
//         const edges = await this.edges$.value;
//         if (edges) {
//           this.edges.value = edges;
//           this.dispatch('edges', this.edges.value);
//         }
//       }),
//     );

//     this.trackDisposal(
//       effect(async () => {
//         const colorCoding = await this.colorCoding$.value;
//         if (colorCoding) {
//           this.colorCoding.value = colorCoding;
//         }
//       }),
//     );

//     batch(() => {
//       this.nodesUrl = this.visCanvas.nativeElement.getAttribute('nodes');
//       this.edgesUrl.value = this.visCanvas.nativeElement.getAttribute('edges');
//       this.colorMapUrl.value = this.visCanvas.nativeElement.getAttribute('color-map');
//       this.colorMapKey.value = this.visCanvas.nativeElement.getAttribute('color-map-key') || 'cell_type';
//       this.colorMapValue.value = this.visCanvas.nativeElement.getAttribute('color-map-value') || 'cell_color';
//       this.nodeTargetKey.value = this.visCanvas.nativeElement.getAttribute('node-target-key');
//       this.nodeTargetValue.value = this.visCanvas.nativeElement.getAttribute('node-target-value');
//       this.maxEdgeDistance.value = parseFloat(this.getAttribute('max-edge-distance'));
//       this.selection.value = this.parseSelectionValue(this.getAttribute('selection'));
//       this.initialized = true;
//     });
//   }

//   trackDisposal(disposable: EffectRef) {
//     this.toDispose.push(disposable);
//   }

//   private parseSelectionValue(value: string) {
//     if (value === '') {
//       return undefined;
//     }
//     return typeof value === 'string' ? JSON.parse(value) : value;
//   }

//   attributesLookup = {
//     nodes: this.nodesUrl,
//     edges: this.edgesUrl,
//     'color-map': this.colorMapUrl,
//     'color-map-key': this.colorMapKey,
//     'color-map-value': this.colorMapValue,
//     'node-target-key': this.nodeTargetKey,
//     'node-target-value': this.nodeTargetValue,
//     'max-edge-distance': this.maxEdgeDistance,
//     selection: this.selection,
//   };

//   viewStateVersionCounter = 0;
//   private getInitialViewState() {
//     return {
//       // ... initial view state configuration
//       version: this.viewStateVersionCounter++,
//       orbitAxis: 'Y',
//       camera: 'orbit',
//       zoom: 9,
//       minRotationX: -90,
//       maxRotationX: 90,
//       rotationX: 0,
//       rotationOrbit: 0,
//       dragMode: 'rotate',
//       target: [0.5, 0.5],
//     };
//   }

//   private async fetchCsv(url: string): Promise<any[]> {
//     return new Promise((resolve) => {
//       Papa.parse(url, {
//         header: true,
//         skipEmptyLines: true,
//         dynamicTyping: true,
//         complete: (results) => {
//           resolve(results.data);
//         },
//       });
//     });
//   }

//   private async loadColorCoding() {
//     // Implement color coding logic
//   }

//   private updateLayers() {
//     const layers = [this.createNodesLayer(), this.createEdgesLayer(), this.createScaleBarLayer()].filter((l) => !!l);

//     this.deck.setProps({ layers });
//   }

//   private createNodesLayer() {
//     // Implement PointCloudLayer creation
//   }

//   private createEdgesLayer() {
//     // Implement LineLayer creation
//   }

//   private createScaleBarLayer() {
//     // Implement ScaleBarLayer creation
//   }

//   private dispatch(eventName: string, payload = undefined) {
//     let event;
//     if (payload) {
//       event = new CustomEvent(eventName, { detail: payload });
//     } else {
//       event = new Event(eventName);
//     }
//     this.dispatchEvent.emit(event);
//   }
// }
