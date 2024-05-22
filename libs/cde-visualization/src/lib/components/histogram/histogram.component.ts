import { CommonModule, DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  Renderer2,
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
import { produce } from 'immer';
import { ColorPickerModule } from 'ngx-color-picker';
import { View } from 'vega';
import embed, { VisualizationSpec } from 'vega-embed';

import { CellType, cellTypeToLookup } from '../../models/cell-type';
import { rgbToHex } from '../../models/color';
import { edgeDistance, EdgeEntry, EdgeIndex } from '../../models/edge';
import { NodeEntry, NodeTargetKey } from '../../models/node';
import { ColorPickerLabelComponent } from '../color-picker-label/color-picker-label.component';
import histogramSpec from './histogram.vl.json';

interface DistanceEntry {
  type: string;
  distance: number;
  color: string;
}

interface ModifiableHistogramSpec {
  config: {
    padding: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
  };
  width: string | number;
  height: string | number;
  data: {
    values?: unknown[];
  };
  encoding: {
    color: {
      legend: unknown;
    };
  };
}

const DEFAULT_ANCHOR = 'Endothelial';

const HISTOGRAM_FONTS = ['12px Metropolis', '14px Metropolis'];
const ALL_CELLS_TYPE = 'All Cells';
const EXPORT_IMAGE_PADDING = 16;
const EXPORT_IMAGE_WIDTH = 1000;
const EXPORT_IMAGE_HEIGHT = 500;
const EXPORT_IMAGE_LEGEND_CONFIG = {
  title: null,
  symbolType: 'circle',
  symbolStrokeWidth: 10,
  labelFontSize: 13,
};

@Component({
  selector: 'cde-histogram',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    ColorPickerModule,
    ColorPickerLabelComponent,
  ],
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
  readonly nodeTargetKey = input.required<NodeTargetKey>();
  readonly edges = input.required<EdgeEntry[]>();
  readonly anchor = input<string>(DEFAULT_ANCHOR);
  readonly cellTypes = input.required<CellType[]>();

  private readonly document = inject(DOCUMENT);
  private readonly renderer = inject(Renderer2);
  private readonly histogramEl = viewChild<ElementRef>('histogram');
  private readonly view = signal<View | undefined>(undefined);

  private readonly colorLookup = computed(() => cellTypeToLookup(this.cellTypes()));
  private readonly distances = computed(() => this.computeDistances());
  private readonly data = computed(() => this.computeData());

  constructor() {
    this.initializeHistogram();
    this.initializeDataBindings();
  }

  async download(event: Event, format: string): Promise<void> {
    // Prevent the event from propagating to the expansion panel
    event.stopPropagation();

    const { document, renderer } = this;
    const { body } = document;
    const el = renderer.createElement('div');
    const spec = produce(histogramSpec as ModifiableHistogramSpec, (draft) => {
      draft.config.padding.bottom = EXPORT_IMAGE_PADDING;
      draft.config.padding.top = EXPORT_IMAGE_PADDING;
      draft.config.padding.right = EXPORT_IMAGE_PADDING;
      draft.config.padding.left = EXPORT_IMAGE_PADDING;
      draft.data.values = this.data();
      draft.encoding.color.legend = EXPORT_IMAGE_LEGEND_CONFIG;
      draft.height = EXPORT_IMAGE_HEIGHT;
      draft.width = EXPORT_IMAGE_WIDTH;
    });

    const { view, finalize } = await embed(el, spec as VisualizationSpec, {
      actions: false,
    });

    const url = await view.toImageURL(format);
    const link = renderer.createElement('a');
    renderer.appendChild(body, link);
    link.setAttribute('href', url);
    link.setAttribute('target', '_blank');
    link.setAttribute('download', `cde-histogram.${format}`);
    link.dispatchEvent(new MouseEvent('click'));
    renderer.removeChild(body, link);

    finalize();
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

    const nodeTargetKey = this.nodeTargetKey();
    const anchor = this.anchor();
    const colorLookup = this.colorLookup();
    const distances: DistanceEntry[] = [];
    for (const edge of edges) {
      const sourceNode = nodes[edge[EdgeIndex.SourceNode]];
      const type = sourceNode[nodeTargetKey];
      if (type !== anchor) {
        distances.push({
          type,
          distance: edgeDistance(edge),
          color: rgbToHex(colorLookup.get(type) ?? [0, 0, 0]),
        });
      }
    }

    return distances;
  }

  private computeData(): DistanceEntry[] {
    const distances = this.distances();
    // TODO add color to each item from the color map
    const allCellDistances = distances.map((item) => ({ ...item, type: ALL_CELLS_TYPE, color: '#000000' }));
    return distances.concat(allCellDistances);
  }
}
