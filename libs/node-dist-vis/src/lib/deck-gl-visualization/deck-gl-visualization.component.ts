import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  input,
  output,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { colorCategories } from '@deck.gl/carto/typed';
import { AccessorFunction, Color, COORDINATE_SYSTEM, Deck, DeckProps, OrbitView, Position } from '@deck.gl/core/typed';
import { DataFilterExtension, DataFilterExtensionProps } from '@deck.gl/extensions/typed';
import { LineLayer, PointCloudLayer } from '@deck.gl/layers/typed';
import { ScaleBarLayer } from '@vivjs/layers';
import { EdgeEntry, EdgeIndex } from '../models/edges';
import { NodeEntry, NodeTargetKey } from '../models/nodes';

type DeckCallbackParameters<Key extends keyof DeckProps> = Parameters<NonNullable<DeckProps[Key]>>;

const NO_HOVER = Symbol();
const ORIGIN: Position = [0, 0, 0];
const COLOR_WHITE: Color = [255, 255, 255];
const SELECTION_RANGE: [number, number] = [0, 10];
const SELECTION_VALUE_INSIDE_RANGE = 5;
const SELECTION_VALUE_OUT_OF_RANGE = 100;

@Component({
  selector: 'hra-deck-gl-visualization',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deck-gl-visualization.component.html',
  styleUrl: './deck-gl-visualization.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeckGlVisualizationComponent {
  readonly nodes = input.required<NodeEntry[]>();
  readonly edges = input.required<EdgeEntry[]>();
  readonly selection = input.required<string[] | undefined>();
  readonly colorMap = input.required<{ domain: string[]; range: Color[] }>();
  readonly nodeTargetKey = input.required<NodeTargetKey>();

  readonly nodeClick = output<NodeEntry>();
  readonly nodeHover = output<NodeEntry | undefined>();

  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly viewState = signal<object>(this.getInitialViewState());
  private readonly activeHover = signal<NodeEntry | typeof NO_HOVER | undefined>(NO_HOVER);

  private viewStateVersionCounter = 0;

  private readonly dimensions = computed(() => {
    let minDimSize = Number.MAX_VALUE;
    let maxDimSize = Number.MIN_VALUE;
    for (const node of this.nodes() ?? []) {
      maxDimSize = Math.max(maxDimSize, ...(node.position ?? []));
      minDimSize = Math.min(minDimSize, ...(node.position ?? []));
    }

    return [minDimSize, maxDimSize] as const;
  });

  private readonly scaleFn = computed(() => {
    const [min, max] = this.dimensions();
    const diff = max - min;
    return ([x, y, z]: Position): Position => [(x - min) / diff, 1 - (y - min) / diff, (z - min) / diff];
  });

  private readonly nodesLayer = computed(() => {
    type ExtraProps = DataFilterExtensionProps<NodeEntry>;

    const targetKey = this.nodeTargetKey();
    return new PointCloudLayer<NodeEntry, ExtraProps>({
      id: 'nodes',
      data: this.nodes(),
      getPosition: this.createScaler((node) => node.position ?? ORIGIN),
      getColor: this.createColorCoding((node) => node[targetKey]),
      pickable: true,
      coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
      pointSize: 1.5,
      getFilterValue: this.createFilter((d) => d[this.nodeTargetKey()]),
      filterRange: SELECTION_RANGE,
      filterEnabled: this.selection() !== undefined,
      extensions: [new DataFilterExtension()],
      updateTriggers: {
        getColor: this.colorMap()?.range,
        getFilterValue: this.selection(),
      },
    });
  });

  private readonly edgesLayer = computed(() => {
    const nodes = this.nodes();
    const targetKey = this.nodeTargetKey();
    const sourceNodeAccessor = (edge: EdgeEntry) => nodes[edge[EdgeIndex.SourceNode]][targetKey];
    const sourcePositionAccessor = (edge: EdgeEntry) =>
      [edge[EdgeIndex.x0], edge[EdgeIndex.y0], edge[EdgeIndex.z0]] satisfies Position;
    const targetPositionAccessor = (edge: EdgeEntry) =>
      [edge[EdgeIndex.x0], edge[EdgeIndex.y0], edge[EdgeIndex.z0]] satisfies Position;

    return new LineLayer({
      id: 'edges',
      data: this.edges(),
      getSourcePosition: this.createScaler(sourcePositionAccessor),
      getTargetPosition: this.createScaler(targetPositionAccessor),
      getColor: this.createColorCoding(sourceNodeAccessor),
      pickable: false,
      coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
      getWidth: 1,
      getFilterValue: this.createFilter(sourceNodeAccessor),
      filterRange: SELECTION_RANGE,
      filterEnabled: this.selection() !== undefined,
      extensions: [new DataFilterExtension()],
      updateTriggers: {
        getColor: this.colorMap()?.range,
        getFilterValue: this.selection(),
      },
    });
  });

  private readonly scaleBarLayer = computed(() => {
    type Props = ConstructorParameters<typeof ScaleBarLayer>[0];
    const { width, height } = this.canvas().nativeElement;
    // Scale 1µm the same way positions are scaled
    const scale = this.scaleFn();
    const size = 1 / scale([1, 1, 1])[0];

    return new ScaleBarLayer({
      id: 'scalebar',
      unit: 'µm',
      size: size,
      position: 'top-right',
      viewState: { ...this.viewState(), width: width - 136, height: height - 32 },
      length: 0.1,
      snap: true,
    } as Props);
  });

  private readonly deck = computed(
    () =>
      new Deck({
        canvas: this.canvas().nativeElement,
        controller: true,
        views: [new OrbitView({ orbitAxis: 'Y' })],
        initialViewState: untracked(this.viewState),
        layers: [],
        getCursor: this.getCursor.bind(this),
        onViewStateChange: this.onViewStateChange.bind(this),
        onClick: this.onClick.bind(this),
        onHover: this.onHover.bind(this),
      }),
  );

  constructor() {
    effect(() => {
      const deck = this.deck();
      deck.setProps({ layers: [this.nodesLayer(), this.edgesLayer(), this.scaleBarLayer()] });
    });

    effect(() => {
      const activeHover = this.activeHover();
      if (activeHover !== NO_HOVER) {
        this.nodeHover.emit(activeHover);
      }
    });
  }

  resetView() {
    this.deck().setProps({ initialViewState: this.getInitialViewState() });
  }

  private createScaler<T>(accessor: (value: T) => Position): AccessorFunction<T, Position> {
    const scale = this.scaleFn();
    return (value) => scale(accessor(value));
  }

  private createFilter<T>(accessor: (value: T) => string): AccessorFunction<T, number> {
    const selection = this.selection();
    const selectionSet = new Set(selection);
    if (selection === undefined) {
      return () => SELECTION_VALUE_INSIDE_RANGE;
    }

    return (value) => (selectionSet.has(accessor(value)) ? SELECTION_VALUE_INSIDE_RANGE : SELECTION_VALUE_OUT_OF_RANGE);
  }

  private createColorCoding<T>(accessor: (value: T) => number | string): AccessorFunction<T, Color> {
    type Color2 = Exclude<Parameters<typeof colorCategories>[0]['colors'], string>[number];
    const { domain, range } = this.colorMap();
    return colorCategories({
      attr: accessor,
      domain: domain,
      colors: range as Color2[],
      othersColor: COLOR_WHITE as Color2,
      nullColor: COLOR_WHITE as Color2,
    }) as AccessorFunction<T, Color>;
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

  private getCursor(...[state]: DeckCallbackParameters<'getCursor'>): string {
    if (this.activeHover()) {
      return 'pointer';
    } else if (state.isDragging) {
      return 'grabbing';
    } else {
      return 'grab';
    }
  }

  private onViewStateChange(...[params]: DeckCallbackParameters<'onViewStateChange'>): void {
    this.viewState.set(params.viewState);
  }

  private onClick(...[info]: DeckCallbackParameters<'onClick'>): void {
    if (info.picked) {
      this.nodeClick.emit(info.object);
    }
  }

  private onHover(...[info]: DeckCallbackParameters<'onHover'>): void {
    this.activeHover.set(info.picked ? info.object : undefined);
  }
}
