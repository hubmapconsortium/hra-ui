import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { BiomarkerTableDataIconComponent, DataItem } from '@hra-ui/components/molecules';

/**
 * An interface representing a single cell of the table.
 */
export interface DataCell {
  /** Represents the color of the icon */
  color: string;
  /** Represents the size of the icon */
  size: number;
  /** Represents the data for the data card */
  data: DataItem[][];
}

/** Describes the composition of a single row in the table */
export type DataRow<T> = [string, number | undefined, ...(T | undefined)[]];

/** Cell types table, describing the types and quanitites of cells for a specific organ */
@Component({
  selector: 'hra-biomarker-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, BiomarkerTableDataIconComponent],
  templateUrl: './biomarker-table.component.html',
  styleUrls: ['./biomarker-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BiomarkerTableComponent<T extends DataCell> implements OnChanges {
  /** Columns for the table */
  @Input() columns: string[] = [];

  /** Rows of the table */
  @Input() data: DataRow<T>[] = [];

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
}
