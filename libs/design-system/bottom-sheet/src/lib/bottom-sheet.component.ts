import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { TableColumn, TableComponent, TableRow } from '@hra-ui/design-system/table';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { MatIconModule } from '@angular/material/icon';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';

/**
 * Interface for the Table Bottom Sheet Data
 */
interface TableBottomSheetData {
  /** Variant of the bottom sheet data */
  variant: 'table';
  /** rows for the table */
  rows: TableRow[];
  /** columns for the table */
  columns: TableColumn[];
  /** Optional flag to hide headers */
  hideHeaders?: boolean;
}

/**
 * Interface for the Page Section Bottom Sheet Data
 */
interface PageSectionBottomSheetData {
  /** Variant of the bottom sheet data */
  variant: 'page-section';
  /** Tagline for the page section */
  tagline: string;
}

/**
 * Union type for the Bottom Sheet Data
 * Can be either TableBottomSheetData or PageSectionBottomSheetData
 */
export type BottomSheetData = TableBottomSheetData | PageSectionBottomSheetData;

/**
 * Bottom Sheet Component
 * Displays a bottom sheet with either a table or a page section based on the provided data.
 */
@Component({
  selector: 'hra-bottom-sheet',
  imports: [CommonModule, ButtonsModule, MatIconModule, TableComponent, PageSectionComponent, A11yModule],
  templateUrl: './bottom-sheet.component.html',
  styleUrl: './bottom-sheet.component.scss',
})
export class BottomSheetComponent {
  /** Reference to the bottom sheet */
  private readonly _bottomSheetRef = inject(MatBottomSheetRef<BottomSheetComponent>);

  /** Data injected into the bottom sheet */
  protected readonly data = inject<BottomSheetData>(MAT_BOTTOM_SHEET_DATA);

  /** Function to close the bottom sheet */
  close(): void {
    this._bottomSheetRef.dismiss();
  }
}
