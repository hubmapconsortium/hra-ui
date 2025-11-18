import { Component, inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { TableColumn, TableComponent, TableRow } from '@hra-ui/design-system/table';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';

/**
 * Interface for the Table Bottom Sheet Data
 */
export interface TableBottomSheetData {
  /** rows for the table */
  rows: TableRow[];
  /** columns for the table */
  columns: TableColumn[];
  /** Optional flag to hide headers */
  hideHeaders?: boolean;
}

/**
 * Table Bottom Sheet Component
 * Displays a bottom sheet with a table based on the provided data.
 */
@Component({
  selector: 'hra-table-bottom-sheet',
  imports: [HraCommonModule, ButtonsModule, MatIconModule, TableComponent, ScrollingModule],
  templateUrl: './table-bottom-sheet.component.html',
  styleUrl: './table-bottom-sheet.component.scss',
})
export class TableBottomSheetComponent {
  /** Reference to the bottom sheet */
  private readonly _bottomSheetRef = inject(MatBottomSheetRef<TableBottomSheetComponent>);

  /** Data injected into the bottom sheet */
  protected readonly data = inject<TableBottomSheetData>(MAT_BOTTOM_SHEET_DATA);

  /** Function to close the bottom sheet */
  close(): void {
    this._bottomSheetRef.dismiss();
  }
}
