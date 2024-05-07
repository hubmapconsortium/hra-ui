import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import moment from 'moment';
import { ColorPickerModule } from 'ngx-color-picker';
import { View } from 'vega';
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

export interface CellColorData {
  cell_type: string;
  cell_color: [number, number, number];
  anchor?: boolean;
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

  view?: View;

  colorMap: ColorMap = [
    {
      cell_type: 'Endothelial',
      cell_color: [189, 189, 189],
      anchor: true,
    },
    {
      cell_type: '[cell/node type]',
      cell_color: [93, 102, 127],
    },
    {
      cell_type: '[cell/node type]',
      cell_color: [93, 102, 127],
    },
    {
      cell_type: '[cell/node type]',
      cell_color: [93, 102, 127],
    },
    {
      cell_type: '[cell/node type]',
      cell_color: [93, 102, 127],
    },
    {
      cell_type: '[cell/node type]',
      cell_color: [93, 102, 127],
    },
    {
      cell_type: '[cell/node type]',
      cell_color: [93, 102, 127],
    },
    {
      cell_type: '[cell/node type]',
      cell_color: [93, 102, 127],
    },
    {
      cell_type: '[cell/node type]',
      cell_color: [93, 102, 127],
    },
    {
      cell_type: '[cell/node type]',
      cell_color: [93, 102, 127],
    },
    {
      cell_type: '[cell/node type]',
      cell_color: [93, 102, 127],
    },
    {
      cell_type: '[cell/node type]',
      cell_color: [93, 102, 127],
    },
  ];

  currentColor = '';

  ngAfterViewInit(): void {
    this.spec = this.createHistogram(this.data);
    if (this.vis) {
      embed(this.vis.nativeElement, this.spec, { actions: false, renderer: 'svg' }).then(
        (result) => (this.view = result.view),
      );
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
          scale: { zero: true, domainMin: -5 },
          axis: {
            minExtent: 25,
            tickCount: 9,
            labelFlush: false,
          },
        },
        y: {
          field: 'numCells',
          type: 'quantitative',
          title: 'Number of Cells',
          axis: {
            minExtent: 69,
            tickExtra: false,
          },
        },
        color: {
          field: 'type',
          type: 'nominal',
          legend: null,
          scale: { range: this.colorMap.map((entry) => this.rgbToHex(entry.cell_color)) },
        },
      },
      config: {
        font: 'Metropolis',
        axis: {
          labelFontSize: 12,
          titleFontSize: 14,
          titleFontWeight: 'normal',
          ticks: false,
          domain: false,
          labelPadding: 8,
        },
      },
    };
  }

  download(event: MouseEvent, type: 'svg' | 'png') {
    event.stopPropagation();
    const dt = moment(new Date()).format('YYYY.MM.DD_hh.mm');
    const fileName = `cde_${dt}.${type}`;
    if (this.view) {
      this.view.toImageURL(type).then((url: string) => {
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('target', '_blank');
        link.setAttribute('download', fileName);
        link.dispatchEvent(new MouseEvent('click'));
      });
    }
  }
}
