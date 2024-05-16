import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  input,
  viewChild,
} from '@angular/core';
// import { colorCategories } from '@deck.gl/carto';
import 'hra-node-dist-vis/docs/hra-node-dist-vis.wc.js';
import { type ColorMapItem, type Node } from '../../cde-visualization/cde-visualization.component';

interface PreactSignal<T> {
  value: T;
}

interface NodeDistVisElement extends HTMLElement {
  nodes: PreactSignal<Node[]>;
  nodeTargetKey: PreactSignal<string>;
  nodeTargetValue: PreactSignal<string>;
  maxEdgeDistance: PreactSignal<number>;
  colorCoding: PreactSignal<unknown>;
}

@Component({
  selector: 'cde-node-dist-visualization',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './node-dist-visualization.component.html',
  styleUrl: './node-dist-visualization.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NodeDistVisualizationComponent {
  readonly nodes = input.required<Node[]>();
  readonly edges = input<Node[]>();
  readonly anchor = input.required<string>();
  readonly colorMap = input.required<ColorMapItem[]>();

  readonly vis = viewChild<ElementRef<NodeDistVisElement>>('vis');

  readonly visNodes = computed(() =>
    this.nodes().map((node) => ({
      ...node,
      position: [node.x, node.y, node.z ?? 0],
    })),
  );

  readonly visColorCoding = computed(() => {
    // const colorMap = this.colorMap();
    // const domain = colorMap.map((item) => item.cell_type);
    // const colors = colorMap.map((item) => item.cell_color);
    // return (attr: string) =>
    //   colorCategories({
    //     attr,
    //     domain,
    //     colors,
    //     othersColor: [255, 255, 255],
    //     nullColor: [255, 255, 255],
    //   });
  });

  constructor() {
    effect(() => {
      const el = this.vis()?.nativeElement;
      if (el) {
        el.nodes.value = this.visNodes();
        el.nodeTargetKey.value = 'cell_type';
        el.nodeTargetValue.value = this.anchor();
        el.maxEdgeDistance.value = 100;
        // el.colorCoding.value = this.visColorCoding();
      }
    });
  }
}
