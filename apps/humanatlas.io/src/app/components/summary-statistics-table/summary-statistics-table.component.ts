import { CommonModule } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { assetsUrl } from '@hra-ui/common';
import { TableColumn, TableComponent, TableRow } from '@hra-ui/design-system/table';
import { injectParams } from 'ngxtension/inject-params';
import { parse } from 'papaparse';

/**
 * Summary Statistics Table Component
 *
 * This component displays a summary statistics table based on a CSV file.
 * It allows filtering of the rows based on a specified organ.
 */
@Component({
  selector: 'hra-summary-statistics-table',
  imports: [CommonModule, TableComponent],
  templateUrl: './summary-statistics-table.component.html',
  styleUrl: './summary-statistics-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryStatisticsTableComponent {
  /** URL for the CSV */
  readonly csvUrl = input('assets/content/2d-ftu-page/table-data/ftu-cell-count-7th-release.csv');

  /** Column name for the organ */
  readonly organColumn = input('Organ');

  /** Columns for the table */
  readonly columns = input<TableColumn[]>([
    {
      column: 'FTU Label in Uberon',
      label: 'FTU Label in Uberon',
      type: {
        type: 'text',
      },
    },
    {
      column: 'FTU ID in Uberon',
      label: 'FTU ID in Uberon',
      type: {
        type: 'text',
      },
    },
    {
      column: 'CT Label in CL',
      label: 'CT Label in CL',
      type: {
        type: 'text',
      },
    },
    {
      column: 'CT ID in CL',
      label: 'CT ID in CL',
      type: {
        type: 'text',
      },
    },
    {
      column: 'CT Label in 2D Object',
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

  /** Function that filters the items by the organ */
  private filterItemsByOrgan(items: TableRow[], key: string, organ: string): TableRow[] {
    if (!organ) {
      return [];
    }

    const collator = new Intl.Collator(undefined, { usage: 'search', sensitivity: 'base' });
    return items.filter((item) => collator.compare(`${item[key]}`, organ) === 0);
  }

  /** Computed property that filters the items by the organ, calls @function filterItemsByOrgan */
  protected readonly rows = computed(() =>
    this.filterItemsByOrgan(this.items.value(), this.organColumn(), this.organ() ?? ''),
  );
}
