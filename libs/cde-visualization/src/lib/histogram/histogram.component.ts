import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ColorPickerModule } from 'ngx-color-picker';
import embed, { VisualizationSpec } from 'vega-embed';
import { saveAs } from 'file-saver';
// @ts-expect-error TODO: fix this later
import { saveSvgAsPng } from 'save-svg-as-png';

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

export interface CellColorData {
  cell_type: string;
  cell_color: [number, number, number];
}

export type ColorMap = CellColorData[];

@Component({
  selector: 'cde-histogram',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatExpansionModule, ColorPickerModule],
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
      cell_type: 'a',
      cell_color: [189, 189, 189],
    },
    {
      cell_type: 'b',
      cell_color: [93, 102, 127],
    },
    {
      cell_type: 'b',
      cell_color: [93, 102, 127],
    },
    {
      cell_type: 'b',
      cell_color: [93, 102, 127],
    },
    {
      cell_type: 'b',
      cell_color: [93, 102, 127],
    },
    {
      cell_type: 'b',
      cell_color: [93, 102, 127],
    },
    {
      cell_type: 'b',
      cell_color: [93, 102, 127],
    },
    {
      cell_type: 'b',
      cell_color: [93, 102, 127],
    },
    {
      cell_type: 'b',
      cell_color: [93, 102, 127],
    },
    {
      cell_type: 'b',
      cell_color: [93, 102, 127],
    },
    {
      cell_type: 'b',
      cell_color: [93, 102, 127],
    },
    {
      cell_type: 'b',
      cell_color: [93, 102, 127],
    },
  ];

  currentColor = '';

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

  // setCurrentColor(color: [number, number, number]) {
  //   this.currentColor = this.rgbToHex(color);
  // }

  private createHistogram(data: HistogramData[]): VisualizationSpec {
    return {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      width: 'container',
      height: 'container',
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

  download(event: MouseEvent, type: 'svg' | 'png') {
    event.stopPropagation();
    const vis = this.vis?.nativeElement;
    if (vis === null) {
      return;
    } else {
      const svg = vis.querySelector('svg') as SVGElement;
      const svgString = new XMLSerializer().serializeToString(svg);
      if (type === 'svg') {
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        saveAs(blob, 'image.svg');
      } else {
        saveSvgAsPng(svg, 'image.png');
      }
    }
  }
}
