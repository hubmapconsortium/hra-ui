import { Component, Input, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ExtraHeader, HeaderData } from './header';
import { TableData } from './table';

/** Displays a table with provided data */
@Component({
  selector: 'ccf-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: false,
})
export class TableComponent {
  /** Sorts the current selected data */
  @ViewChild(MatSort, { static: true })
  set sort(value: MatSort) {
    this.dataSource.sort = value;
  }

  /** Flag to check if column is of organ */
  @Input() isOrgan = false;

  /** Sets the data to the table datasource */
  @Input()
  set typeCount(data: TableData[]) {
    this.dataSource.data = data;
  }

  /** Column definitions of the columns to be displayed */
  @Input() displayedColumns: string[] = [];

  /** Details of the columns to be displayed */
  @Input() columns: HeaderData[] = [];

  /** Flag to show/hide the total below the table */
  @Input() isTotal = false;

  /** Details of additional columns to be displayed */
  @Input() additionalHeaders?: ExtraHeader[];

  /** Column definitions of additional columns to be displayed */
  @Input() additionalColumnsData?: string[];

  /** Details of cell columns to be displayed */
  @Input() cellHeaders?: ExtraHeader[];

  /** Column definitions of cell columns to be displayed */
  @Input() cellHeadersData?: string[];

  /** Datasource to store table data */
  readonly dataSource = new MatTableDataSource<TableData>([]);

  /** Returns the column definition of first column */
  get firstColumnId(): string {
    return this.columns[0]?.columnDef ?? '';
  }

  /** Returns sum of numbers in a column */
  getTotal(id: string) {
    const sum = this.dataSource.data
      .filter((entry) => typeof entry[id] === 'number')
      .reduce((acc, entry) => acc + (entry[id] as number), 0);
    return sum.toLocaleString();
  }

  /** Returns if column has atleast one number */
  isNumericColumn(column: string): boolean {
    if (column === 'table_version') {
      return false;
    }

    let hasAtLeastOneNumber = false;
    for (const { [column]: value } of this.dataSource.data) {
      if (value === null) {
        continue;
      } else if (typeof value !== 'number') {
        return false;
      }
      hasAtLeastOneNumber = true;
    }
    return hasAtLeastOneNumber;
  }

  /** Returns an alignment class for the column */
  getAlignmentClass(column: HeaderData): string {
    return `alignment-${column.alignment ?? 'default'}`;
  }

  /** Return's 'no data' if column cell is null */
  formatData(value: unknown): string {
    return value !== null ? `${value}` : 'no data';
  }
}
