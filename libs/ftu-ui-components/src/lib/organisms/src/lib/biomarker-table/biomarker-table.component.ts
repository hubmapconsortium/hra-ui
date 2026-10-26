// import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HraCommonModule } from '@hra-ui/common';
import { BottomSheetService } from '@hra-ui/design-system/bottom-sheet';
import { DataItem } from '@hra-ui/design-system/modal/info-modal';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { TableColumn, TableRow } from '@hra-ui/design-system/table';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { SourceReference } from '@hra-ui/services';
import { ReplaySubject } from 'rxjs';
import { GradientPoint } from '../../../../atoms/src/lib/gradient-legend/gradient-legend.component';
import { SizeLegend } from '../../../../atoms/src/lib/size-legend/size-legend.component';
import { BiomarkerTableDataIconComponent } from '../../../../molecules/src';

/**
 * RGBTriblet of type RGB to store color
 */
type RGBTriplet = [number, number, number];

/**
 * The two legend entries surrounding a value along with their percentages
 */
interface MinMaxResult<T> {
  /** Percentage of the lower entry */
  minPercentage: number;
  /** Percentage of the upper entry */
  maxPercentage: number;
  /** Value of the lower entry */
  minValue: T;
  /** Value of the upper entry */
  maxValue: T;
}

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
    /** Cell name */
    cell: string;
    /** Biomarker name */
    biomarker: string;
    /** Mean expression value */
    meanExpression: number;
    /** Dataset count */
    dataset_count?: number;
  };
}

/**
 * Details of the Tissue
 */
export interface TissueInfo {
  /** ID of the Tissue */
  id: string;
  /** Name of the Tissue */
  label: string;
}

/** Describes the composition of a single row in the table */
export type DataRow<T> = [string, number | undefined, ...(T | undefined)[]];

