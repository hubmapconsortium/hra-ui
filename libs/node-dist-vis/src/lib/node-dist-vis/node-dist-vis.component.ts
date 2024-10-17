import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  ErrorHandler,
  inject,
  output,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { DeckProps, OrbitView, PickingInfo } from '@deck.gl/core/typed';
import { createDeck } from '../deckgl/deck';
import { createEdgesLayer } from '../deckgl/layers/edges';
import { createNodesLayer } from '../deckgl/layers/nodes';
import { createScaleBarLayer } from '../deckgl/layers/scale-bar';
import { ColorMapView } from '../models/color-map';
import { AnyDataEntry } from '../models/data-view';
import { EdgesView } from '../models/edges';
import { NodesView } from '../models/nodes';

@Component({
  selector: 'hra-node-dist-vis',
  standalone: true,
  template: '<canvas #canvas></canvas>',
  styles: ':host { display: block; width: 100%; height: 100%; }',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeDistVisComponent {
  readonly nodeClick = output<AnyDataEntry>();
  readonly nodeHover = output<AnyDataEntry | undefined>();

  private readonly nodesView = signal(
    new NodesView(
      [
        { x: 659, y: 72, position: [659, 72, 0], type: 'T-Helper' },
        { x: 178, y: 73, position: [178, 73, 0], type: 'T-Helper' },
        { x: 170, y: 74, position: [170, 74, 0], type: 'T-Helper' },
        { x: 173, y: 75, position: [173, 75, 0], type: 'T-Helper' },
        { x: 174, y: 76, position: [174, 76, 0], type: 'T-Helper' },
      ],
      { 'Cell Type': 'type', X: 'x', Y: 'y' },
    ),
  );
  private readonly edgesView = signal(
    new EdgesView(
      [
        [0, 659, 72, 0, 630, 105, 5],
        [1, 178, 73, 0, 177, 71, 2],
        [2, 170, 74, 0, 166, 79, 2],
        [3, 173, 74, 0, 177, 71, 2],
        [4, 174, 75, 0, 177, 71, 2],
      ],
      { 'Cell ID': 0, X1: 1, Y1: 2, Z1: 3, X2: 4, Y2: 5, Z2: 6 },
    ),
  );
  private readonly colorMapView = signal(
    new ColorMapView([['T-Helper', [112, 165, 168]]], { 'Cell Type': 0, 'Cell Color': 1 }),
  );
  private readonly selection = signal<string[] | undefined>(undefined);

  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly errorHandler = inject(ErrorHandler);

  private viewStateVersionCounter = 0;
  private readonly viewState = signal<object>(this.getInitialViewState());
  private readonly viewSize = computed((): [number, number] => {
    const { width, height } = this.canvas().nativeElement;
    return [width, height];
  });

  private readonly deckProps = computed(
    (): DeckProps => ({
      canvas: this.canvas().nativeElement,
      controller: true,
      views: [new OrbitView({ orbitAxis: 'Y' })],
      initialViewState: untracked(this.viewState),
      layers: [],
      getCursor: ({ isDragging, isHovering }) => this.getCursor(isDragging, isHovering),
      onClick: (info) => this.onClick(info),
      onHover: (info) => this.onHover(info),
      onViewStateChange: ({ viewState }) => this.viewState.set(viewState),
      onError: (error) => this.errorHandler.handleError(error),
    }),
  );
  private readonly deck = createDeck(this.deckProps);

  private readonly nodesLayer = createNodesLayer(this.nodesView, this.selection, this.colorMapView);
  private readonly edgesLayer = createEdgesLayer(this.nodesView, this.edgesView, this.selection, this.colorMapView);
  private readonly scaleBarLayer = createScaleBarLayer(this.nodesView, this.viewSize, this.viewState);
  private readonly layers = computed(() => [this.nodesLayer(), this.edgesLayer(), this.scaleBarLayer()]);

  private activeHover: AnyDataEntry | undefined = undefined;

  constructor() {
    effect(() => this.deck()?.setProps({ layers: this.layers() }));
    inject(DestroyRef).onDestroy(() => this.deck()?.finalize());
  }

  private getInitialViewState() {
    return {
      version: this.viewStateVersionCounter++,
      orbitAxis: 'Y',
      camera: 'orbit',
      zoom: 9,
      minRotationX: -90,
      maxRotationX: 90,
      rotationX: 0,
      rotationOrbit: 0,
      dragMode: 'rotate',
      target: [0.5, 0.5],
    };
  }

  private getCursor(isDragging: boolean, isHovering: boolean): string {
    if (isDragging) {
      return 'grabbing';
    } else if (isHovering) {
      return 'pointer';
    } else {
      return 'grab';
    }
  }

  private onClick(info: PickingInfo): void {
    if (info.picked) {
      this.nodeClick.emit(info.object);
    }
  }

  private onHover(info: PickingInfo): void {
    const obj = info.picked ? info.object : undefined;
    if (obj !== this.activeHover) {
      this.nodeHover.emit(obj);
      this.activeHover = obj;
    }
  }
}

// import { CommonModule } from '@angular/common';
// import {
//   ChangeDetectionStrategy,
//   Component,
//   EffectRef,
//   ElementRef,
//   inject,
//   input,
//   Input,
//   output,
//   ViewChild,
// } from '@angular/core';
// import { EdgeEntry } from '../models/edges';
// import { NodeEntry, NodeTargetKey } from '../models/nodes';
// // import { EdgeDataService } from '../services/edge-data.service';
// import { NodeDataService } from '../services/node-data.service';
// import { DeckGlVisualizationComponent } from '../deck-gl-visualization/deck-gl-visualization.component';

// @Component({
//   selector: 'hra-node-dist-vis',
//   standalone: true,
//   imports: [CommonModule, DeckGlVisualizationComponent],
//   providers: [NodeDataService],
//   templateUrl: './node-dist-vis.component.html',
//   styleUrl: './node-dist-vis.component.scss',
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class NodeDistVisComponent {
//   readonly nodeTargetKey: NodeTargetKey = 'Cell Type' as NodeTargetKey;

//   readonly nodes: NodeEntry[] = [
//     { x: 659, y: 72, position: [659, 72, 0], [this.nodeTargetKey]: 'T-Helper' },
//     { x: 178, y: 73, position: [178, 73, 0], [this.nodeTargetKey]: 'T-Helper' },
//     { x: 170, y: 74, position: [170, 74, 0], [this.nodeTargetKey]: 'T-Helper' },
//     { x: 173, y: 75, position: [173, 75, 0], [this.nodeTargetKey]: 'T-Helper' },
//     { x: 174, y: 76, position: [174, 76, 0], [this.nodeTargetKey]: 'T-Helper' },
//   ] as NodeEntry[];

//   readonly edges: EdgeEntry[] = [
//     [0, 659, 72, 0, 630, 105, 5],
//     [1, 178, 73, 0, 177, 71, 2],
//     [2, 170, 74, 0, 166, 79, 2],
//     [3, 173, 74, 0, 177, 71, 2],
//     [4, 174, 75, 0, 177, 71, 2],
//   ];

//   readonly selection: string[] = ['T-Helper'];
//   readonly colorMap: { domain: string[]; range: [[number, number, number]] } = {
//     domain: ['T-Helper'],
//     range: [[112, 165, 168]],
//   };

//   // log<T>(label: string, value: T): T {
//   //   console.log(label, value);
//   //   return value;
//   // }

//   // readonly nodes = input<string | NodeEntry[]>();
//   // readonly edges = input<string | EdgeEntry[]>();

//   // nodesUrl = input<string>();
//   // nodesData = input<NodeEntry[]>();
//   // edgesUrl = input<string>();
//   // edgesData = input<EdgeEntry[]>();
//   // colorMapUrl = input<string>();
//   // colorMapKey = input<string>('cell_type');
//   // colorMapValue = input<string>('cell_color');
//   // nodeTargetKey = input<string>();
//   // nodeTargetValue = input<string>();
//   // maxEdgeDistance = input<number>();
//   // dispatchEvent = output<Event>();
//   // @Input() selection?: any[];
//   // @ViewChild('visCanvas', { static: true }) visCanvas!: ElementRef<HTMLCanvasElement>;

//   // toDispose: EffectRef[] = [];
//   // initialized = false;
//   // edgesVersion = 0;

//   // private readonly nodeDataService = inject(NodeDataService);
//   // private readonly edgeDataService = inject(EdgeDataService);

//   // constructor() {
//   //   console.log(this)
//   // }

//   // constructor() {
//   //   effect(() => {
//   //     this.nodeDataService.nodesInput.next(this.nodes());
//   //     this.edgeDataService.edgesInput.next(untracked(this.edges));
//   //   });

//   //   effect(() => {
//   //     this.edgeDataService.edgesInput.next(this.edges());
//   //   });
//   // }

//   // private deck!: Deck;
//   // // private nodes: NodeEntry[] | undefined = [];
//   // private colorCoding: any;

//   // static readonly observedAttributes = [
//   //   'nodes',
//   //   'edges',
//   //   'color-map',
//   //   'color-map-key',
//   //   'color-map-value',
//   //   'node-target-key',
//   //   'node-target-value',
//   //   'max-edge-distance',
//   //   'selection',
//   // ];

//   // private async loadData() {
//   //   if (this.nodesData) {
//   //     this.nodes = this.nodesData();
//   //   } else {
//   //     this.nodes = await this.fetchCsv(this.nodesUrl() ?? '');
//   //   }

//   //   if (this.edgesData) {
//   //     this.edges = this.edgesData();
//   //   } else {
//   //     this.edges = await this.fetchCsv(this.edgesUrl() ?? '');
//   //   }
//   //   this.colorCoding = await this.loadColorCoding();
//   //   this.updateLayers();
//   // }

//   // // private changedCallback(name: string, newValue: string | number) {
//   // //   if (this.initialized) {
//   // //     if (name === 'max-edge-distance' && typeof newValue === 'string') {
//   // //       newValue = parseFloat(newValue);
//   // //     } else if (name === 'selection' && typeof newValue === 'string') {
//   // //       newValue = this.parseSelectionValue(newValue);
//   // //     }
//   // //     this.attributesLookup[name].value = newValue;
//   // //   }
//   // // }

//   // ngOnInit() {
//   //   this.loadData();
//   //   // this.initializeDeck();
//   // }

//   // ngOnChanges(): void {
//   //   // this.changedCallback();
//   // }
//   // ngOnDestroy() {
//   //   // this.toDispose.forEach((dispose) => dispose());
//   //   this.toDispose = [];
//   //   this.deck.finalize();
//   // }

//   // // private initializeDeck() {
//   // //   let isHovering = false;
//   // //   let hoveredObject = undefined;
//   // //   this.deck = new Deck({
//   // //     canvas: this.visCanvas.nativeElement,
//   // //     controller: true,
//   // //     views: [new OrbitView({ id: 'orbit', orbitAxis: 'Y' })],
//   // //     initialViewState: this.getInitialViewState(),
//   // //     onClick: (e: Event) => (e.picked ? this.dispatch('nodeClicked', e.object) : undefined),
//   // //     onViewStateChange: ({ viewState }) => (this.viewState.value = viewState),
//   // //     onLoad: () => (this.viewState.value = this.deck.viewState),
//   // //     onHover: (e) => {
//   // //       isHovering = e.picked;
//   // //       if (isHovering) {
//   // //         if (hoveredObject !== e.object) {
//   // //           this.dispatch('nodeHovering', e.object);
//   // //           hoveredObject = e.object;
//   // //         }
//   // //       } else {
//   // //         if (hoveredObject) {
//   // //           this.dispatch('nodeHovering', undefined);
//   // //           hoveredObject = undefined;
//   // //         }
//   // //       }
//   // //     },
//   // //     getCursor: (e) => (isHovering ? 'pointer' : e.isDragging ? 'grabbing' : 'grab'),
//   // //     layers: [],
//   // //   });

//   // //   this.trackDisposal(
//   // //     effect(() => {
//   // //       const layers = [this.nodesLayer.value, this.edgesLayer.value, this.scaleBarLayer.value].filter((l) => !!l);
//   // //       this.deck.setProps({ layers });
//   // //     }),
//   // //   );

//   // //   this.trackDisposal(
//   // //     effect(async () => {
//   // //       this.nodes.value = [];
//   // //       this.nodes.value = await this.nodes$.value;
//   // //       this.dispatch('nodes', this.nodes.value);
//   // //     }),
//   // //   );

//   // //   this.trackDisposal(
//   // //     effect(async () => {
//   // //       this.edges.value = [];
//   // //       const edges = await this.edges$.value;
//   // //       if (edges) {
//   // //         this.edges.value = edges;
//   // //         this.dispatch('edges', this.edges.value);
//   // //       }
//   // //     }),
//   // //   );

//   // //   this.trackDisposal(
//   // //     effect(async () => {
//   // //       const colorCoding = await this.colorCoding$.value;
//   // //       if (colorCoding) {
//   // //         this.colorCoding.value = colorCoding;
//   // //       }
//   // //     }),
//   // //   );

//   //   // batch(() => {
//   //   //   this.nodesUrl = this.visCanvas.nativeElement.getAttribute('nodes');
//   //   //   this.edgesUrl.value = this.visCanvas.nativeElement.getAttribute('edges');
//   //   //   this.colorMapUrl.value = this.visCanvas.nativeElement.getAttribute('color-map');
//   //   //   this.colorMapKey.value = this.visCanvas.nativeElement.getAttribute('color-map-key') || 'cell_type';
//   //   //   this.colorMapValue.value = this.visCanvas.nativeElement.getAttribute('color-map-value') || 'cell_color';
//   //   //   this.nodeTargetKey.value = this.visCanvas.nativeElement.getAttribute('node-target-key');
//   //   //   this.nodeTargetValue.value = this.visCanvas.nativeElement.getAttribute('node-target-value');
//   //   //   this.maxEdgeDistance.value = parseFloat(this.getAttribute('max-edge-distance'));
//   //   //   this.selection.value = this.parseSelectionValue(this.getAttribute('selection'));
//   //   //   this.initialized = true;
//   //   // });
//   // }

//   // trackDisposal(disposable: EffectRef) {
//   //   this.toDispose.push(disposable);
//   // }

//   // private parseSelectionValue(value: string) {
//   //   if (value === '') {
//   //     return undefined;
//   //   }
//   //   return typeof value === 'string' ? JSON.parse(value) : value;
//   // }

//   // attributesLookup = {
//   //   nodes: this.nodesUrl,
//   //   edges: this.edgesUrl,
//   //   'color-map': this.colorMapUrl,
//   //   'color-map-key': this.colorMapKey,
//   //   'color-map-value': this.colorMapValue,
//   //   'node-target-key': this.nodeTargetKey,
//   //   'node-target-value': this.nodeTargetValue,
//   //   'max-edge-distance': this.maxEdgeDistance,
//   //   selection: this.selection,
//   // };

//   // viewStateVersionCounter = 0;
//   // private getInitialViewState() {
//   //   return {
//   //     // ... initial view state configuration
//   //     version: this.viewStateVersionCounter++,
//   //     orbitAxis: 'Y',
//   //     camera: 'orbit',
//   //     zoom: 9,
//   //     minRotationX: -90,
//   //     maxRotationX: 90,
//   //     rotationX: 0,
//   //     rotationOrbit: 0,
//   //     dragMode: 'rotate',
//   //     target: [0.5, 0.5],
//   //   };
//   // }

//   // private async fetchCsv(url: string): Promise<any[]> {
//   //   return new Promise((resolve) => {
//   //     Papa.parse(url, {
//   //       header: true,
//   //       skipEmptyLines: true,
//   //       dynamicTyping: true,
//   //       complete: (results) => {
//   //         resolve(results.data);
//   //       },
//   //     });
//   //   });
//   // }

//   // private async loadColorCoding() {
//   //   // Implement color coding logic
//   // }

//   // private updateLayers() {
//   //   const layers = [this.createNodesLayer(), this.createEdgesLayer(), this.createScaleBarLayer()].filter((l) => !!l);

//   //   this.deck.setProps({ layers });
//   // }

//   // private createNodesLayer() {
//   //   // Implement PointCloudLayer creation
//   // }

//   // private createEdgesLayer() {
//   //   // Implement LineLayer creation
//   // }

//   // private createScaleBarLayer() {
//   //   // Implement ScaleBarLayer creation
//   // }

//   // private dispatch(eventName: string, payload = undefined) {
//   //   let event;
//   //   if (payload) {
//   //     event = new CustomEvent(eventName, { detail: payload });
//   //   } else {
//   //     event = new Event(eventName);
//   //   }
//   //   this.dispatchEvent.emit(event);
//   // }
// }
