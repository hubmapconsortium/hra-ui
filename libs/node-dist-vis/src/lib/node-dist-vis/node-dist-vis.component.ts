import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  ErrorHandler,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { DeckProps, OrbitView, OrbitViewState, PickingInfo, View } from '@deck.gl/core/typed';
import { createController } from '../deckgl/controller';
import { createDeck } from '../deckgl/deck';
import { createEdgesLayer } from '../deckgl/edges';
import { createNodesLayer } from '../deckgl/nodes';
import { createScaleBarLayer } from '../deckgl/scale-bar';
import { ColorMapEntry, ColorMapView, loadColorMap } from '../models/color-map';
import { AnyData, AnyDataEntry, KeyMapping } from '../models/data-view';
import { EdgeKeysInput, EdgesInput, EdgesView, loadEdges } from '../models/edges';
import { loadNodeFilter, NodeFilterInput } from '../models/filters';
import { loadNodes, NodeKeysInput, NodesInput, NodesView } from '../models/nodes';
import { ViewMode } from '../models/view-mode';

// CursorState is not exported by deckgl
type CursorState = Parameters<NonNullable<DeckProps['getCursor']>>[0];

// OrbitView's constructor is poorly typed
type OrbitViewProps = ConstructorParameters<typeof OrbitView>[0] &
  ConstructorParameters<typeof View<OrbitViewState>>[0];

const INITIAL_VIEW_STATE = {
  version: 0,
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

const TEST_NODES = new NodesView(
  [
    { x: 659, y: 72, position: [659, 72, 0], 'Cell Type': 'T-Helper' },
    { x: 178, y: 73, position: [178, 73, 0], 'Cell Type': 'T-Helper' },
    { x: 170, y: 74, position: [170, 74, 0], 'Cell Type': 'T-Helper' },
    { x: 173, y: 75, position: [173, 75, 0], 'Cell Type': 'T-Helper' },
    { x: 174, y: 76, position: [174, 76, 0], 'Cell Type': 'T-Helper' },
  ],
  { 'Cell Type': 'Cell Type', X: 'x', Y: 'y' },
);

const TEST_EDGES = new EdgesView(
  [
    [0, 659, 72, 0, 630, 105, 5],
    [1, 178, 73, 0, 177, 71, 2],
    [2, 170, 74, 0, 166, 79, 2],
    [3, 173, 74, 0, 177, 71, 2],
    [4, 174, 75, 0, 177, 71, 2],
  ],
  { 'Cell ID': 0, X1: 1, Y1: 2, Z1: 3, X2: 4, Y2: 5, Z2: 6 },
);

const TEST_COLOR_MAP = new ColorMapView([['T-Helper', [112, 165, 168]]], { 'Cell Type': 0, 'Cell Color': 1 });

@Component({
  selector: 'hra-node-dist-vis',
  standalone: true,
  template: '<canvas #canvas></canvas>',
  styles: ':host { display: block; }',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeDistVisComponent {
  readonly mode = input<ViewMode>('explore');

  readonly nodes = input<NodesInput>(TEST_NODES); // TODO remove default
  readonly nodeKeys = input<NodeKeysInput>();
  readonly nodeTargetSelector = input<string>(); // TODO default (must take nodeTargetValue into consideration, i.e. don't set default on this input)
  /** @deprecated */
  readonly nodeTargetKey = input<string>();
  /** @deprecated */
  readonly nodeTargetValue = input<string>();

  readonly edges = input<EdgesInput>(TEST_EDGES); // TODO remove default
  readonly edgeKeys = input<EdgeKeysInput>();
  readonly maxEdgeDistance = input<string | number>(); // TODO default + transform

  readonly colorMap = input<ColorMapView | AnyData | string>(TEST_COLOR_MAP); // TODO remove default
  readonly colorMapKeys = input<KeyMapping<ColorMapEntry> | string>();
  /** @deprecated */
  readonly colorMapKey = input<string>();
  /** @deprecated */
  readonly colorMapValue = input<string>();

  readonly nodeFilter = input<NodeFilterInput>();
  /** @deprecated */
  readonly selection = input<string[] | string>();

  readonly nodeClick = output<AnyDataEntry>();
  readonly nodeHover = output<AnyDataEntry | undefined>();
  readonly nodeSelectionChange = output<unknown>(); // TODO fix type

  readonly canvas = computed(() => this.canvasElementRef().nativeElement);
  readonly deck = createDeck(this.canvas, {
    controller: true,
    views: new OrbitView({ id: 'orbit', orbitAxis: 'Y' } as OrbitViewProps),
    initialViewState: INITIAL_VIEW_STATE,
    layers: [],
    getCursor: this.getCursor.bind(this),
    onClick: this.onClick.bind(this),
    onHover: this.onHover.bind(this),
    onViewStateChange: ({ viewState }) => this.viewState.set(viewState),
    onError: (error) => this.errorHandler.handleError(error),
  });

  private readonly canvasElementRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly errorHandler = inject(ErrorHandler);

  private viewStateVersion = INITIAL_VIEW_STATE.version;
  private readonly viewState = signal<object>(INITIAL_VIEW_STATE);

  private readonly nodesView = loadNodes(this.nodes, this.nodeKeys, this.nodeTargetKey);
  private readonly edgesView = loadEdges(this.edges, this.edgeKeys);
  private readonly colorMapView = loadColorMap(this.colorMap, this.colorMapKeys, this.colorMapKey, this.colorMapValue);
  private readonly nodeFilterView = loadNodeFilter(this.nodeFilter, this.selection);

  private readonly nodesLayer = createNodesLayer(this.mode, this.nodesView, this.nodeFilterView, this.colorMapView);
  private readonly edgesLayer = createEdgesLayer(
    this.nodesView,
    this.edgesView,
    this.nodeFilterView,
    this.colorMapView,
  );
  private readonly scaleBarLayer = createScaleBarLayer(this.nodesView, this.canvas, this.viewState);
  private readonly layers = computed(() => [this.nodesLayer(), this.edgesLayer(), this.scaleBarLayer()]);

  private readonly controller = createController(this.mode);
  private readonly props = computed((): DeckProps => {
    return {
      controller: this.controller(),
      layers: this.layers(),
    };
  });

  private activeHover: AnyDataEntry | undefined = undefined;

  constructor() {
    effect(() => this.deck().setProps(this.props()));
    console.log(this); // TODO remove me!!!
  }

  resetView(): void {
    this.deck().setProps({
      initialViewState: {
        ...INITIAL_VIEW_STATE,
        version: this.viewStateVersion++,
      },
    });
  }

  private getCursor({ isDragging, isHovering }: CursorState): string {
    if (isDragging) {
      return 'grabbing';
    } else if (isHovering) {
      return 'pointer';
    } else {
      return 'grab';
    }
  }

  private onClick(info: PickingInfo): void {
    const { picked, index } = info;
    if (picked) {
      this.nodeClick.emit(this.nodesView().at(index));
    }
  }

  private onHover(info: PickingInfo): void {
    const { picked, index } = info;
    const obj = picked ? this.nodesView().at(index) : undefined;
    if (obj !== this.activeHover) {
      this.nodeHover.emit(obj);
      this.activeHover = obj;
    }
  }
}
