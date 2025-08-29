import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule, DOCUMENT } from '@angular/common';
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
import { fromEvent } from 'rxjs';
import { View } from 'vega';
import embed, { VisualizationSpec } from 'vega-embed';

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
    CommonModule,
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

  /** If full screen mode is enabled */
  readonly fullScreenEnabled = signal<boolean>(false);

  /** Number of colors (cell types) in the visualization */
  readonly colorCount = signal<number>(0);

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
    this.view()?.signal('colors', this.colors()).run();
    this.colorCount.set(this.view()?.getState().signals.colors.length);
    this.resizeAndSyncView();
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
      draft.spec.width = el.clientWidth - 170;
      draft.spec.height = 35;
    });

    const { finalize, view } = await embed(el, spec as VisualizationSpec, {
      actions: false,
    });

    onCleanup(finalize);
    this.view.set(view);
  });

  constructor() {
    fromEvent(window, 'resize').subscribe(() => {
      this.resizeAndSyncView();
    });
  }

  /** Resizes view after full screen toggle or viewport resize */
  /* istanbul ignore next */
  resizeAndSyncView() {
    setTimeout(() => {
      const container = this.view()?.container();
      const bbox = container?.getBoundingClientRect();
      if (bbox) {
        this.view()?.signal('child_width', bbox.width - 170);
        this.view()?.signal('child_height', Math.min((bbox.height - 60) / this.colorCount(), 35));
      }
      this.view()?.resize().runAsync();
    });
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
    const { view, finalize } = await embed(el, spec as VisualizationSpec, {
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
