import { inject, Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from './lib/bottom-sheet.component';
import { TableRow, TableColumn } from '@hra-ui/design-system/table';

/**
 * Service to handle bottom sheet operations.
 * Provides methods to open different types of bottom sheets.
 */
@Injectable({ providedIn: 'root' })
export class BottomSheetService {
  /** Injects the MatBottomSheet service to open bottom sheets */
  private readonly _bottomSheet = inject(MatBottomSheet);

  /**
   * Opens a table bottom sheet with the provided rows and columns.
   * @param rows - The table rows to display
   * @param columns - The table columns to display
   */
  openTableBottomSheet(rows: TableRow[], columns: TableColumn[], hideHeaders = false) {
    return this._bottomSheet.open(BottomSheetComponent, {
      data: {
        variant: 'table',
        rows,
        columns,
        hideHeaders,
      },
    });
  }

  /**
   * Opens a page section bottom sheet with the provided tagline.
   * @param tagline - The tagline to display in the page section
   */
  openPageSectionBottomSheet(tagline: string) {
    return this._bottomSheet.open(BottomSheetComponent, {
      data: {
        variant: 'page-section',
        tagline,
      },
    });
  }
}
