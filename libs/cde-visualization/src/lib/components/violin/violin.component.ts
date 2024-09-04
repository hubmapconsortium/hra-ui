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
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { produce } from 'immer';
import { ColorPickerDirective, ColorPickerModule } from 'ngx-color-picker';
import { View } from 'vega';
import embed, { VisualizationSpec } from 'vega-embed';

import { CellTypeEntry } from '../../models/cell-type';
import { colorEquals, Rgb, rgbToHex } from '../../models/color';
import { edgeDistance, EdgeEntry, EdgeIndex } from '../../models/edge';
import { NodeEntry, NodeTargetKey } from '../../models/node';
import { FileSaverService } from '../../services/file-saver/file-saver.service';
import { emptyArrayEquals } from '../../shared/empty-array-equals';
import { TOOLTIP_POSITION_RIGHT_SIDE } from '../../shared/tooltip-position';
import { ColorPickerLabelComponent } from '../color-picker-label/color-picker-label.component';
import * as VIOLIN_SPEC from './violin.vl.json';

/** Interface for representing the distance entry */
interface DistanceEntry {
  /** Type of the entry */
  type: string;
  /** Distance value of the entry */
  distance: number;
}

/** Interface for modifying the violin specification */
interface ModifiableViolinSpec {
  /** Configuration for the padding */
  config: {
    padding: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
  };
  /** Width of the violin */
  width: string | number;
  /** Height of the violin */
  height: string | number;
  /** Data values for the violin */
  data: {
    values?: unknown[];
  };
  /** Encoding configuration for the violin */
  encoding: {
    color: {
      legend: unknown;
      scale: {
        range: unknown[];
      };
    };
  };
}

/** Fonts used in the violin */
const VIOLIN_FONTS = ['12px Metropolis', '14px Metropolis'];

/** Label for all cell types */
const ALL_CELLS_TYPE = 'All Cells';

/** Width of the exported image */
const EXPORT_IMAGE_WIDTH = 1000;

/** Height of the exported image */
const EXPORT_IMAGE_HEIGHT = 500;

/** Padding for the exported image */
const EXPORT_IMAGE_PADDING = 16;

/** Configuration for the legend in the exported image */
const EXPORT_IMAGE_LEGEND_CONFIG = {
  title: null,
  symbolType: 'circle',
  symbolStrokeWidth: 10,
  labelFontSize: 14,
  titleFontSize: 14,
  titleLineHeight: 21,
  titleColor: '#201E3D',
  titleFontWeight: 500,
  labelFontWeight: 500,
  labelColor: '#4B4B5E',
};

/** Length of the dynamic color range */
const DYNAMIC_COLOR_RANGE_LENGTH = 2000;

/** Dynamic color range for the violin */
const DYNAMIC_COLOR_RANGE = Array(DYNAMIC_COLOR_RANGE_LENGTH)
  .fill(0)
  .map((_value, index) => ({ expr: `colors[${index}] || '#000'` }));

/**
 * Violin Component
 */
