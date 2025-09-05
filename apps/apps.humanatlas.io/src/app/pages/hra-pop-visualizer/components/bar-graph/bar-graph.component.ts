import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  input,
  viewChild,
  resource,
  inject,
  Renderer2,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import embed, { VisualizationSpec } from 'vega-embed';
import { NgScrollbarModule } from 'ngx-scrollbar';

/**
 * Component for rendering a bar graph using Vega-Lite.
 * It takes a Vega-Lite specification as input and renders it in the view.
 */
@Component({
  selector: 'hra-bar-graph',
  standalone: true,
  imports: [CommonModule, NgScrollbarModule],
  templateUrl: './bar-graph.component.html',
  styleUrl: './bar-graph.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarGraphComponent {
  /** Vega-Lite specification input */
  readonly spec = input<VisualizationSpec | null>(null);

  /** ViewChild reference to the vega container element */
  private readonly container = viewChild.required<ElementRef<HTMLDivElement>>('vegaContainer');

  /** Renderer for safe DOM manipulation */
  private readonly renderer = inject(Renderer2);

  /** Vega resource for handling async visualization rendering */
  private readonly vega = resource({
    request: () => this.spec(),
    loader: async (params) => {
      const { abortSignal, request: spec } = params;

      // Clear any existing content
      this.clearContainer();

      // If no spec provided, return null
      if (!spec) {
        return null;
      }

      // Create a new div element for this visualization
      const root = this.createVisualizationRootElement();

      // Track if the operation was cancelled
      let finalized = false;
      abortSignal.addEventListener('abort', () => (finalized = true));

      try {
        // Embed the Vega-Lite specification
        const result = await embed(root, spec, {
          actions: true,
          renderer: 'svg',
          tooltip: true,
        });

        // Check if operation was cancelled during async operation
        if (finalized) {
          result.finalize();
          return null;
        }

        return result;
      } catch (error) {
        // If cancelled or error occurs, clean up and return null
        if (finalized) {
          return null;
        }
        throw error;
      }
    },
  });

  /** Constructor to initialize the component and set up effects */
  constructor() {
    // Effect to handle cleanup of Vega views
    effect((onCleanup) => {
      const result = this.vega.value();
      if (result) {
        onCleanup(() => result.finalize());
      }
    });
  }

  /** Clears the container element safely */
  private clearContainer(): void {
    const containerEl = this.container().nativeElement;
    while (containerEl.firstChild) {
      this.renderer.removeChild(containerEl, containerEl.firstChild);
    }
  }

  /**
   * Creates a new div element for the visualization using Renderer2
   * @returns HTMLElement for the visualization
   */
  private createVisualizationRootElement(): HTMLElement {
    const element = this.renderer.createElement('div');
    this.renderer.appendChild(this.container().nativeElement, element);
    return element;
  }

  /** Get loading state from resource */
  get loading() {
    return this.vega.isLoading();
  }

  /** Get error state from resource */
  get error() {
    return this.vega.error();
  }
}
