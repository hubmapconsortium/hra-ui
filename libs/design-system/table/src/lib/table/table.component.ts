import { Component, effect, input, viewChild } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HraCommonModule } from '@hra-ui/common';
import { TextHyperlinkDirective } from '@hra-ui/design-system/buttons/text-hyperlink';
import { ScrollingModule, ScrollOverflowFadeDirective } from '@hra-ui/design-system/scrolling';

/** Type for table row data */
export interface TableRowData {
  /** Column: value */
  [value: string]: string | number | TableLinkData;
}

/** Value to use if cell contains a link */
export interface TableLinkData {
  /** Link label */
  label: unknown;
  /** Link url */
  url?: string;
}

/** Table style */
export type TableStyle = 'alternating' | 'divider' | 'basic';

/**
 * Angular Material table with with sort feature
 */
@Component({
  selector: 'hra-table',
  templateUrl: 'table.component.html',
  imports: [
    HraCommonModule,
    MatTableModule,
    MatSortModule,
    ScrollingModule,
    ScrollOverflowFadeDirective,
    TextHyperlinkDirective,
  ],
  host: {
    '[attr.style]': 'style()',
    '[attr.enableSort]': 'enableSort()',
  },
})
export class TableComponent {
  /** Unsorted data */
  readonly data = input<TableRowData[]>([]);

  /** Table style */
  readonly style = input<TableStyle>('alternating');

  /** Enables sorting */
  readonly enableSort = input<boolean>(false);

  /** Columns in table */
  columns: string[] = [];

  /** Mat sort element */
  readonly sort = viewChild.required(MatSort);

  /** Table data source */
  readonly dataSource = new MatTableDataSource<TableRowData>([]);

  /** Sort data on load and set columns */
  constructor() {
    effect(() => {
      this.dataSource.data = this.data();
      if (this.enableSort()) {
        this.dataSource.sort = this.sort();
      }
      this.columns = Object.keys(this.data()[0]);
    });
  }
}
