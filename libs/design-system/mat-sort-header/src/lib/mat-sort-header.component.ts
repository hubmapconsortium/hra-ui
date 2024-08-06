import { Component } from '@angular/core';
import { Sort, MatSortModule } from '@angular/material/sort';

export interface Data {
  name: string;
}

/**
 * @title Sorting overview
 */
@Component({
  selector: 'hra-mat-sort-header',
  styleUrl: 'mat-sort-header.component.scss',
  templateUrl: 'mat-sort-header.component.html',
  standalone: true,
  imports: [MatSortModule],
})
export class MatSortHeaderComponent {
  data: Data[] = [{ name: 'aaaaaa' }, { name: 'bbbbbb' }, { name: 'cccccc' }];

  sortedData: Data[];

  constructor() {
    this.sortedData = this.data;
  }

  sortData(sort: Sort) {
    const data = this.data;
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
