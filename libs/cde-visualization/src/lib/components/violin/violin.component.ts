import { DOCUMENT } from '@angular/common';
import { HraCommonModule } from '@hra-ui/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  EffectCleanupRegisterFn,
  ElementRef,
  inject,
  input,
  PendingTasks,
  Renderer2,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ExpansionPanelActionsComponent, ExpansionPanelComponent } from '@hra-ui/design-system/expansion-panel';
import {
  FullscreenActionsComponent,
  FullscreenPortalComponent,
  FullscreenPortalContentComponent,
} from '@hra-ui/design-system/fullscreen';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { produce } from 'immer';
import { View } from 'vega';
import embed from 'vega-embed';

import { DistanceEntry } from '../../cde-visualization/cde-visualization.component';
import { FileSaverService } from '../../services/file-saver/file-saver.service';
import {
  applyChartTheme,
  getChartTheme,
  ThemeableChartSpec,
  updateChartTheme,
  watchColorScheme,
} from '../../shared/chart-theme';
import { setUpChartTooltips } from '../../shared/chart-tooltip';
import { ViolinMenuComponent } from './violin-menu/violin-menu.component';
import * as VIOLIN_FULLSCREEN_OVERRIDES from './violin-fullscreen.vl.json';
import * as VIOLIN_SPEC from './violin.vl.json';

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

  /** Data values for the violin */
  data: {
    values?: unknown[];
  };
  /** Encoding configuration for the violin */
  spec: {
    /** Width of the violin */
    width?: string | number;
    /** Height of the violin */
    height: string | number;
    layer: {
      encoding: {
        color?: {
          legend?: unknown;
          scale: {
            range: unknown[];
          };
          value?: string;
        };
      };
    }[];
  };
}

/** Font sizes used in the violin, in pixels */
const VIOLIN_FONT_SIZES = [12, 14];

/** Width of the exported image */
const EXPORT_IMAGE_WIDTH = 1000;

/** Height of the exported image */
const EXPORT_IMAGE_HEIGHT = 40;

/** Padding for the exported image */
const EXPORT_IMAGE_PADDING = 16;

/** Minimum height for individual violin plots. Below it, the violins scroll at their maximum height instead. */
const MIN_VIOLIN_HEIGHT = 40;

/** Maximum height for individual violin plots */
const MAX_VIOLIN_HEIGHT = 44;

/**
 * Width offset for individual violin plots: an estimate of the space the cell type labels and padding take.
 * The chart is fitted to its container after it renders (see fitViolinView).
 */
const VIOLIN_WIDTH_OFFSET = 150;

/** Height offset for individual violin plots: an estimate of the space the titles, axis, and padding take */
const VIOLIN_HEIGHT_OFFSET = 60;

/**
 * Width offset for the fullscreen violins: an estimate of the space the distance axis, the first cell type label,
 * and padding take. The chart is fitted to its container after it renders (see fitFullscreenViolinView).
 */
const FULLSCREEN_VIOLIN_WIDTH_OFFSET = 130;

/** Height offset for the fullscreen violins: an estimate of the space the cell type labels and title take */
const FULLSCREEN_VIOLIN_HEIGHT_OFFSET = 160;

/** Most passes taken to fit the fullscreen chart to its container */
const FULLSCREEN_FIT_PASSES = 3;

/**
 * Spec for the fullscreen view, where the violins stand upright side by side with the cell types along the bottom.
 * It swaps in its own facet, scales, and layers, and titles the cell types in the facet header, not the chart title.
 */
const VIOLIN_FULLSCREEN_SPEC = { ...VIOLIN_SPEC, title: undefined, ...VIOLIN_FULLSCREEN_OVERRIDES };

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
  symbolStrokeColor: 'type',
  symbolSize: 400,
};

/** Length of the dynamic color range */
const DYNAMIC_COLOR_RANGE_LENGTH = 2000;

/** Dynamic color range for the violin */
const DYNAMIC_COLOR_RANGE = Array(DYNAMIC_COLOR_RANGE_LENGTH)
  .fill(0)
  .map((_value, index) => ({ expr: `colors[${index}] || themeMarkColor` }));

/**
 * Violin Component
 */
