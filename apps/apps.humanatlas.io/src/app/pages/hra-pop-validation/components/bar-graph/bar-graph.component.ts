import {
  Component,
  input,
  OnChanges,
  SimpleChanges,
  viewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import embed, { VisualizationSpec, Result } from 'vega-embed';
import { NgScrollbarModule } from 'ngx-scrollbar';

@Component({
  selector: 'hra-bar-graph',
  standalone: true,
  imports: [CommonModule, NgScrollbarModule],
  templateUrl: './bar-graph.component.html',
  styleUrl: './bar-graph.component.scss',
})
export class BarGraphComponent implements OnChanges, AfterViewInit, OnDestroy {
  readonly spec = input<VisualizationSpec | null>(null);
  readonly vegaContainer = viewChild.required<ElementRef>('vegaContainer');

  private viewInitialized = false;
  private vegaView: Result | null = null;
  loading = false;
  error: string | null = null;

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    if (this.spec()) {
      this.renderGraph();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['spec'] && this.viewInitialized) {
      this.renderGraph();
    }
  }

  ngOnDestroy(): void {
    if (this.vegaView) {
      this.vegaView.finalize();
    }
  }

  private async renderGraph(): Promise<void> {
    const currentSpec = this.spec();
    if (!currentSpec || !this.vegaContainer()?.nativeElement) {
      return;
    }

    this.loading = true;
    this.error = null;

    try {
      // Clear previous chart
      this.vegaContainer().nativeElement.innerHTML = '';

      // Finalize previous view if exists
      if (this.vegaView) {
        this.vegaView.finalize();
      }

      this.vegaView = await embed(this.vegaContainer().nativeElement, currentSpec, {
        actions: true,
        renderer: 'svg',
        tooltip: true,
      });

      this.loading = false;
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Unknown error';
      this.loading = false;
    }
  }
}
