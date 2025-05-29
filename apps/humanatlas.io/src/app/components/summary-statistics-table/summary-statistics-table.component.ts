import { CommonModule } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { assetsUrl } from '@hra-ui/common';
import { MatIconModule } from '@angular/material/icon';
import { TableColumn, TableComponent, TableRow } from '@hra-ui/design-system/table';
import saveAs from 'file-saver';
import { injectParams } from 'ngxtension/inject-params';
import { parse, unparse } from 'papaparse';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

/**
 * Summary Statistics Table Component
 *
 * This component displays a summary statistics table based on a CSV file.
 * It allows filtering of the rows based on a specified organ.
 */
@Component({
  selector: 'hra-summary-statistics-table',
  imports: [CommonModule, ButtonsModule, MatIconModule, TableComponent],
  templateUrl: './summary-statistics-table.component.html',
  styleUrl: './summary-statistics-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryStatisticsTableComponent {
  /** URL for the CSV */
  readonly csvUrl = input('assets/content/2d-ftu-illustrations/table-data/ftu-cell-count-7th-release.csv');

  /** Column name for the organ */
  readonly organColumn = input('Organ');

  /** Columns for the table */
  readonly columns = input<TableColumn[]>([
    {
      column: 'FtuLabel',
      label: 'FTU Label in Uberon',
      type: {
        type: 'text',
      },
    },
    {
      column: 'FtuId',
      label: 'FTU ID in Uberon',
      type: {
        type: 'text',
      },
    },
    {
      column: 'CtLabel',
      label: 'CT Label in CL',
      type: {
        type: 'text',
      },
    },
    {
      column: 'CtId',
      label: 'CT ID in CL',
      type: {
        type: 'text',
      },
    },
    {
      column: 'CtLabelIn2D',
      label: 'CT Label in 2D Object',
      type: {
        type: 'text',
      },
    },
    {
      column: '#AS',
      label: '#AS',
      type: {
        type: 'numeric',
      },
    },
    {
      column: '#CT',
      label: '#CT',
      type: {
        type: 'numeric',
      },
    },
  ]);

  /** The organ to filter by, from the URL */
  private readonly organ = injectParams('organ');

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
