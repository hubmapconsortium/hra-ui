import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import moment from 'moment';
import { ColorPickerModule } from 'ngx-color-picker';
import { parse } from 'papaparse';
import { View } from 'vega';
import embed, { VisualizationSpec } from 'vega-embed';

export interface HistogramData {
  type: string;
  distance: number;
}

export interface NodeData {
  x: number;
  y: number;
  'Cell Type': string;
}

export interface EdgeData {
  node_index: number;
  src_x: number;
  src_y: number;
  src_z: number;
  tgt_x: number;
  tgt_y: number;
  tgt_z: number;
}

export interface CellColorData {
  cell_type: string;
  cell_color: number[];
}

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

  @Input() anchor = 'Endothelial';

  /** Vega lite spec for visualization */
  spec: VisualizationSpec = {};

  panelOpen = true;

  view?: View;

  colorMap: CellColorData[] = [];

  // currentColor = '';

  histogramData: HistogramData[] = [];

  colors$ = computed(async () => {
    const colors = (await this.fetchCsv('assets/color_mapping.csv')) as Record<string, string>[];
    this.colorMap = colors.map((entry) => {
      return {
        cell_type: entry['cell_type'],
        cell_color: entry['cell_color']
          .replace('[', '')
          .replace(']', '')
          .split(', ')
          .map((int) => parseInt(int)),
      };
    });
    this.colorMap.unshift({ cell_type: 'All Cells', cell_color: [0, 0, 0] });
    return this.colorMap;
  });

  async ngAfterViewInit() {
    await this.fetchCsv(
      'https://cdn.humanatlas.io/image-store/vccf-data-cell-nodes/published/esophagus-codex-stanford/esophagus-nodes.csv',
    ).then((nodeResults) => {
      this.fetchCsv(
        'https://cdn.humanatlas.io/image-store/vccf-data-cell-nodes/published/esophagus-codex-stanford/esophagus-edges.csv',
        { header: false },
      ).then((edgeResults) => {
        const nodeData = nodeResults as NodeData[];
        const edgeData = (edgeResults as Record<string, number>[]).map((entry) => {
          const values = Object.values(entry);
          return {
            node_index: values[0],
            src_x: values[1],
            src_y: values[2],
            src_z: values[3],
            tgt_x: values[4],
            tgt_y: values[5],
            tgt_z: values[6],
          };
        }) as EdgeData[];
        let processed = edgeData.map((entry) => {
          const typeName = nodeData[entry.node_index]['Cell Type'];
          const distance = Math.sqrt(
            this.squaredDistance3D([entry.src_x, entry.src_y, entry.src_z], [entry.tgt_x, entry.tgt_y, entry.tgt_z]),
          );
          return {
            type: typeName,
            distance: distance,
          };
        });
        processed = processed.filter((cell) => cell.type !== this.anchor);
        const all = processed.map((entry) => {
          return {
            ...entry,
            type: 'All Cells',
          };
        });
        processed = processed.concat(all);
        this.histogramData = processed;
        this.spec = this.createHistogram(this.histogramData);
        if (this.vis) {
          embed(this.vis.nativeElement, this.spec, { actions: false, renderer: 'svg' }).then(
            (result) => (this.view = result.view),
          );
        }
      });
    });
  }

  async fetchCsv(url: string, papaOptions = {}) {
    return new Promise((resolve) => {
      parse(url, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        ...papaOptions,
        download: true,
        complete: (results) => {
          resolve(results.data);
        },
      });
    });
  }

  squaredDistance3D(a: number[], b: number[]) {
    const dx = a[0] - b[0];
    const dy = a[1] - b[1];
    const dz = a[2] - b[2];
    return dx * dx + dy * dy + dz * dz;
  }

  toRGB(color: number[]): string {
    return `rgba(${color.join(', ')})`;
  }

  rgbToHex(color: number[]) {
    return '#' + ((1 << 24) + (color[0] << 16) + (color[1] << 8) + color[2]).toString(16).slice(1);
  }

  // setCurrentColor(color: [number, number, number]) {
  //   this.currentColor = this.rgbToHex(color);
  // }

  private createHistogram(data: HistogramData[]): VisualizationSpec {
    const maxDistance = Math.max(...data.map((data) => data.distance));
    return {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      width: 'container',
      height: 'container',
      data: {
        values: data,
      },
      mark: {
        type: 'line',
        interpolate: 'step',
      },
      encoding: {
        x: {
          field: 'distance',
          title: 'Distance (µm)',
          bandPosition: 0,
          scale: { domainMin: -5 },
          axis: {
            minExtent: 25,
            labelFlush: false,
            grid: true,
            labelAngle: 0,
            values: this.generateAxisValues(maxDistance, 25),
          },
          bin: { step: 5 },
        },
        y: {
          aggregate: 'count',
          title: 'Number of Cells',
          axis: {
            minExtent: 69,
            tickCount: 5,
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

  generateAxisValues(maxValue: number, interval: number): number[] {
    const highest = Math.round(maxValue / interval) * interval;
    let current = -1 * interval;
    const result = [];
    while (current <= highest) {
      result.push(current);
      current += interval;
    }
    return result;
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