/** Cell types table, describing the types and quanitites of cells for a specific organ */
@Component({
  selector: 'ftu-biomarker-table',
  imports: [
    HraCommonModule,
    MatTableModule,
    BiomarkerTableDataIconComponent,
    ScrollingModule,
    MatButtonToggleModule,
    PlainTooltipDirective,
  ],
  templateUrl: './biomarker-table.component.html',
  styleUrl: './biomarker-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BiomarkerTableComponent<T extends DataCell> implements OnChanges {
  /**
   * Input: TissueInfo carrying the details of the tissue open
   */
  @Input() tissueInfo: TissueInfo = {
    id: '',
    label: '',
  };

  /** Columns for the table */
  @Input() columns: string[] = [];

  /** Source list for biomarker table */
  @Input() dataSources: SourceReference[] = [];

  /** Rows of the table */
  @Input() data: DataRow<T>[] = [];

  /** Gradient colors along with their stop points */
  @Input() gradient: GradientPoint[] = [];

  /** Taking input for the radius of the circle and the label to be displayed. */
  @Input() sizes: SizeLegend[] = [];

  /** Smallest mean expression value in the current view, mapped to the start of the gradient */
  @Input() minExpression?: number;

  /** Largest mean expression value in the current view, mapped to the end of the gradient */
  @Input() maxExpression?: number;

  /** Cell id which is hovered, used for highlighting */
  @Input() highlightedCellId = '';

  /** List of cell ids in the illustration */
  @Input() illustrationIds: string[] = [];

  /** Emits cell type label when row is hovered */
  @Output() readonly rowHover = new EventEmitter<string>();

  /** Reference to biomarker table */
  @ViewChild('table', { static: true, read: ElementRef }) table!: ElementRef;

  /** Columns replaysubject */
  readonly columns$ = new ReplaySubject<string[]>(1);

  /** Injects BottomSheetService */
  private readonly bottomSheetService = inject(BottomSheetService);

  /** Source for the table */
  readonly dataSource = new MatTableDataSource<DataRow<T>>([]);

  /** Change detection */
  private readonly cdr = inject(ChangeDetectorRef);

  /**
   * Sets the data source for the table on every change
   * Sorts the biomarker table on illustrationIds change
   * @param changes object consisting of change in the Input
   */
  ngOnChanges(changes: SimpleChanges): void {
    if ('data' in changes || 'illustrationIds' in changes) {
      this.dataSource.data = this.sortTableData(this.data);
      this.updateColumns();
    }
  }

  /**
   * Opens bottom sheet
   * @param cellData
   */
  openBottomSheet(cellData: T): void {
    const row = this.dataSource.data.find((r) => r.slice(2).some((cell) => cell === cellData));

    if (!row) {
      return;
    }

    const cellIndex = row.indexOf(cellData);

    if (cellIndex === -1) {
      return;
    }

    const hoverData = this.getHoverData([cellIndex, row]);

    const rows: TableRow[] = hoverData.flat().map((item) => ({
      property: item.label,
      value: item.value,
    }));

    const columns: TableColumn[] = [
      { column: 'property', label: 'Property', type: 'text' },
      { column: 'value', label: 'Value', type: 'text' },
    ];

    this.bottomSheetService.openTableBottomSheet(rows, columns, true);
  }

  /**
   * Updates table columns with prefiller and postfiller columns
   */
  updateColumns(): void {
    const columns = ['type', 'count'];
    const displayedColumns = this.columns;
    columns.push(...displayedColumns);
    this.columns$.next(columns);
    this.cdr.detectChanges();
  }

  /**
   * Sorts table by cell type alphabetically, then puts cells that are in the illustration on top
   */
  sortTableData(data: DataRow<T>[]): DataRow<T>[] {
    const illustrationIdsSet = new Set(this.illustrationIds);
    const inIllustration = new Map<DataRow<T>, boolean>();
    for (const row of data) {
      const id = this.getHoverId(row);
      inIllustration.set(row, illustrationIdsSet.has(id));
    }

    return [...data].sort((row1, row2) => {
      const in1 = inIllustration.get(row1);
      const in2 = inIllustration.get(row2);

      if (in1 && !in2) {
        return -1;
      } else if (!in1 && in2) {
        return 1;
      }

      return row1[0].localeCompare(row2[0]);
    });
  }

  /**
   * Returns true if id matches the cell id of the row
   * @param row Highlighted row
   */
  isHighlighted(row: DataRow<T>): boolean {
    return this.getHoverId(row) === this.highlightedCellId;
  }

  /**
   * Gets hover id from row
   * @param data row data
   * @returns cell type id
   */
  getHoverId(data: DataRow<T>): string {
    const entry = data.slice(2).find((item) => item) as T;
    return entry?.data.cell;
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
   * Scales a value linearly to the range [0, 1] relative to start and end,
   * clamping values outside the range
   * @param value Value to scale
   * @param start Value mapped to 0
   * @param end Value mapped to 1
   * @returns The normalized value
   */
  normalizeMinMaxClamped(value: number, start: number, end: number): number {
    if (start === end) {
      return 0;
    } else if (value < start) {
      return 0;
    } else if (value > end) {
      return 1;
    }

    return (value - start) / (end - start);
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
   * @param meanExpression Mean expression in the range [0, 100]
   * @returns
   */
  getMinMaxColor(meanExpression: number): MinMaxResult<RGBTriplet> {
    return this.getMinMax(
      meanExpression,
      this.gradient,
      (item) => item.percentage,
      (item) => this.hex2rgb(item.color),
    );
  }

  /**
   * Gets Min and Max size grade based on the Percentage value
   * @param percentage Percentage in the range [0, 1]
   * @returns
   */
  getMinMaxSize(percentage: number): MinMaxResult<number> {
    return this.getMinMax(
      percentage,
      this.sizes,
      (item) => parseFloat(item.label) / 100,
      (item) => item.radius,
    );
  }

  /**
   * Calculates the color of this value on this gradient. The value is first
   * scaled using the min and max expression of the current view, if available
   * @param value Raw mean expression value
   * @returns
   */
  getColor(value: number): string {
    const { minExpression, maxExpression } = this;
    const normalized =
      minExpression !== undefined && maxExpression !== undefined
        ? this.normalizeMinMaxClamped(value, minExpression, maxExpression)
        : value;
    const { minPercentage, maxPercentage, minValue, maxValue } = this.getMinMaxColor(normalized * 100);
    const progress = this.normalizeMinMaxClamped(normalized * 100, minPercentage, maxPercentage);
    return (
      '#' +
      minValue
        .map((min, index) => this.lerp(progress, min, maxValue[index]))
        .map((component) => {
          const hex = Math.round(component).toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        })
        .join('')
    );
  }

  /**
   * gets Size of the Cell based on the percentage value
   * @param value
   * @returns
   */
  getSize(value: number): number {
    const { minPercentage, maxPercentage, minValue, maxValue } = this.getMinMaxSize(value);
    return this.lerp(this.normalizeMinMaxClamped(value, minPercentage, maxPercentage), minValue, maxValue);
  }

  /**
   * Processes the object for hover data for Table Cell
   * @param index index of the row of the datasource
   * @param row row of the datasource
   * @returns
   */
  getHoverData([index, row]: [number, DataRow<T>]): DataItem[][] {
    if (row[index] === undefined) {
      return [];
    }

    const {
      tissueInfo: { id, label },
    } = this;
    const {
      data: { cell, biomarker, meanExpression, dataset_count },
    } = row[index] as T;

    return [
      [
        { label: 'Functional Tissue Unit Name', value: label },
        { label: 'Uberon ID', value: id },
        { label: '#Datasets', value: `${dataset_count ?? 0}` },
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

  /**
   * Sets and emits cell type id on row hover
   * @param hoverId cell type id
   */
  setHoverId(hoverId?: string): void {
    this.highlightedCellId = hoverId ?? '';
    this.rowHover.emit(hoverId);
  }

  /**
   * Finds the two consecutive entries surrounding a value. Values outside
   * the entries are clamped to the first or last segment
   * @param value Value to look up
   * @param entries Entries sorted by percentage
   * @param percentageFn Gets the percentage of an entry
   * @param valueFn Gets the value of an entry
   * @returns The surrounding entries' percentages and values
   */
  private getMinMax<E, R>(
    value: number,
    entries: E[],
    percentageFn: (entry: E) => number,
    valueFn: (entry: E) => R,
  ): MinMaxResult<R> {
    if (entries.length === 0) {
      throw new Error('Cannot look up a value without any entries');
    }

    const lastSegment = Math.max(entries.length - 2, 0);
    let index = 0;
    while (index < lastSegment && value > percentageFn(entries[index + 1])) {
      index++;
    }

    const entry = entries[index];
    const nextEntry = entries[Math.min(index + 1, entries.length - 1)];
    return {
      minPercentage: percentageFn(entry),
      maxPercentage: percentageFn(nextEntry),
      minValue: valueFn(entry),
      maxValue: valueFn(nextEntry),
    };
  }
}
