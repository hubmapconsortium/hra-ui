import { OverlayModule } from '@angular/cdk/overlay';
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
  model,
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
import { CellTypeEntry } from '../../models/cell-type';
import { Rgb, colorEquals, rgbToHex } from '../../models/color';
import { EdgeEntry, EdgeIndex, edgeDistance } from '../../models/edge';
import { NodeEntry, NodeTargetKey } from '../../models/node';
import { FileSaverService } from '../../services/file-saver/file-saver.service';
import { emptyArrayEquals } from '../../shared/empty-array-equals';

import { TOOLTIP_POSITION_RIGHT_SIDE } from '../../shared/tooltip-position';
import { ColorPickerLabelComponent } from '../color-picker-label/color-picker-label.component';
import HISTOGRAM_SPEC from './histogram.vl.json';

interface DistanceEntry {
  type: string;
  distance: number;
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
      scale: {
        range: unknown[];
      };
    };
  };
}

const HISTOGRAM_FONTS = ['12px Metropolis', '14px Metropolis'];
const ALL_CELLS_TYPE = 'All Cells';
const EXPORT_IMAGE_WIDTH = 1000;
const EXPORT_IMAGE_HEIGHT = 500;
const EXPORT_IMAGE_PADDING = 16;
const EXPORT_IMAGE_LEGEND_CONFIG = {
  title: null,
  symbolType: 'circle',
  symbolStrokeWidth: 10,
  labelFontSize: 13,
};

const DYNAMIC_COLOR_RANGE_LENGTH = 2000;
const DYNAMIC_COLOR_RANGE = Array(DYNAMIC_COLOR_RANGE_LENGTH)
  .fill(0)
  .map((_value, index) => ({ expr: `colors[${index}] || '#000'` }));

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
  readonly cellTypesSelection = input.required<string[]>();

  readonly tooltipPosition = TOOLTIP_POSITION_RIGHT_SIDE;
  infoOpen = false;

  protected readonly overflowVisible = signal(false);

  protected readonly filteredCellTypes = computed(
    () => {
      const selection = new Set(this.cellTypesSelection());
      selection.delete(this.selectedCellType());
      const filtered = this.cellTypes().filter(({ name }) => selection.has(name));
      return filtered.sort((a, b) => b.count - a.count);
    },
    { equal: emptyArrayEquals },
  );

  protected readonly totalCellTypeLabel = ALL_CELLS_TYPE;
  protected readonly totalCellTypeColor = signal<Rgb>([0, 0, 0], { equal: colorEquals });

  private readonly distances = computed(() => this.computeDistances(), { equal: emptyArrayEquals });
  private readonly data = computed(() => this.computeData(), { equal: emptyArrayEquals });
  private readonly colors = computed(() => this.computeColors(), { equal: emptyArrayEquals });

  private readonly document = inject(DOCUMENT);
  private readonly renderer = inject(Renderer2);
  private readonly fileSaver = inject(FileSaverService);

  private readonly histogramEl = viewChild.required<ElementRef>('histogram');
  private readonly view = signal<View | undefined>(undefined);
  protected readonly viewDataRef = effect(() => this.view()?.data('data', this.data()).run());
  protected readonly viewColorsRef = effect(() => this.view()?.signal('colors', this.colors()).run());
  protected readonly viewCreateRef = effect(
    async (onCleanup) => {
      const el = this.histogramEl().nativeElement;
      await this.ensureFontsLoaded();

      const spec = produce(HISTOGRAM_SPEC, (draft) => {
        draft.encoding.color.scale.range = DYNAMIC_COLOR_RANGE;
      });
      const { finalize, view } = await embed(el, spec as VisualizationSpec, {
        actions: false,
      });

      onCleanup(finalize);
      this.view.set(view);
    },
    { allowSignalWrites: true },
  );

  async download(format: string): Promise<void> {
    const spec = produce(HISTOGRAM_SPEC as ModifiableHistogramSpec, (draft) => {
      draft.width = EXPORT_IMAGE_WIDTH;
      draft.height = EXPORT_IMAGE_HEIGHT;
      draft.config.padding.bottom = EXPORT_IMAGE_PADDING;
      draft.config.padding.top = EXPORT_IMAGE_PADDING;
      draft.config.padding.right = EXPORT_IMAGE_PADDING;
      draft.config.padding.left = EXPORT_IMAGE_PADDING;
      draft.encoding.color.legend = EXPORT_IMAGE_LEGEND_CONFIG;
      draft.data.values = this.data();
      draft.encoding.color.scale.range = this.colors();
    });

    const el = this.renderer.createElement('div');
    const { view, finalize } = await embed(el, spec as VisualizationSpec, {
      actions: false,
    });

    const url = await view.toImageURL(format);
    this.fileSaver.save(url, `cde-histogram.${format}`);
    finalize();
  }

  updateColor(entry: CellTypeEntry, color: Rgb): void {
    const entries = this.cellTypes();
    const index = entries.indexOf(entry);
    const copy = [...entries];

    copy[index] = { ...copy[index], color };
    this.cellTypes.set(copy);
  }

  resetAllCellsColor(): void {
    this.totalCellTypeColor.set([0, 0, 0]);
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
    const distances: DistanceEntry[] = [];
    for (const edge of edges) {
      const sourceNode = nodes[edge[EdgeIndex.SourceNode]];
      const type = sourceNode[nodeTargetKey];
      if (type !== selectedCellType) {
        distances.push({ type, distance: edgeDistance(edge) });
      }
    }

    return distances;
  }

  private computeData(): DistanceEntry[] {
    const selection = new Set(this.cellTypesSelection());
    if (selection.size === 0) {
      return [];
    }

    return this.distances().filter(({ type }) => selection.has(type));
  }

  private computeColors(): string[] {
    const totalCellType = { name: this.totalCellTypeLabel, color: this.totalCellTypeColor() };
    return [totalCellType, ...this.filteredCellTypes()]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(({ color }) => rgbToHex(color));
  }
}
