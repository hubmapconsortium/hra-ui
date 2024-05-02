import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import embed, { VisualizationSpec } from 'vega-embed';
import { ColorPickerModule } from 'ngx-color-picker';

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

export interface ColorMapItem {
  cell_id: number;
  cell_type: string;
  cell_color: [number, number, number];
}

export type ColorMap = ColorMapItem[];

@Component({
  selector: 'cde-histogram',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatExpansionModule, ColorPickerModule],
  templateUrl: './histogram.component.html',
  styleUrl: './histogram.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistogramComponent implements AfterViewInit {
  /** Visualization element */
  @ViewChild('vis') vis?: ElementRef;

  /** Data */
  @Input() data: HistogramData[] = TEST_DATA;

  /** Vega lite spec for visualization */
  spec: VisualizationSpec = {};

  panelOpen = true;

  colorMap: ColorMap = [
    {
      cell_id: 1,
      cell_type: 'a',
      cell_color: [189, 189, 189],
    },
    {
      cell_id: 2,
      cell_type: 'b',
      cell_color: [93, 102, 127],
    },
    {
      cell_id: 3,
      cell_type: 'b',
      cell_color: [93, 102, 127],
    },
    {
      cell_id: 4,
      cell_type: 'b',
      cell_color: [93, 102, 127],
    },
    {
      cell_id: 5,
      cell_type: 'b',
      cell_color: [93, 102, 127],
    },
    {
      cell_id: 6,
      cell_type: 'b',
      cell_color: [93, 102, 127],
    },
    {
      cell_id: 7,
      cell_type: 'b',
      cell_color: [93, 102, 127],
    },
    {
      cell_id: 8,
      cell_type: 'b',
      cell_color: [93, 102, 127],
    },
    {
      cell_id: 9,
      cell_type: 'b',
      cell_color: [93, 102, 127],
    },
    {
      cell_id: 10,
      cell_type: 'b',
      cell_color: [93, 102, 127],
    },
    {
      cell_id: 11,
      cell_type: 'b',
      cell_color: [93, 102, 127],
    },
    {
      cell_id: 12,
      cell_type: 'b',
      cell_color: [93, 102, 127],
    },
  ];

  currentColor = '#5D667F';

  ngAfterViewInit(): void {
    this.spec = this.createHistogram(this.data);
    if (this.vis) {
      embed(this.vis.nativeElement, this.spec, { actions: false, renderer: 'svg' });
    }
  }

  toRGB(color: [number, number, number]): string {
    return `rgba(${color.join(', ')})`;
  }

  rgbToHex(color: [number, number, number]) {
    return '#' + ((1 << 24) + (color[0] << 16) + (color[1] << 8) + color[2]).toString(16).slice(1);
  }

  setCurrentColor(color: [number, number, number]) {
    this.currentColor = this.rgbToHex(color);
  }

  private createHistogram(data: HistogramData[]): VisualizationSpec {
    return {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      width: 'container',
      height: 'container',
      autosize: { type: 'fit', contains: 'content' },
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
        color: {
          field: 'type',
          type: 'nominal',
          legend: null,
          scale: { range: this.colorMap.map((entry) => this.rgbToHex(entry.cell_color)) },
        },
      },
    };
  }
}
