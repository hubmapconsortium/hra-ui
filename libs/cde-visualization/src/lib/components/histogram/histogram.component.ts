import { DOCUMENT } from '@angular/common';
import { HraCommonModule } from '@hra-ui/common';
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
  untracked,
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
import { colorEquals, hexToRgb, Rgb, rgbToHex } from '@hra-ui/design-system/color-picker';
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
import { produce } from 'immer';
import { ColorPickerDirective } from 'ngx-color-picker';
import { View } from 'vega';
import embed, { VisualizationSpec } from 'vega-embed';
import { DistanceEntry } from '../../cde-visualization/cde-visualization.component';
import { CellTypeEntry } from '../../models/cell-type';
import { FileSaverService } from '../../services/file-saver/file-saver.service';
import {
  applyChartTheme,
  getChartTheme,
  ThemeableChartSpec,
  updateChartTheme,
  watchColorScheme,
} from '../../shared/chart-theme';
import { setUpChartTooltips } from '../../shared/chart-tooltip';
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

/** Font sizes used in the histogram, in pixels */
const HISTOGRAM_FONT_SIZES = [12, 14];

/** Label for all cell types */
const ALL_CELLS_TYPE = 'All cells';

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
  titleFontWeight: 500,
  labelFontWeight: 500,
};

/** Length of the dynamic color range */
const DYNAMIC_COLOR_RANGE_LENGTH = 2000;

/** Dynamic color range for the histogram */
const DYNAMIC_COLOR_RANGE = Array(DYNAMIC_COLOR_RANGE_LENGTH)
  .fill(0)
  .map((_value, index) => ({ expr: `colors[${index}] || themeMarkColor` }));

/**
 * Histogram Component
 */
@Component({
  selector: 'cde-histogram',
  imports: [
    HraCommonModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    ColorPickerLabelComponent,
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
  templateUrl: './histogram.component.html',
  styleUrl: './histogram.component.scss',
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistogramComponent {
  /** Data for the visualization */
  readonly data = input.required<DistanceEntry[]>();

  /** Colors for the visualization */
  readonly colors = input.required<string[]>();

  /** Cell types to use for the visualization */
  readonly filteredCellTypes = input.required<CellTypeEntry[]>();

  /** Toggles full screen mode */
  protected readonly fullscreen = signal(false);

  /** Sets the color picker directive */
  protected readonly colorPicker = signal<ColorPickerDirective | null>(null);

  /** State indicating whether overflow is visible */
  protected readonly overflowVisible = computed(() => !!this.colorPicker());

  /** Label for the total cell type */
  protected readonly totalCellTypeLabel = ALL_CELLS_TYPE;

  /** Reference to the document object */
  private readonly document = inject(DOCUMENT);

  /** Host element, where the theme colors are read */
  private readonly el: HTMLElement = inject(ElementRef).nativeElement;

  /** Changes when the color scheme changes */
  private readonly colorScheme = watchColorScheme();

  /** Chart theme, read again when the color scheme changes */
  private readonly theme = computed(() => {
    this.colorScheme();
    return getChartTheme(this.el);
  });

  /** Color picked for the total cell type, or undefined to use the theme's mark color */
  protected readonly pickedTotalCellTypeColor = signal<Rgb | undefined>(undefined);

  /** Color for the total cell type */
  protected readonly totalCellTypeColor = computed(
    () => this.pickedTotalCellTypeColor() ?? hexToRgb(this.theme().markColor),
    { equal: colorEquals },
  );

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

  /** Effect for updating the view's theme colors in place, without redrawing the histogram */
  protected readonly viewThemeRef = effect(() => {
    const theme = this.theme();
    const view = this.view();
    if (view) {
      updateChartTheme(view, theme);
    }
  });

  /** Effect for creating the Vega view */
  protected readonly viewCreateRef = effect(async (onCleanup) => {
    const el = this.histogramEl().rootNodes()[0];
    const theme = untracked(this.theme);
    await this.ensureFontsLoaded(theme.font);

    const spec = produce(HISTOGRAM_SPEC, (draft) => {
      applyChartTheme(draft, theme);
      draft.encoding.color.scale.range = DYNAMIC_COLOR_RANGE;
    });
    const { finalize, view } = await embed(el, spec as VisualizationSpec, {
      actions: false,
    });

    setUpChartTooltips(view);
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
    const theme = this.theme();
    const spec = produce(HISTOGRAM_SPEC as ModifiableHistogramSpec & ThemeableChartSpec, (draft) => {
      applyChartTheme(draft, theme);
      draft.width = EXPORT_IMAGE_WIDTH;
      draft.height = EXPORT_IMAGE_HEIGHT;
      draft.config.padding.bottom = EXPORT_IMAGE_PADDING;
      draft.config.padding.top = EXPORT_IMAGE_PADDING;
      draft.config.padding.right = EXPORT_IMAGE_PADDING;
      draft.config.padding.left = EXPORT_IMAGE_PADDING;
      draft.encoding.color.legend = {
        ...EXPORT_IMAGE_LEGEND_CONFIG,
        titleColor: theme.titleColor,
        labelColor: theme.labelColor,
      };
      draft.data.values = this.data();
      draft.encoding.color.scale.range = this.allColors();
    });

    const el = this.renderer.createElement('div');
    const { view, finalize } = await embed(el, spec as VisualizationSpec, {
      actions: false,
    });

    const url = await view.toImageURL(format);
    this.fileSaver.save(url, `cde-histogram.${format}`);
    finalize();
  }

  /**
   * Ensure required fonts are loaded for the histogram
   *
   * @param font Font family used by the histogram
   */
  private async ensureFontsLoaded(font: string): Promise<void> {
    const loadPromises = HISTOGRAM_FONT_SIZES.map((size) => this.document.fonts.load(`${size}px ${font}`));
    await Promise.all(loadPromises);
  }

  /** Reset the color of the total cell type to the theme's mark color */
  resetAllCellsColor(): void {
    this.pickedTotalCellTypeColor.set(undefined);
  }
}
