import { CommonModule, DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Renderer2,
  computed,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_EXPANSION_PANEL_DEFAULT_OPTIONS,
  MatExpansionModule,
  MatExpansionPanelDefaultOptions,
} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ColorPickerModule } from 'ngx-color-picker';
import { View } from 'vega';
import embed, { VisualizationSpec } from 'vega-embed';
import { EdgeEntry, NodeEntry } from '../../models/data';
import histogramSpec from './histogram.vl.json';

interface DistanceEntry {
  type: string;
  distance: number;
  sourceNode: NodeEntry;
  edge: EdgeEntry;
}

const HISTOGRAM_FONTS = ['12px Metropolis', '14px Metropolis'];
const ALL_CELLS_TYPE = 'All Cells';

function getEdgeDistance(edge: EdgeEntry): number {
  const { x0, x1, y0, y1, z0, z1 } = edge;
  return Math.hypot(x0 - x1, y0 - y1, z0 - z1);
}

@Component({
  selector: 'cde-histogram',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatExpansionModule, ColorPickerModule],
  providers: [
    {
      provide: MAT_EXPANSION_PANEL_DEFAULT_OPTIONS,
      useValue: {
        collapsedHeight: '56px',
        expandedHeight: '60px',
        hideToggle: true,
      } satisfies MatExpansionPanelDefaultOptions,
    },
  ],
  templateUrl: './histogram.component.html',
  styleUrl: './histogram.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistogramComponent {
  readonly nodes = input.required<NodeEntry[]>();
  readonly edges = input.required<EdgeEntry[]>();
  readonly anchor = input<string>();

  private readonly document = inject(DOCUMENT);
  private readonly renderer = inject(Renderer2);
  private readonly histogramEl = viewChild<ElementRef>('histogram');
  private readonly view = signal<View | undefined>(undefined);

  private readonly distances = computed(() => this.computeDistances());
  private readonly data = computed(() => this.computeData());

  constructor() {
    this.initializeHistogram();
    this.initializeDataBindings();
    console.log(this);
  }

  async download(_format: string): Promise<void> {
    // TODO
  }

  private initializeHistogram(): void {
    effect(
      async (onCleanup) => {
        const el = this.histogramEl()?.nativeElement;
        if (el) {
          await this.ensureFontsLoaded();
          const { finalize, view } = await embed(el, histogramSpec as VisualizationSpec, {
            actions: false,
          });

          onCleanup(finalize);
          this.view.set(view);
        }
      },
      { allowSignalWrites: true },
    );
  }

  private initializeDataBindings(): void {
    effect(() => this.view()?.data('data', this.data()).run());

    // TODO
  }

  private async ensureFontsLoaded(): Promise<void> {
    const loadPromises = HISTOGRAM_FONTS.map((font) => this.document.fonts.load(font));
    await Promise.all(loadPromises);
  }

  private computeDistances(): DistanceEntry[] {
    const nodes = this.nodes();
    const edges = this.edges();
    if (nodes.length === 0 || edges.length === 0) {
      return [];
    }

    const anchor = this.anchor();
    const distances: DistanceEntry[] = [];
    for (const edge of edges) {
      const sourceNode = nodes[edge.sourceNodeIndex];
      const type = sourceNode.cell_type;
      if (type !== anchor) {
        distances.push({
          type,
          sourceNode,
          edge,
          distance: getEdgeDistance(edge),
        });
      }
    }

    return distances;
  }

  private computeData(): DistanceEntry[] {
    const distances = this.distances();
    const allCellDistances = distances.map((item) => ({ ...item, type: ALL_CELLS_TYPE }));
    return distances.concat(allCellDistances);
  }

  // colorMap: CellColorData[] = [];

  // // currentColor = '';

  // histogramData: HistogramData[] = [];

  // colors$ = computed(async () => {
  //   const colors = (await this.fetchCsv('assets/color_mapping.csv')) as Record<string, string>[];
  //   this.colorMap = colors.map((entry) => {
  //     return {
  //       cell_type: entry['cell_type'],
  //       cell_color: entry['cell_color']
  //         .replace('[', '')
  //         .replace(']', '')
  //         .split(', ')
  //         .map((int) => parseInt(int)),
  //     };
  //   });
  //   this.colorMap.unshift({ cell_type: 'All Cells', cell_color: [0, 0, 0] });
  //   return this.colorMap;
  // });

  // toRGB(color: number[]): string {
  //   return `rgba(${color.join(', ')})`;
  // }

  // rgbToHex(color: number[]) {
  //   return '#' + ((1 << 24) + (color[0] << 16) + (color[1] << 8) + color[2]).toString(16).slice(1);
  // }

  // private createHistogram(data: HistogramData[]): VisualizationSpec {
  //       color: {
  //         field: 'type',
  //         type: 'nominal',
  //         legend: null,
  //         scale: { range: this.colorMap.map((entry) => this.rgbToHex(entry.cell_color)) },
  //       },
  //     },
  //     },
  //   };
  // }

  // generateAxisValues(maxValue: number, interval: number): number[] {
  //   const highest = Math.round(maxValue / interval) * interval;
  //   let current = -1 * interval;
  //   const result = [];
  //   while (current <= highest) {
  //     result.push(current);
  //     current += interval;
  //   }
  //   return result;
  // }

  // download(event: MouseEvent, type: 'svg' | 'png') {
  //   event.stopPropagation();
  //   const dt = moment(new Date()).format('YYYY.MM.DD_hh.mm');
  //   const fileName = `cde_${dt}.${type}`;
  //   if (this.view) {
  //     this.view.toImageURL(type).then((url: string) => {
  //       const link = document.createElement('a');
  //       link.setAttribute('href', url);
  //       link.setAttribute('target', '_blank');
  //       link.setAttribute('download', fileName);
  //       link.dispatchEvent(new MouseEvent('click'));
  //     });
  //   }
  // }
}
