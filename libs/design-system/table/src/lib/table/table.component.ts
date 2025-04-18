import { Component, computed, effect, input, viewChild } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HraCommonModule } from '@hra-ui/common';
import { TextHyperlinkDirective } from '@hra-ui/design-system/buttons/text-hyperlink';
import { ScrollingModule, ScrollOverflowFadeDirective } from '@hra-ui/design-system/scrolling';
import { MarkdownModule } from 'ngx-markdown';

/** Type for table row data */
export interface TableRowData {
  /** Column: value */
  [value: string]: string | number | TableLinkData | TableMarkdownData;
}

/** Value to use if cell contains a link */
export interface TableLinkData {
  /** Link label */
  label: unknown;
  /** Link url */
  url: string;
}

/** Type for markdown table entry */
export interface TableMarkdownData {
  /** Markdown as string */
  markdown: string;
}

/** Table style */
export type TableVariant = 'alternating' | 'divider' | 'basic';

/**
 * Angular Material table with sort feature
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
    MarkdownModule,
  ],
  host: {
    '[attr.style]': 'style()',
    '[attr.enableSort]': 'enableSort()',
    '[attr.verticalDividers]': 'verticalDividers()',
  },
})
export class TableComponent {
  /** Unsorted data */
  readonly data = input.required<TableRowData[]>();

  /** Columns in table */
  readonly columns = input.required<string[] | Record<string, string>>();

  /** Table style */
  readonly style = input<TableVariant>('alternating');

  /** Enables sorting */
  readonly enableSort = input<boolean>(false);

  /** Enables dividers between columns */
  readonly verticalDividers = input<boolean>(false);

  /** Gets the columns in the data that contain only numbers */
  readonly getNumericColumns = computed(() => this.getNumericKeys(this.data()[0]));

  /** Mat sort element */
  readonly sort = viewChild.required(MatSort);

  /** Table data source */
  readonly dataSource = new MatTableDataSource<TableRowData>([]);

  /** Sort data on load and set columns */
  constructor() {
    effect(() => {
      this.dataSource.data = this.data();
    });
    effect(() => {
      this.dataSource.sort = this.sort();
    });
  }

  /**
   * Returns the columns in a row which contain numbers
   * @param data Row data
   * @returns Array of column names
   */
  getNumericKeys(data: TableRowData) {
    return Object.keys(data).filter((key) => typeof data[key] === 'number');
  }

  /**
   * Gets column names from the columns input
   * @returns Column names
   */
  getColumnNames(): string[] {
    return this.columns().length ? (this.columns() as string[]) : Object.keys(this.columns());
  }

  /**
   * Returns column input as record
   * @returns Column as record
   */
  getColumnRecord(): Record<string, string> {
    return this.columns() as Record<string, string>;
  }
}
