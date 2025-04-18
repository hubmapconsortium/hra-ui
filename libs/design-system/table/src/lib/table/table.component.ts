import { Component, computed, effect, input, viewChild } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HraCommonModule } from '@hra-ui/common';
import { TextHyperlinkDirective } from '@hra-ui/design-system/buttons/text-hyperlink';
import { ScrollingModule, ScrollOverflowFadeDirective } from '@hra-ui/design-system/scrolling';
import { MarkdownModule } from 'ngx-markdown';

/** Single table row */
export type TableRow = Record<string, string | number | TableLink | TableMarkdown>;
/** Table columns */
export type TableColumns<T extends TableRow> = (keyof T & string)[] | Partial<Record<keyof T & string, string>>;

/** Value to use if cell contains a link */
export interface TableLink {
  /** Link label */
  label: unknown;
  /** Link url */
  url: string;
}

/** Type for markdown table entry */
export interface TableMarkdown {
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
    '[class]': '"hra-table-style-" + style()',
    '[class.sortable]': 'enableSort()',
    '[class.vertical-dividers]': 'verticalDividers()',
  },
})
export class TableComponent<T extends TableRow = TableRow> {
  /** Unsorted data */
  readonly data = input.required<T[]>();

  /** Columns in table */
  readonly columns = input.required<TableColumns<T>>();

  /** Table style */
  readonly style = input<TableVariant>('alternating');

  /** Enables sorting */
  readonly enableSort = input<boolean>(false);

  /** Enables dividers between columns */
  readonly verticalDividers = input<boolean>(false);

  /** Column ids */
  protected readonly columnIds = computed(() => {
    const columns = this.columns();
    if (Array.isArray(columns)) {
      return columns;
    }

    return Object.keys(columns);
  });

  /** Column labels by column id */
  protected readonly columnLabels = computed(() => {
    const columns = this.columns();
    if (Array.isArray(columns)) {
      return columns.reduce<Partial<Record<keyof T, string>>>((acc, key) => {
        acc[key] = key[0].toUpperCase() + key.slice(1).toLowerCase();
        return acc;
      }, {});
    }

    return columns;
  });

  /** Gets the columns in the data that contain only numbers */
  protected readonly numericColumns = computed(() => {
    if (this.data().length === 0) {
      return new Set();
    }

    const item = this.data()[0];
    return new Set(Object.keys(item).filter((key) => typeof item[key] === 'number'));
  });

  /** Table data source */
  protected readonly dataSource = new MatTableDataSource<TableRow>([]);

  /** Mat sort element */
  private readonly sort = viewChild.required(MatSort);

  /** Sort data on load and set columns */
  constructor() {
    effect(() => {
      this.dataSource.data = this.data();
    });

    effect(() => {
      this.dataSource.sort = this.sort();
    });
  }
}
