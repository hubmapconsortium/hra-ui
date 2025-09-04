import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule, DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
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
import { MatMenuModule } from '@angular/material/menu';
import { colorEquals, Rgb, rgbToHex } from '@hra-ui/design-system/color-picker';
import {
  ExpansionPanelActionsComponent,
  ExpansionPanelComponent,
  ExpansionPanelHeaderContentComponent,
} from '@hra-ui/design-system/expansion-panel';
import {
  FullscreenActionsComponent,
  FullscreenPortalComponent,
  FullscreenPortalContentComponent,
} from '@hra-ui/design-system/fullscreen';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { TooltipContent } from '@hra-ui/design-system/tooltip-card';
import { produce } from 'immer';
import { ColorPickerDirective } from 'ngx-color-picker';
import { View } from 'vega';

import { DistanceEntry } from '../../cde-visualization/cde-visualization.component';
import { CellTypeEntry } from '../../models/cell-type';
import { FileSaverService } from '../../services/file-saver/file-saver.service';
import { TOOLTIP_POSITION_RIGHT_SIDE } from '../../shared/tooltip-position';
import { ColorPickerLabelComponent } from '../color-picker-label/color-picker-label.component';
import { HistogramMenuComponent } from './histogram-menu/histogram-menu.component';
import * as HISTOGRAM_SPEC from './histogram.vl.json';

/** Interface for updated color data */
interface UpdateColorData {
  /** Cell type entry to update */
  entry: CellTypeEntry;
  /** New color */
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
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    ColorPickerLabelComponent,
    OverlayModule,
    ScrollingModule,
    MatMenuModule,
    FullscreenPortalComponent,
    ExpansionPanelComponent,
    ExpansionPanelActionsComponent,
    ExpansionPanelHeaderContentComponent,
    FullscreenPortalContentComponent,
    FullscreenActionsComponent,
    HistogramMenuComponent,
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
  /** Data for the visualization */
  readonly data = input.required<DistanceEntry[]>();

  /** Colors for the visualization */
  readonly colors = input.required<string[]>();

  /** Cell types to use for the visualization */
  readonly filteredCellTypes = input.required<CellTypeEntry[]>();

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

  /** Toggles full screen mode */
  protected readonly fullscreen = signal(false);

  /** Sets the color picker directive */
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
  protected readonly histogramEl = viewChild.required(FullscreenPortalComponent);

  /** Vega view instance for the histogram */
  protected readonly view = signal<View | undefined>(undefined);

  /** Emits updated color data */
  readonly updateColor = output<UpdateColorData>();

  /** Array of all colors to use in the histogram */
  protected readonly allColors = computed(() => {
    const totalCellType = { name: this.totalCellTypeLabel, color: this.totalCellTypeColor() };
    return [totalCellType, ...this.filteredCellTypes()]
      .sort((a, b) => (a.name < b.name ? -1 : a.name === b.name ? 0 : 1))
      .map(({ color }) => rgbToHex(color));
  });

  /** Effect for updating view data */
  protected readonly viewDataRef = effect(() => this.view()?.data('data', this.data()).run());

  /** Effect for updating view colors */
  protected readonly viewColorsRef = effect(() => this.view()?.signal('colors', this.allColors()).run());

  /** Effect for creating the Vega view */
  protected readonly viewCreateRef = effect(async (onCleanup) => {
    const el = this.histogramEl().rootNodes()[0];
    await this.ensureFontsLoaded();

    const { default: embed } = await import('vega-embed');

    const spec = produce(HISTOGRAM_SPEC, (draft) => {
      draft.encoding.color.scale.range = DYNAMIC_COLOR_RANGE;
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { finalize, view } = await embed(el, spec as any, {
      actions: false,
    });

    onCleanup(finalize);
    this.view.set(view);
  });

  /** Resizes view when fullscreen is toggled */
  /* istanbul ignore next */
  resizeAndSyncView() {
    const container = this.view()?.container();
    const bbox = container?.getBoundingClientRect();
    if (bbox) {
      this.view()?.width(bbox.width).height(bbox.height);
    }
    this.view()?.resize().runAsync();
  }

  /** Download the histogram as an image in the specified format */
  /* istanbul ignore next */
  async download(format: string): Promise<void> {
    const { default: embed } = await import('vega-embed');

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { view, finalize } = await embed(el, spec as any, {
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