@Component({
  selector: 'cde-violin',
  imports: [
    HraCommonModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    ScrollingModule,
    MatMenuModule,
    FullscreenPortalComponent,
    ExpansionPanelComponent,
    ExpansionPanelActionsComponent,
    FullscreenPortalContentComponent,
    FullscreenActionsComponent,
    ViolinMenuComponent,
  ],
  templateUrl: './violin.component.html',
  styleUrl: './violin.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:resize)': 'resizeAndSyncView()',
  },
})
export class ViolinComponent {
  /** Data for the violin visualization */
  readonly data = input.required<DistanceEntry[]>();

  /** Colors for the violin visualization */
  readonly colors = input.required<string[]>();

  /** Reference to the document object */
  private readonly document = inject(DOCUMENT);

  /** Reference to the renderer for DOM manipulation */
  private readonly renderer = inject(Renderer2);

  /** Service for saving files */
  private readonly fileSaver = inject(FileSaverService);

  /** Pending tasks, used to keep the app unstable while the violins resize */
  private readonly pendingTasks = inject(PendingTasks);

  /** Host element, where the theme colors are read */
  private readonly el: HTMLElement = inject(ElementRef).nativeElement;

  /** Changes when the color scheme changes */
  private readonly colorScheme = watchColorScheme();

  /** Chart theme, read again when the color scheme changes */
  private readonly theme = computed(() => {
    this.colorScheme();
    return getChartTheme(this.el);
  });

  /** Element reference for the violin container */
  protected readonly violinEl = viewChild.required(FullscreenPortalComponent);

  /** Whether the violin is in the fullscreen view, where the violins stand upright and fit without scrolling */
  protected readonly fullscreen = signal(false);

  /** Vega view for the docked panel */
  private readonly dockedView = signal<View | undefined>(undefined);

  /** Vega view for the fullscreen view. Both views stay alive, so switching between them doesn't redraw the violins. */
  private readonly fullscreenView = signal<View | undefined>(undefined);

  /** Vega view that is showing */
  private readonly view = computed(() => (this.fullscreen() ? this.fullscreenView() : this.dockedView()));

  /** Data each view last received, so a view that already has the current data doesn't estimate the densities again */
  private readonly viewData = new WeakMap<View, DistanceEntry[]>();

  /** Number of colors (cell types) in the visualization */
  readonly colorCount = signal<number>(0);

  /** Number of cell types in the data, one violin each */
  private readonly cellTypeCount = computed(() => new Set(this.data().map(({ type }) => type)).size);

  /** Whether vertical scrolling should be enabled for the violin visualization */
  readonly enableScroll = signal<boolean>(false);

  /** Effect for updating view data */
  protected readonly viewDataRef = effect(() => {
    const view = this.view();
    const data = this.data();
    if (view && data.length > 0 && this.viewData.get(view) !== data) {
      this.viewData.set(view, data);
      view.data('data', data).run();
    }
  });

  /** Effect for updating view colors */
  protected readonly viewColorsRef = effect(() => {
    if (this.view() && this.view()?.getState()) {
      this.view()?.signal('colors', this.colors()).run();
      this.colorCount.set(this.view()?.getState().signals.colors.length);
      this.resizeAndSyncView();
    }
  });

  /** Effect for updating the view's theme colors in place, without redrawing the violins */
  protected readonly viewThemeRef = effect(() => {
    const theme = this.theme();
    const view = this.view();
    if (view) {
      updateChartTheme(view, theme);
    }
  });

  /** Effect for creating the docked Vega view */
  protected readonly viewCreateRef = effect((onCleanup) => this.createView(false, onCleanup));

  /** Effect for creating the fullscreen Vega view, sized when the fullscreen view opens */
  protected readonly fullscreenViewCreateRef = effect((onCleanup) => this.createView(true, onCleanup));

  /**
   * Resizes view after full screen toggle or viewport resize.
   * The resize is a pending task, so the fullscreen view transition waits until the violins fit.
   */
  /* istanbul ignore next */
  resizeAndSyncView() {
    const done = this.pendingTasks.add();
    setTimeout(async () => {
      try {
        await this.resizeView();
      } finally {
        done();
      }
    });
  }

