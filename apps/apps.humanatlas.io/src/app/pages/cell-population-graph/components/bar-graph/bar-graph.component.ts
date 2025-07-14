import { ChangeDetectionStrategy, Component, effect, ElementRef, input, viewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import embed, { Result, VisualizationSpec } from 'vega-embed';
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
export class BarGraphComponent implements OnDestroy {
  /** Vega-Lite specification input */
  readonly spec = input<VisualizationSpec | null>(null);

  /** ViewChild reference to the vega container element */
  private readonly vegaContainer = viewChild.required<ElementRef<HTMLDivElement>>('vegaContainer');

  /** Current Vega embed result */
  private result: Result | null = null;

  constructor() {
    effect(async () => {
      const currentSpec = this.spec();

      if (currentSpec) {
        await this.renderVisualization(currentSpec);
      } else {
        this.clearVisualization();
      }
    });
  }

  /**
   * Renders the Vega-Lite visualization
   */
  private async renderVisualization(spec: VisualizationSpec): Promise<void> {
    if (this.result) {
      this.result.finalize();
      this.result = null;
    }
    this.result = await embed(this.vegaContainer().nativeElement, spec);
  }

  /**
   * Clears the current visualization
   */
  private clearVisualization(): void {
    if (this.result) {
      this.result.finalize();
      this.result = null;
    }

    if (this.vegaContainer()?.nativeElement) {
      this.vegaContainer().nativeElement.innerHTML = '';
    }
  }

  ngOnDestroy(): void {
    this.clearVisualization();
  }
}
