import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { TableColumn, TableComponent, TableRow } from '@hra-ui/design-system/table';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { MatIconModule } from '@angular/material/icon';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';

/**
 * Bottom Sheet Variant
 */
export type BottomSheetVariant = 'table' | 'page-section';

/**
 * Interface for the bottom sheet Data
 */
export interface BottomSheetData {
  variant: BottomSheetVariant;
  tagline?: string;
  rows?: TableRow[];
  columns?: TableColumn[];
}

/**
 * Bottom Sheet Component
 * Displays a bottom sheet with either a table or a page section based on the provided data.
 */
@Component({
  selector: 'hra-bottom-sheet',
  imports: [CommonModule, ButtonsModule, MatIconModule, TableComponent, PageSectionComponent],
  templateUrl: './bottom-sheet.component.html',
  styleUrl: './bottom-sheet.component.scss',
})
export class BottomSheetComponent {
  /** Reference to the bottom sheet */
  private readonly _bottomSheetRef = inject(MatBottomSheetRef<BottomSheetComponent>);

  /** Data injected into the bottom sheet */
  readonly data = inject<BottomSheetData>(MAT_BOTTOM_SHEET_DATA);

  /** Function to close the bottom sheet */
  close(): void {
    this._bottomSheetRef.dismiss();
  }
}
