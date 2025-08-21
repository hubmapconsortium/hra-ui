import { SelectionModel } from '@angular/cdk/collections';
import { Location } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, computed, Directive, effect, ErrorHandler, inject, input, output, viewChild } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { APP_ASSETS_HREF, HraCommonModule, parseUrl } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { TextHyperlinkDirective } from '@hra-ui/design-system/buttons/text-hyperlink';
import { IconsModule } from '@hra-ui/design-system/icons';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { SnackbarService } from '@hra-ui/design-system/snackbar';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import saveAs from 'file-saver';
import { MarkdownModule } from 'ngx-markdown';
import { NgScrollbar } from 'ngx-scrollbar';
import { parse } from 'papaparse';

import {
  IconColumnType,
  LinkColumnType,
  MarkdownColumnType,
  MenuButtonColumnType,
  MenuOptionsType,
  NumericColumnType,
  TableColumn,
  TableColumnType,
  TableColumnWithType,
  TableRow,
  TableVariant,
  TextColumnType,
} from '../types/page-table.schema';

/** Type for the row element context */
type RowElementContext<T, CT extends TableColumnType> = {
  $implicit: T;
  element: TableRow;
  column: TableColumnWithType<CT>;
};

/** Directive for typing the context of Text Row Element */
@Directive({
  selector: 'ng-template[hraTextRowElement]',
  standalone: true,
})
export class TextRowElementDirective {
  /* istanbul ignore next */

  /** Guard for the context of Text Row Element */
  static ngTemplateContextGuard(
    _dir: TextRowElementDirective,
    _ctx: unknown,
  ): _ctx is RowElementContext<string, TextColumnType> {
    return true;
  }
}

/** Directive for typing the context of Link Row Element */
@Directive({
  selector: 'ng-template[hraLinkRowElement]',
  standalone: true,
})
export class LinkRowElementDirective {
  /* istanbul ignore next */

  /** Guard for the context of Link Row Element */
  static ngTemplateContextGuard(
    _dir: LinkRowElementDirective,
    _ctx: unknown,
  ): _ctx is RowElementContext<string, LinkColumnType> {
    return true;
  }
}

/** Directive for typing the context of Markdown Row Element */
@Directive({
  selector: 'ng-template[hraMarkdownRowElement]',
  standalone: true,
})
export class MarkdownRowElementDirective {
  /* istanbul ignore next */

  /** Guard for the context of Markdown Row Element */
  static ngTemplateContextGuard(
    _dir: MarkdownRowElementDirective,
    _ctx: unknown,
  ): _ctx is RowElementContext<string, MarkdownColumnType> {
    return true;
  }
}

/** Directive for typing the context of Icon Row Element */
@Directive({
  selector: 'ng-template[hraIconRowElement]',
  standalone: true,
})
export class IconRowElementDirective {
  /* istanbul ignore next */

  /** Guard for the context of Icon Row Element */
  static ngTemplateContextGuard(
    _dir: IconRowElementDirective,
    _ctx: unknown,
  ): _ctx is RowElementContext<string, IconColumnType> {
    return true;
  }
}

/** Directive for typing the context of menuButton Row Element */
@Directive({
  selector: 'ng-template[hraMenuButtonRowElement]',
  standalone: true,
})
export class MenuButtonRowElementDirective {
  /* istanbul ignore next */

  /** Guard for the context of menuButton Row Element */
  static ngTemplateContextGuard(
    _dir: MenuButtonRowElementDirective,
    _ctx: unknown,
  ): _ctx is RowElementContext<string, MenuButtonColumnType> {
    return true;
  }
}

/** Directive for typing the context of Numeric Row Element */
@Directive({
  selector: 'ng-template[hraNumericRowElement]',
  standalone: true,
})
export class NumericRowElementDirective {
  /* istanbul ignore next */

  /** Guard for the context of Numeric Row Element */
  static ngTemplateContextGuard(
    _dir: NumericRowElementDirective,
    _ctx: unknown,
  ): _ctx is RowElementContext<string, NumericColumnType> {
    return true;
  }
}

/**
 * Angular Material Table with Sort Feature
 */
@Component({
  selector: 'hra-table',
  templateUrl: 'table.component.html',
  styleUrls: ['table.component.scss'],
  imports: [
    HraCommonModule,
    MarkdownModule,
    MatMenuModule,
    MatSortModule,
    MatTableModule,
    ScrollingModule,
    MatCheckboxModule,
    TextHyperlinkDirective,
    LinkRowElementDirective,
    TextRowElementDirective,
    MarkdownRowElementDirective,
    MenuButtonRowElementDirective,
    NumericRowElementDirective,
    PlainTooltipDirective,
    IconsModule,
    ButtonsModule,
  ],
  host: {
    '[class]': '"hra-table-style-" + style()',
    '[class.sortable]': 'enableSort()',
    '[class.vertical-dividers]': 'verticalDividers()',
  },
})
export class TableComponent<T = TableRow> {
  /** Scrollbar ref */
  readonly scrollbar = viewChild.required<NgScrollbar>('scrollbar');

  /** CSV URL input */
  readonly csvUrl = input<string>();

  /** Columns in table */
  readonly columns = input<TableColumn[]>();

  /** Unsorted data */
  readonly rows = input<T[]>();

  /** Table style */
  readonly style = input<TableVariant>('alternating');

  /** Enables sorting */
  readonly enableSort = input<boolean>(false);

  /** Enables dividers between columns */
  readonly verticalDividers = input<boolean>(false);

  /** Enable row selection with checkboxes */
  readonly enableRowSelection = input<boolean>(false);

  /** Emits when selection changes */
  readonly selectionChange = output<T[]>();

