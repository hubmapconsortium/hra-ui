import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import {
  BiomarkerTableDataCardComponent,
  BiomarkerTableDataIconComponent,
  DataItem,
} from '@hra-ui/components/molecules';
import { HoverDirective } from '@hra-ui/cdk';
import { GradientPoint, SizeLegend } from '@hra-ui/components/atoms';

/**
 * RGBTriblet of type RGB to store color
 */
type RGBTriplet = [number, number, number];

/**
 * An interface representing a single cell of the table.
 */
export interface DataCell {
  /** Represents the color of the icon */
  color: string;
  /** Represents the size of the icon */
  size: number;
  /** Represents the data for the data card */
  data: {
    cell: string;
    biomarker: string;
    meanExpression: number;
  };
}

/**
 * Details of the Tissue
 */
export interface TissueInfo {
  /** Name of the Tissue */
  tissueName: string;
  /** ID of the Tissue */
  tissueID: string;
  /** Number of datasets for this Tissue */
  numberOfDataSets: number;
}

/** Describes the composition of a single row in the table */
export type DataRow<T> = [string, number | undefined, ...(T | undefined)[]];

/** Cell types table, describing the types and quanitites of cells for a specific organ */
@Component({
  selector: 'hra-biomarker-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    BiomarkerTableDataIconComponent,
    HoverDirective,
    BiomarkerTableDataCardComponent,
  ],
  templateUrl: './biomarker-table.component.html',
  styleUrls: ['./biomarker-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BiomarkerTableComponent<T extends DataCell> implements OnChanges {
  @Input() tissueInfo: TissueInfo | undefined;

  /** Columns for the table */
  @Input() columns: string[] = [];

  /** Rows of the table */
  @Input() data: DataRow<T>[] = [];

  /** Gradient colors along with their stop points */
  @Input() gradient: GradientPoint[] = [];

  /** Taking input for the radius of the circle and the label to be displayed. */
  @Input() sizes: SizeLegend[] = [];

  /** Getter method to provide the definations of the columns */
  get columnsWithTypeAndCount(): string[] {
    return ['type', 'count', ...this.columns];
  }

  /** Source for the table */
  readonly dataSource = new MatTableDataSource<DataRow<T>>([]);

  /**
   * sets the data source for the table on every change
   * @param changes object consisting of change in the Input
   */
  ngOnChanges(changes: SimpleChanges): void {
    if ('data' in changes) {
      this.dataSource.data = this.data;
    }
  }

  /** Lerp function to give value beween min and max value based on the given value
   *
   * @param value
   * @param min
   * @param max
   * @returns
   */
  lerp(value: number, min: number, max: number): number {
    return min * (1 - value) + max * value;
  }

  /**
   * Converts HexCode to RGB
   * @param hex
   * @returns
   */
  hex2rgb(hex: string): RGBTriplet {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  }

  /**
   * Gets Min and Max color grade based on the meanExpression value
   * @param meanExpression
   * @returns
   */
  getMinMaxColor(meanExpression: number): { minColor: RGBTriplet; maxColor: RGBTriplet } {
    const index = this.gradient.findIndex((item, i, arr) => {
      return meanExpression >= item.percentage && meanExpression <= arr[i + 1]?.percentage;
    });

    const minColor: RGBTriplet = this.hex2rgb(this.gradient[index]?.color ?? this.gradient[0].color);
    const maxColor: RGBTriplet = this.hex2rgb(
      this.gradient[index + 1]?.color ?? this.gradient[this.gradient.length - 1].color
    );

    return { minColor, maxColor };
  }

  /**
   * Gets Min and Max size grade based on the Percentage value
   * @param percentage
   * @returns
   */
  getMinMaxSize(percentage: number): { minSize: number; maxSize: number } {
    const index = this.sizes.findIndex((item, i, arr) => {
      return percentage >= parseFloat(item.label) / 100 && percentage <= parseFloat(arr[i + 1]?.label) / 100;
    });
    const minSize: number = this.sizes[index]?.radius ?? this.sizes[0].radius;
    const maxSize: number = this.sizes[index + 1]?.radius ?? this.sizes[this.sizes.length - 1].radius;
    return { minSize, maxSize };
  }

  /**
   * Calculates the color of this value on this gradient
   * @param value
   * @returns
   */
  getColor(value: number): string {
    const { minColor, maxColor } = this.getMinMaxColor(value);
    return (
      '#' +
      minColor
        .map((min, index) => this.lerp(value, min, maxColor[index]))
        .map((component) => Math.round(component).toString(16))
        .join('')
    );
  }

  /**
   * gets Size of the Cell based on the percentage value
   * @param value
   * @returns
   */
  getSize(value: number): number {
    const { minSize, maxSize } = this.getMinMaxSize(value);
    return this.lerp(value, minSize, maxSize);
  }

  getHoverData([index, row]: [number | undefined, DataRow<T>]): DataItem[][] {
    if (index === undefined) {
      return [];
    }
    const {
      data: { cell, biomarker, meanExpression },
    } = row[index] as T;
    return [
      [
        { label: 'Functional Tissue Unit Name', value: this.tissueInfo?.tissueName ?? '' },
        { label: 'Uberon ID', value: this.tissueInfo?.tissueID ?? '' },
        { label: '#Datasets', value: '' + this.tissueInfo?.numberOfDataSets ?? '0' },
      ],
      [
        { label: 'Cell Type Name', value: row[0] },
        { label: 'CL ID', value: cell },
        { label: 'Number of Cells', value: `${row[1]}` },
      ],
      [
        { label: 'Gene Name', value: this.columns[index - 2] },
        { label: 'HGNC ID', value: biomarker },
        { label: 'Mean Expression Value', value: meanExpression.toFixed(6) },
      ],
    ];
  }
}
