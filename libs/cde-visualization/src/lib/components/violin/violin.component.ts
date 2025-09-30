import { OverlayModule } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { HraCommonModule } from '@hra-ui/common';
import { ChangeDetectionStrategy, Component, effect, inject, input, Renderer2, signal, viewChild } from '@angular/core';
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
import { TooltipContent } from '@hra-ui/design-system/tooltip-card';
import { produce } from 'immer';
import { View } from 'vega';
import embed from 'vega-embed';

import { DistanceEntry } from '../../cde-visualization/cde-visualization.component';
import { FileSaverService } from '../../services/file-saver/file-saver.service';
import { TOOLTIP_POSITION_RIGHT_SIDE } from '../../shared/tooltip-position';
import { ViolinMenuComponent } from './violin-menu/violin-menu.component';
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
        color: {
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

/** Fonts used in the violin */
const VIOLIN_FONTS = ['12px Metropolis', '14px Metropolis'];

/** Width of the exported image */
const EXPORT_IMAGE_WIDTH = 1000;

/** Height of the exported image */
const EXPORT_IMAGE_HEIGHT = 40;

/** Padding for the exported image */
const EXPORT_IMAGE_PADDING = 16;

/** Minimum height for individual violin plots */
const MIN_VIOLIN_HEIGHT = 20;

/** Maximum height for individual violin plots */
const MAX_VIOLIN_HEIGHT = 35;

/** Width offset for individual violin plots */
const VIOLIN_WIDTH_OFFSET = 170;

/** Height offset for individual violin plots */
const VIOLIN_HEIGHT_OFFSET = 76;

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
  symbolStrokeColor: 'type',
  symbolSize: 400,
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
  imports: [
    HraCommonModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    OverlayModule,
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

  /** Element reference for the violin container */
  protected readonly violinEl = viewChild.required(FullscreenPortalComponent);

  /** Vega view instance for the violin */
  private readonly view = signal<View | undefined>(undefined);

  /** Number of colors (cell types) in the visualization */
  readonly colorCount = signal<number>(0);

  /** Whether vertical scrolling should be enabled for the violin visualization */
  readonly enableScroll = signal<boolean>(false);

  /** Effect for updating view data */
  protected readonly viewDataRef = effect(() => {
    const view = this.view();
    const data = this.data();
    if (view && data.length > 0) {
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

  /** Effect for creating the Vega view */
  protected readonly viewCreateRef = effect(async (onCleanup) => {
    const container: HTMLElement = this.violinEl().rootNodes()[0];
    const el = container.querySelector('.violin-container') as HTMLElement;
    await this.ensureFontsLoaded();
    const spec = produce(VIOLIN_SPEC, (draft) => {
      for (const layer of draft.spec.layer) {
        if (layer.encoding.color.legend === null) {
          layer.encoding.color.scale = { range: DYNAMIC_COLOR_RANGE };
        }
      }
      draft.spec.width = el.clientWidth - VIOLIN_WIDTH_OFFSET;
      draft.spec.height = MAX_VIOLIN_HEIGHT;
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { finalize, view } = await embed(el, spec as any, {
      actions: false,
    });

    onCleanup(finalize);
    this.view.set(view);
  });

  /** Resizes view after full screen toggle or viewport resize */
  /* istanbul ignore next */
  resizeAndSyncView() {
    setTimeout(() => {
      const view = this.view();
      if (view) {
        const container: HTMLElement = this.violinEl().rootNodes()[0];
        const el = container.querySelector('.violin') as HTMLElement;
        if (el) {
          if (this.calculateViolinHeight(el.clientHeight) < MIN_VIOLIN_HEIGHT) {
            view.signal('child_height', MAX_VIOLIN_HEIGHT);
            this.enableScroll.set(true);
          } else {
            view.signal('child_height', this.calculateViolinHeight(el.clientHeight));
            this.enableScroll.set(false);
          }
          view.signal('child_width', el.clientWidth - VIOLIN_WIDTH_OFFSET);
        }
        view.resize().runAsync();
      }
    });
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
    const spec = produce(VIOLIN_SPEC as ModifiableViolinSpec, (draft) => {
      draft.spec.width = EXPORT_IMAGE_WIDTH;
      for (const layer of draft.spec.layer) {
        if (layer.encoding.color.legend === null) {
          layer.encoding.color.legend = EXPORT_IMAGE_LEGEND_CONFIG;
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

  /** Ensure required fonts are loaded for the violin */
  private async ensureFontsLoaded(): Promise<void> {
    const loadPromises = VIOLIN_FONTS.map((font) => this.document.fonts.load(font));
    await Promise.all(loadPromises);
  }
}
