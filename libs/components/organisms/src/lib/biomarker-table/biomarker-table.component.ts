import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { HoverDirective } from '@hra-ui/cdk';
import { GradientPoint, SizeLegend } from '@hra-ui/components/atoms';
import {
  BiomarkerTableDataCardComponent,
  BiomarkerTableDataIconComponent,
  DataItem,
  SourceListItem,
} from '@hra-ui/components/molecules';
import { TableVirtualScrollDataSource, TableVirtualScrollModule } from 'ng-table-virtual-scroll';
import { ReplaySubject } from 'rxjs';

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
  selector: 'hra-biomarker-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    BiomarkerTableDataIconComponent,
    HoverDirective,
    BiomarkerTableDataCardComponent,
    ScrollingModule,
    TableVirtualScrollModule,
  ],
  templateUrl: './biomarker-table.component.html',
  styleUrls: ['./biomarker-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BiomarkerTableComponent<T extends DataCell> implements OnInit, OnChanges {
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
  @Input() dataSources: SourceListItem[] = [];

  /** Rows of the table */
  @Input() data: DataRow<T>[] = [];

  /** Gradient colors along with their stop points */
  @Input() gradient: GradientPoint[] = [];

  /** Taking input for the radius of the circle and the label to be displayed. */
  @Input() sizes: SizeLegend[] = [];

  /** Cell id which is hovered, used for highlighting */
  @Input() highlightedCellId = '';

  /** List of cell ids in the illustration */
  @Input() illustrationIds: string[] = [];

  /** Emits cell type label when row is hovered */
  @Output() readonly rowHover = new EventEmitter<string>();

  /** Reference to virtual scroll viewport */
  @ViewChild(CdkVirtualScrollViewport, { static: true }) vscroll!: CdkVirtualScrollViewport;

  /** Reference to biomarker table */
  @ViewChild('table', { static: true, read: ElementRef }) table!: ElementRef;

  /** Columns replaysubject */
  readonly columns$ = new ReplaySubject<string[]>(1);

  /** Cell width (px) */
  private readonly cellWidth = 44;
  /** Extra columns to render outside the visible viewport */
  private readonly extraDisplayedColumnCount = 2;

  /** Current horizontal viewport size */
  private horizontalViewportSize = 400;
  /** Current horizontal scroll offset */
  private horizontalScrollOffset = 0;
  /** Current displayed column count */
  private displayedColumnCount = 10;
  /** Current displayed column offset */
  private displayedColumnOffset = 0;

  /** Gets the current width of the prefiller column */
  get preFillerWidth(): string {
    return `${this.cellWidth * this.displayedColumnOffset}px`;
  }

  /** Gets the current width of the postfiller column */
  get postFillerWidth(): string {
    const count = this.columns.length - this.displayedColumnCount - this.displayedColumnOffset;
    return `${this.cellWidth * count}px`;
  }

  /** Source for the table */
  readonly dataSource = new TableVirtualScrollDataSource<DataRow<T>>([]);

  /** Change detection */
  private readonly cdr = inject(ChangeDetectorRef);

  /**
   * Subscribes to scroll event on virtual scroll viewport and checks displayed columns
   */
  ngOnInit(): void {
    const scroll$ = this.vscroll.scrollable.elementScrolled();
    scroll$.subscribe(() => this.checkDisplayedColumns());
  }

  /**
   * Sets the data source for the table on every change
   * Sorts the biomarker table on illustrationIds change
   * @param changes object consisting of change in the Input
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.checkDisplayedColumns('columns' in changes);
    if ('data' in changes || 'illustrationIds' in changes) {
      this.dataSource.data = this.sortTableData(this.data);
    }
  }

  /**
   * Checks for column updates on mouse move
   */
  @HostListener('window:mousemove', ['$event'])
  onMouseMove() {
    this.checkDisplayedColumns();
  }

  /**
   * Returns index value
   */
  trackByIndex(index: number): number {
    return index;
  }

  /**
   * Checks to see if columns should be updated
   */
  checkDisplayedColumns(forceUpdate = false): void {
    const scrollable = this.vscroll.scrollable;
    const size = scrollable.measureViewportSize('horizontal');
    const offset = scrollable.measureScrollOffset('start');
    let shouldUpdate = forceUpdate;

    if (size !== this.horizontalViewportSize) {
      this.updateHorizontalViewportSize(size);
      shouldUpdate = true;
    }
    if (offset !== this.horizontalScrollOffset) {
      this.updateHorizontalViewportOffset(offset);
      shouldUpdate = true;
    }

    if (shouldUpdate) {
      this.updateColumns();
    }
  }

  /**
   * Updates horizontal viewport size and updates displayed column count
   */
  updateHorizontalViewportSize(size: number): void {
    this.horizontalViewportSize = size;
    this.displayedColumnCount =
      Math.ceil(this.horizontalViewportSize / this.cellWidth) + this.extraDisplayedColumnCount;
  }

  /**
   * Updates horizontal viewport offset and updates displayed column offset
   */
  updateHorizontalViewportOffset(offset: number): void {
    this.horizontalScrollOffset = offset;
    this.displayedColumnOffset = Math.max(Math.floor(offset / this.cellWidth) - this.extraDisplayedColumnCount / 2, 0);
  }

  /**
   * Updates table columns with prefiller and postfiller columns
   */
  updateColumns(): void {
    const { displayedColumnCount, displayedColumnOffset } = this;
    const columns = ['type', 'count'];
    if (this.displayedColumnOffset > 0) {
      columns.push('preFiller');
    }

    const displayedColumns = this.columns.slice(displayedColumnOffset, displayedColumnOffset + displayedColumnCount);
    columns.push(...displayedColumns);

    if (displayedColumnOffset + displayedColumnCount < this.columns.length) {
      columns.push('postFiller');
    }

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
    const entry = data.slice(2).find((entry) => entry) as T;
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
    const maxColor: RGBTriplet = this.hex2rgb(this.gradient[index + 1].color);

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
    const minSize: number = this.sizes[index]?.radius;
    const maxSize: number = this.sizes[index + 1].radius;
    return { minSize, maxSize };
  }

  /**
   * Calculates the color of this value on this gradient
   * @param value
   * @returns
   */
  getColor(value: number): string {
    const { minColor, maxColor } = this.getMinMaxColor(value * 100);
    return (
      '#' +
      minColor
        .map((min, index) => this.lerp(value, min, maxColor[index]))
        .map((component) => {
          const hex = Math.round(component).toString(16);
          return hex.length == 1 ? '0' + hex : hex;
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
    const { minSize, maxSize } = this.getMinMaxSize(value);
    return this.lerp(value, minSize, maxSize);
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
}