  /** Selection model for checkbox functionality */
  readonly selection = new SelectionModel<TableRow>(true, []);

  /** Hide table headers */
  readonly hideHeaders = input<boolean>(false);

  /** Error handler provider for logging errors */
  private readonly errorHandler = inject(ErrorHandler);

  /** Assets URL provider for loading CSV with relative path */
  private readonly assetsHref = inject(APP_ASSETS_HREF);

  /** Snackbar service for download notification */
  readonly snackbar = inject(SnackbarService);

  /** CSV resource from remote URL */
  private readonly csv = httpResource.text<T[]>(
    () => {
      const url = this.csvUrl();
      if (url === undefined) {
        return undefined;
      } else if (parseUrl(url)) {
        return url;
      }
      return Location.joinWithSlash(this.assetsHref(), url);
    },
    {
      defaultValue: [],
      parse: (data) => {
        const result = parse<T>(data, { header: true, dynamicTyping: true, skipEmptyLines: true });
        if (result.errors.length > 0) {
          this.errorHandler.handleError(result.errors);
        }
        return result.data;
      },
    },
  );

  /** Table data rows */
  protected readonly _rows = computed(() => this.rows() ?? this.csv.value());

  /** Table data columns */
  protected readonly _columns = computed(() => this.columns() ?? this.inferColumns(this._rows()));

  /** Table data column IDs */
  protected readonly columnIds = computed(() => {
    const columns = this._columns().map((col) => col.column);
    return this.enableRowSelection() ? ['select', ...columns] : columns;
  });

  /** Whether the table has a totals footer */
  protected readonly hasTotalsFooter = computed(() => this._columns().some((col) => this.shouldComputeTotal(col)));

  /** Table data source */
  protected readonly dataSource = new MatTableDataSource<T>([]);

  /** Mat sort element */
  private readonly sort = viewChild.required(MatSort);

  /** Emits route */
  readonly routeClicked = output<string>();

  /** Emits download object id on download button hover */
  readonly downloadHovered = output<string>();

  /** Sort data on load and set columns */
  constructor() {
    effect(() => {
      this.dataSource.data = this._rows();
    });

    effect(() => {
      this.dataSource.sort = this.sort();
    });
  }

  /**
   * Column id where the "Total" label should appear (first data column)
   * @returns Column ID
   */
  protected readonly footerLabelColumnId = computed(() => {
    const ids = this.columnIds();
    return this.enableRowSelection() ? ids[1] : ids[0];
  });

  /**
   * Sum for each column that requests totals
   * @returns A record of column IDs and their corresponding total values
   */
  protected readonly totalsByColumn = computed<Record<string, number>>(() => {
    const totals: Record<string, number> = {};
    const rows = this._rows() as TableRow[];

    for (const col of this._columns()) {
      if (!this.shouldComputeTotal(col)) {
        continue;
      }

      let sum = 0;
      for (const r of rows) {
        const v = Number((r as TableRow)[col.column]);
        if (!Number.isNaN(v)) {
          sum += v;
        }
      }
      totals[col.column] = sum;
    }
    return totals;
  });

  /**
   * Whether the column is the footer label column
   * @param columnId Column ID
   * @returns Whether the column is the footer label column
   */
  protected readonly isFooterLabelColumn = (columnId: string): boolean => columnId === this.footerLabelColumnId();

  /**
   * Whether the column should compute a total
   * @param column Table column data
   * @returns Whether the column should compute a total
   */
  protected shouldComputeTotal(column: TableColumn): boolean {
    if (typeof column.type === 'object' && column.type.type === 'numeric' && column.type.computeTotal === true) {
      return true;
    }
    return false;
  }

  /**
   * Gets the type of the table column.
   * @param column Table column data
   * @returns Type of the column
   */
  getColumnType(column: TableColumn): TableColumnType['type'] {
    return typeof column.type === 'string' ? column.type : column.type.type;
  }

  /**
   * Infers the table column types from the loaded data.
   * @param data Table data
   * @returns Inferred table column with types as an array.
   */
  private inferColumns(data: T[]): TableColumn[] {
    if (data.length === 0) {
      return [];
    }

    const item = data[0];
    const columns: TableColumn[] = [];
    for (const key in item) {
      const type = typeof item[key] === 'number' ? 'numeric' : 'text';
      columns.push({ column: key, label: key, type });
    }

    return columns;
  }

  /**
   * Whether the number of selected elements matches the total number of rows.
   */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /**
   * Selects all rows if they are not all selected; otherwise clear selection.
   */
  toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...(this.dataSource.data as TableRow[]));
    }
    this.selectionChange.emit(this.selection.selected as T[]);
  }

  /**
   * Toggle row selection
   */
  toggleRow(row: TableRow): void {
    this.selection.toggle(row as TableRow);
    this.selectionChange.emit(this.selection.selected as T[]);
  }

  /**
   * Returns download menu options as an array of MenuOptionsType
   * @param options Menu options
   * @returns Menu options as an array of MenuOptionsType
   */
  getMenuOptions(options: string | number | boolean | MenuOptionsType[]) {
    return options as MenuOptionsType[];
  }

  /** Emits a route as string when object label is clicked */
  routeClick(url: string | number | boolean | (string | number | boolean)[]) {
    this.routeClicked.emit(url as string);
  }

  /** Emits the id of a row when its download button is hovered */
  downloadButtonHover(id: string | number | boolean | (string | number | boolean)[]) {
    this.downloadHovered.emit(id as string);
  }

  /**
   * Downloads a file from the url
   * @param url File url
   */
  download(url: string): void {
    saveAs(url, url.split('/').pop());
  }

  /** Scrolls to top of the table */
  scrollToTop() {
    this.scrollbar().scrollTo({ top: 0, duration: 0 });
  }
}
