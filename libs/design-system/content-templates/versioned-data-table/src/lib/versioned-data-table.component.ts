import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconsModule } from '@hra-ui/design-system/icons';
import { TableColumn, TableComponent, TableVariant } from '@hra-ui/design-system/table';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { saveAs } from 'file-saver';
import { unparse } from 'papaparse';
import { VersionedData } from './types/versioned-data-table.schema';

/**
 * Data Selector Component
 *
 * This component allows the user to select an item from a list of items.
 * The items are passed as an object, where the keys are the labels and the values are the items.
 */
@Component({
  selector: 'hra-versioned-data-table',
  imports: [
    ButtonsModule,
    CommonModule,
    IconsModule,
    MatFormFieldModule,
    MatSelectModule,
    PlainTooltipDirective,
    TableComponent,
  ],
  templateUrl: './versioned-data-table.component.html',
  styleUrl: './versioned-data-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VersionedDataTableComponent {
  /** Label for the selector */
  readonly label = input.required<string>();

  /** An array of “payload” objects, of any shape */
  readonly items = input.required<VersionedData[]>();

  /** The initial selection */
  readonly selection = model(0);

  /** The columns */
  readonly columns = input<TableColumn[]>();

  /** The style of the table */
  readonly style = input<TableVariant>('alternating');

  /** The sort of the table */
  readonly enableSort = input(false);

  /** The dividers of the table */
  readonly verticalDividers = input(false);

  /** Whether to hide the version dropdown selector */
  readonly hideVersionSelector = input(false);

  /** Item with the selected key */
  protected readonly item = computed(() => {
    const selection = this.selection();
    const items = this.items();
    return items[selection] ?? items[0];
  });

  /** function to download CSV or data of rows */
  download(): void {
    const { csvUrl, rows = [], label } = this.item();
    const filename = `${label}.csv`;
    if (csvUrl) {
      saveAs(csvUrl, filename);
    } else {
      const content = unparse(rows, { header: true });
      const blob = new Blob([content], { type: 'text/csv' });
      saveAs(blob, filename);
    }
  }
}
