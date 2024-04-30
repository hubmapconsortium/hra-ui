import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import embed, { VisualizationSpec } from 'vega-embed';

const TEST_DATA: HistogramData[] = [
  {
    type: 'a',
    distance: 25,
    numCells: 50000,
  },
  {
    type: 'a',
    distance: 50,
    numCells: 40000,
  },
  {
    type: 'a',
    distance: 75,
    numCells: 30000,
  },
  {
    type: 'a',
    distance: 100,
    numCells: 20000,
  },

  {
    type: 'b',
    distance: 25,
    numCells: 10000,
  },
  {
    type: 'b',
    distance: 50,
    numCells: 20000,
  },
  {
    type: 'b',
    distance: 75,
    numCells: 30000,
  },
  {
    type: 'b',
    distance: 100,
    numCells: 40000,
  },
];

export interface HistogramData {
  type: string;
  distance: number;
  numCells: number;
}

@Component({
  selector: 'cde-histogram',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './histogram.component.html',
  styleUrl: './histogram.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistogramComponent implements AfterViewInit {
  /** Visualization element */
  @ViewChild('vis') vis?: ElementRef;

  /** Vega lite spec for visualization */
  @Input() spec: VisualizationSpec = {};

  /** Data */
  @Input() data: HistogramData[] = TEST_DATA;

  ngAfterViewInit(): void {
    this.spec = this.createHistogram(this.data);
    if (this.vis) {
      embed(this.vis.nativeElement, this.spec, { actions: false, renderer: 'svg' });
    }
  }

  private createHistogram(data: HistogramData[]): VisualizationSpec {
    return {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      width: 1000,
      data: {
        values: data,
      },
      mark: 'line',
      encoding: {
        x: {
          field: 'distance',
          type: 'quantitative',
          title: 'Distance (µm)',
          scale: { zero: true },
        },
        y: {
          field: 'numCells',
          type: 'quantitative',
          title: 'Number of Cells',
        },
        color: { field: 'type', type: 'nominal' },
      },
    };
  }
}
