import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule, DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  model,
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

import { CellTypeEntry, cellTypeToLookup } from '../../models/cell-type';
import { colorEquals, Rgb, rgbToHex } from '../../models/color';
import { edgeDistance, EdgeEntry, EdgeIndex } from '../../models/edge';
import { NodeEntry, NodeTargetKey } from '../../models/node';
import { FileSaverService } from '../../services/file-saver/file-saver.service';
import { TOOLTIP_POSITION_RIGHT_SIDE } from '../../shared/tooltip-position';
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
    OverlayModule,
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
  readonly selectedCellType = input.required<string>();
  readonly cellTypes = model.required<CellTypeEntry[]>();

  readonly cellTypesWithTotal = computed(() => [this.totalCellType(), ...this.cellTypes()]);

  overflowVisible = false;
  infoOpen = false;
  readonly tooltipPosition = TOOLTIP_POSITION_RIGHT_SIDE;

  private readonly document = inject(DOCUMENT);
  private readonly renderer = inject(Renderer2);
  private readonly fileSaver = inject(FileSaverService);
  private readonly histogramEl = viewChild<ElementRef>('histogram');
  private readonly view = signal<View | undefined>(undefined);

  private readonly totalCellTypeColor = signal<Rgb>([0, 0, 0], { equal: colorEquals });
  private readonly totalCellTypeCount = computed(() => this.cellTypes().reduce((total, { count }) => total + count, 0));
  private readonly totalCellType = computed(
    () =>
      ({
        name: ALL_CELLS_TYPE,
        count: this.totalCellTypeCount(),
        color: this.totalCellTypeColor(),
      }) satisfies CellTypeEntry,
  );

  private readonly colorLookup = computed(() => cellTypeToLookup(this.cellTypesWithTotal()));
  private readonly distances = computed(() => this.computeDistances());
  private readonly data = computed(() => this.computeData());

  constructor() {
    this.initializeHistogram();
    this.initializeDataBindings();
  }

  async download(event: Event, format: string): Promise<void> {
    // Prevent the event from propagating to the expansion panel
    event.stopPropagation();

    const el = this.renderer.createElement('div');
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
    this.fileSaver.save(url, `cde-histogram.${format}`);
    finalize();
  }

  updateColor(entry: CellTypeEntry, color: Rgb): void {
    if (entry.name === ALL_CELLS_TYPE) {
      this.totalCellTypeColor.set(color);
    } else {
      const entries = this.cellTypes();
      const index = entries.indexOf(entry);
      const copy = [...entries];

      copy[index] = { ...copy[index], color };
      this.cellTypes.set(copy);
    }
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
    const selectedCellType = this.selectedCellType();
    const colorLookup = this.colorLookup();
    const distances: DistanceEntry[] = [];
    for (const edge of edges) {
      const sourceNode = nodes[edge[EdgeIndex.SourceNode]];
      const type = sourceNode[nodeTargetKey];
      if (type !== selectedCellType) {
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
    const allColor = rgbToHex(this.totalCellTypeColor());
    const distances = this.distances();
    const allCellDistances = distances.map((item) => ({ ...item, type: ALL_CELLS_TYPE, color: allColor }));
    return distances.concat(allCellDistances);
  }
}
