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
import {
  AnyData,
  AnyDataEntry,
  ColorMapEntry,
  ColorMapView,
  EdgeKeysInput,
  EdgesInput,
  KeyMapping,
  loadColorMap,
  loadEdges,
  loadNodeFilter,
  loadNodes,
  NodeFilterInput,
  NodeKeysInput,
  NodesInput,
  ViewMode,
} from '@hra-ui/node-dist-vis/models';
import { createController } from '../deckgl/controller';
import { createDeck } from '../deckgl/deck';
import { createEdgesLayer } from '../deckgl/edges';
import { createNodesLayer } from '../deckgl/nodes';
import { createScaleBarLayer } from '../deckgl/scale-bar';

/** CursorState is not exported by deckgl */
type CursorState = Parameters<NonNullable<DeckProps['getCursor']>>[0];

/** OrbitView's constructor is poorly typed */
type OrbitViewProps = ConstructorParameters<typeof OrbitView>[0] &
  ConstructorParameters<typeof View<OrbitViewState>>[0];

/** Initial visualization deckgl state */
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

/** Node distance visualization */
@Component({
  selector: 'hra-node-dist-vis',
  standalone: true,
  template: '<canvas #canvas></canvas>',
  styles: ':host { display: block; }',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeDistVisComponent {
  /** View mode of the visualization */
  readonly mode = input<ViewMode>('explore');

  /** Node data */
  readonly nodes = input<NodesInput>();
  /** Node key mapping data */
  readonly nodeKeys = input<NodeKeysInput>();
  /** Node target selector used when calculating edges */
  readonly nodeTargetSelector = input<string>(); // TODO default (must take nodeTargetValue into consideration, i.e. don't set default on this input)
  /**
   * Column/property of the node's 'Cell Type' values
   *
   * @deprecated Use `nodeKeys` to specify the column instead
   */
  readonly nodeTargetKey = input<string>();
  /**
   * Node target selector used when calculating edges
   *
   * @deprecated Use `nodeTargetSelector` instead
   */
  readonly nodeTargetValue = input<string>();

  /** Edge data if already calculated */
  readonly edges = input<EdgesInput>();
  /** Edge key mapping data */
  readonly edgeKeys = input<EdgeKeysInput>();
  /** Max distance to consider when calculating edges */
  readonly maxEdgeDistance = input<string | number>(); // TODO default + transform

  /** Color map data */
  readonly colorMap = input<ColorMapView | AnyData | string>();
  /** Color map key mapping data */
  readonly colorMapKeys = input<KeyMapping<ColorMapEntry> | string>();
  /**
   * Column/property of the color map's 'Cell Type' values
   *
   * @deprecated Use `colorMapKeys` to specify the column instead
   */
  readonly colorMapKey = input<string>();
  /**
   * Column/property of the color map's 'Cell Color' values
   *
   * @deprecated Use `colorMapKeys` to specify the column instead
   */
  readonly colorMapValue = input<string>();

  /** Node filter data */
  readonly nodeFilter = input<NodeFilterInput>();
  /**
   * Node 'Cell Type's to display
   *
   * @deprecated Use `nodeFilter`'s `include` property to specify included nodes instead
   */
  readonly selection = input<string[] | string>();

  /** Emits when the user clicks on a node */
  readonly nodeClick = output<AnyDataEntry>();
  /** Emits when the user starts or stops hovering over a node */
  readonly nodeHover = output<AnyDataEntry | undefined>();
  /** Emits when the user selects one or more nodes in the 'select' view mode */
  readonly nodeSelectionChange = output<unknown>(); // TODO fix type

  /** Reference to the rendered canvas element */
  readonly canvas = computed(() => this.canvasElementRef().nativeElement);
  /** Reference to the deckgl instance */
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

  /** Canvas element wrapped inside an `ElementRef` */
  private readonly canvasElementRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  /** Error handler for the application */
  private readonly errorHandler = inject(ErrorHandler);

  /** Current version value of the deckgl view state */
  private viewStateVersion = INITIAL_VIEW_STATE.version;
  /** Current deckgl view state */
  private readonly viewState = signal<object>(INITIAL_VIEW_STATE);

  /** View of the node data */
  private readonly nodesView = loadNodes(this.nodes, this.nodeKeys, this.nodeTargetKey);
  /** View of the edge data */
  private readonly edgesView = loadEdges(this.edges, this.edgeKeys);
  /** View of the color map */
  private readonly colorMapView = loadColorMap(this.colorMap, this.colorMapKeys, this.colorMapKey, this.colorMapValue);
  /** View of the node filter */
  private readonly nodeFilterView = loadNodeFilter(this.nodeFilter, this.selection);

  /** Node layer */
  private readonly nodesLayer = createNodesLayer(this.mode, this.nodesView, this.nodeFilterView, this.colorMapView);
  /** Edge layer */
  private readonly edgesLayer = createEdgesLayer(
    this.nodesView,
    this.edgesView,
    this.nodeFilterView,
    this.colorMapView,
  );
  /** Scale bar layer */
  private readonly scaleBarLayer = createScaleBarLayer(this.nodesView, this.canvas, this.viewState);
  /** All layers as an array */
  private readonly layers = computed(() => [this.nodesLayer(), this.edgesLayer(), this.scaleBarLayer()]);

  /** Controller options */
  private readonly controller = createController(this.mode);
  /** Deckgl props */
  private readonly props = computed((): DeckProps => {
    return {
      controller: this.controller(),
      layers: this.layers(),
    };
  });

  /** Currently hovered node entry */
  private activeHover: AnyDataEntry | undefined = undefined;

  /** Initialize the visualization */
  constructor() {
    effect(() => this.deck().setProps(this.props()));
  }

  /** Resets the view to the original location and rotation */
  resetView(): void {
    this.deck().setProps({
      initialViewState: {
        ...INITIAL_VIEW_STATE,
        version: this.viewStateVersion++,
      },
    });
  }

  /**
   * Creates a blob representing the image in the canvas.
   *
   * @param type Image format (default: image/png)
   * @param quality Image quality, a number between 0 and 1
   * @returns A data blob
   */
  toBlob(type?: string, quality?: number): Promise<Blob | null> {
    return new Promise((resolve) => {
      this.deck().redraw('toDataUrl');
      this.canvas().toBlob(resolve, type, quality);
    });
  }

  /**
   * Get the cursor to display
   *
   * @param state Cursor state
   * @returns Which cursor to display
   */
  private getCursor({ isDragging, isHovering }: CursorState): string {
    if (isDragging) {
      return 'grabbing';
    } else if (isHovering) {
      return 'pointer';
    } else {
      return 'grab';
    }
  }

  /**
   * Handle a click in deckgl
   *
   * @param info Deckgl picking information
   */
  private onClick(info: PickingInfo): void {
    const { picked, index } = info;
    if (picked) {
      this.nodeClick.emit(this.nodesView().at(index));
    }
  }

  /**
   * Handle hovering in deckgl
   *
   * @param info Deckgl picking information
   */
  private onHover(info: PickingInfo): void {
    const { picked, index } = info;
    const obj = picked ? this.nodesView().at(index) : undefined;
    if (obj !== this.activeHover) {
      this.nodeHover.emit(obj);
      this.activeHover = obj;
    }
  }
}