@Component({
  selector: 'cde-violin',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    ColorPickerModule,
    ColorPickerLabelComponent,
    OverlayModule,
    ScrollingModule,
  ],
  templateUrl: './violin.component.html',
  styleUrl: './violin.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViolinComponent {
  /** List of nodes used in the violin */
  readonly nodes = input.required<NodeEntry[]>();

  /** Key used to target specific node properties */
  readonly nodeTargetKey = input.required<NodeTargetKey>();

  /** List of edges connecting nodes */
  readonly edges = input.required<EdgeEntry[]>();

  /** Currently selected cell type */
  readonly selectedCellType = input.required<string>();

  /** List of all cell types */
  readonly cellTypes = model.required<CellTypeEntry[]>();

  /** List of selected cell types */
  readonly cellTypesSelection = input.required<string[]>();

  /** Tooltip position configuration */
  readonly tooltipPosition = TOOLTIP_POSITION_RIGHT_SIDE;

  /** State indicating whether the info panel is open */
  infoOpen = false;

  protected readonly colorPicker = signal<ColorPickerDirective | null>(null);

  /** State indicating whether overflow is visible */
  protected readonly overflowVisible = computed(() => !!this.colorPicker());

  /** List of filtered cell types based on selection */
  protected readonly filteredCellTypes = computed(
    () => {
      const selection = new Set(this.cellTypesSelection());
      selection.delete(this.selectedCellType());
      const filtered = this.cellTypes().filter(({ name }) => selection.has(name));
      return filtered.sort((a, b) => b.count - a.count);
    },
    { equal: emptyArrayEquals },
  );

  /** Label for the total cell type */
  protected readonly totalCellTypeLabel = ALL_CELLS_TYPE;

  /** Color for the total cell type */
  protected readonly totalCellTypeColor = signal<Rgb>([0, 0, 0], { equal: colorEquals });

  /** Computed distances between nodes */
  private readonly distances = computed(() => this.computeDistances(), { equal: emptyArrayEquals });

  /** Data for the violin visualization */
  private readonly data = computed(() => this.computeData(), { equal: emptyArrayEquals });

  /** Colors for the violin visualization */
  private readonly colors = computed(() => this.computeColors(), { equal: emptyArrayEquals });

  /** Reference to the document object */
  private readonly document = inject(DOCUMENT);

  /** Reference to the renderer for DOM manipulation */
  private readonly renderer = inject(Renderer2);

  /** Service for saving files */
  private readonly fileSaver = inject(FileSaverService);

  /** Element reference for the violin container */
  private readonly violinEl = viewChild.required<ElementRef>('violin');

  /** Vega view instance for the violin */
  private readonly view = signal<View | undefined>(undefined);

  /** Effect for updating view data */
  protected readonly viewDataRef = effect(() => this.view()?.data('data', this.data()).run());

  /** Effect for updating view colors */
  protected readonly viewColorsRef = effect(() => {
    this.view()?.signal('colors', this.colors()).run();
    this.view()?.resize();
  });

  /** Effect for creating the Vega view */
  protected readonly viewCreateRef = effect(
    async (onCleanup) => {
      const el = this.violinEl().nativeElement;
      await this.ensureFontsLoaded();

      const spec = produce(VIOLIN_SPEC, (draft) => {
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

  /** Download the violin as an image in the specified format */
  async download(format: string): Promise<void> {
    const spec = produce(VIOLIN_SPEC as ModifiableViolinSpec, (draft) => {
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
    this.fileSaver.save(url, `cde-violin.${format}`);
    finalize();
  }

  /** Update the color of a specific cell type entry */
  updateColor(entry: CellTypeEntry, color: Rgb): void {
    const entries = this.cellTypes();
    const index = entries.indexOf(entry);
    const copy = [...entries];

    copy[index] = { ...copy[index], color };
    this.cellTypes.set(copy);
  }

  /** Reset the color of the total cell type */
  resetAllCellsColor(): void {
    this.totalCellTypeColor.set([0, 0, 0]);
  }

  /** Ensure required fonts are loaded for the violin */
  private async ensureFontsLoaded(): Promise<void> {
    const loadPromises = VIOLIN_FONTS.map((font) => this.document.fonts.load(font));
    await Promise.all(loadPromises);
  }

  /** Compute distances between nodes based on edges */
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

  /** Compute data for the violin visualization */
  private computeData(): DistanceEntry[] {
    const selection = new Set(this.cellTypesSelection());
    if (selection.size === 0) {
      return [];
    }

    return this.distances().filter(({ type }) => selection.has(type));
  }

  /** Compute colors for the violin visualization */
  private computeColors(): string[] {
    const totalCellType = { name: this.totalCellTypeLabel, color: this.totalCellTypeColor() };
    return [totalCellType, ...this.filteredCellTypes()]
      .sort((a, b) => (a.name < b.name ? -1 : a.name === b.name ? 0 : 1))
      .map(({ color }) => rgbToHex(color));
  }
}
