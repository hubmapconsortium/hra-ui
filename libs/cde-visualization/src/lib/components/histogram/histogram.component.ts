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
  output,
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
import { colorEquals, Rgb } from '@hra-ui/design-system/color-picker';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { TooltipCardComponent, TooltipContent } from '@hra-ui/design-system/tooltip-card';
import { produce } from 'immer';
import { ColorPickerDirective, ColorPickerModule } from 'ngx-color-picker';
import { View } from 'vega';
import embed, { VisualizationSpec } from 'vega-embed';

import { DistanceEntry } from '../../cde-visualization/cde-visualization.component';
import { CellTypeEntry } from '../../models/cell-type';
import { FileSaverService } from '../../services/file-saver/file-saver.service';
import { TOOLTIP_POSITION_RIGHT_SIDE } from '../../shared/tooltip-position';
import { ColorPickerLabelComponent } from '../color-picker-label/color-picker-label.component';
import * as HISTOGRAM_SPEC from './histogram.vl.json';

interface UpdateColorData {
  entry: CellTypeEntry;
  color: Rgb;
}

/** Interface for modifying the histogram specification */
interface ModifiableHistogramSpec {
  /** Configuration for the padding */
  config: {
    padding: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
  };
  /** Width of the histogram */
  width: string | number;
  /** Height of the histogram */
  height: string | number;
  /** Data values for the histogram */
  data: {
    values?: unknown[];
  };
  /** Encoding configuration for the histogram */
  encoding: {
    color: {
      legend: unknown;
      scale: {
        range: unknown[];
      };
    };
  };
}

/** Fonts used in the histogram */
const HISTOGRAM_FONTS = ['12px Metropolis', '14px Metropolis'];

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

/** Dynamic color range for the histogram */
const DYNAMIC_COLOR_RANGE = Array(DYNAMIC_COLOR_RANGE_LENGTH)
  .fill(0)
  .map((_value, index) => ({ expr: `colors[${index}] || '#000'` }));

/**
 * Histogram Component
 */
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
    ScrollingModule,
    TooltipCardComponent,
  ],
  providers: [
    {
      provide: MAT_EXPANSION_PANEL_DEFAULT_OPTIONS,
      useValue: {
        collapsedHeight: '56px',
        expandedHeight: '56px',
        hideToggle: true,
      } satisfies MatExpansionPanelDefaultOptions,
    },
  ],
  templateUrl: './histogram.component.html',
  styleUrl: './histogram.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistogramComponent {
  /** Data for the violin visualization */
  readonly data = input.required<DistanceEntry[]>();

  /** Colors for the violin visualization */
  readonly colors = input.required<string[]>();

  readonly filteredCellTypes = input.required<CellTypeEntry[]>();

  /** Currently selected cell type */
  readonly selectedCellType = input.required<string>();

  /** Tooltip position configuration */
  readonly tooltipPosition = TOOLTIP_POSITION_RIGHT_SIDE;

  /** Tooltip content */
  readonly tooltipContent: TooltipContent[] = [
    {
      description:
        'The graph shows a histogram of cell-to-nearest-anchor cell distance distributions categorized by each cell type in the dataset.',
    },
  ];

  /** State indicating whether the info panel is open */
  infoOpen = false;

  protected readonly colorPicker = signal<ColorPickerDirective | null>(null);

  /** State indicating whether overflow is visible */
  protected readonly overflowVisible = computed(() => !!this.colorPicker());

  /** Label for the total cell type */
  protected readonly totalCellTypeLabel = ALL_CELLS_TYPE;

  /** Color for the total cell type */
  protected readonly totalCellTypeColor = signal<Rgb>([0, 0, 0], { equal: colorEquals });

  /** Reference to the document object */
  private readonly document = inject(DOCUMENT);

  /** Reference to the renderer for DOM manipulation */
  private readonly renderer = inject(Renderer2);

  /** Service for saving files */
  private readonly fileSaver = inject(FileSaverService);

  /** Element reference for the histogram container */
  private readonly histogramEl = viewChild.required<ElementRef>('histogram');

  /** Vega view instance for the histogram */
  private readonly view = signal<View | undefined>(undefined);

  readonly updateColor = output<UpdateColorData>();

  /** Effect for updating view data */
  protected readonly viewDataRef = effect(() => this.view()?.data('data', this.data()).run());

  /** Effect for updating view colors */
  protected readonly viewColorsRef = effect(() => this.view()?.signal('colors', this.colors()).run());

  /** Effect for creating the Vega view */
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

  /** Download the histogram as an image in the specified format */
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

  /** Ensure required fonts are loaded for the histogram */
  private async ensureFontsLoaded(): Promise<void> {
    const loadPromises = HISTOGRAM_FONTS.map((font) => this.document.fonts.load(font));
    await Promise.all(loadPromises);
  }

  /** Reset the color of the total cell type */
  resetAllCellsColor(): void {
    this.totalCellTypeColor.set([0, 0, 0]);
  }
}
