import { CommonModule } from '@angular/common';
import { Component, effect, input, viewChild } from '@angular/core';
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
export class TableDemoComponent {
  /** Unsorted data */
  readonly data = input<TableDemoData[]>([]);

  /** Columns in table */
  readonly columns: string[] = ['name', 'value'];

  /** Mat sort element */
  readonly sort = viewChild.required(MatSort);

  /** Table data source */
  readonly dataSource = new MatTableDataSource<TableDemoData>([]);

  /** Sort data on load */
  constructor() {
    effect(() => {
      this.dataSource.data = this.data();
      this.dataSource.sort = this.sort();
    });
  }
}