  /** Resizes the view that is showing to its container */
  /* istanbul ignore next */
  private async resizeView(): Promise<void> {
    const view = this.view();
    if (view) {
      const container: HTMLElement = this.violinEl().rootNodes()[0];
      const el = container.querySelector('.violin') as HTMLElement;
      if (el && this.fullscreen()) {
        this.enableScroll.set(false);
        // The fullscreen violins start at 0 by 0 (see the spec). They are sized from the estimates the first time,
        // and fitted from their current size after that, so they don't jump back to the estimates.
        if ((view.signal('child_height') as number) < 1) {
          view.signal('child_width', this.calculateFullscreenViolinWidth(el.clientWidth));
          view.signal('child_height', Math.max(el.clientHeight - FULLSCREEN_VIOLIN_HEIGHT_OFFSET, 1));
        }
      } else if (el) {
        if (this.calculateViolinHeight(el.clientHeight) < MIN_VIOLIN_HEIGHT) {
          view.signal('child_height', MAX_VIOLIN_HEIGHT);
          this.enableScroll.set(true);
        } else {
          view.signal('child_height', this.calculateViolinHeight(el.clientHeight));
          this.enableScroll.set(false);
        }
        view.signal('child_width', el.clientWidth - VIOLIN_WIDTH_OFFSET);
      }
      await view.resize().runAsync();
      if (el && this.fullscreen()) {
        await this.fitFullscreenViolinView(view, el);
      } else if (el) {
        await this.fitViolinView(view, el);
      }
    }
  }

