import { Location } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, computed, Directive, effect, ErrorHandler, inject, input, viewChild } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { APP_ASSETS_HREF, HraCommonModule, parseUrl } from '@hra-ui/common';
import { TextHyperlinkDirective } from '@hra-ui/design-system/buttons/text-hyperlink';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { MarkdownModule } from 'ngx-markdown';
import { parse } from 'papaparse';
import {
  LinkColumnType,
  MarkdownColumnType,
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

  /** Guard for the context of Markdowm Row Element */
  static ngTemplateContextGuard(
    _dir: MarkdownRowElementDirective,
    _ctx: unknown,
  ): _ctx is RowElementContext<string, MarkdownColumnType> {
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
    MatSortModule,
    MatTableModule,
    ScrollingModule,
    TextHyperlinkDirective,
    LinkRowElementDirective,
    TextRowElementDirective,
    MarkdownRowElementDirective,
    NumericRowElementDirective,
  ],
  host: {
    '[class]': '"hra-table-style-" + style()',
    '[class.sortable]': 'enableSort()',
    '[class.vertical-dividers]': 'verticalDividers()',
  },
})
export class TableComponent<T extends TableRow = TableRow> {
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

  /** Error handler provider for logging errors */
  private readonly errorHandler = inject(ErrorHandler);

  /** Assets URL provider for loading CSV with relative path */
  private readonly assetsHref = inject(APP_ASSETS_HREF);

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
  protected readonly columnIds = computed(() => this._columns().map((col) => col.column));

  /** Table data source */
  protected readonly dataSource = new MatTableDataSource<TableRow>([]);

  /** Mat sort element */
  private readonly sort = viewChild.required(MatSort);

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
}
