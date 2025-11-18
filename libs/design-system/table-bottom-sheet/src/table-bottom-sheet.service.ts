import { inject, Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { TableBottomSheetComponent, TableBottomSheetData } from './lib/table-bottom-sheet.component';

/**
 * Service to handle table bottom sheet operations.
 * Provides a method to open table bottom sheets.
 */
@Injectable({ providedIn: 'root' })
export class TableBottomSheetService {
  /** Injects the MatBottomSheet service to open bottom sheets */
  private readonly _bottomSheet = inject(MatBottomSheet);

  /**
   * Opens a table bottom sheet with the provided data.
   * @param data - The table data to display
   */
  openTableBottomSheet(data: TableBottomSheetData) {
    return this._bottomSheet.open(TableBottomSheetComponent, {
      data,
    });
  }
}
