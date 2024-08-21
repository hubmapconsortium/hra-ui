import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, effect, input, viewChild } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

/** Type for row data */
export interface TableDemoData {
  /** Name of item */
  name: string;
  /** Value of item*/
  value: number;
}

/**
 * Angular Material table with with sort feature
 */
@Component({
  selector: 'hra-table-demo',
  templateUrl: 'table-demo.component.html',
  standalone: true,
  imports: [MatTableModule, MatSortModule, CommonModule],
})
export class TableDemoComponent implements AfterViewInit {
  /** Unsorted data */
  readonly data = input<TableDemoData[]>([]);

  /** Table data source */
  dataSource = new MatTableDataSource(this.data());

  /** Sorted data */
  sortedData = this.data();

  /** Columns in table */
  columns: string[] = [];

  /** Mat sort element */
  sort = viewChild.required(MatSort);

  /** Sort data on load */
  constructor() {
    effect(() => {
      this.dataSource.sort = this.sort();
    });
  }

  /** Sets data source and gets column names after view init */
  ngAfterViewInit() {
    this.dataSource.data = this.data();
    this.columns = Object.keys(this.data()[0]);
  }
}
