import { CommonModule } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { assetsUrl } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { TableColumn, TableComponent, TableRow } from '@hra-ui/design-system/table';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import saveAs from 'file-saver';
import { injectQueryParams } from 'ngxtension/inject-query-params';
import { parse, unparse } from 'papaparse';

/**
 * Summary Statistics Table Component
 *
 * This component displays a summary statistics table based on a CSV file.
 * It allows filtering of the rows based on a specified organ.
 */
@Component({
  selector: 'hra-summary-statistics-table',
  imports: [CommonModule, ButtonsModule, MatIconModule, PlainTooltipDirective, TableComponent],
  templateUrl: './summary-statistics-table.component.html',
  styleUrl: './summary-statistics-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryStatisticsTableComponent {
  /** URL for the CSV */
  readonly csvUrl = input('assets/content/2d-ftu-illustrations/table-data/ftu-cell-counts.csv');

  /** Column name for the organ */
  readonly organColumn = input('organ');

  /** Columns for the table */
  readonly columns = input<TableColumn[]>([
    {
      column: 'ftu_label',
      label: 'FTU Label in Uberon',
      type: {
        type: 'text',
      },
    },
    {
      column: 'ftu_id',
      label: 'FTU ID in Uberon',
      type: {
        type: 'text',
      },
    },
    {
      column: 'ftu_part_label',
      label: 'CT Label in CL',
      type: {
        type: 'text',
      },
    },
    {
      column: 'ftu_part_id',
      label: 'CT ID in CL',
      type: {
        type: 'text',
      },
    },
    {
      column: 'as_count',
      label: '#AS',
      type: {
        type: 'numeric',
      },
    },
    {
      column: 'ct_count',
      label: '#CT',
      type: {
        type: 'numeric',
      },
    },
  ]);

  /** The organ to filter by, from the URL */
  private readonly organ = injectQueryParams('organ');

  /** Fetches the CSV data and parses it into TableRow objects */
  private readonly items = httpResource.text<TableRow[]>(assetsUrl(this.csvUrl), {
    parse: (text) => parse<TableRow>(text, { header: true, dynamicTyping: true, skipEmptyLines: 'greedy' }).data,
    defaultValue: [],
  });

  /** Computed property that filters the items by the organ, calls @function filterItemsByOrgan */
  protected readonly rows = computed(() =>
    this.filterItemsByOrgan(this.items.value(), this.organColumn(), this.organ() ?? 'Kidney'),
  );

  /** Function that filters the items by the organ */
  private filterItemsByOrgan(items: TableRow[], key: string, organ: string): TableRow[] {
    if (!organ) {
      return [];
    }

    const collator = new Intl.Collator(undefined, { usage: 'search', sensitivity: 'base' });
    return items.filter((item) => collator.compare(`${item[key]}`, organ) === 0);
  }

  /** function to download CSV or data of rows */
  download(): void {
    const csvUrl = this.csvUrl();
    const rows = this.rows();
    const organ = this.organ() ?? 'Kidney';
    const filename = `${organ}.csv`;
    if (csvUrl) {
      saveAs(csvUrl, filename);
    } else {
      const content = unparse(rows, { header: true });
      const blob = new Blob([content], { type: 'text/csv' });
      saveAs(blob, filename);
    }
  }
}