  /**
   * Creates the docked or the fullscreen Vega view in its container
   *
   * @param fullscreen Whether to create the fullscreen view
   * @param onCleanup Registers the view's cleanup with the effect creating it
   */
  private async createView(fullscreen: boolean, onCleanup: EffectCleanupRegisterFn) {
    const container: HTMLElement = this.violinEl().rootNodes()[0];
    const el = container.querySelector(fullscreen ? '.violin-fullscreen-chart' : '.violin-docked-chart') as HTMLElement;
    const theme = untracked(this.theme);
    await this.ensureFontsLoaded(theme.font);
    const spec = produce(
      (fullscreen ? VIOLIN_FULLSCREEN_SPEC : VIOLIN_SPEC) as ModifiableViolinSpec & ThemeableChartSpec,
      (draft) => {
        applyChartTheme(draft, theme);
        for (const layer of draft.spec.layer) {
          if (layer.encoding.color?.legend === null) {
            layer.encoding.color.scale = { range: DYNAMIC_COLOR_RANGE };
          }
        }
        if (!fullscreen) {
          draft.spec.width = el.clientWidth - VIOLIN_WIDTH_OFFSET;
          draft.spec.height = MAX_VIOLIN_HEIGHT;
        }
      },
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { finalize, view } = await embed(el, spec as any, {
      actions: false,
    });

    setUpChartTooltips(view);
    onCleanup(finalize);
    (fullscreen ? this.fullscreenView : this.dockedView).set(view);
  }

  /**
   * Fits the chart to its container after it renders. The width and height offsets only estimate the space
   * the labels, titles, and padding take, which varies with the cell type names.
   * - The violins widen or narrow so the chart fills the container's width, with no gap on its right side.
   * - When the violins don't scroll but the chart is taller than the container, they shrink to fit,
   *   or scroll at their maximum height if that would take them below the minimum.
   *
   * @param view Vega view
   * @param el Scroll container holding the chart
   */
  /* istanbul ignore next */
  private async fitViolinView(view: View, el: HTMLElement): Promise<void> {
    const chart = view.container()?.querySelector('canvas, svg');
    if (!chart) {
      return;
    }

    const { width, height } = chart.getBoundingClientRect();
    const widthGap = el.clientWidth - width;
    const heightGap = el.clientHeight - height;
    let changed = false;

    if (Math.abs(widthGap) >= 1) {
      view.signal('child_width', (view.signal('child_width') as number) + widthGap);
      changed = true;
    }

    if (!this.enableScroll() && heightGap <= -1) {
      const violinHeight = (view.signal('child_height') as number) + heightGap / Math.max(this.colorCount(), 1);
      const scroll = violinHeight < MIN_VIOLIN_HEIGHT;
      view.signal('child_height', scroll ? MAX_VIOLIN_HEIGHT : violinHeight);
      this.enableScroll.set(scroll);
      changed = true;
    }

    if (changed) {
      await view.resize().runAsync();
    }
  }

  /**
   * Fits the fullscreen chart to its container after it renders, so the whole chart shows without scrolling.
   * Every violin widens or narrows by an equal share of the width gap, and the violins grow or shrink to fill
   * the height. The first rotated cell type label can stick out past the distance axis by an amount that depends
   * on the violin width, so fitting can take more than one pass.
   *
   * @param view Vega view
   * @param el Scroll container holding the chart
   */
  /* istanbul ignore next */
  private async fitFullscreenViolinView(view: View, el: HTMLElement): Promise<void> {
    const count = Math.max(this.cellTypeCount(), 1);
    for (let pass = 0; pass < FULLSCREEN_FIT_PASSES; pass++) {
      const chart = view.container()?.querySelector('canvas, svg');
      if (!chart) {
        return;
      }

      // Layout sizes, unlike the bounding box, aren't scaled by the dialog's opening animation
      const widthGap = el.clientWidth - chart.clientWidth;
      const heightGap = el.clientHeight - chart.clientHeight;
      if (Math.abs(widthGap) < 1 && Math.abs(heightGap) < 1) {
        return;
      }

      view.signal('child_width', Math.max((view.signal('child_width') as number) + widthGap / count, 1));
      view.signal('child_height', Math.max((view.signal('child_height') as number) + heightGap, 1));
      await view.resize().runAsync();
    }
  }

  /**
   * Calculates the width (in px) of each fullscreen violin based on container width and number of cell types
   * @param boxW container width
   * @returns Violin width
   */
  private calculateFullscreenViolinWidth(boxW: number) {
    return Math.max((boxW - FULLSCREEN_VIOLIN_WIDTH_OFFSET) / Math.max(this.cellTypeCount(), 1), 1);
  }

  /**
   * Calculates violin plot height (in px) based on container height and number of entries
   * @param boxH container height
   * @returns Violin plot height
   */
  private calculateViolinHeight(boxH: number) {
    return Math.min(MAX_VIOLIN_HEIGHT, (boxH - VIOLIN_HEIGHT_OFFSET) / this.colorCount());
  }

  /** Download the violin as an image in the specified format */
  /* istanbul ignore next */
  async download(format: string): Promise<void> {
    const theme = this.theme();
    const spec = produce(VIOLIN_SPEC as ModifiableViolinSpec & ThemeableChartSpec, (draft) => {
      applyChartTheme(draft, theme);
      draft.spec.width = EXPORT_IMAGE_WIDTH;
      for (const layer of draft.spec.layer) {
        if (layer.encoding.color?.legend === null) {
          layer.encoding.color.legend = {
            ...EXPORT_IMAGE_LEGEND_CONFIG,
            titleColor: theme.titleColor,
            labelColor: theme.labelColor,
          };
          layer.encoding.color.scale = { range: this.colors() };
        }
      }
      draft.spec.height = EXPORT_IMAGE_HEIGHT;
      draft.config.padding.bottom = EXPORT_IMAGE_PADDING;
      draft.config.padding.top = EXPORT_IMAGE_PADDING;
      draft.config.padding.right = EXPORT_IMAGE_PADDING;
      draft.config.padding.left = EXPORT_IMAGE_PADDING;
      draft.data.values = this.data();
    });

    const el = this.renderer.createElement('div');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { view, finalize } = await embed(el, spec as any, {
      actions: false,
    });

    const url = await view.toImageURL(format);
    this.fileSaver.save(url, `cde-violin.${format}`);
    finalize();
  }

  /**
   * Ensure required fonts are loaded for the violin
   *
   * @param font Font family used by the violin
   */
  private async ensureFontsLoaded(font: string): Promise<void> {
    const loadPromises = VIOLIN_FONT_SIZES.map((size) => this.document.fonts.load(`${size}px ${font}`));
    await Promise.all(loadPromises);
  }
}
