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

type Preactify<T> = {
  [K in keyof T]: { value: T[K] };
};

interface NodeDistVisElementProps {
  nodesData: NodeEntry[];
  nodeTargetKey: string;
  nodeTargetValue: string;

  edgesUrl: string;
  edgesData: EdgeEntry[];
  maxEdgeDistance: number;

  colorMapData: ColorMapEntry[];
  colorMapKey: string;
  colorMapValue: string;

  selection: string[];
}

interface NodeDistVisElement extends HTMLElement, Preactify<NodeDistVisElementProps> {
  resetView(): void;
  toDataUrl(type?: string, quality?: unknown): string | undefined;
}

function isNonEmptyArray<T>(array: T[]): boolean {
  return array.length > 0;
}

@Component({
  selector: 'cde-node-dist-visualization',
  standalone: true,
  imports: [CommonModule, OverlayModule, MatButtonModule, MatIconModule],
  templateUrl: './node-dist-visualization.component.html',
  styleUrl: './node-dist-visualization.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NodeDistVisualizationComponent {
  readonly nodes = model.required<NodeEntry[]>();
  readonly nodeTargetKey = input.required<string>();
  readonly nodeTargetValue = input.required<string>();

  readonly edges = model.required<EdgeEntry[]>();
  readonly maxEdgeDistance = input.required<number>();

  readonly colorMap = input.required<ColorMapEntry[]>();
  readonly colorMapKey = input.required<string>();
  readonly colorMapValue = input.required<string>();

  readonly cellTypesSelection = input.required<string[]>();

  readonly nodeClick = output<NodeEntry>();
  readonly nodeHover = output<NodeEntry | undefined>();

  readonly tooltipPosition = TOOLTIP_POSITION_RIGHT_SIDE;

  tooltipOpen = false;

  private readonly vis = viewChild.required<ElementRef<NodeDistVisElement>>('vis');
  private readonly fileSaver = inject(FileSaverService);

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
    this.bindData('colorMapValue', this.colorMapValue);

    this.bindData('selection', this.cellTypesSelection);
  }

  download(): void {
    const el = this.vis().nativeElement;
    const url = el.toDataUrl();
    if (url) {
      this.fileSaver.save(url, 'cell-distance-vis.png');
    }
  }

  resetView(): void {
    this.vis().nativeElement.resetView();
  }

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
