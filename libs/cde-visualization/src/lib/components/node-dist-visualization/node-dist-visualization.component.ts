import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  effect,
  input,
  model,
  viewChild,
  Signal,
} from '@angular/core';
import 'hra-node-dist-vis/docs/hra-node-dist-vis.wc.js';
import { type ColorMapItem } from '../../cde-visualization/cde-visualization.component';
import { ConnectionPositionPair, OverlayModule } from '@angular/cdk/overlay';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EdgeEntry, NodeEntry } from '../../models/data';

interface PreactSignal<T> {
  value: T;
}

type PreactSignalValue<T> = T extends PreactSignal<infer U> ? U : never;

interface NodeDistVisElementProps {
  nodesData: PreactSignal<NodeEntry[]>;
  edgesUrl: PreactSignal<string>;
  edgesData: PreactSignal<EdgeEntry[]>;
  nodeTargetKey: PreactSignal<string>;
  nodeTargetValue: PreactSignal<string>;
  maxEdgeDistance: PreactSignal<number>;
  colorMapData: PreactSignal<unknown>;
}

interface NodeDistVisElement extends HTMLElement, NodeDistVisElementProps {}

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
  readonly nodes = input.required<NodeEntry[]>();
  readonly edges = model.required<string | EdgeEntry[]>();
  readonly anchor = input.required<string>();
  readonly colorMap = input.required<ColorMapItem[]>();

  private readonly vis = viewChild<ElementRef<NodeDistVisElement>>('vis');
  visInfoOpen = false;

  overlayPositions: ConnectionPositionPair[] = [
    {
      originX: 'end',
      overlayX: 'start',
      originY: 'top',
      overlayY: 'top',
    },
  ];

  constructor() {
    this.initializeDataBindings();
    this.initializeOutputEvents();
  }

  private initializeDataBindings(): void {
    this.bindData('nodesData', this.nodes);
    this.bindData('nodeTargetValue', this.anchor);
    this.bindData('colorMapData', this.colorMap);
    effect(() => console.log(this.vis()?.nativeElement));

    effect(() => {
      const el = this.vis()?.nativeElement;
      if (el) {
        const edges = this.edges();
        if (typeof edges === 'string') {
          el.edgesUrl.value = edges;
        } else if (edges.length > 0) {
          el.edgesData.value = edges;
        }
      }
    });
  }

  private initializeOutputEvents(): void {
    const ref = effect(() => {
      const el = this.vis()?.nativeElement;
      if (el) {
        el.addEventListener('edges', (event) => {
          const customEvent = event as CustomEvent;
          if (customEvent.detail) {
            this.edges.set(customEvent.detail);
          }
        });
        ref.destroy();
      }
    });
  }

  private bindData<K extends keyof NodeDistVisElementProps>(
    prop: K,
    value: Signal<PreactSignalValue<NodeDistVisElementProps[K]>>,
  ): void {
    effect(() => {
      const el = this.vis()?.nativeElement;
      if (el) {
        el[prop].value = value();
      }
    });
  }
}
