import { AfterViewInit, Component, input, ViewChild } from '@angular/core';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

/** Table data type */
export interface TableData {
  [name: string]: string | number;
}

/**
 * Angular Material table with with sort feature
 */
@Component({
  selector: 'hra-table',
  templateUrl: 'table.component.html',
  standalone: true,
  imports: [MatTableModule, MatSortModule],
})
export class TableComponent implements AfterViewInit {
  /** Unsorted data */
  data = input<TableData[]>([]);

  /** Table data source */
  dataSource = new MatTableDataSource(this.data());

  /** Sorted data */
  sortedData = this.data();

  /** Columns in table */
  columns: string[] = [];

  /** Mat sort element */
  @ViewChild(MatSort) sort!: MatSort;

  /** Sets data source and gets column names after view init */
  ngAfterViewInit() {
    this.dataSource.data = this.data();
    this.dataSource.sort = this.sort;
    this.columns = Object.keys(this.data()[0]);
  }

  /**
   * Handles data sorting
   * @param sort Sort state
   */
  sortData(sort: Sort) {
    const data = this.data();
    if (!data || !sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      if (this.columns.includes(sort.active)) {
        return this.compare(a[sort.active], b[sort.active], isAsc);
      } else {
        return 0;
      }
    });
  }

  /**
   * Compares two values
   * @param a Value a
   * @param b Value b
   * @param isAsc Sort by ascending
   * @returns 1 or -1
   */
  private compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
