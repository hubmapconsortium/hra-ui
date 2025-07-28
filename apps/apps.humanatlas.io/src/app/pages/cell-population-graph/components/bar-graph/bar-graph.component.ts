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
import { ScrollingModule } from '@hra-ui/design-system/scrolling';

/**
 * Component for rendering a bar graph using Vega-Lite.
 * It takes a Vega-Lite specification as input and renders it in the view.
 */
@Component({
  selector: 'hra-bar-graph',
  imports: [CommonModule, ScrollingModule],
  templateUrl: './bar-graph.component.html',
  styleUrl: './bar-graph.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarGraphComponent {
  /** Vega-Lite specification input */
  readonly spec = input<VisualizationSpec | null>(null);

  /** ViewChild reference to the vega container element */
  private readonly container = viewChild.required<ElementRef<HTMLDivElement>>('vegaContainer');

  /**
   * Renderer  of bar graph component
   */
  private readonly renderer = inject(Renderer2);

  /**
   * Vega resource of bar graph component
   */
  private readonly vega = resource({
    request: () => this.spec(),
    loader: async (params) => {
      const { abortSignal, request: spec } = params;
      this.clearContainer();
      if (!spec) {
        return null;
      }

      const root = this.createVisualizationRootElement();
      const resultP = embed(root, spec);
      let finalize = () => {};
      abortSignal.addEventListener('abort', () => finalize());

      const result = await resultP;
      finalize = result.finalize;
      return result;
    },
  });

  /** Constructor to initialize the component and set up effects */
  constructor() {
    effect((onCleanup) => {
      const result = this.vega.value();
      if (result) {
        onCleanup(() => result.finalize());
      }
    });
  }

  /** Clears container element */
  private clearContainer(): void {
    const containerEl = this.container().nativeElement;
    while (containerEl.firstChild) {
      containerEl.removeChild(containerEl.firstChild);
    }
  }

  /**
   * Creates visualization root element
   * @returns HTML element
   */
  private createVisualizationRootElement(): HTMLElement {
    const element = this.renderer.createElement('div');
    this.renderer.appendChild(this.container().nativeElement, element);
    return element;
  }
}
