import { Component, input } from '@angular/core';
import { MatSortModule, Sort } from '@angular/material/sort';

export interface DataExample {
  [name: string]: string | number;
}

const exampleData: DataExample[] = [
  { name: 'Item 1', value: 3 },
  { name: 'Item 2', value: 2 },
  { name: 'Item 3', value: 1 },
];

/**
 * Header with sort feature used in Angular Material tables
 */
@Component({
  selector: 'hra-mat-sort-header',
  styleUrl: 'mat-sort-header.component.scss',
  templateUrl: 'mat-sort-header.component.html',
  standalone: true,
  imports: [MatSortModule],
})
export class MatSortHeaderComponent {
  /** Unsorted data */
  data = input<DataExample[]>(exampleData);

  /** Sorted data */
  sortedData = this.data();

  /** Columns in table */
  columns = ['name', 'value'];

  /**
   * Handles data sorting
   * @param sort Sort state
   */
  sortData(sort: Sort) {
    const data = this.data();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      if (sort.active in this.columns) {
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
