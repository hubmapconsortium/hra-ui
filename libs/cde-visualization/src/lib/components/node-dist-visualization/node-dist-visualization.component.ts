import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OutputEmitterRef,
  Signal,
  WritableSignal,
  effect,
  inject,
  input,
  isSignal,
  model,
  output,
  viewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import 'hra-node-dist-vis/docs/hra-node-dist-vis.wc.js';
import { ColorMapEntry } from '../../models/color-map';
import { EdgeEntry } from '../../models/edge';
import { NodeEntry } from '../../models/node';
import { FileSaverService } from '../../services/file-saver/file-saver.service';
import { TOOLTIP_POSITION_RIGHT_SIDE } from '../../shared/tooltip-position';

/** Utility type to convert properties of an object into an object with a value wrapper */
type Preactify<T> = {
  [K in keyof T]: { value: T[K] };
};

/** Interface for properties required by the Node Distribution Visualization element */
interface NodeDistVisElementProps {
  /** Array of Node Entries to visualize */
  nodesData: NodeEntry[];
  /** Key used to identify the target node */
  nodeTargetKey: string;
  /** Value associated with the target node */
  nodeTargetValue: string;
  /** URL for the edges data (if applicable) */
  edgesUrl: string;
  /** Array of Edge Entries that connect the nodes */
  edgesData: EdgeEntry[];
  /** Maximum distance allowed for edges in the visualization */
  maxEdgeDistance: number;
  /** Array of color map entries for visualizing nodes */
  colorMapData: ColorMapEntry[];
  /** Key in the color map used to identify colors */
  colorMapKey: string;
  /** Value key in the color map used to map colors to node values */
  colorMapValue: string;
  /** Array of selected cell types for filtering the visualization */
  selection: string[];
}

/** Extended HTMLElement for Node Distribution Visualization with specific properties and methods */
interface NodeDistVisElement extends HTMLElement, Preactify<NodeDistVisElementProps> {
  /** Method to reset the visualization view */
  resetView(): void;
  /** Method to get data URL of the visualization */
  toDataUrl(type?: string, quality?: unknown): string | undefined;
}

/** Checks if an array is non-empty */
function isNonEmptyArray<T>(array: T[]): boolean {
  return array.length > 0;
}

/**
 * Component for Node Distribution Visualization
 */
@Component({
  selector: 'cde-node-dist-visualization',
  standalone: true,
  imports: [CommonModule, OverlayModule, MatButtonModule, MatIconModule],
  templateUrl: './node-dist-visualization.component.html',
  styleUrl: './node-dist-visualization.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Allows custom elements in the template
})
export class NodeDistVisualizationComponent {
  /** Input for the array of Node Entries */
  readonly nodes = model.required<NodeEntry[]>();

  /** Input for the key used to target nodes */
  readonly nodeTargetKey = input.required<string>();

  /** Input for the value used to target nodes */
  readonly nodeTargetValue = input.required<string>();

  /** Input for the array of Edge Entries */
  readonly edges = model.required<EdgeEntry[]>();

  /** Input for the maximum edge distance */
  readonly maxEdgeDistance = input.required<number>();

  /** Input for the color map data */
  readonly colorMap = input.required<ColorMapEntry[]>();

  /** Input for the key in the color map */
  readonly colorMapKey = input.required<string>();

  /** Input for the value key in the color map */
  readonly colorMapValueKey = input.required<string>();

  /** Input for selected cell types */
  readonly cellTypesSelection = input.required<string[]>();

  /** Output emitter for node click events */
  readonly nodeClick = output<NodeEntry>();

  /** Output emitter for node hover events */
  readonly nodeHover = output<NodeEntry | undefined>();

  /** Tooltip position constant */
  readonly tooltipPosition = TOOLTIP_POSITION_RIGHT_SIDE;

  /** Flag to check if the tooltip is open */
  tooltipOpen = false;

  /** Reference to the visualization element */
  private readonly vis = viewChild.required<ElementRef<NodeDistVisElement>>('vis');

  /** Service to handle file saving */
  private readonly fileSaver = inject(FileSaverService);

  /** Bind data and events to the visualization element */
  constructor() {
    this.bindData('nodesData', this.nodes, isNonEmptyArray);
    this.bindData('nodeTargetKey', this.nodeTargetKey);
    this.bindData('nodeTargetValue', this.nodeTargetValue);
    this.bindEvent('nodes', this.nodes, isNonEmptyArray);
    this.bindEvent('nodeClicked', this.nodeClick);
    this.bindEvent('nodeHovering', this.nodeHover);

    this.bindData('edgesData', this.edges, isNonEmptyArray);
    this.bindData('maxEdgeDistance', this.maxEdgeDistance);
    this.bindEvent('edges', this.edges, isNonEmptyArray);

    this.bindData('colorMapData', this.colorMap, isNonEmptyArray);
    this.bindData('colorMapKey', this.colorMapKey);
    this.bindData('colorMapValue', this.colorMapValueKey);

    this.bindData('selection', this.cellTypesSelection);
  }

  /** Downloads the visualization as an image */
  download(): void {
    const el = this.vis().nativeElement;
    const url = el.toDataUrl();
    if (url) {
      this.fileSaver.save(url, 'cell-distance-vis.png');
    }
  }

  /** Resets the visualization view */
  resetView(): void {
    this.vis().nativeElement.resetView();
  }

  /** Binds a property from the visualization element to a signal */
  private bindData<K extends keyof NodeDistVisElementProps>(
    prop: K,
    value: Signal<NodeDistVisElementProps[K]>,
    selector?: (value: NodeDistVisElementProps[K]) => boolean,
  ): void {
    effect(() => {
      const el = this.vis().nativeElement;
      const data = value();
      if (selector === undefined || selector(data)) {
        el[prop].value = data;
      }
    });
  }

  /** Binds an event from the visualization element to an output emitter */
  private bindEvent<T>(
    type: string,
    outputRef: OutputEmitterRef<T> | WritableSignal<T>,
    selector?: (value: T) => boolean,
  ): void {
    const emit = isSignal(outputRef)
      ? (value: T) => outputRef() !== value && outputRef.set(value)
      : (value: T) => outputRef.emit(value);

    effect((onCleanup) => {
      const el = this.vis().nativeElement;
      const handler = (event: Event) => {
        const { detail: data } = event as CustomEvent;
        if (selector === undefined || selector(data)) {
          emit(data);
        }
      };

      el.addEventListener(type, handler);
      onCleanup(() => el.removeEventListener(type, handler));
    });
  }
}
